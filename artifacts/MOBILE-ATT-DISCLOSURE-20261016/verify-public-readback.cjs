// Read-only, bounded HTTPS verification. Prints hashes/checks, never response scripts.
const crypto = require('node:crypto');
const vm = require('node:vm');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const merge = '18b43b96c64a7a0a7a2366cffa769dd74ef086b4';
const contractPath = 'artifacts/MOBILE-ATT-DISCLOSURE-20261016/privacy-contract.test.cjs';
const source = execFileSync('git', ['show', `${merge}:privacy.html`]);
const contract = execFileSync('git', ['show', `${merge}:${contractPath}`]).toString();
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const section = s => s.match(/<section id="mobile-att">([\s\S]*?)<\/section>/)?.[0];
const decode = hex => {
  const bytes = Buffer.from(hex, 'hex');
  return Buffer.from([...bytes.subarray(1)].map(x => x ^ bytes[0])).toString();
};
function normalize(live) {
  const transformations = [];
  let normalized = live;
  const apply = (name, re, fn) => {
    let count = 0;
    normalized = normalized.replace(re, (...args) => {
      count++;
      return typeof fn === 'function' ? fn(...args) : fn;
    });
    transformations.push({ name, count });
  };
  apply('decode Cloudflare standalone email anchors', /<a href="\/cdn-cgi\/l\/email-protection" class="__cf_email__" data-cfemail="([a-f0-9]+)">\[email&#160;protected\]<\/a>/g, (_, h) => decode(h));
  apply('decode Cloudflare protected mailto href', /href="\/cdn-cgi\/l\/email-protection#([a-f0-9]+)"/g, (_, h) => `href="mailto:${decode(h)}"`);
  apply('decode Cloudflare protected email spans', /<span class="__cf_email__" data-cfemail="([a-f0-9]+)">\[email&#160;protected\]<\/span>/g, (_, h) => decode(h));
  apply('remove injected Cloudflare email decoder', /<script data-cfasync="false" src="\/cdn-cgi\/scripts\/[a-f0-9]+\/cloudflare-static\/email-decode\.min\.js"><\/script>/g, '');
  apply('remove injected Cloudflare challenge params script', /<script>window\.__CF\$cv\$params=[\s\S]*?<\/script>/g, '');
  return { normalized, transformations };
}
(async () => {
  const results = [];
  for (const url of ['https://dappgo.com/privacy.html', 'https://dappgo.com/privacy']) {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
    const body = Buffer.from(await response.arrayBuffer());
    const html = body.toString();
    const contractChecks = [];
    vm.runInNewContext(contract, {
      __dirname,
      require(name) {
        if (name === 'node:fs') return { readFileSync: () => html };
        if (name === 'node:test') return (name, fn) => { fn(); contractChecks.push({ name, passed: true }); };
        if (name === 'node:path') return path;
        if (name === 'node:assert/strict') return require(name);
        throw new Error('Unexpected contract dependency');
      },
    }, { timeout: 1000 });
    const { normalized, transformations } = normalize(html);
    const attSection = section(html);
    if (!attSection) throw new Error('ATT section absent');
    const result = {
      url, finalURL: response.url, status: response.status, capturedAt: new Date().toISOString(),
      bodyBytes: body.length, bodySHA256: hash(body), exactMergedSourceBytes: body.equals(source),
      attSectionBytes: Buffer.byteLength(attSection), attSectionSHA256: hash(attSection),
      attSectionExactSourceBytes: attSection === section(source.toString()), contractChecks,
      normalization: { transformations, normalizedBytes: Buffer.byteLength(normalized), normalizedSHA256: hash(normalized), normalizedExactMergedSourceBytes: Buffer.from(normalized).equals(source) },
      headers: Object.fromEntries(['content-type', 'content-encoding', 'last-modified', 'age', 'cache-control', 'cf-cache-status'].map(k => [k, response.headers.get(k)])),
    };
    results.push(result);
    if (response.status !== 200 || response.url !== url || contractChecks.length !== 4 || !result.attSectionExactSourceBytes || !result.normalization.normalizedExactMergedSourceBytes) process.exitCode = 1;
  }
  console.log(JSON.stringify({ merge, sourceBytes: source.length, sourceSHA256: hash(source), contractSHA256: hash(contract), sourceAttSectionSHA256: hash(section(source.toString())), results }, null, 2));
})().catch(() => { console.error('Readback failed; response content intentionally omitted.'); process.exitCode = 1; });
