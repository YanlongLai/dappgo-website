import test from "node:test";
import assert from "node:assert/strict";
import { devHeaders, withDevHeaders, isDappgoHost } from "./lib/dappgo-dev-client.mjs";

const DEV = { env: { DAPPGO_CLIENT_CONTEXT: "dev" }, hostname: "mac.local" };

test("dev headers for own hosts", () => {
  for (const url of ["https://dappgo.com/x", "https://data.dappgo.com/v1/markets/us", "https://POSTIZ.DappGo.com:443/a"]) {
    assert.deepEqual(devHeaders(url, "website-scripts", DEV), { "user-agent": "DappGo-Dev/website-scripts (mac)", "x-dappgo-client": "Dev/website-scripts" });
  }
});

test("no headers when not a dev machine", () => {
  assert.deepEqual(devHeaders("https://data.dappgo.com/", "t", { env: {}, hostname: "mac" }), {});
  assert.deepEqual(devHeaders("https://data.dappgo.com/", "t", { env: { DAPPGO_CLIENT_CONTEXT: "ci" }, hostname: "mac" }), {});
});

test("third-party and look-alike hosts are untouched", () => {
  for (const url of ["https://api.github.com/", "https://finnhub.io/", "https://evildappgo.com/", "https://dappgo.com.evil.net/", "https://example.com/?u=dappgo.com", "not a url"]) {
    assert.deepEqual(devHeaders(url, "t", DEV), {});
    assert.equal(isDappgoHost(url), false);
  }
});

test("values are sanitised", () => {
  const h = devHeaders("https://dappgo.com/", "we ird/tool@x", { ...DEV, hostname: "yan's mac.local" });
  assert.match(h["user-agent"], /\(yan-s-mac\)$/);
  assert.doesNotMatch(h["user-agent"] + h["x-dappgo-client"], /@/);
});

test("withDevHeaders replaces user-agent only for own hosts", () => {
  const base = { accept: "a", "User-Agent": "old" };
  const out = withDevHeaders("https://dappgo.com/", base, "t", DEV);
  assert.equal(out["user-agent"], "DappGo-Dev/t (mac)");
  assert.equal(out["User-Agent"], undefined);
  assert.equal(out.accept, "a");
  assert.deepEqual(withDevHeaders("https://github.com/", base, "t", DEV), base);
});

