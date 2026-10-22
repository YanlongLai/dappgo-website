const assert = require('node:assert/strict');
const test = require('node:test');
const policy = require('../mobile-version-policy.json');
const catalog = require('../config/product-catalog.json');

test('native policy covers the three catalogued applications and both stores', () => {
  assert.equal(policy.schemaVersion, 1);
  assert.equal(typeof policy.revision, 'string');
  assert.ok(policy.revision.length > 0 && policy.revision.length <= 80);
  const packages = ['com.dappgo.usstocksapp', 'com.dappgo.twstocksapp', 'com.dappgo.optionsapp'];
  assert.deepEqual(Object.keys(policy.apps).sort(), packages.sort());
  for (const packageId of packages) {
    const product = catalog.products.find((item) => item.stores.android?.url?.endsWith(`id=${packageId}`));
    assert.ok(product?.stores.ios.url && product?.stores.android.url, packageId);
    assert.deepEqual(Object.keys(policy.apps[packageId]).sort(), ['android', 'ios']);
    for (const platform of ['ios', 'android']) {
      const rule = policy.apps[packageId][platform];
      assert.deepEqual(Object.keys(rule), ['minimumVersion']);
      assert.match(rule.minimumVersion, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
      const [major, minor] = rule.minimumVersion.split('.').map(Number);
      assert.ok(major > 1 || (major === 1 && minor >= 6), 'Do not lower the initial supported client baseline');
    }
  }
});
