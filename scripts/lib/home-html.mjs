import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
export const { I18N, esc, fill, createPulseRenderer } = require("../../assets/home/home.js");

export function replaceRegion(html, name, content) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  if (html.split(start).length !== 2 || html.split(end).length !== 2) throw new Error(`Expected one ${name} region`);
  const from = html.indexOf(start) + start.length;
  const to = html.indexOf(end);
  if (to < from) throw new Error(`Reversed ${name} markers`);
  return html.slice(0, from) + "\n" + content + "\n" + html.slice(to);
}

export function appStructuredData(catalog) {
  return {
    "@context": "https://schema.org",
    "@graph": catalog.products.flatMap((product) => {
      const stores = Object.entries(product.stores).filter(([, store]) => store.status === "live");
      if (!stores.length) return [];
      return [{
        "@type": "MobileApplication",
        name: product.name,
        url: product.web_routes[0]?.url || stores[0][1].url,
        operatingSystem: stores.map(([os]) => ({ ios: "iOS", android: "Android" })[os]),
        installUrl: stores.map(([, store]) => store.url)
      }];
    })
  };
}

export function renderPulseHtml(html, pulse, lang, catalog) {
  const t = I18N[lang];
  const markets = Object.values(pulse.markets);
  const stores = Object.fromEntries(catalog.products.map((p) => [p.id, Object.entries(p.stores)
    .filter(([, store]) => store.status === "live").map(([os, store]) => ({ os, url: store.url }))]));
  // Build time, rather than wall time, keeps the committed snapshot reproducible.
  const renderer = createPulseRenderer(pulse, lang, stores, Date.parse(pulse.built_at_utc));
  html = replaceRegion(html, "pulse:status", `<span class="live-chip" data-live-chip><i aria-hidden="true"></i><span data-live-label>${esc(t.published)} · ${esc(markets.map((m) => m.report_date).sort().at(-1))}</span></span>`);
  html = replaceRegion(html, "pulse:stats", `          <dl class="hero-stats" data-hero-stats>
            <div><dt data-i18n="statMarkets">${esc(t.statMarkets)}</dt><dd>${markets.length}</dd></div>
            <div><dt data-i18n="statCovered">${esc(t.statCovered)}</dt><dd data-stat-covered>${markets.reduce((n, m) => n + (m.coverage?.covered || 0), 0)}</dd></div>
            <div><dt data-i18n="statHeadlines">${esc(t.statHeadlines)}</dt><dd data-stat-news>${pulse.news.length}</dd></div>
            <div><dt data-i18n="statVerified">${esc(t.statVerified)}</dt><dd data-stat-verified>${markets.length}/${markets.length}</dd></div>
          </dl>
          <p class="stats-date" data-report-dates>${renderer.reportDates()}</p>
          <p class="stats-note" data-i18n="researchNote">${esc(t.researchNote)}</p>`);
  html = replaceRegion(html, "pulse:board", renderer.board());
  html = replaceRegion(html, "pulse:wire", `<ol class="wire" id="wire-panel" role="tabpanel" aria-live="polite" data-wire>${renderer.wireItems("us")}</ol>
          <div data-wire-static-tw>
            <h3 class="static-wire-heading">${esc(t.newsTw)} · ${esc(pulse.markets.tw.report_date)}</h3>
            <ol class="wire">${renderer.wireItems("tw")}</ol>
          </div>`);
  for (const key of ["us", "tw"]) {
    html = html.replace(new RegExp(`(data-count="${key}">)[^<]*(</small>)`), (_, a, b) => a + pulse.news.filter((n) => n.market === key).length + b);
  }
  html = replaceRegion(html, "pulse:source", `<span data-pulse-source>${esc(fill(t.sourceLine, { built: pulse.built_at_utc.replace("T", " ").replace("Z", "") }))}</span>`);
  const json = JSON.stringify(appStructuredData(catalog), null, 2).replace(/</g, "\\u003c");
  return replaceRegion(html, "apps:jsonld", `    <script type="application/ld+json">\n${json}\n    </script>`);
}
