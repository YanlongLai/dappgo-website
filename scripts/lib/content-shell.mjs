// Shared document shell for the reading pages (report archive, guides, about and policy pages).
// `ads: true` adds the AdSense loader and its CSP sources; it is set only for article-type pages
// (daily reports and guides), never for hubs, legal, contact or app pages.
import { BRAND_HTML, displayFontPreload, themeColorMeta } from "./brand.mjs";

export const ORIGIN = "https://dappgo.com";
const GA_ID = "G-C9K7KCERPP";
const ADS_CLIENT = "ca-pub-7851819017318644";
export const ASSET_VERSION = "20261126-brand";

export const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const localPath = (lang, enPath) => (lang === "zh" ? `/zh${enPath}` : enPath);

const CSP_BASE =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://cloudflareinsights.com; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://docs.google.com";
// Same policy as the homepage, which already carries the AdSense loader.
const CSP_ADS =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://www.google.com https://static.cloudflareinsights.com https://ep2.adtrafficquality.google; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com https://cloudflareinsights.com https://*.adtrafficquality.google; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://fundingchoicesmessages.google.com https://ep2.adtrafficquality.google; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://docs.google.com";

export const UI = {
  en: {
    htmlLang: "en", ogLocale: "en_US", ogLocaleAlt: "zh_TW", skip: "Skip to content", homeLabel: "DappGo home", home: "Home",
    reports: "Reports", guides: "Guides", apps: "Apps", about: "About", langName: "中文", langLabel: "切換至繁體中文",
    footReports: "Daily reports", footGuides: "Guides", footCompany: "DappGo", footLegal: "Support and legal",
    us: "US stocks", tw: "Taiwan stocks", options: "US options", allReports: "All reports", allGuides: "All guides",
    editorial: "Editorial policy and methodology", ai: "How we use AI", contact: "Contact", support: "Support", privacy: "Privacy", terms: "Terms",
    crumbs: "Breadcrumb",
    disclaimer: "DappGo publishes research and educational material only. Nothing on this page is investment advice, a recommendation, or an offer to buy or sell any security. Prices can be delayed and may contain errors; check them against your broker or the exchange before acting. Past results do not predict future results."
  },
  zh: {
    htmlLang: "zh-Hant", ogLocale: "zh_TW", ogLocaleAlt: "en_US", skip: "跳至主要內容", homeLabel: "DappGo 首頁", home: "首頁",
    reports: "每日報告", guides: "閱讀指南", apps: "App", about: "關於", langName: "EN", langLabel: "Switch to English",
    footReports: "每日報告", footGuides: "閱讀指南", footCompany: "DappGo", footLegal: "支援與法律",
    us: "美股", tw: "台股", options: "美股選擇權", allReports: "全部報告", allGuides: "全部指南",
    editorial: "編輯政策與方法", ai: "AI 使用說明", contact: "聯絡我們", support: "客服支援", privacy: "隱私權政策", terms: "服務條款",
    crumbs: "頁面路徑",
    disclaimer: "DappGo 發布的內容僅供研究與學習參考，不構成投資建議、推薦或任何證券的買賣要約。報價可能延遲或有誤，實際操作前請以券商或交易所資料為準。過去結果不代表未來表現。"
  }
};

export const GUIDE_LINKS = [
  { slug: "how-to-read-the-daily-stock-report", en: "How to read the daily stock report", zh: "如何閱讀每日股票報告" },
  { slug: "how-to-read-the-options-report", en: "How to read the options report", zh: "如何閱讀選擇權報告" },
  { slug: "how-dappgo-computes-signals", en: "How DappGo computes its signals", zh: "DappGo 訊號怎麼算" },
  { slug: "glossary", en: "Glossary", zh: "名詞解釋" }
];

function breadcrumbs(lang, crumbs) {
  const items = crumbs.map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.href}">${esc(c.name)}</a></li>`)).join("");
  return `<nav class="crumbs" aria-label="${esc(UI[lang].crumbs)}"><ol>${items}</ol></nav>`;
}

/**
 * @param {object} page  lang, path (English path, e.g. "/guides/glossary/"), title, description, section ("reports"|"guides"|"about"|null),
 *                       crumbs [{name, href}], body (HTML), ads (boolean), jsonld (array of objects), ogType, generator (script name)
 */
export function renderPage(page) {
  const { lang, path: enPath, title, description, crumbs, body, ads = false, jsonld = [], ogType = "article", section = null, generator } = page;
  const ui = UI[lang];
  const other = lang === "zh" ? "en" : "zh";
  const p = (target) => localPath(lang, target);
  const url = ORIGIN + p(enPath);
  const enUrl = ORIGIN + enPath;
  const zhUrl = ORIGIN + localPath("zh", enPath);
  const crumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: ORIGIN + (c.href || p(enPath)) }))
  };
  const ld = [crumbList, ...jsonld].map((o) => `    <script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
  const nav = (key, href, label) => `<a href="${href}"${section === key ? ' aria-current="page"' : ""}>${esc(label)}</a>`;
  const adsHead = ads
    ? `\n    <meta name="google-adsense-account" content="${ADS_CLIENT}" />\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}" crossorigin="anonymous"></script>`
    : "";
  return `<!doctype html>
<!-- Generated by scripts/${generator}; do not edit this file by hand. -->
<html lang="${ui.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Security-Policy" content="${ads ? CSP_ADS : CSP_BASE}" />
    <meta name="robots" content="index, follow" />
    ${themeColorMeta(lang)}
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="DappGo" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="zh-Hant" href="${zhUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${ORIGIN}/og-brand-${lang === "zh" ? "zh" : "en"}.png" />
    <meta property="og:site_name" content="DappGo" />
    <meta property="og:locale" content="${ui.ogLocale}" />
    <meta property="og:locale:alternate" content="${ui.ogLocaleAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <title>${esc(title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16 32x32" />
    <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    <link rel="manifest" href="/site.webmanifest" />
    ${displayFontPreload(lang)}
    <link rel="preload" href="/assets/home/fonts/inter-400-latin.woff2" as="font" type="font/woff2" crossorigin />${adsHead}
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "${GA_ID}");
      window.addEventListener("load", function () {
        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
        document.head.appendChild(script);
      });
    </script>
${ld}
    <link rel="stylesheet" href="/assets/home/home.css?v=${ASSET_VERSION}" />
    <link rel="stylesheet" href="/assets/content/content.css?v=${ASSET_VERSION}" />
  </head>
  <body class="doc-page">
    <a class="skip" href="#main">${esc(ui.skip)}</a>
    <header class="topbar">
      <div class="wrap topbar-inner">
        <a class="brand" href="${p("/")}" aria-label="${esc(ui.homeLabel)}">
          ${BRAND_HTML}
        </a>
        <nav class="nav" aria-label="Main">
          ${nav("reports", p("/reports/"), ui.reports)}
          ${nav("guides", p("/guides/"), ui.guides)}
          <a href="${p("/")}#products">${esc(ui.apps)}</a>
          ${nav("about", p("/about/"), ui.about)}
        </nav>
        <div class="topbar-tools">
          <a class="lang" href="${localPath(other, enPath)}" hreflang="${UI[other].htmlLang}" lang="${UI[other].htmlLang}" aria-label="${esc(ui.langLabel)}">${esc(ui.langName)}</a>
        </div>
      </div>
    </header>

    <main id="main" class="doc">
      ${breadcrumbs(lang, crumbs)}
${body}
      <p class="disclaimer">${esc(ui.disclaimer)}</p>
    </main>

    <footer class="doc-footer">
      <div class="wrap doc-footer-grid">
        <div>
          <h2>${esc(ui.footReports)}</h2>
          <nav aria-label="${esc(ui.footReports)}">
            <a href="${p("/reports/us/")}">${esc(ui.us)}</a>
            <a href="${p("/reports/tw/")}">${esc(ui.tw)}</a>
            <a href="${p("/reports/options/")}">${esc(ui.options)}</a>
            <a href="${p("/reports/")}">${esc(ui.allReports)}</a>
          </nav>
        </div>
        <div>
          <h2>${esc(ui.footGuides)}</h2>
          <nav aria-label="${esc(ui.footGuides)}">
            ${GUIDE_LINKS.map((g) => `<a href="${p(`/guides/${g.slug}/`)}">${esc(g[lang])}</a>`).join("\n            ")}
          </nav>
        </div>
        <div>
          <h2>${esc(ui.footCompany)}</h2>
          <nav aria-label="${esc(ui.footCompany)}">
            <a href="${p("/about/")}">${esc(ui.about)}</a>
            <a href="${p("/editorial-policy/")}">${esc(ui.editorial)}</a>
            <a href="${p("/ai-disclosure/")}">${esc(ui.ai)}</a>
            <a href="${p("/contact/")}">${esc(ui.contact)}</a>
          </nav>
        </div>
        <div>
          <h2>${esc(ui.footLegal)}</h2>
          <nav aria-label="${esc(ui.footLegal)}">
            <a href="/support">${esc(ui.support)}</a>
            <a href="/privacy">${esc(ui.privacy)}</a>
            <a href="/terms">${esc(ui.terms)}</a>
          </nav>
        </div>
      </div>
      <div class="wrap footer-base"><span>© 2026 DappGo</span></div>
    </footer>
  </body>
</html>
`;
}
