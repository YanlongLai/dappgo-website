/**
 * Tag developer-machine requests to our own hosts (*.dappgo.com).
 * Active only when DAPPGO_CLIENT_CONTEXT=dev (Owner's ~/.zshenv); servers and CI leave it
 * unset so behaviour is unchanged. Third-party hosts are never tagged. No usernames,
 * emails or tokens are included.
 */
import os from "node:os";

const clean = (value, fallback) => String(value).replace(/[^A-Za-z0-9_.-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || fallback;

export function isDappgoHost(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === "dappgo.com" || host.endsWith(".dappgo.com");
  } catch {
    return false;
  }
}

export function devHeaders(url, tool, { env = process.env, hostname = os.hostname() } = {}) {
  if (env.DAPPGO_CLIENT_CONTEXT !== "dev" || !isDappgoHost(url)) return {};
  const t = clean(tool, "unknown");
  const short = clean(String(hostname).split(".")[0], "unknown");
  return { "user-agent": `DappGo-Dev/${t} (${short})`, "x-dappgo-client": `Dev/${t}` };
}

/** Merge dev headers over `headers` (dev user-agent replaces any existing one). */
export function withDevHeaders(url, headers, tool, options) {
  const extra = devHeaders(url, tool, options);
  if (!Object.keys(extra).length) return { ...headers };
  const kept = Object.fromEntries(Object.entries(headers || {}).filter(([k]) => k.toLowerCase() !== "user-agent"));
  return { ...kept, ...extra };
}

