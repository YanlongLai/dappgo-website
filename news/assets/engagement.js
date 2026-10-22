(function (scope) {
  'use strict';
  const PREFERENCE = 'dappgo-news-analytics-v1';
  const IDENTITY = 'dappgo-news-reader-day-v1';
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  function createClient({ storage, navigator = scope.navigator, crypto = scope.crypto, request = scope.fetch.bind(scope), now = () => new Date() } = {}) {
    if (storage === undefined) { try { storage = scope.localStorage; } catch { /* Storage can be blocked. */ } }
    let preference;
    let identity;
    const requests = new Set();
    const privacySignal = () => navigator?.globalPrivacyControl === true || navigator?.doNotTrack === '1' || scope.doNotTrack === '1';
    const read = key => { try { return storage?.getItem(key); } catch { return null; } };
    const write = (key, value) => { try { storage?.setItem(key, value); } catch { /* In-memory fallback. */ } };
    function enabled() { return !privacySignal() && (preference ?? read(PREFERENCE)) !== 'off'; }
    function setEnabled(value) {
      preference = value ? 'on' : 'off'; write(PREFERENCE, preference);
      if (!value) { requests.forEach(controller => controller.abort()); identity = null; try { storage?.removeItem(IDENTITY); } catch { /* No persistence. */ } }
    }
    function readerId() {
      const day = now().toISOString().slice(0, 10);
      if (!identity) { try { identity = JSON.parse(read(IDENTITY)); } catch { /* No prior identity. */ } }
      if (identity?.day !== day || typeof identity.id !== 'string' || !UUID.test(identity.id)) {
        identity = { day, id: crypto.randomUUID() }; write(IDENTITY, JSON.stringify(identity));
      }
      return identity.id;
    }
    function recordOpen({ market, stock, language }) {
      if (!enabled()) return;
      try {
        const event = { v: 1, event: 'ai_open', event_id: crypto.randomUUID(), visitor_id: readerId(), market, stock, language, platform: 'web' };
        const controller = new AbortController();
        requests.add(controller);
        const timeout = setTimeout(() => controller.abort(), 2000);
        Promise.resolve(request('/api/engagement', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event), credentials: 'omit', keepalive: true, signal: controller.signal }))
          .catch(() => {}).finally(() => { clearTimeout(timeout); requests.delete(controller); });
      } catch { /* Metrics never block reading, including restricted storage/crypto. */ }
    }
    return { enabled, setEnabled, recordOpen, privacySignal };
  }
  scope.DappGoNewsEngagement = { createClient };
})(globalThis);
