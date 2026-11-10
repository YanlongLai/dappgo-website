#!/usr/bin/env node
// Render published headlines only. Load and validate both markets before changing any files.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, replaceRegion } from "./lib/home-html.mjs";
import { load } from "./lib/market-data.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const markets = ["us", "tw"];
const origin = "https://news.dappgo.com";
export const GENERATED = "<!-- dappgo:generated-stock-page -->";
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;

export function normalizeSymbol(market, value) {
  let symbol = String(value).trim().toUpperCase();
  if (!markets.includes(market)) throw new Error(`Unknown market: ${market}`);
  if (market === "tw") symbol = symbol.replace(/\.TW(?:O)?$/, "");
  if (!/^[A-Z0-9.]{1,10}$/.test(symbol) || /^\.+$/.test(symbol) || (market === "tw" && !/^\d+$/.test(symbol))) {
    throw new Error(`${market}: invalid stock symbol ${JSON.stringify(value)}`);
  }
  return symbol;
}

function newestUnique(items) {
  const seen = new Set();
  return items.sort((a, b) => compare(b.published_at_utc, a.published_at_utc) || compare(a.url, b.url) || compare(a.symbol, b.symbol))
    .filter((item) => !seen.has(item.url) && seen.add(item.url));
}

export function marketNews(market, payload) {
  const symbols = new Set();
  const companies = Object.entries(payload.ticker_data || {}).map(([rawSymbol, ticker]) => {
    const symbol = normalizeSymbol(market, rawSymbol);
    if (symbols.has(symbol)) throw new Error(`${market}: duplicate normalized symbol ${symbol}`);
    symbols.add(symbol);
    const name = String(ticker.name || symbol);
    const stories = newestUnique((ticker.news || [])
      .filter((item) => item.url && /^https:\/\//.test(item.url) && item.published_at_utc)
      .map((item) => ({
        symbol, name, url: String(item.url), source: String(item.source || ""),
        published_at_utc: String(item.published_at_utc), title: String(item.title || ""),
        title_en: item.title_en ? String(item.title_en) : null
      })));
    return { symbol, name, stories };
  }).sort((a, b) => compare(a.symbol, b.symbol));
  return {
    market, companies,
    stories: newestUnique(companies.flatMap((company) => company.stories)),
    stockPages: companies.filter((company) => company.stories.length >= 3)
  };
}

const stockHref = (model, symbol) => model.stockPages.some((company) => company.symbol === symbol)
  ? `/${model.market}/${symbol}/` : `/${model.market}/?stock=${encodeURIComponent(symbol)}`;
const headline = (story) => story.title + (story.title_en && story.title_en !== story.title ? ` (${story.title_en})` : "");

function renderStories(model, stories, pointer, stock) {
  const heading = stock ? `${stock.name} (${stock.symbol}) news / 新聞` : "Latest published headlines / 最新已發布新聞";
  const items = stories.map((story) => `  <li><a rel="noopener" href="${esc(story.url)}">${esc(headline(story))}</a> — ${esc(story.source)} · <time datetime="${esc(story.published_at_utc)}">${esc(story.published_at_utc)}</time> · <a href="${esc(stockHref(model, story.symbol))}">${esc(story.name)} (${esc(story.symbol)})</a></li>`);
  const covered = [...model.companies].filter((company) => company.stories.length)
    .sort((a, b) => b.stories.length - a.stories.length || compare(a.symbol, b.symbol)).slice(0, 10);
  return `<h2>${esc(heading)}</h2>
<p>Published report / 已發布報告：<time datetime="${esc(pointer.generated_at_utc)}">${esc(pointer.report_date)} · ${esc(pointer.generated_at_utc)}</time></p>
<ul>
${items.join("\n")}
</ul>` + (stock ? "" : `
<h3>Most-covered companies / 新聞最多的公司</h3>
<ul>
${covered.map((company) => `  <li><a href="${esc(stockHref(model, company.symbol))}">${esc(company.name)} (${esc(company.symbol)})</a> · ${company.stories.length}</li>`).join("\n")}
</ul>`);
}

function replaceOne(html, pattern, replacement, label) {
  let count = 0;
  const result = html.replace(pattern, (...args) => { count++; return replacement(...args); });
  if (count !== 1) throw new Error(`Expected one ${label}, found ${count}`);
  return result;
}

export function renderNewsPage(template, model, pointer, stock = null) {
  const marketName = model.market === "us" ? "US stock" : "Taiwan stock";
  const zhMarket = model.market === "us" ? "美股" : "台股";
  const stories = stock ? stock.stories : model.stories.slice(0, 30);
  const count = stock ? stories.length : model.stories.length;
  const name = stock ? `${stock.name} (${stock.symbol}) news — DappGo News / ${stock.name} (${stock.symbol}) 新聞` : `DappGo ${marketName} news / ${zhMarket}新聞`;
  const description = `${name}. ${pointer.report_date} report: ${count} published stories. / ${pointer.report_date} 報告：${count} 則已發布新聞。`;
  const url = `${origin}/${model.market}/${stock ? `${stock.symbol}/` : ""}`;
  let html = replaceRegion(template, "dappgo:prerender", renderStories(model, stories, pointer, stock));
  html = replaceOne(html, /<meta name="description" content="[^"]*">/g, () => `<meta name="description" content="${esc(description)}">`, "description");
  html = replaceOne(html, /\bdata-stock-pages="[^"]*"/g, () => `data-stock-pages="${esc(model.stockPages.map((company) => company.symbol).join(" "))}"`, "stock-page list");
  const structured = {
    "@context": "https://schema.org", "@type": "CollectionPage", url, name, description,
    inLanguage: ["en", "zh-Hant"], dateModified: pointer.generated_at_utc,
    mainEntity: {
      "@type": "ItemList", numberOfItems: stories.length,
      itemListElement: stories.map((story, index) => ({
        "@type": "ListItem", position: index + 1,
        item: { "@type": "NewsArticle", headline: headline(story), url: story.url, datePublished: story.published_at_utc, publisher: { "@type": "Organization", name: story.source } }
      }))
    }
  };
  const json = JSON.stringify(structured).replace(/[<>&\u2028\u2029]/g, (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`);
  html = replaceRegion(html, "dappgo:news-jsonld", `  <script type="application/ld+json">${json}</script>`);
  if (stock) {
    html = replaceOne(html, /<link rel="canonical" href="[^"]*">/g, () => `<link rel="canonical" href="${esc(url)}">`, "canonical");
    html = replaceOne(html, /<title>[\s\S]*?<\/title>/g, () => `<title>${esc(name)}</title>`, "title");
    html = replaceOne(html, /(<h1\b[^>]*\bdata-company-name[^>]*>)[\s\S]*?(<\/h1>)/g, (_, start, end) => start + esc(stock.name) + end, "company heading");
    html = html.replace(/\b(href|src)="\.\.\/assets\//g, '$1="/assets/');
    html = html.replace("<!doctype html>", `<!doctype html>\n${GENERATED}`);
  }
  return html;
}

export function renderSitemap(models) {
  const urls = ["tw", "us"].map((market) => `  <url>\n    <loc>${origin}/${market}/</loc>\n    <changefreq>hourly</changefreq>\n    <priority>0.9</priority>\n  </url>`);
  urls.push(`  <url>\n    <loc>${origin}/contact/</loc>\n  </url>`);
  for (const model of models) {
    for (const stock of model.stockPages) {
      const lastmod = stock.stories[0].published_at_utc.slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) throw new Error(`${model.market}/${stock.symbol}: invalid newest story date`);
      urls.push(`  <url>\n    <loc>${origin}/${model.market}/${esc(stock.symbol)}/</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;

function applyChanges(root, updates, removals) {
  if (!updates.length && !removals.length) return;
  const stage = fs.mkdtempSync(path.join(root, ".news-html-stage-"));
  const operations = [];
  const createdDirectories = new Set();
  try {
    // Stage every byte before replacing any published file; backups allow rollback on I/O errors.
    const staged = updates.map(([file, html], index) => {
      const temporary = path.join(stage, `new-${index}`);
      fs.writeFileSync(temporary, html);
      return { file, temporary };
    });
    for (const { file, temporary } of [...staged, ...removals]) {
      const operation = { file, backup: path.join(stage, `old-${operations.length}`), saved: false, installed: false };
      operations.push(operation);
      const directory = path.dirname(file);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
        createdDirectories.add(directory);
      }
      if (fs.existsSync(file)) { fs.renameSync(file, operation.backup); operation.saved = true; }
      if (temporary) { fs.renameSync(temporary, file); operation.installed = true; }
    }
    for (const { file } of removals) {
      const directory = path.dirname(file);
      // Keep any manually added files; only remove a generated directory when it is empty.
      if (!fs.readdirSync(directory).length) fs.rmdirSync(directory);
    }
  } catch (error) {
    for (const operation of operations.reverse()) {
      if (operation.installed) fs.unlinkSync(operation.file);
      if (operation.saved) {
        fs.mkdirSync(path.dirname(operation.file), { recursive: true });
        fs.renameSync(operation.backup, operation.file);
      }
    }
    for (const directory of createdDirectories) if (fs.existsSync(directory) && !fs.readdirSync(directory).length) fs.rmdirSync(directory);
    throw error;
  } finally {
    fs.rmSync(stage, { recursive: true, force: true });
  }
}

export async function buildNewsHtml({ root = repositoryRoot, sources, check = false } = {}) {
  // No rendering, cleanup or writes until both immutable payloads have loaded successfully.
  const loaded = sources || Object.fromEntries(await Promise.all(markets.map(async (market) => [market, await load(market)])));
  const models = markets.map((market) => {
    const { pointer, payload } = loaded[market];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(pointer.report_date || "") || !/^\d{4}-\d{2}-\d{2}T.*Z$/.test(pointer.generated_at_utc || "")) throw new Error(`${market}: missing report date or generation time`);
    return { ...marketNews(market, payload), pointer };
  });
  const planned = new Map();
  const removals = [];
  const summary = {};
  for (const model of models) {
    const directory = path.join(root, "news", model.market);
    const landing = path.join(directory, "index.html");
    const template = fs.readFileSync(landing, "utf8");
    planned.set(landing, renderNewsPage(template, model, model.pointer));
    summary[model.market] = { pages: model.stockPages.length, written: 0, removed: 0 };
    for (const stock of model.stockPages) {
      const stockDirectory = path.join(directory, stock.symbol);
      const file = path.join(stockDirectory, "index.html");
      const directoryStat = fs.lstatSync(stockDirectory, { throwIfNoEntry: false });
      if (directoryStat && (!directoryStat.isDirectory() || directoryStat.isSymbolicLink())) throw new Error(`Unsafe stock directory: ${stockDirectory}`);
      const fileStat = fs.lstatSync(file, { throwIfNoEntry: false });
      if (fileStat && (!fileStat.isFile() || fileStat.isSymbolicLink() || !read(file).includes(GENERATED))) throw new Error(`Refusing to overwrite unmarked stock page: ${file}`);
      planned.set(file, renderNewsPage(template, model, model.pointer, stock));
    }
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory() || model.stockPages.some((stock) => stock.symbol === entry.name)) continue;
      const file = path.join(directory, entry.name, "index.html");
      if (fs.existsSync(file) && fs.lstatSync(file).isFile() && !fs.lstatSync(file).isSymbolicLink() && read(file).includes(GENERATED)) removals.push({ file, market: model.market });
    }
  }
  planned.set(path.join(root, "news/sitemap.xml"), renderSitemap(models));
  const bytes = [...planned.values()].reduce((total, html) => total + Buffer.byteLength(html), 0);
  if (bytes >= 2_000_000) throw new Error(`Generated news HTML and sitemap exceed the 2 MB budget (${bytes} bytes)`);
  const updates = [...planned].filter(([file, html]) => read(file) !== html);
  for (const [file] of updates) {
    const match = file.match(/[/\\]news[/\\](us|tw)[/\\][^/\\]+[/\\]index\.html$/);
    if (match) summary[match[1]].written++;
  }
  for (const { market } of removals) summary[market].removed++;
  const changedPaths = [...updates.map(([file]) => file), ...removals.map(({ file }) => file)].map((file) => path.relative(root, file).split(path.sep).join("/")).sort(compare);
  if (!check) applyChanges(root, updates, removals);
  return { summary, changedPaths, bytes };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const check = process.argv.includes("--check");
    const result = await buildNewsHtml({ check });
    if (check) {
      if (result.changedPaths.length) { console.log(result.changedPaths.join("\n")); process.exitCode = 1; }
    } else {
      console.log(`News HTML: ${markets.map((market) => `${market} ${result.summary[market].written} pages written / ${result.summary[market].removed} removed (${result.summary[market].pages} total)`).join("; ")}; ${result.changedPaths.length} files changed; ${result.bytes} bytes.`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
