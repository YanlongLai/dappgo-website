// Contract for the app landing pages and the shared store-link helper.
// Run: node --test scripts/landing-pages.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
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
