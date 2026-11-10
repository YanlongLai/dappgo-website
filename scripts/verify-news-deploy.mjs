#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

export const NEWS_URL = "https://news.dappgo.com/us/";
const start = "<!-- dappgo:prerender:start -->";
const end = "<!-- dappgo:prerender:end -->";

function validateTimestamp(value) {
  if (!/^\d{4}-\d{2}-\d{2}T[^\s<>"']+Z$/.test(value) || !Number.isFinite(Date.parse(value))) {
    throw new Error("Missing or invalid US generated_at_utc");
  }
  return value;
}

export function prerenderTimestamp(html) {
  const first = html.indexOf(start);
  const last = html.indexOf(end, first + start.length);
  if (first < 0 || last < 0) throw new Error("US HTML has no complete dappgo:prerender block");
  // The first time is the report's generated_at_utc; later times belong to stories.
  const time = /<time\b[^>]*\bdatetime\s*=\s*(["'])([^"']+)\1/i.exec(html.slice(first + start.length, last));
  if (!time) throw new Error("US prerender block has no report time datetime");
  return validateTimestamp(time[2]);
}

export function expectedTimestamp(htmlFile, generatedAtFile) {
  const htmlTimestamp = prerenderTimestamp(fs.readFileSync(htmlFile, "utf8"));
  if (!generatedAtFile) return htmlTimestamp;
  const expected = validateTimestamp(fs.readFileSync(generatedAtFile, "utf8").trim());
  if (htmlTimestamp !== expected) throw new Error("Build generated_at_utc file does not match the US prerender report time");
  return expected;
}

export async function waitForNews({ expected, fetchImpl = fetch, now = Date.now, wait = delay, log = console.log,
  timeoutMs = 180_000, intervalMs = 5_000 } = {}) {
  validateTimestamp(expected);
  const deadline = now() + timeoutMs;
  let lastFailure = "no matching response";
  while (now() < deadline) {
    try {
      const response = await fetchImpl(NEWS_URL, {
        headers: { "User-Agent": "GPTBot/1.2 (+https://openai.com/gptbot)", "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(Math.max(1, Math.min(15_000, deadline - now())))
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const served = prerenderTimestamp(await response.text());
      if (served === expected) {
        log(`Verified ${NEWS_URL}: prerender generated_at_utc ${expected}`);
        return;
      }
      lastFailure = `served report time ${served}; expected ${expected}`;
    } catch (error) {
      lastFailure = error.message;
    }
    const remaining = deadline - now();
    if (remaining <= 0) break;
    await wait(Math.min(intervalMs, remaining));
  }
  throw new Error(`News deployment did not serve the expected prerender block within ${timeoutMs / 1000}s: ${lastFailure}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command, value, generatedAtFile, ...extra] = process.argv.slice(2);
    if (command === "timestamp" && value && !extra.length) console.log(expectedTimestamp(value, generatedAtFile));
    else if (command === "verify" && value && generatedAtFile === undefined) await waitForNews({ expected: value });
    else throw new Error("Usage: verify-news-deploy.mjs timestamp HTML [GENERATED_AT_FILE] | verify GENERATED_AT_UTC");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
