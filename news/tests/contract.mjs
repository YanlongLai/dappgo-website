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
  assert.match(html, /\.\.\/assets\/news\.js/);
}

console.log(`news reader contract: passed (${files.length} files)`);
