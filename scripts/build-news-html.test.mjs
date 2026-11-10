import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { buildNewsHtml, GENERATED, marketNews, normalizeSymbol, renderNewsPage, renderSitemap } from "./build-news-html.mjs";
import { GATEWAY, load } from "./lib/market-data.mjs";
import { replaceRegion } from "./lib/home-html.mjs";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const templates = Object.fromEntries(["us", "tw"].map((market) => [market, fs.readFileSync(path.join(root, "news", market, "index.html"), "utf8")]));
const story = (id, published_at_utc = "2026-11-09T12:00:00Z", extra = {}) => ({
  title: `Headline ${id}`, source: "Publisher", url: `https://publisher.test/${id}`, published_at_utc, ...extra
});
const company = (prefix, count, name = prefix) => ({ name, news: Array.from({ length: count }, (_, i) => story(`${prefix}-${i}`, `2026-11-0${9 - i}T12:00:00Z`)) });
const source = (ticker_data) => ({
  pointer: { report_date: "2026-11-09", generated_at_utc: "2026-11-09T13:00:00Z", hash: "a".repeat(64), data_url_v2: `dashboard/data-${"a".repeat(16)}.json` },
  payload: { data_hash: "a".repeat(64), ticker_data }
});
const fixtureSources = () => ({ us: source({ AAPL: company("apple", 3, "Apple"), MSFT: company("msft", 2, "Microsoft") }), tw: source({ "2330": company("tsmc", 3, "台積電"), "2412": company("cht", 2, "中華電") }) });

function fixture(t) {
  // Keep all fixture writes inside this worktree, including child-process files.
  const directory = fs.mkdtempSync(path.join(root, ".news-html-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  for (const market of ["us", "tw"]) {
    fs.mkdirSync(path.join(directory, "news", market), { recursive: true });
    fs.writeFileSync(path.join(directory, "news", market, "index.html"), templates[market]);
  }
  return directory;
}

function snapshot(directory) {
  const result = {};
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const file = path.join(current, entry.name);
      if (entry.isDirectory()) walk(file);
      else result[path.relative(directory, file)] = fs.readFileSync(file, "utf8");
    }
  }
  walk(directory);
  return result;
}

test("story filter matches pulse; newest URLs win and ties have stable symbol ordering", () => {
  const model = marketNews("us", { ticker_data: {
    MSFT: { name: "Microsoft", news: [story("shared"), story("b"), story("bad", undefined, { published_at_utc: null }), story("http", undefined, { url: "http://publisher.test/http" })] },
    AAPL: { name: "Apple", news: [story("shared"), story("older", "2026-11-08T12:00:00Z"), story("shared", "2026-11-07T12:00:00Z"), story("no-url", undefined, { url: "" })] }
  } });
  assert.deepEqual(model.stories.map((item) => item.url), ["https://publisher.test/b", "https://publisher.test/shared", "https://publisher.test/older"]);
  assert.equal(model.stories[1].symbol, "AAPL");
  assert.equal(model.companies[0].stories.length, 2, "duplicates do not inflate stock coverage");
  assert.deepEqual(marketNews("us", { ticker_data: Object.fromEntries(Object.entries({ MSFT: company("m", 3), AAPL: company("a", 3) }).reverse()) }).stockPages.map((stock) => stock.symbol), ["AAPL", "MSFT"]);
});

test("three distinct eligible stories qualify per ticker, even when URLs overlap another ticker", () => {
  const shared = [story("one"), story("two"), story("three")];
  const model = marketNews("us", { ticker_data: {
    ONE: { news: shared }, TWO: { news: [...shared, shared[0]] },
    THIN: { news: [shared[0], shared[0], shared[1], story("bad", undefined, { url: "http://publisher.test/bad" })] }
  } });
  assert.deepEqual(model.stockPages.map((stock) => stock.symbol), ["ONE", "TWO"]);
  assert.equal(model.stories.length, 3);
  assert.deepEqual(marketNews("tw", { ticker_data: { "2330": company("tsmc", 3) } }).stockPages.map((stock) => stock.symbol), ["2330"]);
});

test("symbols normalize to safe uppercase US segments and numeric TW codes", () => {
  assert.equal(normalizeSymbol("us", " nvda "), "NVDA");
  assert.equal(normalizeSymbol("us", "brk.b"), "BRK.B");
  assert.equal(normalizeSymbol("tw", "2330.tw"), "2330");
  assert.equal(normalizeSymbol("tw", " 0050 "), "0050");
  for (const value of ["", ".", "..", "../NVDA", "A/B", "A%2FB", "A?x", "A_B", "ＡＡＰＬ", "ABCDEFGHIJK"]) assert.throws(() => normalizeSymbol("us", value), /invalid stock symbol/);
  assert.throws(() => normalizeSymbol("tw", "NVDA"), /invalid stock symbol/);
  assert.throws(() => normalizeSymbol("options", "NVDA"), /Unknown market/);
  assert.throws(() => marketNews("us", { ticker_data: { nvda: {}, NVDA: {} } }), /duplicate normalized symbol/);
});

test("marker replacement and complete fixture builds are byte-idempotent", async (t) => {
  const directory = fixture(t);
  const sources = fixtureSources();
  const first = await buildNewsHtml({ root: directory, sources });
  assert.equal(first.summary.us.pages, 1);
  assert.equal(first.summary.tw.pages, 1);
  const before = snapshot(directory);
  const mtimes = Object.keys(before).map((file) => fs.statSync(path.join(directory, file)).mtimeMs);
  const second = await buildNewsHtml({ root: directory, sources });
  assert.deepEqual(second.changedPaths, []);
  assert.deepEqual(snapshot(directory), before);
  assert.deepEqual(Object.keys(before).map((file) => fs.statSync(path.join(directory, file)).mtimeMs), mtimes, "unchanged files are not rewritten");
  const landing = before["news/us/index.html"];
  assert.equal((landing.match(/dappgo:prerender:start/g) || []).length, 1);
  assert.match(landing, /<section data-stories[^>]*><!-- dappgo:prerender:start -->/);
  assert.match(landing, /data-stock-pages="AAPL"/);
  assert.match(landing, /href="\/us\/AAPL\/"/);
  assert.match(landing, /href="\/us\/\?stock=MSFT"/);
  assert.match(before["news/tw/2330/index.html"], /href="https:\/\/news\.dappgo\.com\/tw\/2330\/"/);
  assert.match(before["news/tw/2330/index.html"], /台積電 \(2330\) 新聞/);
  assert.doesNotMatch(before["news/us/AAPL/index.html"], /(?:src|href)="\.\.\//);
  assert.throws(() => replaceRegion("no markers", "dappgo:prerender", "content"), /Expected one/);
  assert.throws(() => replaceRegion("<!-- dappgo:prerender:end --><!-- dappgo:prerender:start -->", "dappgo:prerender", "content"), /Reversed/);
});

test("check mode is read-only; cleanup removes only marked indexes and empty directories", async (t) => {
  const directory = fixture(t);
  const sources = fixtureSources();
  await buildNewsHtml({ root: directory, sources });
  for (const [symbol, html] of [["OLD", GENERATED], ["MANUAL", "manual page"], ["KEEP", GENERATED]]) {
    fs.mkdirSync(path.join(directory, "news/us", symbol));
    fs.writeFileSync(path.join(directory, "news/us", symbol, "index.html"), html);
  }
  fs.writeFileSync(path.join(directory, "news/us/KEEP/notes.txt"), "manual note");
  sources.us.payload.ticker_data.AAPL.news.pop();
  const before = snapshot(directory);
  const checked = await buildNewsHtml({ root: directory, sources, check: true });
  assert.ok(checked.changedPaths.includes("news/us/AAPL/index.html"));
  assert.ok(checked.changedPaths.includes("news/us/OLD/index.html"));
  assert.deepEqual(snapshot(directory), before);
  const built = await buildNewsHtml({ root: directory, sources });
  assert.equal(built.summary.us.removed, 3);
  assert.equal(fs.existsSync(path.join(directory, "news/us/AAPL")), false);
  assert.equal(fs.existsSync(path.join(directory, "news/us/OLD")), false);
  assert.equal(fs.readFileSync(path.join(directory, "news/us/MANUAL/index.html"), "utf8"), "manual page");
  assert.equal(fs.readFileSync(path.join(directory, "news/us/KEEP/notes.txt"), "utf8"), "manual note");
  assert.equal(fs.existsSync(path.join(directory, "news/us/KEEP/index.html")), false);
});

test("unmarked collisions and invalid data fail before any generated file changes", async (t) => {
  const directory = fixture(t);
  const sources = fixtureSources();
  fs.mkdirSync(path.join(directory, "news/us/AAPL"));
  fs.writeFileSync(path.join(directory, "news/us/AAPL/index.html"), "hand maintained");
  const before = snapshot(directory);
  await assert.rejects(buildNewsHtml({ root: directory, sources }), /Refusing to overwrite unmarked/);
  assert.deepEqual(snapshot(directory), before);
  const stockFile = path.join(directory, "news/us/AAPL/index.html");
  fs.unlinkSync(stockFile);
  fs.symlinkSync("missing.html", stockFile);
  await assert.rejects(buildNewsHtml({ root: directory, sources }), /Refusing to overwrite unmarked/);
  assert.equal(fs.readlinkSync(stockFile), "missing.html", "dangling symlinks are not overwritten");
  fs.unlinkSync(stockFile);
  fs.writeFileSync(stockFile, "hand maintained");
  sources.tw.payload.ticker_data["../bad"] = {};
  await assert.rejects(buildNewsHtml({ root: directory, sources }), /invalid stock symbol/);
  assert.deepEqual(snapshot(directory), before);
});

test("sitemap keeps the landings and contact, lists only qualified stocks, and uses newest story dates", () => {
  const sources = fixtureSources();
  const xml = renderSitemap(["us", "tw"].map((market) => marketNews(market, sources[market].payload)));
  assert.equal((xml.match(/<loc>/g) || []).length, 5);
  for (const route of ["us/", "tw/", "contact/", "us/AAPL/", "tw/2330/"]) assert.ok(xml.includes(`<loc>https://news.dappgo.com/${route}</loc>`));
  assert.doesNotMatch(xml, /MSFT|2412|\?stock=/);
  assert.equal((xml.match(/<lastmod>2026-11-09<\/lastmod>/g) || []).length, 2);
});

test("an I/O failure rolls back replaced pages and removes newly created directories", async (t) => {
  const directory = fixture(t);
  const before = snapshot(directory);
  const rename = fs.renameSync;
  let failed = false;
  t.mock.method(fs, "renameSync", (from, to) => {
    if (!failed && to === path.join(directory, "news/tw/2330/index.html")) {
      failed = true;
      throw new Error("Simulated rename failure");
    }
    return rename(from, to);
  });
  await assert.rejects(buildNewsHtml({ root: directory, sources: fixtureSources() }), /Simulated rename failure/);
  assert.equal(failed, true);
  assert.deepEqual(snapshot(directory), before);
  assert.deepEqual(fs.readdirSync(path.join(directory, "news/us")), ["index.html"]);
  assert.deepEqual(fs.readdirSync(path.join(directory, "news/tw")), ["index.html"]);
  assert.deepEqual(fs.readdirSync(directory), ["news"], "staging files are cleaned up");
});

test("headlines, translations, companies, sources and URLs are escaped in HTML and JSON-LD", () => {
  const hostile = '<script>"bad" & \'quoted\'</script>';
  const sources = source({ AAPL: company("a", 3, hostile) });
  sources.payload.ticker_data.AAPL.news[0] = story("x", undefined, { title: hostile, title_en: "Translated & title", source: hostile, url: 'https://publisher.test/?x="&y=<script>', summary: "DO_NOT_RENDER_SUMMARY", score: "DO_NOT_RENDER_SCORE", image_url: "DO_NOT_RENDER_IMAGE" });
  const model = marketNews("us", sources.payload);
  const html = renderNewsPage(templates.us, model, sources.pointer, model.stockPages[0]);
  const block = html.match(/<!-- dappgo:prerender:start -->([\s\S]*?)<!-- dappgo:prerender:end -->/)[1];
  assert.match(block, /&lt;script&gt;&quot;bad&quot; &amp; &#39;quoted&#39;&lt;\/script&gt; \(Translated &amp; title\)/);
  assert.match(block, /href="https:\/\/publisher\.test\/\?x=&quot;&amp;y=&lt;script&gt;"/);
  assert.doesNotMatch(block, /<script|<img|DO_NOT_RENDER/);
  assert.doesNotMatch(html, /DO_NOT_RENDER/);
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  assert.doesNotMatch(json, /<script|<\/script/);
  const parsed = JSON.parse(json);
  assert.equal(parsed.mainEntity.itemListElement.find((item) => item.item.url.includes("?x=")).item.headline, `${hostile} (Translated & title)`);
});

test("landings render exactly the newest 30 stories and 10 most-covered companies", () => {
  const ticker_data = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`S${i}`, company(`s${i}`, 3)]));
  const sources = source(ticker_data);
  const model = marketNews("us", sources.payload);
  const html = renderNewsPage(templates.us, model, sources.pointer);
  const block = html.match(/<!-- dappgo:prerender:start -->([\s\S]*?)<!-- dappgo:prerender:end -->/)[1];
  const lists = [...block.matchAll(/<ul>([\s\S]*?)<\/ul>/g)];
  assert.equal((lists[0][1].match(/<li>/g) || []).length, 30);
  assert.equal((lists[1][1].match(/<li>/g) || []).length, 10);
  assert.match(html, /2026-11-09 report: 36 published stories/);
  assert.equal(renderNewsPage(html, model, sources.pointer), html);
});

test("shared loader uses only the exact pointer/immutable URLs and rejects unsafe paths, HTTP errors and mismatched hashes", async (t) => {
  const sources = fixtureSources().us;
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push(url);
    assert.equal(options.headers.accept, "application/json");
    return { ok: true, json: async () => url.endsWith("latest.json") ? sources.pointer : sources.payload };
  });
  assert.deepEqual(await load("us"), sources);
  assert.deepEqual(calls, [`${GATEWAY}/us/dashboard/latest.json`, `${GATEWAY}/us/${sources.pointer.data_url_v2}`]);
  for (const data_url_v2 of ["https://publisher.test/file", "dashboard/latest.json", "dashboard/../data-aaaaaaaaaaaa.json", "dashboard/data-ABCDEF123456.json"]) {
    globalThis.fetch.mock.mockImplementation(async () => ({ ok: true, json: async () => ({ ...sources.pointer, data_url_v2 }) }));
    await assert.rejects(load("us"), /immutable data_url_v2/);
  }
  globalThis.fetch.mock.mockImplementation(async (url) => ({ ok: true, json: async () => url.endsWith("latest.json") ? sources.pointer : { data_hash: "wrong" } }));
  await assert.rejects(load("us"), /does not match/);
  globalThis.fetch.mock.mockImplementation(async () => ({ ok: false, status: 503 }));
  await assert.rejects(load("us"), /returned 503/);
});

test("a failed market load leaves both landings, stock pages and sitemap unchanged", async (t) => {
  const directory = fixture(t);
  const sources = fixtureSources();
  await buildNewsHtml({ root: directory, sources });
  const before = snapshot(directory);
  t.mock.method(globalThis, "fetch", async (url) => ({
    ok: true, json: async () => url.endsWith("latest.json") ? sources.us.pointer : url.includes("/tw/") ? { data_hash: "mismatch" } : sources.us.payload
  }));
  await assert.rejects(buildNewsHtml({ root: directory }), /tw: payload data_hash does not match/);
  assert.deepEqual(snapshot(directory), before);
});

test("CLI check exits 1 with differing paths only, then 0 silently after fixture rebuild; repeat builds are no-ops", (t) => {
  const directory = fixture(t);
  for (const name of ["scripts/build-news-html.mjs", "scripts/lib/home-html.mjs", "scripts/lib/market-data.mjs", "scripts/lib/store-links.mjs", "assets/home/home.js", "assets/store-links.js"]) {
    const file = path.join(directory, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.copyFileSync(path.join(root, name), file);
  }
  const responses = {};
  for (const [market, sources] of Object.entries(fixtureSources())) {
    responses[`${GATEWAY}/${market}/dashboard/latest.json`] = sources.pointer;
    responses[`${GATEWAY}/${market}/${sources.pointer.data_url_v2}`] = sources.payload;
  }
  fs.writeFileSync(path.join(directory, "responses.json"), JSON.stringify(responses));
  fs.writeFileSync(path.join(directory, "mock-fetch.mjs"), `import fs from "node:fs";
const responses = JSON.parse(fs.readFileSync(new URL("./responses.json", import.meta.url), "utf8"));
globalThis.fetch = async (url) => {
  if (!responses[url]) throw new Error("Unexpected network request: " + url);
  return { ok: true, json: async () => responses[url] };
};`);
  const run = (...args) => spawnSync(process.execPath, ["--import", "./mock-fetch.mjs", "scripts/build-news-html.mjs", ...args], { cwd: directory, encoding: "utf8" });
  const before = snapshot(directory);
  const failed = run("--check");
  assert.equal(failed.status, 1, failed.stderr);
  assert.equal(failed.stderr, "");
  for (const line of failed.stdout.trim().split("\n")) assert.match(line, /^news\/(?:us|tw|sitemap\.xml)(?:\/.*)?$/);
  assert.deepEqual(snapshot(directory), before);
  const stamp = path.join(directory, "news-generated-at-utc");
  const built = run("--generated-at-file", stamp);
  assert.equal(built.status, 0, built.stderr);
  assert.equal(fs.readFileSync(stamp, "utf8"), "2026-11-09T13:00:00Z\n");
  const readOnly = run("--check", "--generated-at-file", stamp);
  assert.equal(readOnly.status, 1);
  assert.match(readOnly.stderr, /cannot be used with --check/);
  assert.equal(fs.readFileSync(stamp, "utf8"), "2026-11-09T13:00:00Z\n");
  const passed = run("--check");
  assert.equal(passed.status, 0, passed.stderr);
  assert.equal(passed.stdout, "");
  const again = run();
  assert.equal(again.status, 0, again.stderr);
  assert.match(again.stdout, /us 0 pages written \/ 0 removed.*tw 0 pages written \/ 0 removed.*0 files changed/);
});
