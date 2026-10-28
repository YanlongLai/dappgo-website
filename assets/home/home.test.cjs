/* Production homepage contract. Run: node --test assets/home/home.test.cjs */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "../..");
const production = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "home.js"), "utf8");
const pulse = JSON.parse(fs.readFileSync(path.join(root, "data/pulse.json"), "utf8"));
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("production homepage is indexable and keeps the public metadata contract", () => {
  assert.match(production, /<meta name="robots" content="index, follow"/);
  assert.match(production, /<link rel="canonical" href="https:\/\/dappgo\.com\//);
  assert.match(production, /googletagmanager\.com\/gtag\/js\?id=G-C9K7KCERPP/);
  assert.match(production, /og-image-v2\.png/);
  assert.match(production, /"@type": "Organization"/);
  assert.doesNotMatch(production, /noindex/);
  assert.match(production, /assets\/home\/home\.css\?v=/);
  assert.match(production, /assets\/home\/home\.js\?v=/);
});

test("all local links, assets, and anchors resolve", () => {
  const ids = [...production.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "Duplicate DOM IDs");
  for (const [, rawRef] of production.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = rawRef.split(/[?#]/, 1)[0];
    if (ref.startsWith("/")) assert.ok(fs.existsSync(path.join(root, ref)), rawRef);
    if (rawRef.startsWith("#") && rawRef !== "#") assert.ok(ids.includes(rawRef.slice(1)), rawRef);
  }
});

test("store links match the product catalog and open safely", () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, "config/product-catalog.json"), "utf8"));
  for (const product of catalog.products) {
    const row = production.match(new RegExp(`data-product="${product.id}">([\\s\\S]*?)</article>`))?.[1];
    assert.ok(row, product.id);
    for (const route of product.web_routes) assert.ok(row.includes(`href="${route.url}"`), route.url);
    for (const [os, store] of Object.entries(product.stores)) {
      if (store.status === "live") assert.match(row, new RegExp(`data-store="${os}" href="${escape(store.url)}"`));
      else assert.match(row, new RegExp(`chip-soon[^>]*><span class="store-platform-name">${os === "ios" ? "iOS" : "Android"}`));
    }
  }
  const externalAnchors = production.match(/<a[^>]+target="_blank"[^>]+>/g) || [];
  assert.ok(externalAnchors.length >= 10);
  assert.ok(externalAnchors.every((anchor) => /rel="noopener noreferrer"/.test(anchor)));
  for (const market of ["us", "tw"]) assert.ok(production.includes(`href="https://news.dappgo.com/${market}/"`));
});

function fixture({ pulseResponse, storageFails = false, language = "en-US" } = {}) {
  const elements = new Map();
  const element = (key) => {
    if (!elements.has(key)) elements.set(key, { key, dataset: {}, textContent: "", innerHTML: "", events: {}, addEventListener(type, fn) { this.events[type] = fn; } });
    return elements.get(key);
  };
  const i18n = [...production.matchAll(/data-i18n="([^"]+)"/g)].map(([, key]) => ({ dataset: { i18n: key }, textContent: "" }));
  const storeAnchors = [...production.matchAll(/data-product="([^"]+)"[\s\S]*?<\/article>/g)].flatMap(([block, id]) =>
    [...block.matchAll(/data-store="(\w+)" href="([^"]+)"/g)].map(([, os, href]) => ({ id, href, dataset: { store: os } })));
  const documentElement = { lang: "en", style: {} };
  const document = {
    documentElement,
    querySelector: (selector) => element(selector),
    querySelectorAll: (selector) => {
      if (selector === "[data-i18n]") return i18n;
      if (selector === "[data-i18n-html]") return [];
      const product = selector.match(/data-product="([^"]+)"/)?.[1];
      return product ? storeAnchors.filter((anchor) => anchor.id === product) : [];
    }
  };
  const storage = storageFails
    ? { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } }
    : { data: {}, getItem(k) { return this.data[k] ?? null; }, setItem(k, v) { this.data[k] = v; } };
  const fetch = async () => pulseResponse ?? { ok: true, json: async () => pulse };
  vm.runInNewContext(script, { document, navigator: { language }, localStorage: storage, fetch, Date, Math, Number, JSON, URLSearchParams, console });
  return { document, element, i18n, settle: () => new Promise((resolve) => setTimeout(resolve, 0)) };
}

test("renders all three market cards and the wire from the pulse", async () => {
  const app = fixture();
  await app.settle();
  const board = app.element("[data-board]").innerHTML;
  for (const name of ["US Stocks", "Taiwan Stocks", "Options Explorer"]) assert.ok(board.includes(name), name);
  for (const key of ["us", "tw", "options"]) assert.ok(board.includes(pulse.markets[key].web_url), key);
  assert.ok(board.includes('data-store') === false && board.includes('class="store"'), "store links copied from catalog rows");
  const wire = app.element("[data-wire]").innerHTML;
  const us = pulse.news.filter((n) => n.market === "us");
  assert.equal((wire.match(/<li class="spot/g) || []).length, Math.min(6, us.length));
  assert.ok(wire.includes("news.dappgo.com/us/"));
  assert.ok(!wire.includes("news.dappgo.com/tw/"), "Taiwan headlines stay in their own tab");
  const shown = [...wire.matchAll(/<time datetime="([^"]+)"/g)].map(([, iso]) => iso);
  assert.deepEqual(shown, [...shown].sort().reverse(), "wire is newest first");
  for (const n of us.filter((item) => item.image)) assert.ok(wire.includes(`src="${n.image.url.replace(/&/g, "&amp;")}"`), n.symbol);
  assert.match(app.element("[data-console]").innerHTML, /payloads verified/);
  assert.ok(["live", "stale"].includes(app.element("[data-live-chip]").dataset.state));
});

test("Number Merge is Android-only and DappGo News uses its app icon", () => {
  const merge = production.match(/data-product="number-merge">([\s\S]*?)<\/article>/)[1];
  assert.doesNotMatch(merge, /data-store="ios"|chip-soon|Coming soon/);
  const news = production.match(/data-product="news">([\s\S]*?)<\/article>/)[1];
  assert.match(news, /src="\/assets\/app-icons\/news-icon-128\.webp"/);
});

test("a failed pulse shows the offline state instead of stale cards", async () => {
  const app = fixture({ pulseResponse: { ok: false, status: 503, json: async () => ({}) } });
  await app.settle();
  assert.equal(app.element("[data-live-chip]").dataset.state, "down");
  assert.match(app.element("[data-board]").innerHTML, /could not be loaded/);
});

test("Traditional Chinese covers every translated element and storage may be blocked", async () => {
  const app = fixture({ storageFails: true, language: "zh-TW" });
  await app.settle();
  assert.equal(app.document.documentElement.lang, "zh-Hant");
  for (const node of app.i18n) assert.ok(node.textContent.length, node.dataset.i18n);
  app.element("[data-lang-toggle]").events.click();
  assert.equal(app.document.documentElement.lang, "en");
});
