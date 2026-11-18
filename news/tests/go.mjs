import assert from "node:assert/strict";
import test from "node:test";
import { onRequest, sanitizeCampaign, platformOf, targetFor, APPS } from "../functions/go/[app].js";

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 300.0";
const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36";
const DESKTOP = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const req = (path, ua, method = "GET") => ({ request: new Request(`https://news.dappgo.com${path}`, { method, headers: ua ? { "user-agent": ua } : {} }), params: { app: path.split("/")[2].split("?")[0] } });

test("sanitizes campaign tokens", () => {
  assert.equal(sanitizeCampaign("Threads-TW-20261118"), "threads-tw-20261118");
  assert.equal(sanitizeCampaign("<script>alert(1)</script>"), "script-alert-1-script");
  assert.equal(sanitizeCampaign("a b__c//d"), "a-b-c-d");
  assert.equal(sanitizeCampaign(""), "direct");
  assert.equal(sanitizeCampaign(null), "direct");
  assert.equal(sanitizeCampaign("---"), "direct");
  const long = sanitizeCampaign("x".repeat(39) + "-yyyy");
  assert.ok(long.length <= 40 && !long.endsWith("-"));
});

test("detects platforms", () => {
  assert.equal(platformOf(IPHONE), "ios");
  assert.equal(platformOf("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)"), "ios");
  assert.equal(platformOf(ANDROID), "android");
  assert.equal(platformOf(DESKTOP), "web");
  assert.equal(platformOf(undefined), "web");
});

test("iOS goes to the App Store with ct (and pt when configured)", async () => {
  const res = onRequest(req("/go/us-stocks?c=threads-tw-20261118", IPHONE));
  assert.equal(res.status, 302);
  assert.equal(res.headers.get("location"), "https://apps.apple.com/app/id6768116546?ct=threads-tw-20261118&mt=8");
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(res.headers.get("vary"), "User-Agent");
  assert.equal(targetFor("options", "ios", "x-1", "123456"), "https://apps.apple.com/app/id6768116720?pt=123456&ct=x-1&mt=8");
});

test("Android goes to Play with an encoded utm referrer", () => {
  const loc = new URL(onRequest(req("/go/tw-stocks?c=threads-tw-20261118", ANDROID)).headers.get("location"));
  assert.equal(loc.origin + loc.pathname, "https://play.google.com/store/apps/details");
  assert.equal(loc.searchParams.get("id"), "com.dappgo.twstocksapp");
  assert.deepEqual(Object.fromEntries(new URLSearchParams(loc.searchParams.get("referrer"))), { utm_source: "threads", utm_medium: "social", utm_campaign: "threads-tw-20261118" });
});

test("desktop goes to the app page with utm, no campaign means direct", () => {
  assert.equal(onRequest(req("/go/number-rpg?c=x-post-1", DESKTOP)).headers.get("location"), "https://dappgo.com/number-rpg/?utm_source=x&utm_medium=social&utm_campaign=x-post-1");
  assert.equal(onRequest(req("/go/options", DESKTOP)).headers.get("location"), "https://dappgo.com/options/?utm_source=direct&utm_medium=link&utm_campaign=direct");
});

test("only allowlisted apps; unknown slugs go home; other methods refused", () => {
  assert.deepEqual(Object.keys(APPS).sort(), ["number-rpg", "options", "tw-stocks", "us-stocks"]);
  for (const bad of ["evil", "..", "us-stocks.evil.com", "__proto__", "constructor"]) {
    assert.equal(onRequest({ request: new Request("https://news.dappgo.com/go/x", { headers: { "user-agent": IPHONE } }), params: { app: bad } }).headers.get("location"), "https://dappgo.com/");
  }
  assert.equal(onRequest(req("/go/us-stocks", IPHONE, "POST")).status, 405);
  assert.equal(onRequest(req("/go/us-stocks", IPHONE, "HEAD")).status, 302);
});

test("the location never carries raw input", () => {
  const loc = onRequest(req("/go/us-stocks?c=%0d%0aSet-Cookie:%20a=b", DESKTOP)).headers.get("location");
  assert.ok(!/[\r\n]/.test(loc));
  assert.ok(new URL(loc).searchParams.get("utm_campaign").match(/^[a-z0-9-]+$/));
});
