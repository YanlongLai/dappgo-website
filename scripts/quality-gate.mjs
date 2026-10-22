#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const run = (command, args) => {
  console.log(`\n$ ${command} ${args.join(" ")}`);
  execFileSync(command, args, { cwd: root, stdio: "inherit" });
};
run(process.execPath, ["scripts/verify-product-catalog.mjs"]);
run(process.execPath, ["scripts/performance-budget.mjs"]);
run(process.execPath, ["--test", "scripts/web-ownership.test.cjs", "assets/demo/demo.test.cjs"]);
run(process.execPath, ["--check", "assets/demo/demo.js"]);
run(process.execPath, ["--check", "news/assets/news.js"]);
run(process.execPath, ["news/tests/contract.mjs"]);
run(process.execPath, ["news/tests/analysis.mjs"]);
run(process.execPath, ["--test", "news/tests/interactions.mjs"]);
run(process.execPath, ["--test", "news/tests/engagement.mjs"]);
run(process.env.PYTHON || "python3", ["-m", "unittest", "-v", "tests/test_ai_readiness.py"]);
console.log("\nQuality gate passed. GitHub Actions is paused by Owner instruction and was not run.");
