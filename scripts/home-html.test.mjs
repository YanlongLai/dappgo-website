import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root, translateHome, writeOrCheck } from "./build-zh-home.mjs";
import { I18N, esc, renderPulseHtml, appStructuredData, createPulseRenderer } from "./lib/home-html.mjs";

const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const en = read("index.html");
const zh = read("zh/index.html");
const pulse = JSON.parse(read("data/pulse.json"));
const catalog = JSON.parse(read("config/product-catalog.json"));

test("committed homepages exactly match their source, dictionary and pulse", () => {
  assert.equal(renderPulseHtml(en, pulse, "en", catalog), en);
  assert.equal(translateHome(en, pulse, catalog), zh);
  assert.equal(translateHome(en, pulse, catalog), translateHome(en, pulse, catalog), "no wall-clock output");
  assert.doesNotMatch(zh, /(?:href|src)="(?:assets|data)\//);
  assert.doesNotMatch(en + zh, /Today’s report needs JavaScript|card skeleton/);
});

test("pulse data changes invalidate the snapshot and check mode rejects stale output", () => {
  const changed = structuredClone(pulse);
  changed.markets.tw.coverage.covered++;
  changed.news[0].title.en = "Changed upstream headline";
  assert.notEqual(renderPulseHtml(en, changed, "en", catalog), en);
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "home-html-test-"));
  try {
    const file = path.join(directory, "index.html");
    fs.writeFileSync(file, en);
    assert.throws(() => writeOrCheck(file, renderPulseHtml(en, changed, "en", catalog), true), /out of date/);
    assert.equal(fs.readFileSync(file, "utf8"), en, "check never writes");
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});

test("dictionary and English source changes invalidate Chinese output", () => {
  assert.notEqual(translateHome(en.replace('id="main"', 'id="main" data-source-change'), pulse, catalog), zh);
  const previous = I18N.zh.heroA;
  try {
    I18N.zh.heroA = "Changed translation";
    assert.notEqual(translateHome(en, pulse, catalog), zh);
    delete I18N.zh.heroA;
    assert.throws(() => translateHome(en, pulse, catalog), /Missing zh translation/);
  } finally { I18N.zh.heroA = previous; }
});

test("both snapshots expose dated coverage, names, returns, options and every source link", () => {
  for (const html of [en, zh]) {
    for (const [key, m] of Object.entries(pulse.markets)) {
      assert.ok(html.includes(m.report_date));
      assert.ok(html.includes(`${m.coverage.covered}/${m.coverage.expected}`));
      for (const row of [...m.gainers.slice(0, 3), ...m.losers.slice(0, 3)]) {
        assert.ok(html.includes(`<span>${esc(row.symbol)}</span>`));
        assert.ok(html.includes(`<small>${esc(row.name)}</small>`));
        assert.ok(html.includes(`${row.return_pct > 0 ? "+" : ""}${row.return_pct.toFixed(2)}%`));
      }
      if (key !== "options") assert.ok(html.includes(esc(m.one_liner[html === en ? "en" : "zh"])));
    }
    for (const idea of pulse.markets.options.ideas) {
      assert.ok(html.includes(esc(idea.expiry)));
      assert.ok(html.includes(`$${idea.strike}`));
      assert.ok(html.includes(`<span class="score">${idea.score}</span>`));
    }
    for (const story of pulse.news) assert.ok(html.includes(`href="${esc(story.url)}"`));
  }
});

test("Taiwan wire labels use pulse company names in both languages and escape upstream text", () => {
  for (const lang of ["en", "zh"]) {
    const renderer = createPulseRenderer(pulse, lang, {});
    const wire = renderer.wireItems("tw");
    for (const n of pulse.news.filter((n) => n.market === "tw" && !n.image)) {
      assert.ok(wire.includes(`<b>${esc(n.name)} ${n.symbol}</b>`));
    }
    const changed = structuredClone(pulse);
    const story = changed.news.find((n) => n.market === "tw");
    story.name = '<script>"Company"</script>';
    assert.ok(createPulseRenderer(changed, lang, {}).wireItems("tw").includes(esc(story.name)));
    assert.doesNotMatch(createPulseRenderer(changed, lang, {}).wireItems("tw"), /<script>/);
  }
});

test("JSON-LD comes only from live catalog apps and contains no inferred offers or ratings", () => {
  const graph = appStructuredData(catalog)["@graph"];
  assert.equal(graph.length, catalog.products.filter((p) => Object.values(p.stores).some((s) => s.status === "live")).length);
  for (const app of graph) {
    const product = catalog.products.find((p) => p.name === app.name);
    const stores = Object.entries(product.stores).filter(([, s]) => s.status === "live");
    assert.deepEqual(app.installUrl, stores.map(([, s]) => s.url));
    assert.deepEqual(app.operatingSystem, stores.map(([os]) => ({ ios: "iOS", android: "Android" })[os]));
    assert.deepEqual(Object.keys(app).sort(), ["@type", "name", "url", "operatingSystem", "installUrl"].sort());
  }
  for (const html of [en, zh]) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
    assert.ok(blocks.some((block) => block["@type"] === "Organization"));
    assert.deepEqual(blocks.find((block) => block["@graph"])["@graph"], graph);
  }
});

test("pulse workflow includes both generated pages in no-op and commit paths", () => {
  const workflow = read(".gitea/workflows/pulse.yml");
  assert.match(workflow, /git diff --quiet HEAD -- data\/pulse.json index.html zh\/index.html news\//);
  assert.match(workflow, /git commit[^\n]+-- data\/pulse.json index.html zh\/index.html news\//);
  assert.match(workflow, /node scripts\/verify-pulse\.mjs\s+node scripts\/build-news-html\.mjs --generated-at-file "\$work\/news-generated-at-utc"\s+git add -- news\//);
  assert.match(workflow, /for attempt in 1 2 3/);
  assert.match(workflow, /if \[ -z "\$\{PUSH_TOKEN:-\}" \]/);
});

test("canonical pulse build refreshes both pages and repairs HTML even on an unchanged-data run", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pulse-build-test-"));
  try {
    for (const name of ["index.html", "assets/home/home.js", "assets/home/home.css", "config/product-catalog.json", "data/pulse.json",
      "scripts/build-pulse.mjs", "scripts/build-zh-home.mjs", "scripts/render-pulse-html.mjs", "scripts/lib/home-html.mjs", "scripts/lib/market-data.mjs", "scripts/lib/store-links.mjs", "assets/store-links.js"]) {
      const file = path.join(directory, name);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.copyFileSync(path.join(root, name), file);
    }
    const responses = {};
    for (const [key, market] of Object.entries(pulse.markets)) {
      const base = `https://data.dappgo.com/v1/markets/${key}/`;
      const data_url_v2 = `dashboard/data-${market.data_hash.slice(0, 16)}.json`;
      responses[base + "dashboard/latest.json"] = { report_date: market.report_date, generated_at_utc: market.generated_at_utc, hash: market.data_hash, data_url_v2 };
      responses[base + data_url_v2] = {
        data_hash: market.data_hash, schema_version: market.schema_version,
        data_coverage: { covered_count: market.coverage.covered, expected_count: market.coverage.expected, status: market.coverage.status },
        report_one_liner: market.one_liner?.zh, report_one_liner_en: market.one_liner?.en,
        market_regime: { regime: market.regime, breadth_score: market.breadth_score, advance_decline_ratio: market.advance_decline_ratio },
        top_movers_5d: Object.fromEntries(["gainers", "losers"].map((side) => [side, market[side].map((r) => ({ ...r, current_close: r.close }))])),
        strike_comparison: (market.ideas || []).map((i) => ({ ...i, cp: i.score })),
        live_prices: [...market.gainers, ...market.losers].map((r) => ({ symbol: r.symbol, price: r.close, change_pct: r.return_pct })),
        ticker_metadata: Object.fromEntries([...market.gainers, ...market.losers].map((r) => [r.symbol, { name: r.name }]))
      };
    }
    fs.writeFileSync(path.join(directory, "responses.json"), JSON.stringify(responses));
    fs.writeFileSync(path.join(directory, "mock-fetch.mjs"), `import fs from "node:fs";
const responses = JSON.parse(fs.readFileSync(new URL("./responses.json", import.meta.url)));
globalThis.fetch = async (url) => {
  if (!responses[url]) throw new Error("Unexpected network request");
  return { ok: true, json: async () => responses[url] };
};`);
    const build = () => execFileSync(process.execPath, ["--import", "./mock-fetch.mjs", "scripts/build-pulse.mjs"], { cwd: directory, encoding: "utf8" });
    assert.match(build(), /Homepage pulse snapshots: 2 files updated/);
    const readBuilt = (name) => fs.readFileSync(path.join(directory, name), "utf8");
    const data = readBuilt("data/pulse.json");
    const generated = readBuilt("index.html");
    assert.equal(renderPulseHtml(generated, JSON.parse(data), "en", catalog), generated);
    assert.equal(translateHome(generated, JSON.parse(data), catalog), readBuilt("zh/index.html"));
    fs.writeFileSync(path.join(directory, "index.html"), generated.replace(/data-stat-covered>\d+/, "data-stat-covered>0"));
    assert.match(build(), /pulse unchanged[\s\S]*Homepage pulse snapshots: 1 files updated/);
    assert.equal(readBuilt("data/pulse.json"), data, "unchanged pulse keeps its original build timestamp");
    assert.equal(readBuilt("index.html"), generated);
    assert.match(build(), /pulse unchanged[\s\S]*Homepage pulse snapshots: 0 files updated/);
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});
