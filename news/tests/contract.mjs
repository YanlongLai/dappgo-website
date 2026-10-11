import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const files = ["index.html", "tw/index.html", "us/index.html", "assets/news.css", "assets/news.js", "_headers", "_routes.json", "wrangler.toml", "robots.txt", "sitemap.xml", "llms.txt", "functions/api/markets/[market]/dashboard/[file].js"];
for (const file of files) assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`);

const script = fs.readFileSync(path.join(root, "assets/news.js"), "utf8");
assert.match(script, /latest\.json/);
assert.match(script, /data_url_v2/);
assert.match(script, /data-\[a-f0-9\]\{12,64\}/);
assert.match(script, /\/api\/markets\//);
assert.match(script, /image_url/);
assert.match(script, /is-text-only/);
assert.doesNotMatch(script, /raw\.githubusercontent\.com|news\.google\.com\/rss|finnhub\.io\/api/);

const proxy = fs.readFileSync(path.join(root, "functions/api/markets/[market]/dashboard/[file].js"), "utf8");
assert.match(proxy, /data\.dappgo\.com/);
assert.match(proxy, /MARKETS = new Set\(\["us", "tw"\]\)/);
assert.match(proxy, /FILE_PATTERN/);
assert.doesNotMatch(proxy, /context\.request\.url|fetch\(.*params/);

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
assert.match(robots, /Disallow: \/api\//);
assert.match(robots, /news\.dappgo\.com\/sitemap\.xml/);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
assert.match(sitemap, /news\.dappgo\.com\/tw\//);
assert.match(sitemap, /news\.dappgo\.com\/us\//);
const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
assert.match(llms, /formal DappGo market pointer/);

for (const route of ["tw/index.html", "us/index.html"]) {
  const html = fs.readFileSync(path.join(root, route), "utf8");
  assert.match(html, /data-news-app/);
  assert.match(html, /data-market="(tw|us)"/);
  assert.match(html, /\.\.\/assets\/news\.css\?v=[a-z0-9-]+/i);
  assert.match(html, /\.\.\/assets\/news\.js\?v=[a-z0-9-]+/i);
  assert.match(html, /data-stock-search-mobile/);
  assert.match(html, /data-mobile-stock-select/);
  assert.match(html, /data-language="zh"/);
  assert.match(html, /data-language="en"/);
  assert.match(html, /data-i18n="stockIndex"/);
  assert.match(html, /data-i18n-placeholder="searchStock"/);
  assert.match(html, /data-i18n-html="heroTitle"/);
  assert.doesNotMatch(html, /class="mobile-picker"/);
}

const css = fs.readFileSync(path.join(root, "assets/news.css"), "utf8");
assert.match(css, /\.skeletons\[hidden\]\s*\{[^}]*display:\s*none\s*!important/s);
assert.match(css, /\.mobile-stock-tools\s*\{\s*display:\s*none/s);
assert.match(css, /@media\s*\(max-width:\s*620px\)[\s\S]*\.mobile-stock-tools\s*\{\s*display:\s*grid/s);
assert.match(css, /\.mast-tools\s*\{/);
assert.match(css, /\.language-switch\s*\{/);
assert.match(css, /\.language-switch button\[aria-pressed="true"\]/);

assert.match(script, /mobileSearch/);
assert.match(script, /mobileSelect/);
assert.match(script, /data-stock-search-mobile/);
assert.match(script, /data-mobile-stock-select/);
assert.match(script, /els\.mobileSelect\.innerHTML/);
assert.match(script, /dappgo-news-language/);
assert.match(script, /data-language/);
assert.match(script, /document\.documentElement\.lang/);
assert.match(script, /function labels\(\)/);
assert.match(script, /function applyLanguage\(\)/);
assert.match(script, /Intl\.DateTimeFormat/);

console.log(`news reader contract: passed (${files.length} files)`);
