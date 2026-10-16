const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const test = require('node:test');
const html = fs.readFileSync(path.resolve(__dirname, '../../privacy.html'), 'utf8');
const section = html.match(/<section id="mobile-att">([\s\S]*?)<\/section>/)?.[1];

test('version-scoped ATT section has both languages and permission controls', () => {
  assert.ok(section);
  assert.equal((html.match(/id="mobile-att"/g) || []).length, 1);
  for (const phrase of ['lang-zh', 'lang-en', '1.5.15', '1.0.4', 'UMP', 'Android', 'Privacy &amp; Security', '拒絕', 'denied', 'Google Mobile Ads']) {
    assert.ok(section.includes(phrase), phrase);
  }
});

test('both languages describe conservative refusal and independent analytics', () => {
  assert.ok(section.includes('不初始化或請求廣告，也不展示快取廣告'));
  assert.ok(section.includes('do not initialize or request advertising or present cached ads'));
  assert.ok(section.includes('各自獨立'));
  assert.ok(section.includes('are separate'));
  assert.ok(section.includes('不阻擋市場資訊與研究功能'));
  assert.ok(section.includes('market information and research remain usable'));
  assert.ok(section.includes('not a no-data-collection promise'));
});

test('blanket stock no-tracking promises are removed without changing Number Merge section', () => {
  assert.ok(!html.includes('The stock apps do not track across other apps or websites'));
  assert.ok(!html.includes('股票 App 不做跨 App 或跨網站追蹤'));
  assert.ok(html.includes('Number Merge includes Google AdMob banner ads and an optional rewarded ad'));
  assert.ok(section.includes('does not change Number Merge'));
});

test('collection, rights and backend wording do not contradict the versioned SDK disclosure', () => {
  assert.ok(!html.includes('we do not sell or share'));
  assert.ok(!html.includes('我們本就不販售亦不分享'));
  assert.ok(!html.includes('Never used for marketing or shared with third parties'));
  assert.ok(!html.includes('The current Options Explorer version does not add new product-usage events'));
  assert.ok(!html.includes("We don't operate our own application servers"));
  assert.ok(html.includes('Anonymous authentication, remote push registration, and Firestore user-data features remain paused in the new TW Stocks / US Stocks versions'));
  assert.ok(html.includes("Options Explorer's explicitly selected feedback / push flows may use an anonymous service identifier"));
  assert.ok(html.includes('Ordinary browsing does not require names, email addresses, or GPS / precise-location permission'));
  assert.ok(!html.includes('only when the user explicitly enables optional push notifications'));
  assert.ok(html.includes('only when its explicitly selected feedback / push features require it'));
});
