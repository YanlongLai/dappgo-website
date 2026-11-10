import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const stockRoutes = ["us", "tw"].flatMap((market) => fs.readdirSync(path.join(root, market), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `${market}/${entry.name}/index.html`)
  .filter((route) => fs.existsSync(path.join(root, route)) && fs.readFileSync(path.join(root, route), "utf8").includes("<!-- dappgo:generated-stock-page -->")));
const readerRoutes = ["us/index.html", "tw/index.html", ...stockRoutes];
const files = ["index.html", "tw/index.html", "us/index.html", "assets/news.css", "assets/news.js", "_headers", "_routes.json", "wrangler.toml", "robots.txt", "sitemap.xml", "llms.txt", "ads.txt", "functions/api/markets/[market]/dashboard/[file].js"];
for (const file of files) assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`);

const adsTxt = fs.readFileSync(path.join(root, "ads.txt"), "utf8");
assert.equal(adsTxt.replace(/\r\n/g, "\n"), "google.com, pub-7851819017318644, DIRECT, f08c47fec0942fa0\n", "ads.txt must contain the active publisher declaration and final newline");
assert.ok(!adsTxt.startsWith("\uFEFF"), "ads.txt must not contain a BOM");

const landing = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const route of ["index.html", ...readerRoutes]) {
  const html = fs.readFileSync(path.join(root, route), "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const loaders = [...html.matchAll(/<script\b[^>]*\bsrc="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-7851819017318644"[^>]*><\/script>/g)];
  assert.equal(loaders.length, 1, `${route}: one exact publisher loader`);
  assert.ok(head.includes(loaders[0][0]), `${route}: loader belongs in head`);
  assert.match(loaders[0][0], /\basync\b/);
  assert.match(loaders[0][0], /crossorigin="anonymous"/);
}
assert.match(landing, /http-equiv="refresh" content="0;url=https:\/\/news\.dappgo\.com\/us\/"/);
assert.match(landing, /href="https:\/\/news\.dappgo\.com\/us\/"/);
assert.match(landing, /name="robots" content="noindex"/);
assert.doesNotMatch(landing, /<script>/);
assert.equal(fs.readFileSync(path.join(root, "_redirects"), "utf8").trim(), "/ /us/?lang=en 302");
assert.doesNotMatch(landing, /url=\/tw\//);

const script = fs.readFileSync(path.join(root, "assets/news.js"), "utf8");
assert.match(script, /latest\.json/);
assert.match(script, /data_url_v2/);
assert.match(script, /data-\[a-f0-9\]\{12,64\}/);
assert.match(script, /\/api\/markets\//);
assert.match(script, /image_url/);
assert.match(script, /is-text-only/);
assert.match(script, /compactMobileName/);
assert.match(script, /mobileLabel/);
assert.doesNotMatch(script, /articleThumbnail|文章縮圖|Article thumbnail/);
assert.doesNotMatch(script, /editionTop|editionName|editionTime|heroTitle|heroBody/);
assert.doesNotMatch(script, /<figcaption>/);
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
const headers = fs.readFileSync(path.join(root, "_headers"), "utf8");
assert.ok(headers.includes("script-src 'self' https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js;"));
assert.doesNotMatch(headers, /script-src[^;]*(?:'unsafe-inline'|'unsafe-eval'|\*)/);
assert.match(headers, /\/tw\/\*[\s\S]*Cache-Control: public, max-age=0, must-revalidate/);
assert.match(headers, /\/us\/\*[\s\S]*Cache-Control: public, max-age=0, must-revalidate/);

for (const route of readerRoutes) {
  const html = fs.readFileSync(path.join(root, route), "utf8");
  assert.match(html, /data-news-app/);
  assert.match(html, /data-market="(tw|us)"/);
  assert.match(html, /(?:\.\.\/|\/)assets\/news\.css\?v=[a-z0-9-]+/i);
  assert.match(html, /(?:\.\.\/|\/)assets\/news\.js\?v=[a-z0-9-]+/i);
  assert.match(html, /data-stock-search-mobile/);
  assert.match(html, /data-mobile-stock-select/);
  assert.match(html, /data-language="zh"/);
  assert.match(html, /data-language="en"/);
  assert.match(html, /data-i18n="stockIndex"/);
  assert.match(html, /data-i18n-placeholder="searchStock"/);
  assert.match(html, /news\.js\?v=20261110-prerender/);
  assert.match(html, /news\.css\?v=20261110-prerender/);
  assert.match(html, /news-data\.js\?v=20261028-contact/);
  assert.match(html, /data-i18n="navUs">US/);
  assert.match(html, /data-i18n="navTw">TW/);
  assert.ok(html.indexOf('data-i18n="navUs"') < html.indexOf('data-i18n="navTw"'), `${route}: US navigation must precede TW`);
  assert.doesNotMatch(html, /data-company-symbol|data-i18n="companyIntro"/);
  assert.match(html, /data-ai-analysis/);
  assert.match(html, /assets\/engagement\.js\?v=20261028-contact/);
  assert.match(html, /data-analytics-choice/);
  assert.doesNotMatch(html, /data-range=/);
  assert.match(html, /data-count/);
  assert.match(html, /data-load-more/);
  assert.match(html, /skeleton-card/);
  assert.match(html, /data-skeletons class="skeletons" aria-hidden="true" hidden/);
  assert.match(html, /data-more-skeletons class="skeletons" aria-hidden="true" hidden/);
  assert.match(html, /class="story skeleton-card has-media"/);
  assert.match(html, /skeleton-avatar/);
  assert.match(html, /data-load-status role="status"/);
  assert.doesNotMatch(html, /class="edition"|data-i18n="edition(?:Top|Name|Time)"|class="hero"|data-i18n(?:-html)?="hero(?:Title|Body)"/);
  assert.doesNotMatch(html, /thumbnail|縮圖/i);
  assert.doesNotMatch(html, /class="mobile-picker"/);
  assert.match(html, /<meta name="robots" content="index,follow">/);
  const canonical = `https://news.dappgo.com/${route.replace(/index\.html$/, "")}`;
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), `${route}: self canonical`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${route}: sitemap entry`);
  const prerender = html.match(/<section data-stories\b[^>]*><!-- dappgo:prerender:start -->([\s\S]*?)<!-- dappgo:prerender:end --><\/section>/)?.[1];
  assert.ok(prerender, `${route}: fallback is inside the runtime replacement target`);
  assert.match(prerender, /<h2>.+<\/h2>/);
  assert.match(prerender, /<time datetime="\d{4}-\d{2}-\d{2}T/);
  assert.match(prerender, /<ul>/);
  assert.doesNotMatch(prerender, /<script\b|<img\b|<iframe\b/);
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]);
  assert.equal(data["@type"], "CollectionPage");
  assert.equal(data.url, canonical);
  assert.equal(data.mainEntity["@type"], "ItemList");
  assert.equal(data.mainEntity.numberOfItems, data.mainEntity.itemListElement.length);
  assert.match(data.description, /\d{4}-\d{2}-\d{2} report: \d+ published stories/);
  assert.match(data.description, /\d+ 則已發布新聞/);
  const market = route.split("/")[0];
  const listedSymbols = html.match(/data-stock-pages="([^"]*)"/)[1].split(/\s+/).filter(Boolean);
  const generatedSymbols = stockRoutes.filter((stockRoute) => stockRoute.startsWith(`${market}/`)).map((stockRoute) => stockRoute.split("/")[1]).sort();
  assert.deepEqual(listedSymbols, generatedSymbols, `${route}: generated-page directory matches the client list`);
  if (stockRoutes.includes(route)) {
    assert.doesNotMatch(html, /(?:href|src)="\.\.\//);
    assert.ok(data.mainEntity.numberOfItems >= 3, `${route}: stock threshold`);
    assert.match(html, /<title>[^<]+ news — DappGo News \/ [^<]+ 新聞<\/title>/);
  }
}

const generatedBytes = readerRoutes.reduce((total, route) => total + fs.statSync(path.join(root, route)).size, Buffer.byteLength(sitemap));
assert.ok(generatedBytes < 2_000_000, `generated news exceeds 2 MB: ${generatedBytes}`);

const css = fs.readFileSync(path.join(root, "assets/news.css"), "utf8");
assert.match(css, /\.skeletons\[hidden\]\s*\{[^}]*display:\s*none\s*!important/s);
assert.match(css, /\.mobile-stock-tools\s*\{\s*display:\s*none/s);
assert.match(css, /@media\s*\(max-width:\s*620px\)[\s\S]*\.mobile-stock-tools\s*\{\s*display:\s*grid/s);
assert.match(css, /\.mast-tools\s*\{/);
assert.match(css, /\.language-switch\s*\{/);
assert.match(css, /\.language-switch button\[aria-pressed="true"\]/);
assert.match(css, /@keyframes news-shimmer/);
assert.match(css, /\.load-more\s*\{/);

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
assert.match(script, /navigator\.languages/);
assert.match(script, /navigator\.language/);
assert.match(script, /const browserLanguage/);
assert.match(script, /validLanguage\(params\.get\("lang"\)\) \|\| savedLanguage \|\| \(market === "us" \? browserLanguage : defaultLanguage\)/);
assert.match(script, /function syncViewUrl\(\)/);
assert.match(script, /history\.replaceState/);
assert.match(script, /addEventListener\("popstate"/);
assert.match(script, /params\.set\("stock", state\.stock\)/);
assert.doesNotMatch(script, /target="_blank"/);

console.log(`news reader contract: passed (${files.length} required files, ${stockRoutes.length} stock pages, ${generatedBytes} generated bytes)`);
