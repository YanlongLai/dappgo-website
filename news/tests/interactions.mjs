import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../assets/news.js', import.meta.url), 'utf8');
const tickers = { AAPL: { name: 'Apple Inc.', news: [] }, MSFT: { name: 'Microsoft', news: [] } };
const flush = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };

async function fixture({ market = 'us', fail = false, savedLanguage = null, browserLanguage = 'en' } = {}) {
  const nodes = new Map();
  const languages = ['zh', 'en'].map(language => element({ language }));
  const feedback = [element(), element()];
  const clears = [element(), element()];
  const disclaimer = element({ i18n: 'disclaimer' });
  let focused = null;
  function element(dataset = {}) {
    return {
      dataset, events: {}, attrs: {}, value: '', hidden: false, textContent: '', html: '',
      classList: { add() {}, remove() {} },
      addEventListener(name, callback) { this.events[name] = callback; },
      setAttribute(name, value) { this.attrs[name] = value; },
      focus() { focused = this; },
      set innerHTML(value) {
        this.html = value;
        this.buttons = [...value.matchAll(/data-stock="([^"]+)"/g)].map(match => element({ stock: match[1] }));
      },
      get innerHTML() { return this.html; },
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
  let timerId = 0;
  const window = { location: { get search() { return new URL(href).search; }, get href() { return href; } }, history: { replaceState(_a, _b, value) { href = new URL(value, href).href; } }, addEventListener() {} };
  const document = { documentElement: {}, querySelector: () => root, addEventListener() {} };
  vm.runInNewContext(source, {
    document, window, navigator: { languages: [browserLanguage] }, URL, URLSearchParams, Intl, AbortController,
    localStorage: { getItem() { return savedLanguage; }, setItem() {} },
    DappGoNewsData: { analysis() { return null; } },
    setTimeout(callback, ms) { timers.set(++timerId, { callback, ms }); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    async fetch(url, options) {
      calls++;
      assert.ok(options.signal instanceof AbortSignal);
      if (failures) throw new Error('Offline');
      return { ok: true, async json() { return url.endsWith('latest.json') ? { hash: 'abc123abc123', data_url_v2: 'dashboard/data-abc123abc123.json' } : { ticker_data: tickers }; } };
    },
  });
  await flush();
  return { get, languages, feedback, clears, disclaimer, timers, document,
    focus: () => focused, calls: () => calls, href: () => href,
    setFailure(value) { failures = value; },
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
