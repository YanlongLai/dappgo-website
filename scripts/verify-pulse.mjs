#!/usr/bin/env node
// Structural contract for data/pulse.json, the homepage's only live-data input.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.resolve(root, process.argv[2] || "data/pulse.json");
const pulse = JSON.parse(fs.readFileSync(file, "utf8"));
const failures = [];
const require = (condition, message) => { if (!condition) failures.push(message); };
const date = /^\d{4}-\d{2}-\d{2}$/;
const utc = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
const https = (url) => typeof url === "string" && url.startsWith("https://");

require(pulse.schema_version === "1.0.0", "unsupported pulse schema");
require(utc.test(pulse.built_at_utc || ""), "built_at_utc must be a UTC timestamp");
require(fs.statSync(file).size < 64_000, "pulse exceeds 64 KB budget");
for (const key of ["us", "tw", "options"]) {
  const m = pulse.markets?.[key];
  require(m, `missing market ${key}`);
  if (!m) continue;
  require(date.test(m.report_date || ""), `${key}: report_date`);
  require(utc.test(m.generated_at_utc || ""), `${key}: generated_at_utc`);
  require(/^[a-f0-9]{64}$/.test(m.data_hash || ""), `${key}: data_hash`);
  require(https(m.web_url), `${key}: web_url`);
  require(Array.isArray(m.gainers) && Array.isArray(m.losers), `${key}: movers`);
  if (key === "options") require(Array.isArray(m.ideas), "options: ideas");
  else require(m.one_liner && "en" in m.one_liner, `${key}: one_liner`);
}
require(Array.isArray(pulse.news), "news must be an array");
for (const item of pulse.news || []) {
  require(["us", "tw"].includes(item.market), `news market ${item.market}`);
  require(https(item.url) && https(item.news_url), `news links for ${item.symbol}`);
  require(!("summary" in item), "news items carry headline, source and link only");
  require(item.image == null || https(item.image.url), `news image for ${item.symbol} must be https`);
}
if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, markets: Object.keys(pulse.markets), news: pulse.news.length, built_at_utc: pulse.built_at_utc }));
