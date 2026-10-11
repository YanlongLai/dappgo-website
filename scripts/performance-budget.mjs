#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetRoot = path.join(root, "assets");
const limits = [
  { name: "screenshots", re: /assets\/screenshots\/.*\.(png|jpe?g)$/i, max: 700_000 },
  { name: "icons", re: /assets\/app-icons\/.*\.(png|jpe?g)$/i, max: 350_000 },
  { name: "other raster", re: /assets\/.*\.(png|jpe?g)$/i, max: 700_000 }
];
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(png|jpe?g)$/i.test(entry.name)) files.push(full);
  }
}
walk(assetRoot);
const failures = [];
const measured = files.map((file) => {
  const relative = path.relative(root, file).split(path.sep).join("/");
  const bytes = fs.statSync(file).size;
  const rule = limits.find((candidate) => candidate.re.test(relative)) || limits.at(-1);
  if (bytes > rule.max) failures.push(`${relative} is ${bytes} bytes; ${rule.name} budget is ${rule.max}`);
  return { file: relative, bytes, budget: rule.max };
});
if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures, largest: measured.sort((a, b) => b.bytes - a.bytes).slice(0, 10) }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, files: measured.length, largest: measured.sort((a, b) => b.bytes - a.bytes).slice(0, 10) }, null, 2));
