import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { randomUUID, webcrypto } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { reportSQL } from '../../scripts/news-ai-report.mjs';

const source = fs.readFileSync(new URL('../functions/api/engagement.js', import.meta.url), 'utf8');
const { onRequestPost, onRequestOptions, validEvent } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const event = (overrides = {}) => ({ v: 1, event: 'ai_open', event_id: randomUUID(), visitor_id: randomUUID(), market: 'us', stock: 'AAPL', platform: 'web', language: 'en', ...overrides });
function database() {
  const sql = new DatabaseSync(':memory:');
  sql.exec(fs.readFileSync(new URL('../migrations/0001_ai_engagement.sql', import.meta.url), 'utf8'));
  return { sql, binding: {
    prepare(query) { return { bind(...values) { return { query, values }; } }; },
    async batch(statements) {
      sql.exec('BEGIN');
      try { const results = statements.map(item => sql.prepare(item.query).run(...item.values)); sql.exec('COMMIT'); return results; }
      catch (error) { sql.exec('ROLLBACK'); throw error; }
    },
  } };
}
function post(body, binding, { origin = 'https://news.dappgo.com', host = 'news.dappgo.com', headers = {} } = {}) {
  return onRequestPost({ request: new Request(`https://${host}/api/engagement`, { method: 'POST', headers: { 'content-type': 'application/json', ...(origin ? { origin } : {}), ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }), env: { NEWS_ENGAGEMENT: binding } });
}

test('web, iOS and Android writes share a bounded schema; duplicate IDs count once and daily readers dedupe', async () => {
  const { sql, binding } = database();
  const first = event();
  assert.equal((await post(first, binding)).status, 204);
  assert.equal((await post(first, binding)).status, 204);
  assert.equal((await post(event({ visitor_id: first.visitor_id }), binding)).status, 204);
  for (const platform of ['ios', 'android']) assert.equal((await post(event({ platform, market: 'tw', stock: '2330', language: 'zh' }), binding, { origin: null })).status, 204);
  const rows = sql.prepare('SELECT * FROM ai_open_events').all();
  assert.equal(rows.length, 4);
  assert.equal(rows.filter(row => row.stock === 'AAPL').length, 2);
  assert.equal(rows[0].visitor_hash, rows[1].visitor_hash);
  assert.notEqual(rows[0].visitor_hash, first.visitor_id);
  assert.equal(sql.prepare('SELECT COUNT(DISTINCT visitor_hash) AS readers FROM ai_open_events').get().readers, 3);
  const daily = sql.prepare(reportSQL(7).split(';')[0]).all();
  assert.equal(daily.find(row => row.stock === 'AAPL').anonymous_readers, 1);
  assert.equal(daily.find(row => row.stock === 'AAPL').opens, 2);
  sql.close();
});

test('unknown fields, bad identifiers, symbol injection and unsupported platforms never write', async () => {
  const { sql, binding } = database();
  for (const changes of [{ search: 'private search' }, { stock: "AAPL'; DROP TABLE ai_open_events" }, { stock: 'aapl' }, { stock: 'A'.repeat(17) }, { platform: 'other' }, { market: 'uk' }, { language: 'fr' }, { event: 'impression' }, { v: 2 }, { event_id: [randomUUID()] }, { visitor_id: 'device-identifier' }]) {
    assert.equal(validEvent(event(changes)), false);
    assert.equal((await post(event(changes), binding)).status, 400);
  }
  assert.equal((await post('{invalid', binding)).status, 400);
  assert.equal((await post(event(), binding, { origin: null })).status, 400);
  assert.equal(sql.prepare('SELECT COUNT(*) AS count FROM ai_open_events').get().count, 0);
  sql.close();
});

test('origin, privacy headers, previews, payload limits and unavailable storage isolate analytics failures', async () => {
  const { sql, binding } = database();
  assert.equal((await post(event(), binding, { origin: 'https://other.example' })).status, 403);
  assert.equal((await post(event(), binding, { headers: { dnt: '1' } })).status, 204);
  assert.equal((await post(event(), binding, { headers: { 'sec-gpc': '1' } })).status, 204);
  assert.equal((await post(event(), binding, { host: '1234abcd.dappgo-news.pages.dev', origin: 'https://1234abcd.dappgo-news.pages.dev' })).status, 204);
  assert.equal((await post('x'.repeat(1025), binding)).status, 413);
  assert.equal((await post(event(), binding, { headers: { 'content-length': '1025' } })).status, 413);
  assert.equal((await post(event(), binding, { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal((await post(event(), undefined)).status, 503);
  assert.equal((await post(event(), { prepare() { throw Error('storage unavailable'); } })).status, 503);
  assert.equal(sql.prepare('SELECT COUNT(*) AS count FROM ai_open_events').get().count, 0);
  assert.equal(onRequestOptions({ request: new Request('https://news.dappgo.com/api/engagement', { method: 'OPTIONS', headers: { origin: 'https://news.dappgo.com' } }) }).headers.get('access-control-allow-origin'), 'https://news.dappgo.com');
  sql.close();
});

test('expired events are removed in bounded batches; report ranges reject SQL injection', async () => {
  const { sql, binding } = database();
  const insert = sql.prepare("INSERT INTO ai_open_events VALUES (?, '2000-01-01', 0, 'us', 'AAPL', 'web', 'en', 'old')");
  for (let i = 0; i < 150; i++) insert.run(randomUUID());
  await post(event(), binding);
  assert.equal(sql.prepare('SELECT COUNT(*) AS count FROM ai_open_events').get().count, 51);
  for (const days of [0, 91, 1.5, '7; DROP TABLE ai_open_events']) assert.throws(() => reportSQL(days));
  sql.close();
});

const clientSource = fs.readFileSync(new URL('../assets/engagement.js', import.meta.url), 'utf8');
const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };
function clientFixture({ navigator = {}, failStorage = false, getterThrows = false } = {}) {
  const values = new Map(); const calls = []; let date = new Date('2026-10-22T18:00:00Z');
  const storage = { getItem: key => { if (failStorage) throw Error('restricted'); return values.get(key) || null; }, setItem: (key, value) => { if (failStorage) throw Error('restricted'); values.set(key, value); }, removeItem: key => values.delete(key) };
  const scope = { navigator, crypto: webcrypto, AbortController, setTimeout, clearTimeout, fetch: async (_url, options) => { calls.push(JSON.parse(options.body)); return { status: 204 }; } };
  if (getterThrows) Object.defineProperty(scope, 'localStorage', { get() { throw Error('blocked getter'); } }); else scope.localStorage = storage;
  vm.runInNewContext(clientSource, scope);
  const client = scope.DappGoNewsEngagement.createClient({ now: () => date });
  return { client, calls, values, nextDay() { date = new Date('2026-10-23T18:00:00Z'); } };
}

test('web anonymous IDs are daily, event IDs are unique and the payload matches ingestion', async () => {
  const app = clientFixture(); const topic = { market: 'us', stock: 'BRK-B', language: 'en' };
  app.client.recordOpen(topic); app.client.recordOpen(topic); await flush();
  assert.equal(app.calls.length, 2); assert.ok(app.calls.every(validEvent));
  assert.equal(app.calls[0].visitor_id, app.calls[1].visitor_id);
  assert.notEqual(app.calls[0].event_id, app.calls[1].event_id);
  app.nextDay(); app.client.recordOpen(topic); await flush();
  assert.notEqual(app.calls[0].visitor_id, app.calls[2].visitor_id);
  app.client.setEnabled(false); app.client.recordOpen(topic); await flush();
  assert.equal(app.calls.length, 3); assert.equal(app.values.has('dappgo-news-reader-day-v1'), false);
});

test('browser privacy signals override opt-in; unavailable localStorage cannot break reading', async () => {
  for (const navigator of [{ doNotTrack: '1' }, { globalPrivacyControl: true }]) {
    const app = clientFixture({ navigator }); app.client.setEnabled(true); app.client.recordOpen({ market: 'tw', stock: '2330', language: 'zh' }); await flush(); assert.equal(app.calls.length, 0);
  }
  for (const options of [{ failStorage: true }, { getterThrows: true }]) {
    const app = clientFixture(options); app.client.recordOpen({ market: 'tw', stock: '2330', language: 'zh' }); await flush(); assert.equal(app.calls.length, 1);
  }
});
