// Contract for the reading pages: report archive, guides, about and policy pages.
// Run: node --test scripts/content-pages.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { root, MARKETS, loadRecords, renderAll, applySitemap } from "./build-content.mjs";
import { extract } from "./lib/report-extract.mjs";
import { renderDay, timing } from "./lib/report-render.mjs";
import { PAGES } from "./lib/guides-content.mjs";

const records = loadRecords();
const { pages, sitemapBlock } = renderAll(records);
const rel = (file) => path.relative(root, file).split(path.sep).join("/");
const urlOf = (file) => "/" + rel(file).replace(/index\.html$/, "");
const mainText = (html) => html.slice(html.indexOf("<main"), html.indexOf("</main>")).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const ADS = /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/;

test("committed pages and the sitemap block match the generator", () => {
  for (const [file, html] of pages) assert.equal(fs.readFileSync(file, "utf8"), html, `${rel(file)} is stale; run node scripts/build-content.mjs`);
  const xml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  assert.equal(applySitemap(xml, sitemapBlock), xml);
  for (const file of pages.keys()) assert.ok(xml.includes(`<loc>https://dappgo.com${urlOf(file)}</loc>`), `${urlOf(file)} missing from sitemap`);
});

test("every page has one h1, a canonical, both hreflang alternates, breadcrumbs and no broken values", () => {
  for (const [file, html] of pages) {
    const url = urlOf(file);
    const zh = url.startsWith("/zh/");
    assert.equal((html.match(/<h1\b/g) || []).length, 1, url);
    assert.ok(html.includes(`<html lang="${zh ? "zh-Hant" : "en"}">`), url);
    assert.ok(html.includes(`<link rel="canonical" href="https://dappgo.com${url}" />`), url);
    const en = zh ? url.slice(3) : url;
    assert.ok(html.includes(`hreflang="en" href="https://dappgo.com${en}"`) && html.includes(`hreflang="zh-Hant" href="https://dappgo.com/zh${en}"`), url);
    assert.ok(pages.has(path.join(root, (zh ? en : `/zh${en}`).slice(1), "index.html")), `${url} has no counterpart in the other language`);
    assert.match(html, /"@type":"BreadcrumbList"/, url);
    assert.match(html, /<nav class="crumbs"/, url);
    assert.doesNotMatch(mainText(html), /NaN|undefined|\bnull\b|\$\{|\[object|Infinity/, url);
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.ok(description.length >= (zh ? 30 : 50) && description.length <= 320, `${url} description length ${description.length}`);
  }
});

test("titles and descriptions are unique within a language", () => {
  for (const zh of [false, true]) {
    const titles = new Map();
    for (const [file, html] of pages) {
      if (urlOf(file).startsWith("/zh/") !== zh) continue;
      const title = html.match(/<title>([^<]*)<\/title>/)[1];
      assert.ok(!titles.has(title), `${urlOf(file)} repeats the title of ${titles.get(title)}`);
      titles.set(title, urlOf(file));
    }
  }
});

test("internal links resolve to a page in the repository", () => {
  const known = new Set([...pages.keys()].map(urlOf));
  for (const [file, html] of pages) {
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)[^"]*"/g)) {
      if (known.has(href)) continue;
      const target = href.endsWith("/") ? path.join(root, href.slice(1), "index.html") : path.join(root, `${href.slice(1)}.html`);
      assert.ok(fs.existsSync(target), `${urlOf(file)} links to missing ${href}`);
    }
  }
});

test("the ad loader is on daily reports and guides only", () => {
  for (const [file, html] of pages) {
    const url = urlOf(file).replace(/^\/zh/, "");
    const article = /^\/reports\/(us|tw|options)\/\d{4}-\d{2}-\d{2}\/$/.test(url) || (/^\/guides\/[a-z-]+\/$/.test(url));
    assert.equal(ADS.test(html), article, `${urlOf(file)} ad loader`);
    assert.equal((html.match(/<script[^>]+adsbygoogle\.js/g) || []).length, article ? 1 : 0, url);
    assert.doesNotMatch(html, /<ins[^>]+adsbygoogle/, url);
  }
  for (const page of ["privacy.html", "terms.html", "support.html", "us-stocks/index.html", "zh/us-stocks/index.html", "tw-stocks/index.html", "options/index.html", "number-rpg/index.html"]) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, page), "utf8"), ADS, `${page} must stay ad-free`);
  }
});

test("each session page prints the figures of its own record and its identity", () => {
  for (const market of MARKETS) {
    assert.ok(records[market].length >= 20, `${market} archive has ${records[market].length} sessions`);
    for (const record of records[market]) {
      for (const lang of ["en", "zh"]) {
        const html = pages.get(path.join(root, lang === "zh" ? "zh" : "", "reports", market, record.session_date, "index.html"));
        const text = mainText(html);
        assert.ok(text.includes(record.data_hash.slice(0, 12)), `${market} ${record.session_date} hash`);
        assert.ok(text.includes(record.generated_at_utc.replace("T", " ").slice(0, 16)), `${market} ${record.session_date} time`);
        if (market === "options") assert.ok(text.includes(String(record.setups.rows)));
        else {
          assert.ok(text.includes(`${record.breadth.advancers} / ${record.breadth.decliners}`));
          for (const t of record.tickers) assert.ok(html.includes(`<th scope="row">${t.s}</th>`), `${market} ${record.session_date} is missing ${t.s}`);
        }
      }
    }
  }
});

test("a revision generated before the close is labelled as such, and one after it is not", () => {
  const us = { market: "us", session_date: "2026-11-17", generated_at_utc: "2026-11-17T19:20:19Z" };
  assert.equal(timing(us).after, false);
  assert.equal(timing({ ...us, generated_at_utc: "2026-11-17T21:05:00Z" }).after, true);
  assert.equal(timing({ market: "tw", session_date: "2026-11-17", generated_at_utc: "2026-11-18T01:17:24Z" }).after, true);
  assert.equal(timing({ market: "tw", session_date: "2026-11-17", generated_at_utc: "2026-11-17T03:00:00Z" }).after, false);
  const intraday = records.us.find((r) => !timing(r).after);
  if (intraday) assert.match(renderDay("en", intraday, null, null), /before the session's 16:00 close/);
});

test("extraction counts only what the payload contains and refuses mixed or undated payloads", () => {
  const bar = (date, close) => ({ date, close });
  const ticker = (close, ma20, d1, date = "2026-11-17") => ({ name: "X", sector: "Tech", price_changes: { "1d_pct": d1 }, indicators: { latest_close: close, ma_20: ma20, rsi_14: 50 }, price_history: [bar(date, close)] });
  const payload = { last_updated: "2026-11-17", generated_at_utc: "2026-11-17T19:00:00Z", data_hash: "a".repeat(64), ticker_data: { A: ticker(10, 9, 1), B: ticker(10, 11, -1), C: ticker(10, 11, 0) }, market_regime: { regime: "mixed" }, sector_rotation: {} };
  const record = extract("us", payload);
  assert.equal(record.session_date, "2026-11-17");
  assert.deepEqual([record.breadth.advancers, record.breadth.decliners, record.breadth.unchanged, record.breadth.above_ma20, record.breadth.with_ma200], [1, 1, 1, 1, 0]);
  assert.equal(record.tickers[0].ma200, null);
  payload.ticker_data.B = ticker(10, 11, -1, "2026-11-16");
  assert.equal(extract("us", payload), null, "tickers on different sessions");
  assert.equal(extract("us", { ...payload, ticker_data: { A: { ...ticker(10, 9, 1), price_history: [] } } }), null, "no dated bars");
  const options = { generated_at_utc: "2026-11-15T15:00:00Z", data_hash: "b".repeat(64), live_prices: [{ symbol: "A", price: 1, change_pct: 0 }], strike_comparison: [] };
  assert.equal(extract("options", options), null, "weekend options payload");
  assert.equal(extract("options", { ...options, generated_at_utc: "2026-11-06T02:13:07Z" }).session_date, "2026-11-05");
});

test("guides and policy pages exist in both languages with substantial text", () => {
  for (const page of PAGES) {
    for (const lang of ["en", "zh"]) {
      const html = pages.get(path.join(root, lang === "zh" ? "zh" : "", page.path.slice(1), "index.html"));
      const text = mainText(html);
      const size = lang === "zh" ? (text.match(/[一-鿿]/g) || []).length : text.split(" ").length;
      if (!page.hub && page.path !== "/contact/") assert.ok(size >= (lang === "zh" ? 500 : 350), `${page.path} ${lang} has ${size} words/characters`);
    }
  }
});
