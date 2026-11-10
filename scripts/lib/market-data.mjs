// Shared published-market loader. Verify the immutable pointer before using a payload.
export const GATEWAY = "https://data.dappgo.com/v1/markets";
const IMMUTABLE = /^dashboard\/data-[a-f0-9]{12,64}\.json$/;

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

export async function load(market) {
  const pointer = await getJson(`${GATEWAY}/${market}/dashboard/latest.json`);
  if (!IMMUTABLE.test(pointer.data_url_v2 || "")) throw new Error(`${market}: pointer has no immutable data_url_v2`);
  const payload = await getJson(`${GATEWAY}/${market}/${pointer.data_url_v2}`);
  if (payload.data_hash !== pointer.hash) throw new Error(`${market}: payload data_hash does not match pointer hash`);
  return { pointer, payload };
}
