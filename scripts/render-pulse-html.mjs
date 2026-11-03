#!/usr/bin/env node
// Offline, deterministic snapshot builder; never fetches or changes pulse.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderPulseHtml } from "./lib/home-html.mjs";
import { root, translateHome, writeOrCheck } from "./build-zh-home.mjs";

export function renderHomeSnapshots({ check = false } = {}) {
  const pulse = JSON.parse(fs.readFileSync(path.join(root, "data/pulse.json"), "utf8"));
  const catalog = JSON.parse(fs.readFileSync(path.join(root, "config/product-catalog.json"), "utf8"));
  const file = path.join(root, "index.html");
  const english = renderPulseHtml(fs.readFileSync(file, "utf8"), pulse, "en", catalog);
  const chinese = translateHome(english, pulse, catalog);
  const changed = [writeOrCheck(file, english, check), writeOrCheck(path.join(root, "zh/index.html"), chinese, check)];
  console.log(check ? "Homepage pulse snapshots: check passed (en, zh-Hant)." : `Homepage pulse snapshots: ${changed.filter(Boolean).length} files updated.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  renderHomeSnapshots({ check: process.argv.includes("--check") });
}
