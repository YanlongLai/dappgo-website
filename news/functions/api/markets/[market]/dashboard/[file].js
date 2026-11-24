const UPSTREAM = "https://data.dappgo.com";
const MARKETS = new Set(["us", "tw"]);
const FILE_PATTERN = /^(?:latest|data-[a-f0-9]{12,64})\.json$/i;
// Bound the upstream wait so a stalled gateway yields a fast answer
// instead of holding the Function open.
export const UPSTREAM_TIMEOUT_MS = 5000;
// latest.json is re-read from the gateway at most once per FRESH_TTL per
// Cloudflare location; the last good copy is kept for STALE_KEEP so a short
// gateway outage serves slightly old data instead of an error.
export const FRESH_TTL_MS = 30_000;
export const STALE_KEEP_SECONDS = 7 * 24 * 3600;
// Read-only probe for production checks: skip the gateway and behave as if it
// timed out. Serves the cached copy (or the usual error) and changes nothing.
export const SIMULATE_FAILURE_HEADER = "x-dappgo-simulate-upstream-failure";
const CACHED_AT = "x-dappgo-cached-at";

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

function clientHeaders(file, etag) {
  const headers = new Headers();
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", file === "latest.json" ? "no-store" : "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  if (etag) headers.set("etag", etag);
  return headers;
}

function cacheFor(request) {
  try {
    return request && globalThis.caches?.default ? { cache: globalThis.caches.default, origin: new URL(request.url).origin } : null;
  } catch {
    return null;
  }
}

async function readCached(store, key) {
  if (!store) return null;
  try {
    const hit = await store.cache.match(key);
    if (!hit) return null;
    const cachedAt = Number(hit.headers.get(CACHED_AT));
    return { response: hit, cachedAt: Number.isFinite(cachedAt) ? cachedAt : 0 };
  } catch {
    return null;
  }
}

function fromCache(file, cached, now, { stale }) {
  const headers = clientHeaders(file, cached.response.headers.get("etag"));
  headers.set("age", String(Math.max(0, Math.floor((now - cached.cachedAt) / 1000))));
  headers.set("x-dappgo-cache", stale ? "stale" : "hit");
  if (stale) headers.set("x-dappgo-stale", "1");
  return new Response(cached.response.body, { status: 200, headers });
}

export async function onRequestGet({ params, request, waitUntil, now = Date.now }) {
  const market = String(params.market || "").toLowerCase();
  const file = String(params.file || "");
  if (!MARKETS.has(market) || !FILE_PATTERN.test(file)) return jsonError("Not found", 404);

  const path = `/v1/markets/${market}/dashboard/${file}`;
  const upstream = `${UPSTREAM}${path}`;
  const store = cacheFor(request);
  const key = store ? new Request(`${store.origin}/__upstream-cache${path}`) : null;
  const immutable = file !== "latest.json";
  const cached = await readCached(store, key);
  const started = now();
  const simulateFailure = request?.headers?.get(SIMULATE_FAILURE_HEADER) === "1";

  // Hashed data files never change, so any cached copy is current.
  if (cached && (immutable || (!simulateFailure && started - cached.cachedAt < FRESH_TTL_MS))) return fromCache(file, cached, started, { stale: false });

  let failure;
  try {
    if (simulateFailure) throw new DOMException("simulated", "TimeoutError");
    const response = await fetch(upstream, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) });
    if (response.ok) {
      const body = await response.arrayBuffer();
      const etag = response.headers.get("etag");
      if (store) {
        const copy = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": `public, max-age=${STALE_KEEP_SECONDS}`, [CACHED_AT]: String(now()) });
        if (etag) copy.set("etag", etag);
        const put = store.cache.put(key, new Response(body.slice(0), { status: 200, headers: copy })).catch(() => {});
        if (typeof waitUntil === "function") waitUntil(put); else await put;
      }
      const headers = clientHeaders(file, etag);
      headers.set("x-dappgo-cache", "miss");
      return new Response(body, { status: 200, headers });
    }
    // A 4xx is a real answer (e.g. an unknown hash), not an outage.
    if (response.status < 500) return jsonError(`Upstream data gateway returned ${response.status}`, response.status);
    failure = jsonError(`Upstream data gateway returned ${response.status}`, 502);
  } catch (error) {
    const timedOut = error?.name === "TimeoutError" || error?.name === "AbortError";
    failure = jsonError(timedOut ? "Upstream data gateway timed out" : "Upstream data gateway unreachable", timedOut ? 504 : 502);
  }
  return cached ? fromCache(file, cached, now(), { stale: true }) : failure;
}
