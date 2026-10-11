const UPSTREAM = "https://data.dappgo.com";
const MARKETS = new Set(["us", "tw"]);
const FILE_PATTERN = /^(?:latest|data-[a-f0-9]{12,64})\.json$/i;

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

export async function onRequestGet({ params }) {
  const market = String(params.market || "").toLowerCase();
  const file = String(params.file || "");
  if (!MARKETS.has(market) || !FILE_PATTERN.test(file)) return jsonError("Not found", 404);

  const upstream = `${UPSTREAM}/v1/markets/${market}/dashboard/${file}`;
  const response = await fetch(upstream, { headers: { accept: "application/json" } });
  if (!response.ok) return jsonError(`Upstream data gateway returned ${response.status}`, response.status >= 500 ? 502 : response.status);

  const headers = new Headers();
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", file === "latest.json" ? "no-store" : "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  const etag = response.headers.get("etag");
  if (etag) headers.set("etag", etag);
  return new Response(response.body, { status: 200, headers });
}
