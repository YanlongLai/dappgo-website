// Contract for the app landing pages and the shared store-link helper.
// Run: node --test scripts/landing-pages.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { APPS } from "./lib/landing-content.mjs";
import { StoreLinks } from "./lib/store-links.mjs";
import { root, pageFile, pagePath, renderAll } from "./build-landing-pages.mjs";

const read = (file) => fs.readFileSync(file, "utf8");
const hrefs = (html) => [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
const storeHrefs = (html) => hrefs(html).filter((h) => /^https:\/\/(apps\.apple\.com|play\.google\.com)\//.test(h));

test("store-link helper builds the documented URLs and omits pt while the token is empty", () => {
  assert.equal(StoreLinks.APPLE_PROVIDER_TOKEN, "", "token is unknown until the Owner supplies it");
  assert.equal(StoreLinks.appStoreUrl("tw-stocks", "tw", "hero"), "https://apps.apple.com/app/id6768116538?ct=web-tw-hero&mt=8");
  assert.equal(StoreLinks.playUrl("tw-stocks", "tw", "hero"), "https://play.google.com/store/apps/details?id=com.dappgo.twstocksapp&referrer=utm_source%3Dweb%26utm_medium%3Dtw-hero");
  assert.equal(StoreLinks.campaign("home", "hero"), "web-home-hero");
  assert.throws(() => StoreLinks.campaign("x".repeat(40), "hero"), /40 characters/);
});

test("source aliases and campaign slugs are bounded and reject hostile values", () => {
  for (const [raw, expected] of [
    [" web ", "web"], ["WEBAPP", "webapp"], [" Facebook ", "fb"], ["meta", "fb"], ["IG", "ig"],
    ["threads", "threads"], ["linkedin", "li"], ["t.co", "x"], ["Twitter", "x"], ["youtube", "yt"], ["app", "app"]
  ]) assert.equal(StoreLinks.normalizeSource(raw), expected, raw);
  for (const raw of ["", "unknown", '"><script>', "web&x=1", "x".repeat(100), null, undefined]) assert.equal(StoreLinks.normalizeSource(raw), null, raw);
  assert.equal(StoreLinks.normalizeCampaign("  Spring Launch! 2026  "), "spring-launch-2026");
  assert.equal(StoreLinks.normalizeCampaign("!!!"), null);
  assert.equal(StoreLinks.normalizeCampaign("a".repeat(100)), "a".repeat(40));
  assert.match(StoreLinks.normalizeCampaign("A/B C") || "", /^[a-z0-9-]+$/);
});

test("withSource rewrites generated App Store and Play URLs without changing their destination", () => {
  const ios = StoreLinks.appStoreUrl("tw-stocks", "zh-tw-stocks", "hero");
  const play = StoreLinks.playUrl("tw-stocks", "zh-tw-stocks", "hero");
  const iosFacebook = "https://apps.apple.com/app/id6768116538?ct=fb-zh-tw-stocks-hero&mt=8";
  const playThreads = "https://play.google.com/store/apps/details?id=com.dappgo.twstocksapp&referrer=utm_source%3Dthreads%26utm_medium%3Dzh-tw-stocks-hero";
  const playCampaign = "https://play.google.com/store/apps/details?id=com.dappgo.twstocksapp&referrer=utm_source%3Dfb%26utm_medium%3Dzh-tw-stocks-hero%26utm_campaign%3Dspring-launch";
  assert.equal(StoreLinks.withSource(ios, " Facebook "), iosFacebook);
  assert.equal(StoreLinks.withSource(play, "threads"), playThreads);
  assert.equal(StoreLinks.withSource(play, "facebook", "Spring Launch!"), playCampaign);
  assert.equal(StoreLinks.withSource(ios, "web", "ignored"), ios);
  assert.equal(StoreLinks.withSource(play, "unknown", "ignored"), play);
  assert.equal(StoreLinks.withSource("https://apps.apple.com/app/id6768116538", "fb"), "https://apps.apple.com/app/id6768116538");
  assert.equal(StoreLinks.withSource("https://example.com/download?ct=web-zh-tw-stocks-hero", "fb"), "https://example.com/download?ct=web-zh-tw-stocks-hero");

  const once = StoreLinks.withSource(play, "threads", "Spring Launch!");
  assert.equal(StoreLinks.withSource(once, "threads", "Spring Launch!"), once, "same source is idempotent");
  assert.equal(StoreLinks.withSource(once, "ig", "Another Campaign"), "https://play.google.com/store/apps/details?id=com.dappgo.twstocksapp&referrer=utm_source%3Dig%26utm_medium%3Dzh-tw-stocks-hero%26utm_campaign%3Danother-campaign");

  const tooLong = `https://apps.apple.com/app/id6768116538?ct=web-${"a".repeat(35)}-hero&mt=8`;
  assert.equal(StoreLinks.withSource(tooLong, "fb"), tooLong, "App Store ct stays unchanged when it would exceed 40 characters");
});

test("browser wiring persists attribution, rewrites anchors, and tolerates blocked storage", () => {
  const source = read(path.join(root, "assets/store-links.js"));
  const ios = StoreLinks.appStoreUrl("tw-stocks", "zh-tw-stocks", "hero");
  const play = StoreLinks.playUrl("tw-stocks", "zh-tw-stocks", "hero");
  const storage = {
    data: {},
    getItem(key) { return this.data[key] ?? null; },
    setItem(key, value) { this.data[key] = value; }
  };
  const run = (search, sessionStorage, hrefs) => {
    const anchors = hrefs.map((href) => ({ href }));
    const document = { readyState: "complete", querySelectorAll() { return anchors; } };
    const context = { document, location: { search }, sessionStorage, URL, URLSearchParams, console };
    vm.runInNewContext(source, context);
    return { anchors, api: context.DappGoStoreLinks };
  };

  const first = run("?UTM_SOURCE=%20Facebook%20&utm_campaign=Spring%20Launch!", storage, [ios, play]);
  assert.deepEqual(JSON.parse(storage.data[StoreLinks.ATTRIBUTION_KEY]), { source: "fb", campaign: "spring-launch" });
  assert.equal(first.anchors[0].href, StoreLinks.withSource(ios, "fb", "spring-launch"));
  assert.equal(first.anchors[1].href, StoreLinks.withSource(play, "fb", "spring-launch"));
  first.api.wireBrowser();
  assert.equal(first.anchors[0].href, StoreLinks.withSource(ios, "fb", "spring-launch"), "running wiring twice is idempotent");

  const next = run("", storage, [ios, play]);
  assert.equal(next.anchors[0].href, StoreLinks.withSource(ios, "fb", "spring-launch"), "stored source survives navigation");
  assert.equal(next.anchors[1].href, StoreLinks.withSource(play, "fb", "spring-launch"));

  const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  assert.doesNotThrow(() => run("?utm_source=threads", blocked, [ios, play]));
  const noStorage = run("?utm_source=threads", blocked, [ios, play]);
  assert.equal(noStorage.anchors[0].href, StoreLinks.withSource(ios, "threads"));
  assert.equal(noStorage.anchors[1].href, StoreLinks.withSource(play, "threads"));
});

test("six landing pages exist, are current, and carry both store links with campaign parameters", () => {
  for (const [file, html] of renderAll()) assert.equal(read(file), html, `${path.relative(root, file)} out of date`);
  for (const app of Object.values(APPS)) for (const lang of ["en", "zh"]) {
    const html = read(pageFile(app, lang));
    const page = lang === "zh" ? `zh-${app.page}` : app.page;
    const stores = storeHrefs(html);
    for (const position of ["hero", "footer"]) {
      assert.ok(stores.includes(StoreLinks.appStoreUrl(app.store, page, position)), `${app.slug}/${lang} App Store ${position}`);
      assert.ok(stores.includes(StoreLinks.playUrl(app.store, page, position)), `${app.slug}/${lang} Play ${position}`);
    }
    for (const href of stores) assert.ok(StoreLinks.identify(href)?.app === app.store, `${href} points at another app`);
    assert.match(html, new RegExp(`<meta name="apple-itunes-app" content="app-id=${app.appId}, app-argument=https://dappgo.com${pagePath(app, lang)}" />`));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://dappgo.com${pagePath(app, lang)}" />`));
    assert.ok(html.includes(app.web), "web app link");
    assert.match(html, /not personalized investment advice|不構成個人投資建議/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test("hreflang is reciprocal, titles and descriptions are unique, and the sitemap lists every page", () => {
  const sitemap = read(path.join(root, "sitemap.xml"));
  const titles = new Set();
  const descriptions = new Set();
  for (const app of Object.values(APPS)) {
    const en = read(pageFile(app, "en"));
    const zh = read(pageFile(app, "zh"));
    for (const html of [en, zh]) {
      assert.ok(html.includes(`<link rel="alternate" hreflang="en" href="https://dappgo.com${pagePath(app, "en")}" />`));
      assert.ok(html.includes(`<link rel="alternate" hreflang="zh-Hant" href="https://dappgo.com${pagePath(app, "zh")}" />`));
      titles.add(html.match(/<title>([^<]+)<\/title>/)[1]);
      descriptions.add(html.match(/<meta name="description" content="([^"]+)"/)[1]);
      assert.match(html, /<meta property="og:title"/);
      assert.match(html, /<meta property="og:image" content="https:\/\/dappgo\.com\/og-/);
    }
    for (const lang of ["en", "zh"]) assert.ok(sitemap.includes(`<loc>https://dappgo.com${pagePath(app, lang)}</loc>`), `${app.slug}/${lang} missing from sitemap`);
  }
  assert.equal(titles.size, 6);
  assert.equal(descriptions.size, 6);
});

test("every store link on the site is generated: tracked, and never hand-typed", () => {
  const pages = ["index.html", "zh/index.html", ...Object.values(APPS).flatMap((a) => ["en", "zh"].map((l) => path.relative(root, pageFile(a, l))))];
  for (const rel of pages) {
    const html = read(path.join(root, rel));
    for (const href of storeHrefs(html)) {
      const hit = StoreLinks.identify(href);
      assert.ok(hit, `${rel}: unknown store link ${href}`);
      const m = href.match(/utm_medium%3D([\w-]+)$/)?.[1] ?? href.match(/ct=web-([\w-]+)&mt=8$/)?.[1];
      assert.ok(m, `${rel}: untracked store link ${href}`);
      const position = m.split("-").slice(-1)[0];
      const page = m.split("-").slice(0, -1).join("-");
      assert.equal(StoreLinks.storeUrl(hit.os, hit.app, page, position), href, `${rel}: ${href} is not helper output`);
    }
  }
});

test("home heroes link to the three app pages in both languages (store badges are on those pages)", () => {
  for (const [file, prefix] of [["index.html", ""], ["zh/index.html", "/zh"]]) {
    const html = read(path.join(root, file));
    const hero = html.slice(html.indexOf('<section class="hero"'), html.indexOf("</section>", html.indexOf('<section class="hero"')));
    for (const slug of ["tw-stocks", "us-stocks", "options"]) assert.ok(hero.includes(`href="${prefix}/${slug}/"`), `${file} hero → ${slug}`);
  }
});
