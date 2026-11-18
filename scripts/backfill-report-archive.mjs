#!/usr/bin/env node
// One-off / repair tool: rebuild data/reports/<market>/<session>.json from the report repositories' git history.
// The daily path is scripts/build-content.mjs --latest (hash-verified gateway payload); this reads the same
// published dashboard/data.json at each historical commit and keeps the newest revision of every session.
//   node scripts/backfill-report-archive.mjs --since 2026-10-12 --us ../us-stocks-daily-report --tw ../tw-stocks-daily-report --options ../options-daily-report
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { extract } from "./lib/report-extract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const arg = (name) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : null);
const since = arg("since");
if (!/^\d{4}-\d{2}-\d{2}$/.test(since || "")) throw new Error("--since YYYY-MM-DD is required");
const git = (repo, ...rest) => execFileSync("git", ["-C", repo, ...rest], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });

for (const market of ["us", "tw", "options"]) {
  const repo = arg(market);
  if (!repo) continue;
  const ref = arg("ref") || "origin/HEAD";
  const commits = git(repo, "log", ref, `--since=${since}T00:00:00Z`, "--reverse", "--format=%H", "--", "dashboard/data.json").trim().split("\n").filter(Boolean);
  const bySession = new Map();
  for (const commit of commits) {
    let payload;
    try {
      payload = JSON.parse(git(repo, "show", `${commit}:dashboard/data.json`));
    } catch {
      continue;
    }
    if (!/^[a-f0-9]{64}$/.test(payload.data_hash || "") || !payload.generated_at_utc) continue;
    const record = extract(market, payload);
    if (!record || record.session_date < since) continue;
    const previous = bySession.get(record.session_date);
    if (!previous || record.generated_at_utc >= previous.generated_at_utc) bySession.set(record.session_date, record);
  }
  const dir = path.join(root, "data/reports", market);
  fs.mkdirSync(dir, { recursive: true });
  for (const [session, record] of bySession) fs.writeFileSync(path.join(dir, `${session}.json`), JSON.stringify(record) + "\n");
  console.log(`${market}: ${commits.length} commits read, ${bySession.size} sessions written (${[...bySession.keys()].sort().at(0)} … ${[...bySession.keys()].sort().at(-1)})`);
}
