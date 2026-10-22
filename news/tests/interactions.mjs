import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../assets/news.js', import.meta.url), 'utf8');
const tickers = { AAPL: { name: 'Apple Inc.', news: [] }, MSFT: { name: 'Microsoft', news: [] } };
const flush = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };

async function fixture({ market = 'us', fail = false, savedLanguage = null, browserLanguage = 'en', generatedAt = null, storyCount = 0, deferFetch = false } = {}) {
  const nodes = new Map();
  const languages = ['zh', 'en'].map(language => element({ language }));
  const feedback = [element(), element()];
  const clears = [element(), element()];
  const disclaimer = element({ i18n: 'disclaimer' });
  let focused = null;
  function element(dataset = {}) {
    return {
      dataset, events: {}, attrs: {}, value: '', hidden: false, textContent: '', html: '', writes: 0, firstArticle: null,
      classList: { add() {}, remove() {}, toggle() {} },
      addEventListener(name, callback) { this.events[name] = callback; },
      setAttribute(name, value) { this.attrs[name] = value; },
      focus() { focused = this; },
      set innerHTML(value) {
        this.html = value; this.writes++;
        this.firstArticle = value.includes('<article') ? {} : null;
        this.buttons = [...value.matchAll(/data-stock="([^"]+)"/g)].map(match => element({ stock: match[1] }));
      },
      get innerHTML() { return this.html; },
      insertAdjacentHTML(position, value) { assert.equal(position, 'beforeend'); this.html += value; },
      querySelector(selector) {
        if (selector === '[data-empty-cta]' && this.html.includes('data-empty-cta')) {
          this.emptyCta ||= element();
          return this.emptyCta;
        }
        return null;
      },
      querySelectorAll(selector) { return selector === '[data-stock]' ? this.buttons || [] : []; },
    };
  }
  const get = selector => {
    if (!nodes.has(selector)) nodes.set(selector, element());
    return nodes.get(selector);
  };
  clears.forEach((button, index) => button.closest = () => ({ querySelector: () => get(index ? '[data-stock-search-mobile]' : '[data-stock-search]') }));
  const root = {
    dataset: { market }, querySelector: get,
    querySelectorAll: selector => ({
      '[data-language]': languages,
      '[data-search-feedback]': feedback, '[data-clear-search]': clears,
      '[data-i18n]': [disclaimer],
    })[selector] || [],
  };
  let failures = fail;
  let calls = 0;
  let href = `https://news.dappgo.com/${market}/?lang=en`;
  const timers = new Map();
  let now = 0;
  let releaseFetch;
  const fetchGate = new Promise(resolve => { releaseFetch = resolve; });
  const payload = { ticker_data: { ...tickers, AAPL: { name: 'Apple Inc.', news: Array.from({ length: storyCount }, (_, index) => ({
    provider_id: `story-${index}`, title: `Story ${index}`, summary: 'A published source summary.', source: 'Publisher',
    url: `https://example.test/story-${index}`, date: index < 15 ? '2026-10-22' : '2026-10-21',
    ...(index % 2 === 0 ? { image_url: 'https://example.test/image.jpg', image_width: 1200, image_height: 675 } : {}),
  })) } } };
  let timerId = 0;
  const window = { location: { get search() { return new URL(href).search; }, get href() { return href; } }, history: { replaceState(_a, _b, value) { href = new URL(value, href).href; } }, addEventListener() {} };
  const document = { documentElement: {}, querySelector: () => root, addEventListener() {} };
  vm.runInNewContext(source, {
    document, window, navigator: { languages: [browserLanguage] }, URL, URLSearchParams, Intl, AbortController,
    localStorage: { getItem() { return savedLanguage; }, setItem() {} },
    DappGoNewsData: { analysis() { return null; }, localizedNews(item) { return item; } },
    setTimeout(callback, ms) { timers.set(++timerId, { callback, ms, due: now + ms }); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    async fetch(url, options) {
      calls++;
      assert.ok(options.signal instanceof AbortSignal);
      if (deferFetch) await fetchGate;
      if (failures) throw new Error('Offline');
      return { ok: true, async json() { return url.endsWith('latest.json') ? { hash: 'abc123abc123', data_url_v2: 'dashboard/data-abc123abc123.json', generated_at_utc: generatedAt } : payload; } };
    },
  });
  await flush();
  return { get, languages, feedback, clears, disclaimer, timers, document,
    focus: () => focused, calls: () => calls, href: () => href,
    setFailure(value) { failures = value; },
    async release() { deferFetch = false; releaseFetch(); await flush(); },
    async advance(ms) {
      const target = now + ms;
      while (true) {
        const entry = [...timers].filter(([, timer]) => timer.due <= target).sort((a, b) => a[1].due - b[1].due)[0];
        if (!entry) break;
        const [id, timer] = entry; now = timer.due; timers.delete(id); timer.callback(); await flush();
      }
      now = target;
    },
  };
}

test('root destination explicitly selects English even with Chinese browser and saved preference', async () => {
  const app = await fixture({ savedLanguage: 'zh', browserLanguage: 'zh-TW' });
  assert.equal(app.document.documentElement.lang, 'en');
  assert.equal(app.languages[1].attrs['aria-pressed'], 'true');
  app.languages[0].events.click();
  assert.equal(app.document.documentElement.lang, 'zh-Hant');
  assert.equal(new URL(app.href()).searchParams.get('lang'), 'zh');
});

test('published news is not advertised as live and does not expose a pointer hash', async () => {
  const app = await fixture({ generatedAt: '2026-10-22T12:15:00Z' });
  assert.match(app.get('[data-status]').textContent, /Published news/);
  assert.doesNotMatch(app.get('[data-status]').textContent, /Live|pointer|abc123/);
  assert.match(app.get('[data-updated]').textContent, /EDT|GMT-4/);
  app.languages[0].events.click();
  assert.match(app.get('[data-status]').textContent, /已發布新聞/);
  assert.doesNotMatch(app.get('[data-status]').textContent, /即時|pointer|abc123/);
});

for (const market of ['us', 'tw']) {
  test(`${market}: search feedback, clear and selected-stock focus survive rendering`, async () => {
    const app = await fixture({ market });
    const buttons = app.get('[data-stock-list]').buttons;
    buttons.find(button => button.dataset.stock === 'MSFT').events.click();
    assert.equal(app.focus().dataset.stock, 'MSFT');
    assert.equal(app.get('[data-company-name]').textContent, 'Microsoft');
    app.get('[data-stock-search-mobile]').events.input({ target: { value: 'not-a-stock' } });
    assert.match(app.feedback[0].textContent, /No matching stocks/);
    assert.equal(app.feedback[1].hidden, false);
    assert.equal(app.get('[data-mobile-stock-select]').value, 'MSFT');
    assert.equal(app.get('[data-company-name]').textContent, 'Microsoft');
    app.languages[0].events.click();
    assert.match(app.feedback[0].textContent, /找不到/);
    assert.match(app.disclaimer.textContent, /不構成投資建議/);
    app.clears[1].events.click();
    assert.equal(app.feedback[0].hidden, true);
    assert.equal(app.get('[data-stock-search]').value, '');
    assert.equal(app.focus(), app.get('[data-stock-search-mobile]'));
    assert.ok(!app.href().includes('q='));
  });
}

test('initial failure exposes retry; repeated clicks coalesce and successful retry recovers', async () => {
  const app = await fixture({ fail: true });
  const retry = app.get('[data-retry]');
  assert.equal(retry.hidden, false);
  assert.equal(app.get('[data-skeletons]').hidden, true);
  assert.match(app.get('[data-error]').textContent, /Offline/);
  app.setFailure(false);
  const pending = retry.events.click();
  retry.events.click();
  assert.equal(retry.disabled, true);
  await pending;
  assert.equal(app.calls(), 3); // failed pointer + one pointer/payload retry
  assert.equal(retry.hidden, true);
  assert.equal(app.get('[data-error]').hidden, true);
  assert.equal(app.get('[data-stories]').attrs['aria-busy'], 'false');
  assert.ok([...app.timers.values()].every(timer => timer.ms >= 120000));
});

test('failed refresh retains last-good reading and language changes retain the error state', async () => {
  const app = await fixture();
  app.setFailure(true);
  await app.get('[data-update-reload]').events.click();
  assert.equal(app.get('[data-company-name]').textContent, 'Apple Inc.');
  assert.equal(app.get('[data-retry]').hidden, false);
  app.languages[0].events.click();
  assert.match(app.get('[data-status]').textContent, /暫時無法/);
  assert.match(app.get('[data-error]').textContent, /Offline/);
});

test('fast API responses never show skeletons; slow responses reveal at 300ms and retire on success', async () => {
  const fast = await fixture({ storyCount: 2 });
  assert.equal(fast.get('[data-skeletons]').hidden, true);
  assert.equal(fast.get('[data-load-status]').textContent, '');
  const slow = await fixture({ deferFetch: true, storyCount: 2 });
  await slow.advance(299); assert.equal(slow.get('[data-skeletons]').hidden, true);
  await slow.advance(1); assert.equal(slow.get('[data-skeletons]').hidden, false);
  assert.match(slow.get('[data-load-status]').textContent, /Loading news/);
  await slow.release();
  assert.equal(slow.get('[data-skeletons]').hidden, true);
  assert.equal(slow.get('[data-load-status]').textContent, '');
  assert.equal(slow.get('[data-stories]').attrs['aria-busy'], 'false');
});

test('a long wait switches from skeletons to explanatory progress and an error clears all loading UI', async () => {
  const app = await fixture({ deferFetch: true, fail: true });
  await app.advance(8000);
  assert.equal(app.get('[data-skeletons]').hidden, true);
  assert.match(app.get('[data-load-status]').textContent, /Still loading.*connection/);
  await app.release();
  assert.equal(app.get('[data-load-status]').textContent, '');
  assert.equal(app.get('[data-retry]').hidden, false);
});

for (const market of ['us', 'tw']) {
  test(`${market}: pagination waits, coalesces bursts and appends without replacing existing cards or fetching`, async () => {
    const app = await fixture({ market, storyCount: 25 });
    const feed = app.get('[data-stories]'); const first = feed.firstArticle; const writes = feed.writes;
    const more = app.get('[data-load-more]');
    assert.match(more.textContent, /Load more/);
    more.events.click(); more.events.click();
    assert.equal(more.disabled, true);
    await app.advance(299); assert.equal(app.get('[data-more-skeletons]').hidden, true);
    assert.equal((feed.html.match(/<article /g) || []).length, 10);
    await app.advance(1); assert.equal(app.get('[data-more-skeletons]').hidden, false);
    assert.match(app.get('[data-more-skeletons]').html, /skeleton-avatar/);
    assert.match(app.get('[data-more-skeletons]').html, /is-text-only/);
    await app.advance(300);
    assert.equal((feed.html.match(/<article /g) || []).length, 20);
    assert.equal(feed.firstArticle, first); assert.equal(feed.writes, writes);
    assert.equal(app.get('[data-more-skeletons]').hidden, true);
    assert.equal(app.calls(), 2);
    more.events.click(); await app.advance(600);
    assert.equal((feed.html.match(/<article /g) || []).length, 25);
    assert.equal((feed.html.match(/class="date-rule"/g) || []).length, 2);
    assert.match(more.textContent, /All published/); assert.equal(more.disabled, true);
    more.events.click(); await app.advance(600);
    assert.equal((feed.html.match(/<article /g) || []).length, 25);
  });
}

for (const action of ['search', 'language', 'stock', 'refresh']) {
  test(`pending pagination cannot cross a ${action} change`, async () => {
    const app = await fixture({ storyCount: 25 });
    app.get('[data-load-more]').events.click(); await app.advance(300);
    if (action === 'search') app.get('[data-stock-search]').events.input({ target: { value: 'apple' } });
    if (action === 'language') app.languages[0].events.click();
    if (action === 'stock') app.get('[data-stock-list]').buttons.find(button => button.dataset.stock === 'MSFT').events.click();
    if (action === 'refresh') await app.get('[data-update-reload]').events.click();
    await app.advance(600);
    assert.equal(app.get('[data-more-skeletons]').hidden, true);
    assert.equal((app.get('[data-stories]').html.match(/<article /g) || []).length, action === 'stock' ? 0 : 10);
    assert.equal(app.get('[data-stories]').attrs['aria-busy'], 'false');
  });
}

test('failed refresh during pagination restores the last-good feed and its load-more control', async () => {
  const app = await fixture({ storyCount: 25 });
  const feed = app.get('[data-stories]'); const first = feed.firstArticle;
  const more = app.get('[data-load-more]');
  more.events.click(); await app.advance(300);
  app.setFailure(true); await app.get('[data-update-reload]').events.click();
  assert.equal(feed.firstArticle, first);
  assert.equal(more.disabled, false); assert.match(more.textContent, /Load more/);
  assert.equal(app.get('[data-more-skeletons]').hidden, true);
  more.events.click(); await app.advance(600);
  assert.equal((feed.html.match(/<article /g) || []).length, 20);
  assert.equal(app.calls(), 3);
});
