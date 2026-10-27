(() => {
  "use strict";

  const STALE_HOURS = 96;
  const I18N = {
    en: {
      navPulse: "Today", navProducts: "Products", navNews: "News", navBusiness: "For business",
      kicker: "DappGo Studio · Research engines that ship", heroA: "Markets,", heroB: "compiled daily.",
      heroLede: "Every trading day our engines read US stocks, Taiwan stocks and US options — prices, filings, news and options chains — check the result, then publish it to the apps below. This page shows today’s run.",
      ctaPulse: "See today’s report", ctaBusiness: "Automate your workflow",
      statMarkets: "Markets", statCovered: "Tickers covered today", statHeadlines: "Headlines on the wire", statVerified: "Payloads hash-verified",
      pulseTitle: "Today’s run", pulseLede: "Straight from the published reports. Each card opens the product that made it.",
      pulseNote: "Research and education only. Quotes may be delayed. No brokerage connection or trade execution; not personalized investment advice.",
      newsTitle: "On the wire", newsLede: "The latest headlines our engines picked up, linked to their source and to the stock in DappGo News.",
      newsUs: "US newsroom", newsTw: "Taiwan newsroom",
      productsTitle: "Where the research lands", productsLede: "Open on the web today, or take it with you.",
      engineTitle: "How a report gets made",
      p1: "Collect", p1t: "Prices, filings, news and options chains for every ticker in the universe.",
      p2: "Analyze", p2t: "Regime, breadth, valuation ranges, signals and AI readings grounded in the data.",
      p3: "Check", p3t: "Coverage, freshness and an immutable hash before anything is published.",
      p4: "Deliver", p4t: "The same verified payload feeds the web apps, mobile apps, newsroom and this page.",
      bizKicker: "Beyond our own products", bizTitle: "Run your workflow<br />like we run markets.",
      bizLede: "The pipeline behind today’s report — collect, analyze, check, deliver — works for your business too. Tell us the process; we’ll find what to automate.",
      bizCta: "Let’s talk",
      b1: "Data, connected.", b1t: "Bring scattered sources into one structured flow, with source context kept.",
      b2: "AI, with a purpose.", b2t: "Summarize, organize or draft — with review and exceptions built in.",
      b3: "Work that keeps moving.", b3t: "Schedules, publishing and monitoring that don’t depend on someone remembering.",
      footTitle: "Stay curious.<br />Stay connected.", footCta: "Get DappGo updates", support: "Support", privacy: "Privacy", terms: "Terms",
      live: "Live · {date}", stale: "Stale · {date}", staleTag: "Stale", down: "Pulse offline", loading: "Loading",
      mUs: "United States", mTw: "Taiwan", mOpt: "US options",
      nUs: "US Stocks", nTw: "Taiwan Stocks", nOpt: "Options Explorer",
      published: "Published", breadth: "Breadth", adv: "Adv/Dec", gainers: "5D leaders", losers: "5D laggards",
      today: "Today’s leaders", todayDown: "Today’s laggards", ideas: "Top-scored setups",
      sellPut: "Sell put", sellCall: "Sell call", exp: "exp", pop: "POP", ann: "ann.", iv: "IV",
      open: "Open {name}", unavailable: "Today’s pulse could not be loaded. The apps below still have the latest report.",
      regime: { neutral: "Neutral", mixed: "Mixed", bullish: "Bullish", bearish: "Bearish", risk_on: "Risk-on", risk_off: "Risk-off" },
      ago: { m: "{n}m ago", h: "{n}h ago", d: "{n}d ago" }, moreOn: "{s} in News →", source: "Source",
      web: "Web", ios: "iOS", android: "Android", soon: "soon",
      prodOptions: "Valuation ranges, options chains and scored Sell Put / Sell Call setups in one research view.",
      prodUs: "Daily research cards, company news and AI viewpoints across US equities.",
      prodTw: "Taiwan market coverage with local context and a daily research perspective.",
      prodNews: "Company news by market, kept in a clear timeline and linked to each stock.",
      prodMerge: "A different kind of number game. Drop, combine, find your next move.",
      comingSoon: "Coming soon", webApp: "Web app", webUs: "Web · US", webTw: "Web · TW",
      sourceLine: "Pulse built {built} UTC from data.dappgo.com"
    },
    zh: {
      navPulse: "今日", navProducts: "產品", navNews: "新聞", navBusiness: "企業服務",
      kicker: "DappGo Studio · 會自己出貨的研究引擎", heroA: "市場，", heroB: "每天編譯一次。",
      heroLede: "每個交易日，我們的引擎讀取美股、台股與美股選擇權——價格、財報申報、新聞與選擇權鏈——檢查結果後，發布到下方的產品。這一頁顯示的就是今天的那一次執行。",
      ctaPulse: "看今日報告", ctaBusiness: "自動化你的流程",
      statMarkets: "市場", statCovered: "今日涵蓋標的", statHeadlines: "最新頭條", statVerified: "雜湊驗證通過",
      pulseTitle: "今日執行", pulseLede: "直接取自已發布的報告。每張卡片都通往產出它的產品。",
      pulseNote: "僅供研究與教育用途。報價可能延遲。不連結券商、不執行交易，亦非個人化投資建議。",
      newsTitle: "最新頭條", newsLede: "引擎最新抓到的新聞，連到原始來源，也連到 DappGo News 的個股頁。",
      newsUs: "美股新聞", newsTw: "台股新聞",
      productsTitle: "研究的落點", productsLede: "今天就能在網頁開啟，也能帶著走。",
      engineTitle: "一份報告怎麼做出來",
      p1: "蒐集", p1t: "宇宙內每一檔標的的價格、申報、新聞與選擇權鏈。",
      p2: "分析", p2t: "市場狀態、廣度、估值區間、訊號，以及以資料為依據的 AI 解讀。",
      p3: "檢查", p3t: "發布前確認覆蓋率、新鮮度與不可變雜湊。",
      p4: "交付", p4t: "同一份驗證過的資料，供應網頁、App、新聞室與這一頁。",
      bizKicker: "不只是我們自己的產品", bizTitle: "像我們跑市場一樣<br />跑你的流程。",
      bizLede: "今日報告背後的流程——蒐集、分析、檢查、交付——同樣適用你的業務。告訴我們流程，我們找出能自動化的部分。",
      bizCta: "聊聊看",
      b1: "資料，串起來。", b1t: "把分散的來源整理成一條有結構、保留出處的流程。",
      b2: "有目的的 AI。", b2t: "摘要、整理或起草——審核與例外處理內建其中。",
      b3: "持續運轉的工作。", b3t: "排程、發布與監控，不必靠人記得下一步。",
      footTitle: "保持好奇。<br />保持連結。", footCta: "訂閱 DappGo 更新", support: "支援", privacy: "隱私權", terms: "條款",
      live: "即時 · {date}", stale: "資料較舊 · {date}", staleTag: "資料較舊", down: "脈動離線", loading: "載入中",
      mUs: "美國", mTw: "台灣", mOpt: "美股選擇權",
      nUs: "US Stocks", nTw: "Taiwan Stocks", nOpt: "Options Explorer",
      published: "發布", breadth: "廣度", adv: "漲跌比", gainers: "5 日領漲", losers: "5 日領跌",
      today: "今日領漲", todayDown: "今日領跌", ideas: "高分策略",
      sellPut: "賣 Put", sellCall: "賣 Call", exp: "到期", pop: "勝率", ann: "年化", iv: "IV",
      open: "開啟 {name}", unavailable: "今日脈動暫時無法載入，下方產品仍有最新報告。",
      regime: { neutral: "中性", mixed: "分歧", bullish: "偏多", bearish: "偏空", risk_on: "風險偏好", risk_off: "避險" },
      ago: { m: "{n} 分鐘前", h: "{n} 小時前", d: "{n} 天前" }, moreOn: "{s} 新聞 →", source: "來源",
      web: "網頁", ios: "iOS", android: "Android", soon: "即將推出",
      prodOptions: "估值區間、選擇權鏈，以及評分過的 Sell Put / Sell Call 策略，集中在一個研究畫面。",
      prodUs: "美股每日研究卡、公司新聞與 AI 觀點。",
      prodTw: "台股涵蓋，在地脈絡與每日研究視角。",
      prodNews: "依市場整理的公司新聞，時間軸清楚，並連到個股。",
      prodMerge: "不一樣的數字遊戲。落下、合併、找出下一步。",
      comingSoon: "即將推出", webApp: "網頁版", webUs: "網頁 · 美股", webTw: "網頁 · 台股",
      sourceLine: "脈動建立於 {built} UTC，來源 data.dappgo.com"
    }
  };

  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  const pct = (v) => (v == null ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(2)}%`);
  const tone = (v) => (v > 0 ? "up" : v < 0 ? "down" : "");
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* optional */ } } };

  let lang = store.get("dg-lang") || (/^zh/i.test(navigator.language) ? "zh" : "en");
  let pulse = null;
  let failed = false;
  const t = () => I18N[lang];

  function applyStatic() {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => { const v = t()[el.dataset.i18n]; if (typeof v === "string") el.textContent = v; });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t()[el.dataset.i18nHtml]; });
    $("[data-lang-toggle]").textContent = lang === "zh" ? "EN" : "中文";
  }

  const isStale = (m) => !m || Date.now() - Date.parse(m.generated_at_utc) > STALE_HOURS * 3600e3;
  const fmtTime = (iso) => new Date(iso).toLocaleString(lang === "zh" ? "zh-TW" : "en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  const regimeClass = (r) => (/bull|risk_on/.test(r) ? "pill-bull" : /bear|risk_off/.test(r) ? "pill-bear" : /mixed/.test(r) ? "pill-mixed" : "pill-neutral");

  // Store destinations come from the static product catalog markup, the single checked copy of the links.
  function storeLinks(productId) {
    const links = [...document.querySelectorAll(`[data-product="${productId}"] a[data-store]`)];
    return `<span class="stores">${links.map((a) => `<a class="store" href="${esc(a.href)}" target="_blank" rel="noopener noreferrer">${esc(t()[a.dataset.store])}</a>`).join("")}</span>`;
  }

  function moverList(title, rows) {
    return `<div><h4>${esc(title)}</h4><ul>${rows.map((r) => `<li><span>${esc(r.symbol)}${/^\d+$/.test(r.symbol) && r.name ? ` ${esc(r.name)}` : ""}</span><span class="${tone(r.return_pct)}">${pct(r.return_pct)}</span></li>`).join("")}</ul></div>`;
  }

  function cardHead(label, name, m) {
    const stale = isStale(m);
    return `<div class="card-top"><div><div class="card-market">${esc(label)}</div><div class="card-name">${esc(name)}</div></div>
      <div class="card-date"><b>${esc(m.report_date)}</b>${esc(t().published)} ${esc(fmtTime(m.generated_at_utc))}${stale ? `<br /><span class="pill pill-stale">${esc(t().staleTag)}</span>` : ""}</div></div>`;
  }

  function equityCard(key, productId, label, name) {
    const m = pulse.markets[key];
    const reg = m.regime || "neutral";
    const breadth = Math.round((m.breadth_score ?? 0) * 100);
    const line = lang === "zh" ? m.one_liner.zh || m.one_liner.en : m.one_liner.en || m.one_liner.zh;
    return `<article class="card">${cardHead(label, name, m)}
      <div class="regime-row"><span class="pill ${regimeClass(reg)}">${esc(t().regime[reg] || reg)}</span>
        <div class="meter"><div class="meter-label"><span>${esc(t().breadth)}</span><span>${breadth}% · ${esc(t().adv)} ${esc(m.advance_decline_ratio ?? "—")}</span></div><div class="meter-bar"><i style="width:${Math.min(100, Math.max(0, breadth))}%"></i></div></div></div>
      ${line ? `<p class="one-liner">${esc(line)}</p>` : ""}
      <div class="movers">${moverList(t().gainers, m.gainers.slice(0, 3))}${moverList(t().losers, m.losers.slice(0, 3))}</div>
      <div class="card-actions"><a class="open-link" href="${esc(m.web_url)}">${esc(fill(t().open, { name }))} <span aria-hidden="true">↗</span></a>${storeLinks(productId)}</div>
    </article>`;
  }

  function optionsCard() {
    const m = pulse.markets.options;
    const name = t().nOpt;
    const ideas = m.ideas.map((i) => `<li><b>${esc(i.symbol)}</b><span>${esc(i.strategy === "sell_call" ? t().sellCall : t().sellPut)} $${esc(i.strike)} · ${esc(i.dte)}d</span><span class="score">${esc(i.score)}</span>
      <small>${esc(t().exp)} ${esc(i.expiry)} · ${esc(t().pop)} ${esc(i.pop)}% · ${esc(t().iv)} ${esc(i.iv)}% · ${esc(t().ann)} ${esc(i.annualized)}%</small></li>`).join("");
    return `<article class="card">${cardHead(t().mOpt, name, m)}
      <div><div class="movers"><div><h4>${esc(t().ideas)}</h4></div></div><ul class="ideas">${ideas}</ul></div>
      <div class="movers">${moverList(t().today, m.gainers.slice(0, 3))}${moverList(t().todayDown, m.losers.slice(0, 3))}</div>
      <div class="card-actions"><a class="open-link" href="${esc(m.web_url)}">${esc(fill(t().open, { name }))} <span aria-hidden="true">↗</span></a>${storeLinks("options-explorer")}</div>
    </article>`;
  }

  function renderPulse() {
    const chip = $("[data-live-chip]");
    const label = $("[data-live-label]");
    if (failed) {
      chip.dataset.state = "down"; label.textContent = t().down;
      $("[data-board]").innerHTML = `<article class="card"><p class="card-empty">${esc(t().unavailable)}</p></article>`;
      return;
    }
    if (!pulse) { label.textContent = t().loading; return; }
    const markets = Object.values(pulse.markets);
    const latest = markets.map((m) => m.report_date).sort().pop();
    const anyStale = markets.some(isStale);
    chip.dataset.state = anyStale ? "stale" : "live";
    label.textContent = fill(anyStale ? t().stale : t().live, { date: latest });

    $("[data-board]").innerHTML = equityCard("us", "us-stocks", t().mUs, t().nUs) + equityCard("tw", "taiwan-stocks", t().mTw, t().nTw) + optionsCard();
    $("[data-stat-covered]").textContent = markets.reduce((n, m) => n + (m.coverage?.covered || 0), 0);
    $("[data-stat-news]").textContent = pulse.news.length;
    $("[data-stat-verified]").textContent = `${markets.length}/${markets.length}`;
    $("[data-pulse-source]").textContent = fill(t().sourceLine, { built: pulse.built_at_utc.replace("T", " ").replace("Z", "") });

    const tape = [["US", pulse.markets.us], ["TW", pulse.markets.tw], ["OPT", pulse.markets.options]].flatMap(([tag, m]) =>
      [...m.gainers, ...m.losers].map((r) => `<a class="tape-item" href="${esc(m.web_url)}"><em>${tag}</em>${esc(r.symbol)} <span class="${tone(r.return_pct)}">${pct(r.return_pct)}</span></a>`));
    $("[data-tape]").innerHTML = tape.join("") + tape.join("").replace(/<a /g, '<a aria-hidden="true" tabindex="-1" ');

    renderWire();
  }

  function ago(iso) {
    const mins = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
    const a = t().ago;
    return mins < 60 ? fill(a.m, { n: mins }) : mins < 2880 ? fill(a.h, { n: Math.round(mins / 60) }) : fill(a.d, { n: Math.round(mins / 1440) });
  }

  function renderWire() {
    $("[data-wire]").innerHTML = pulse.news.slice(0, 6).map((n) => {
      const title = lang === "en" ? n.title.en || n.title.original : n.title.original;
      return `<li><div class="wire-meta"><span class="wire-tag">${esc(n.symbol)}</span><span>${esc(n.market.toUpperCase())}</span><span>·</span><time datetime="${esc(n.published_at_utc)}">${esc(ago(n.published_at_utc))}</time></div>
        <a class="wire-title" href="${esc(n.url)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a>
        <div class="wire-foot"><span>${esc(n.source)}</span><a href="${esc(n.news_url)}">${esc(fill(t().moreOn, { s: n.symbol }))}</a></div></li>`;
    }).join("");
  }

  function render() { applyStatic(); renderPulse(); }

  $("[data-lang-toggle]").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; store.set("dg-lang", lang); render(); });
  render();

  const getJson = (url) => fetch(url, { cache: "no-store" }).then((r) => { if (!r.ok) throw new Error(`${url} ${r.status}`); return r.json(); });
  getJson("/data/pulse.json")
    .then((p) => { if (p.schema_version !== "1.0.0" || !p.markets?.us || !p.markets?.tw || !p.markets?.options) throw new Error("pulse schema"); pulse = p; render(); })
    .catch(() => { failed = true; render(); });
})();
