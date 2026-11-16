import assert from "node:assert/strict";
import test from "node:test";
import { onRequestGet, UPSTREAM_TIMEOUT_MS } from "../functions/api/markets/[market]/dashboard/[file].js";

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
