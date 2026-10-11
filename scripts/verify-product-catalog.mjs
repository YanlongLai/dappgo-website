#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const catalog = JSON.parse(read("config/product-catalog.json"));
const html = read("index.html");
const llms = read("llms.txt");
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
const headers = JSON.parse(read("config/security-headers.json"));
const failures = [];
const require = (condition, message) => {
  if (!condition) failures.push(message);
};
const expectedHeaders = {
  "Content-Security-Policy": "frame-ancestors 'none';",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};
const seen = new Set();
const storeUrls = new Set();
const products = catalog.products;

require(catalog.schema_version === "1.0.0", "unsupported catalog schema");
require(catalog.canonical_host === "https://dappgo.com", "catalog host drift");
require(Array.isArray(products) && products.length > 0, "catalog has no products");
for (const product of products) {
  require(/^[-a-z0-9]+$/.test(product.id), `invalid product id: ${product.id}`);
  for (const route of product.web_routes || []) {
    require(/^https:\/\//.test(route.url), `non-HTTPS route: ${route.url}`);
    require(!seen.has(route.url), `duplicate route: ${route.url}`);
    seen.add(route.url);
    require(html.includes(`href="${route.url}"`), `homepage missing route: ${route.url}`);
    require(llms.includes(route.url), `llms missing route: ${route.url}`);
  }
  for (const [platform, store] of Object.entries(product.stores || {})) {
    require(["live", "coming-soon"].includes(store.status), `${product.id}/${platform} invalid status`);
    if (store.status === "live") {
      require(typeof store.url === "string" && /^https:\/\//.test(store.url), `${product.id}/${platform} live URL missing`);
      require(!storeUrls.has(store.url), `duplicate store URL: ${store.url}`);
      storeUrls.add(store.url);
      require(html.includes(`href="${store.url}"`), `homepage missing store URL: ${store.url}`);
    } else {
      require(!store.url, `${product.id}/${platform} coming-soon has a live URL`);
      const marker = `class="store-platform-name">${platform === "ios" ? "iOS" : "Android"}`;
      require(html.includes(marker) && html.includes('data-i18n="comingSoon"'), `${product.id}/${platform} missing coming-soon marker`);
    }
  }
}

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
require(new Set(sitemapUrls).size === sitemapUrls.length, "sitemap contains duplicate URLs");
for (const url of sitemapUrls) require(url.startsWith("https://dappgo.com/"), `sitemap crosses host boundary: ${url}`);
require(sitemapUrls.includes("https://dappgo.com/"), "sitemap missing homepage");
require(robots.includes("Sitemap: https://dappgo.com/sitemap.xml"), "robots sitemap drift");
require(html.includes('<link rel="sitemap" type="application/xml" href="/sitemap.xml" />'), "homepage sitemap link missing");
for (const [name, value] of Object.entries(expectedHeaders)) {
  require(headers.required_headers?.[name] === value, `security header contract drift: ${name}`);
}
require(headers.conditional_headers?.["Strict-Transport-Security"] === "max-age=31536000; includeSubDomains", "HSTS contract drift");
require(headers.deployment_status === "contract-only-until-live-header-check", "security header deployment status must be explicit");
require(llms.includes("https://dappgo.com/config/product-catalog.json"), "llms missing catalog link");

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({
  ok: true,
  products: products.length,
  routes: seen.size,
  live_store_links: storeUrls.size,
  sitemap_urls: sitemapUrls.length,
  security_header_contract: headers.deployment_status
}, null, 2));
