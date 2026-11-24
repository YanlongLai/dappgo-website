import assert from "node:assert/strict";
import test from "node:test";
import { onRequestGet, UPSTREAM_TIMEOUT_MS, FRESH_TTL_MS, SIMULATE_FAILURE_HEADER } from "../functions/api/markets/[market]/dashboard/[file].js";

const realFetch = globalThis.fetch;
test.afterEach(() => { globalThis.fetch = realFetch; });

test("rejects unknown markets and files without calling upstream", async () => {
  globalThis.fetch = () => { throw new Error("must not fetch"); };
  assert.equal((await onRequestGet({ params: { market: "jp", file: "latest.json" } })).status, 404);
  assert.equal((await onRequestGet({ params: { market: "us", file: "../x.json" } })).status, 404);
});

test("passes a bounded timeout signal and proxies success", async () => {
  let seen;
  globalThis.fetch = async (url, init) => { seen = { url, init }; return new Response("{}", { status: 200, headers: { etag: "\"abc\"" } }); };
  const res = await onRequestGet({ params: { market: "us", file: "latest.json" } });
  assert.equal(res.status, 200);
  assert.equal(seen.url, "https://data.dappgo.com/v1/markets/us/dashboard/latest.json");
  assert.ok(seen.init.signal instanceof AbortSignal);
  assert.equal(UPSTREAM_TIMEOUT_MS, 5000);
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(res.headers.get("etag"), "\"abc\"");
});

test("upstream timeout returns a fast 504 JSON error", async () => {
  globalThis.fetch = async () => { throw new DOMException("timed out", "TimeoutError"); };
  const res = await onRequestGet({ params: { market: "tw", file: "latest.json" } });
  assert.equal(res.status, 504);
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.deepEqual(await res.json(), { error: "Upstream data gateway timed out" });
});

test("network failure returns 502 instead of an uncaught exception", async () => {
  globalThis.fetch = async () => { throw new TypeError("fetch failed"); };
  const res = await onRequestGet({ params: { market: "us", file: "data-0123456789ab.json" } });
  assert.equal(res.status, 502);
});

test("upstream 5xx maps to 502, 404 passes through", async () => {
  globalThis.fetch = async () => new Response("", { status: 503 });
  assert.equal((await onRequestGet({ params: { market: "us", file: "latest.json" } })).status, 502);
  globalThis.fetch = async () => new Response("", { status: 404 });
  assert.equal((await onRequestGet({ params: { market: "us", file: "latest.json" } })).status, 404);
});

// ---- Stale-cache fallback (Cache API) ----

function memoryCache() {
  const store = new Map();
  return {
    store,
    async match(key) { const hit = store.get(key.url); return hit ? new Response(hit.body.slice(0), { status: hit.status, headers: hit.headers }) : undefined; },
    async put(key, response) { store.set(key.url, { body: await response.arrayBuffer(), status: response.status, headers: new Headers(response.headers) }); }
  };
}
const realCaches = globalThis.caches;
test.afterEach(() => { globalThis.caches = realCaches; });

function ctx(file, { clock, headers } = {}) {
  const pending = [];
  return {
    pending,
    params: { market: "us", file },
    request: new Request(`https://news.dappgo.com/api/markets/us/dashboard/${file}`, { headers }),
    waitUntil: p => pending.push(p),
    now: () => clock.t
  };
}
async function call(file, opts) { const c = ctx(file, opts); const res = await onRequestGet(c); await Promise.all(c.pending); return res; }

test("fresh cache hit within the TTL serves the cached copy without calling upstream", async () => {
  const cache = memoryCache(); globalThis.caches = { default: cache };
  const clock = { t: 1_000_000 };
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response('{"v":1}', { status: 200, headers: { etag: "\"e1\"" } }); };
  const first = await call("latest.json", { clock });
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("x-dappgo-cache"), "miss");
  assert.equal(await first.text(), '{"v":1}');
  clock.t += FRESH_TTL_MS - 1000;
  const second = await call("latest.json", { clock });
  assert.equal(calls, 1);
  assert.equal(second.status, 200);
  assert.equal(second.headers.get("x-dappgo-cache"), "hit");
  assert.equal(second.headers.get("x-dappgo-stale"), null);
  assert.equal(second.headers.get("cache-control"), "no-store");
  assert.equal(second.headers.get("etag"), "\"e1\"");
  assert.equal(second.headers.get("age"), String((FRESH_TTL_MS - 1000) / 1000));
  assert.equal(await second.text(), '{"v":1}');
  clock.t += 2000;
  globalThis.fetch = async () => { calls++; return new Response('{"v":2}', { status: 200 }); };
  const third = await call("latest.json", { clock });
  assert.equal(calls, 2, "expired fresh TTL re-reads upstream");
  assert.equal(await third.text(), '{"v":2}');
});

test("upstream timeout serves the stale copy with x-dappgo-stale and its age", async () => {
  const cache = memoryCache(); globalThis.caches = { default: cache };
  const clock = { t: 5_000_000 };
  globalThis.fetch = async () => new Response('{"v":1}', { status: 200, headers: { etag: "\"e1\"" } });
  await call("latest.json", { clock });
  clock.t += 120_000;
  globalThis.fetch = async () => { throw new DOMException("timed out", "TimeoutError"); };
  const res = await call("latest.json", { clock });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-dappgo-stale"), "1");
  assert.equal(res.headers.get("x-dappgo-cache"), "stale");
  assert.equal(res.headers.get("age"), "120");
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(await res.text(), '{"v":1}');
});

test("upstream 5xx or network failure serves the stale copy; a 4xx does not", async () => {
  const cache = memoryCache(); globalThis.caches = { default: cache };
  const clock = { t: 9_000_000 };
  globalThis.fetch = async () => new Response('{"v":1}', { status: 200 });
  await call("latest.json", { clock });
  clock.t += 60_000;
  globalThis.fetch = async () => new Response("bad gateway", { status: 530 });
  const res = await call("latest.json", { clock });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-dappgo-stale"), "1");
  assert.equal(await res.text(), '{"v":1}');
  globalThis.fetch = async () => { throw new TypeError("fetch failed"); };
  assert.equal((await call("latest.json", { clock })).headers.get("x-dappgo-stale"), "1");
  globalThis.fetch = async () => new Response("", { status: 404 });
  assert.equal((await call("latest.json", { clock })).status, 404);
});

test("no cached copy still returns the error (504 timeout, 502 for 5xx)", async () => {
  globalThis.caches = { default: memoryCache() };
  const clock = { t: 1 };
  globalThis.fetch = async () => { throw new DOMException("timed out", "TimeoutError"); };
  const timeout = await call("latest.json", { clock });
  assert.equal(timeout.status, 504);
  assert.deepEqual(await timeout.json(), { error: "Upstream data gateway timed out" });
  globalThis.fetch = async () => new Response("", { status: 503 });
  assert.equal((await call("latest.json", { clock })).status, 502);
});

test("hashed data files stay immutable and are served from cache without upstream", async () => {
  globalThis.caches = { default: memoryCache() };
  const clock = { t: 1 };
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response('{"d":1}', { status: 200 }); };
  const file = "data-0123456789ab.json";
  const first = await call(file, { clock });
  assert.equal(first.headers.get("cache-control"), "public, max-age=31536000, immutable");
  clock.t += 30 * 86400_000;
  const second = await call(file, { clock });
  assert.equal(calls, 1);
  assert.equal(second.headers.get("cache-control"), "public, max-age=31536000, immutable");
  assert.equal(second.headers.get("x-dappgo-stale"), null);
  assert.equal(await second.text(), '{"d":1}');
});

test("simulate-failure probe skips upstream and serves stale even inside the fresh TTL", async () => {
  globalThis.caches = { default: memoryCache() };
  const clock = { t: 1 };
  globalThis.fetch = async () => new Response('{"v":1}', { status: 200 });
  await call("latest.json", { clock });
  globalThis.fetch = () => { throw new Error("must not fetch"); };
  const res = await call("latest.json", { clock, headers: { [SIMULATE_FAILURE_HEADER]: "1" } });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-dappgo-stale"), "1");
  globalThis.caches = { default: memoryCache() };
  assert.equal((await call("latest.json", { clock, headers: { [SIMULATE_FAILURE_HEADER]: "1" } })).status, 504);
});

test("a failing cache never breaks the proxy", async () => {
  globalThis.caches = { default: { match: async () => { throw new Error("cache down"); }, put: async () => { throw new Error("cache down"); } } };
  globalThis.fetch = async () => new Response('{"v":1}', { status: 200 });
  const res = await call("latest.json", { clock: { t: 1 } });
  assert.equal(res.status, 200);
  assert.equal(await res.text(), '{"v":1}');
});
