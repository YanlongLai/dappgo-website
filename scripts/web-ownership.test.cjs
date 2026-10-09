'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test('browser publisher matches existing native publisher without ad scripts', () => {
  const native = fs.readFileSync(path.join(root, 'app-ads.txt'), 'utf8').trim();
  assert.equal(fs.readFileSync(path.join(root, 'ads.txt'), 'utf8').trim(), native);
  const publisher = native.split(',')[1].trim();
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(html.includes(`name="google-adsense-account" content="ca-${publisher}"`));
  assert.doesNotMatch(html, /pagead2\.googlesyndication\.com|adsbygoogle/);
});
test('browser privacy covers three routes and explicitly disabled ads in both languages', () => {
  const html = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8');
  for (const route of ['stocks.dappgo.com/us','stocks.dappgo.com/tw','options.dappgo.com/us']) assert.ok(html.includes(route));
  assert.match(html, /Web advertising is currently disabled/);
  assert.match(html, /Web 廣告目前停用/);
  assert.match(html, /US\/TW settings offer watchlist clearing/);
  assert.match(html, /local caches, jsDelivr/);
  assert.match(html, /Cached reads need not make a network request/);
  assert.match(html, /Number Merge does not require an account/);
});
