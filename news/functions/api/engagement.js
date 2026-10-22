const MAX_BODY_BYTES = 1024;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const STOCK = /^(?:all|[A-Z0-9][A-Z0-9.-]{0,15})$/;

function headersFor(request) {
  const headers = new Headers({ 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'vary': 'Origin' });
  const origin = request.headers.get('origin');
  const own = new URL(request.url).origin;
  // Native requests do not carry Origin. Browser requests stay first-party.
  if (origin === own) {
    headers.set('access-control-allow-origin', origin);
    headers.set('access-control-allow-methods', 'POST, OPTIONS');
    headers.set('access-control-allow-headers', 'Content-Type');
    headers.set('access-control-max-age', '86400');
  }
  return headers;
}

function response(request, status) { return new Response(null, { status, headers: headersFor(request) }); }

async function readEvent(request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw 413;
  const reader = request.body?.getReader();
  if (!reader) throw 400;
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) { await reader.cancel(); throw 413; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw 400; }
}

export function validEvent(event) {
  return event && typeof event === 'object' && !Array.isArray(event) &&
    Object.keys(event).sort().join(',') === 'event,event_id,language,market,platform,stock,v,visitor_id' &&
    event.v === 1 && event.event === 'ai_open' && typeof event.event_id === 'string' && UUID.test(event.event_id) && typeof event.visitor_id === 'string' && UUID.test(event.visitor_id) &&
    ['us', 'tw'].includes(event.market) && ['web', 'ios', 'android'].includes(event.platform) &&
    ['zh', 'en'].includes(event.language) && typeof event.stock === 'string' && STOCK.test(event.stock);
}

export function onRequestOptions({ request }) {
  return response(request, request.headers.get('origin') === new URL(request.url).origin ? 204 : 403);
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return response(request, 403);
  if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1') return response(request, 204);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) return response(request, 415);
  let event;
  try { event = await readEvent(request); } catch (status) { return response(request, typeof status === 'number' ? status : 400); }
  if (!validEvent(event) || (event.platform === 'web' && !origin)) return response(request, 400);
  const host = new URL(request.url).hostname;
  // Preview deployments must never inflate production metrics.
  if (host.endsWith('.pages.dev') && host !== 'dappgo-news.pages.dev') return response(request, 204);
  if (!env.NEWS_ENGAGEMENT) return response(request, 503);
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const cutoff = new Date(now - 90 * 86400000).toISOString().slice(0, 10);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${day}:${event.visitor_id.toLowerCase()}`));
  const visitor = Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
  try {
    await env.NEWS_ENGAGEMENT.batch([
      env.NEWS_ENGAGEMENT.prepare('INSERT INTO ai_open_events (event_id, day, occurred_at, market, stock, platform, language, visitor_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(event_id) DO NOTHING')
        .bind(event.event_id.toLowerCase(), day, now, event.market, event.stock, event.platform, event.language, visitor),
      // Index-bounded cleanup; no recurring job, at most 100 expired rows per open.
      env.NEWS_ENGAGEMENT.prepare('DELETE FROM ai_open_events WHERE event_id IN (SELECT event_id FROM ai_open_events WHERE day < ? ORDER BY day LIMIT 100)').bind(cutoff),
    ]);
  } catch { return response(request, 503); }
  return response(request, 204);
}
