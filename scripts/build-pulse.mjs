#!/usr/bin/env node
// Derive a compact, hash-verified homepage pulse from the published daily-report pointers.
// Fails closed: any pointer/payload mismatch aborts without writing. Unchanged content is not rewritten.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GATEWAY = "https://data.dappgo.com/v1/markets";
const out = path.resolve(root, process.argv[2] || "data/pulse.json");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "config/product-catalog.json"), "utf8"));
const webUrl = (id, market) => catalog.products.find((p) => p.id === id)?.web_routes.find((r) => r.market === market)?.url;
const IMMUTABLE = /^dashboard\/data-[a-f0-9]{12,64}\.json$/;

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

async function load(market) {
  const pointer = await getJson(`${GATEWAY}/${market}/dashboard/latest.json`);
  if (!IMMUTABLE.test(pointer.data_url_v2 || "")) throw new Error(`${market}: pointer has no immutable data_url_v2`);
  const payload = await getJson(`${GATEWAY}/${market}/${pointer.data_url_v2}`);
  if (payload.data_hash !== pointer.hash) throw new Error(`${market}: payload data_hash does not match pointer hash`);
  return { pointer, payload };
}

const round = (value, digits = 2) => (Number.isFinite(value) ? Number(value.toFixed(digits)) : null);
const mover = ({ symbol, name, return_pct, current_close }) => ({ symbol, name, return_pct: round(return_pct), close: round(current_close) });
const identity = ({ pointer, payload }) => ({
  report_date: pointer.report_date,
  generated_at_utc: pointer.generated_at_utc,
  schema_version: payload.schema_version,
  data_hash: pointer.hash,
  coverage: payload.data_coverage
    ? { covered: payload.data_coverage.covered_count, expected: payload.data_coverage.expected_count, status: payload.data_coverage.status }
    : null
});

function equities(market, source) {
  const { payload } = source;
  const regime = payload.market_regime || {};
  return {
    ...identity(source),
    web_url: webUrl(market === "us" ? "us-stocks" : "taiwan-stocks", market),
    regime: regime.regime || null,
    breadth_score: round(regime.breadth_score, 3),
    advance_decline_ratio: round(regime.advance_decline_ratio),
    vol_regime: regime.vol_regime || null,
    one_liner: { en: payload.report_one_liner_en || null, zh: payload.report_one_liner || null },
    gainers: (payload.top_movers_5d?.gainers || []).slice(0, 4).map(mover),
    losers: (payload.top_movers_5d?.losers || []).slice(0, 4).map(mover),
    picks: (payload.recommendations || []).slice(0, 3).map((r) => ({
      symbol: r.symbol, name: r.name, score: r.score, signals: { en: (r.signals_en || []).slice(0, 3), zh: (r.signals || []).slice(0, 3) }
    }))
  };
}

function options(source) {
  const { payload } = source;
  const names = payload.ticker_metadata || {};
  const ideas = [...(payload.strike_comparison || [])]
    .filter((row) => Number.isFinite(row.cp) && row.dte >= 5)
    .sort((a, b) => b.cp - a.cp)
    .filter((row, index, rows) => rows.findIndex((r) => r.symbol === row.symbol) === index)
    .slice(0, 4)
    .map((row) => ({
      symbol: row.symbol, strategy: row.strategy, strike: row.strike, premium: round(row.premium), expiry: row.expiry,
      dte: row.dte, iv: round(row.iv, 1), pop: round(row.pop, 1), annualized: round(row.annualized, 1), score: round(row.cp, 1)
    }));
  const prices = [...(payload.live_prices || [])].filter((p) => Number.isFinite(p.change_pct));
  prices.sort((a, b) => b.change_pct - a.change_pct);
  const move = (p) => ({ symbol: p.symbol, name: names[p.symbol]?.name || null, return_pct: round(p.change_pct), close: round(p.price) });
  return {
    ...identity(source),
    web_url: webUrl("options-explorer", "us"),
    ideas,
    gainers: prices.slice(0, 4).map(move),
    losers: prices.slice(-4).reverse().map(move),
    backtest: payload.summary ? { trades: payload.summary.total_trades, win_rate: payload.summary.win_rate } : null
  };
}

// Publisher preview image (og:image / twitter:image) the engine already resolved; hotlinked, never re-hosted.
function image(item) {
  if (item.image_status !== "available" || !/^https:\/\//.test(item.image_url || "")) return null;
  return { url: item.image_url, width: item.image_width || null, height: item.image_height || null };
}

function news(market, { payload }) {
  const items = [];
  for (const [symbol, ticker] of Object.entries(payload.ticker_data || {})) {
    for (const item of ticker.news || []) {
      if (!item.url || !/^https:\/\//.test(item.url) || !item.published_at_utc) continue;
      // Headline, source name and outbound link only: compatible with link_and_source_name attribution.
      items.push({
        market, symbol, name: ticker.name || symbol, source: item.source, url: item.url, published_at_utc: item.published_at_utc,
        title: { original: item.title, en: item.title_en || (item.language === "en" ? item.title : null) },
        image: image(item),
        news_url: `${webUrl("news", market)}?stock=${encodeURIComponent(symbol)}`
      });
    }
  }
  return items;
}

const [us, tw, opt] = await Promise.all(["us", "tw", "options"].map(load));
// Newest first, kept per market: the homepage shows each market in its own tab.
const seen = new Set();
// The two newest stories always lead; the other slots prefer stories with a publisher image from the 30 newest,
// so the wire stays visual without hiding breaking news. Output stays newest-first.
const newest = (items) => {
  const recent = items
    .sort((a, b) => b.published_at_utc.localeCompare(a.published_at_utc))
    .filter((item) => !seen.has(item.url) && seen.add(item.url))
    .slice(0, 30);
  const lead = recent.slice(0, 2);
  const rest = recent.slice(2);
  const picked = [...lead, ...rest.filter((item) => item.image), ...rest.filter((item) => !item.image)].slice(0, 6);
  return picked.sort((a, b) => b.published_at_utc.localeCompare(a.published_at_utc));
};
const latest = [...newest(news("us", us)), ...newest(news("tw", tw))];

const pulse = {
  schema_version: "1.0.0",
  built_at_utc: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
  source: GATEWAY,
  markets: { us: equities("us", us), tw: equities("tw", tw), options: options(opt) },
  news: latest
};
const withoutBuildTime = ({ built_at_utc, ...rest }) => JSON.stringify(rest);
let previous = null;
try { previous = JSON.parse(fs.readFileSync(out, "utf8")); } catch { /* first build */ }
if (previous && withoutBuildTime(previous) === withoutBuildTime(pulse)) {
  console.log(`pulse unchanged: ${path.relative(root, out)}`);
} else {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(pulse, null, 2)}\n`);
  console.log(`pulse written: ${path.relative(root, out)} (${fs.statSync(out).size} bytes)`);
}
