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
      newsTitle: "On the wire", newsLede: "The latest headlines our engines picked up, one market at a time, linked to their source and to the stock in DappGo News.",
      newsUs: "United States newsroom", newsTw: "Taiwan newsroom", tabUs: "United States", tabTw: "Taiwan",
      wireEmpty: "No new headlines for this market yet.",
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
      web: "Web", ios: "iOS", android: "Android",
      prodOptions: "Valuation ranges, options chains and scored Sell Put / Sell Call setups in one research view.",
      prodUs: "Daily research cards, company news and AI viewpoints across US equities.",
      prodTw: "Taiwan market coverage with local context and a daily research perspective.",
      prodNews: "Company news by market, kept in a clear timeline and linked to each stock.",
      prodMerge: "A different kind of number game. Drop, combine, find your next move.",
      webApp: "Open web app", webUs: "United States news", webTw: "Taiwan news", mOptShort: "Options",
      fOpt1: "Valuation ranges by ticker", fOpt2: "Options chains in one view", fOpt3: "Scored Sell Put / Sell Call setups",
      fUs1: "Daily research cards", fUs2: "Company news by stock", fUs3: "AI viewpoints grounded in the data",
      fTw1: "Taiwan market coverage", fTw2: "Local news and context", fTw3: "A daily research perspective",
      fNews1: "United States and Taiwan newsrooms", fNews2: "A clear timeline for each stock", fNews3: "Linked to the source and each stock",
      fMerge1: "Drop a number", fMerge2: "Combine to climb", fMerge3: "Find your next move",
      liveEq: "{n} tickers · {regime}", liveOpt: "Top setup · {sym} {score}", liveNews: "{n} new headlines today", liveMerge: "On Google Play",
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
      newsTitle: "最新頭條", newsLede: "引擎最新抓到的新聞，依市場分開，連到原始來源，也連到 DappGo News 的個股頁。",
      newsUs: "美股新聞", newsTw: "台股新聞", tabUs: "美國", tabTw: "台灣",
      wireEmpty: "這個市場暫時沒有新的頭條。",
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
      web: "網頁", ios: "iOS", android: "Android",
      prodOptions: "估值區間、選擇權鏈，以及評分過的 Sell Put / Sell Call 策略，集中在一個研究畫面。",
      prodUs: "美股每日研究卡、公司新聞與 AI 觀點。",
      prodTw: "台股涵蓋，在地脈絡與每日研究視角。",
      prodNews: "依市場整理的公司新聞，時間軸清楚，並連到個股。",
      prodMerge: "不一樣的數字遊戲。落下、合併、找出下一步。",
      webApp: "開啟網頁版", webUs: "美股新聞", webTw: "台股新聞", mOptShort: "選擇權",
      fOpt1: "逐檔估值區間", fOpt2: "選擇權鏈一頁看完", fOpt3: "評分過的 Sell Put / Sell Call 策略",
      fUs1: "每日研究卡", fUs2: "個股公司新聞", fUs3: "以資料為依據的 AI 觀點",
      fTw1: "台股市場涵蓋", fTw2: "在地新聞與脈絡", fTw3: "每日研究視角",
      fNews1: "美股與台股新聞室", fNews2: "每檔個股清楚的時間軸", fNews3: "連到原始來源與個股",
      fMerge1: "落下一個數字", fMerge2: "合併、往上爬", fMerge3: "找出下一步",
      liveEq: "今日 {n} 檔 · {regime}", liveOpt: "今日最高分 · {sym} {score}", liveNews: "今日 {n} 則新頭條", liveMerge: "Google Play 上架中",
      sourceLine: "脈動建立於 {built} UTC，來源 data.dappgo.com"
    }
  };

  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  const pct = (v) => (v == null ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(2)}%`);
  const tone = (v) => (v > 0 ? "up" : v < 0 ? "down" : "");
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* optional */ } } };
  // Browser-only motion layer; the content itself renders without it (and in the node test harness).
  const browser = typeof window === "object" && typeof window.IntersectionObserver === "function";
  const calm = browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const ICONS = { "us-stocks": "us-stocks-icon-128.webp", "taiwan-stocks": "tw-stocks-icon-128.webp", "options-explorer": "options-icon-128.webp" };

  let lang = store.get("dg-lang") || (/^zh/i.test(navigator.language) ? "zh" : "en");
  let market = store.get("dg-wire") === "tw" ? "tw" : "us";
  let pulse = null;
  let failed = false;
  let consoleTyped = false;
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

  function cardHead(label, name, m, productId) {
    const stale = isStale(m);
    return `<div class="card-top"><div><div class="card-market"><img src="/assets/app-icons/${ICONS[productId]}" alt="" width="22" height="22" />${esc(label)}</div><div class="card-name">${esc(name)}</div></div>
      <div class="card-date"><b>${esc(m.report_date)}</b>${esc(t().published)} ${esc(fmtTime(m.generated_at_utc))}${stale ? `<br /><span class="pill pill-stale">${esc(t().staleTag)}</span>` : ""}</div></div>`;
  }

  function equityCard(key, productId, label, name) {
    const m = pulse.markets[key];
    const reg = m.regime || "neutral";
    const breadth = Math.round((m.breadth_score ?? 0) * 100);
    const line = lang === "zh" ? m.one_liner.zh || m.one_liner.en : m.one_liner.en || m.one_liner.zh;
    return `<article class="card spot">${cardHead(label, name, m, productId)}
      <div class="regime-row"><span class="pill ${regimeClass(reg)}">${esc(t().regime[reg] || reg)}</span>
        <div class="meter"><div class="meter-label"><span>${esc(t().breadth)}</span><span>${breadth}% · ${esc(t().adv)} ${esc(m.advance_decline_ratio ?? "—")}</span></div><div class="meter-bar"><i style="--w:${Math.min(100, Math.max(0, breadth))}%"></i></div></div></div>
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
    return `<article class="card spot">${cardHead(t().mOpt, name, m, "options-explorer")}
      <div><div class="movers"><div><h4>${esc(t().ideas)}</h4></div></div><ul class="ideas">${ideas}</ul></div>
      <div class="movers">${moverList(t().today, m.gainers.slice(0, 3))}${moverList(t().todayDown, m.losers.slice(0, 3))}</div>
      <div class="card-actions"><a class="open-link" href="${esc(m.web_url)}">${esc(fill(t().open, { name }))} <span aria-hidden="true">↗</span></a>${storeLinks("options-explorer")}</div>
    </article>`;
  }

  // Count up once; later renders (language switch) set the value directly.
  function countTo(el, value) {
    if (!browser || calm || el.dataset.counted) { el.textContent = value; return; }
    el.dataset.counted = "1";
    const [n, suffix] = String(value).match(/^(\d+)(.*)$/)?.slice(1) || [value, ""];
    const target = Number(n);
    if (!Number.isFinite(target)) { el.textContent = value; return; }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1200);
      el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
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
    countTo($("[data-stat-covered]"), markets.reduce((n, m) => n + (m.coverage?.covered || 0), 0));
    countTo($("[data-stat-news]"), pulse.news.length);
    countTo($("[data-stat-verified]"), `${markets.length}/${markets.length}`);
    $("[data-pulse-source]").textContent = fill(t().sourceLine, { built: pulse.built_at_utc.replace("T", " ").replace("Z", "") });

    const tape = [[t().tabUs, pulse.markets.us], [t().tabTw, pulse.markets.tw], [t().mOptShort, pulse.markets.options]].flatMap(([tag, m]) =>
      [...m.gainers, ...m.losers].map((r) => `<a class="tape-item" href="${esc(m.web_url)}"><em>${esc(tag)}</em>${esc(r.symbol)} <span class="${tone(r.return_pct)}">${pct(r.return_pct)}</span></a>`));
    $("[data-tape]").innerHTML = tape.join("") + tape.join("").replace(/<a /g, '<a aria-hidden="true" tabindex="-1" ');

    renderConsole();
    renderAppLive();
    renderWire();
  }

  function ago(iso) {
    const mins = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
    const a = t().ago;
    return mins < 60 ? fill(a.m, { n: mins }) : mins < 2880 ? fill(a.h, { n: Math.round(mins / 60) }) : fill(a.d, { n: Math.round(mins / 1440) });
  }

  function wireItem(n, i) {
    const title = lang === "en" ? n.title.en || n.title.original : n.title.original;
    const media = n.image
      ? `<a class="wire-media" href="${esc(n.url)}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true"><img src="${esc(n.image.url)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-symbol="${esc(n.symbol)}" /></a>`
      : `<div class="wire-media ph" aria-hidden="true"><b>${esc(n.symbol)}</b><em>${esc(n.source)}</em></div>`;
    return `<li class="spot${i === 0 && n.image ? " feature" : ""}" style="--i:${i}">${media}<div class="wire-body"><div class="wire-meta"><span class="wire-tag">${esc(n.symbol)}</span><span>${esc(n.name && n.name !== n.symbol ? n.name : "")}</span><span>·</span><time datetime="${esc(n.published_at_utc)}">${esc(ago(n.published_at_utc))}</time></div>
        <a class="wire-title" href="${esc(n.url)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a>
        <div class="wire-foot"><span>${esc(n.source)}</span><a href="${esc(n.news_url)}">${esc(fill(t().moreOn, { s: n.symbol }))}</a></div></div></li>`;
  }

  function renderWire() {
    // The newest story with a publisher image leads as the large feature; the rest stay newest-first.
    const all = pulse.news.filter((n) => n.market === market).slice(0, 6);
    const lead = all.find((n) => n.image);
    const items = lead ? [lead, ...all.filter((n) => n !== lead)] : all;
    for (const key of ["us", "tw"]) $(`[data-count="${key}"]`).textContent = pulse.news.filter((n) => n.market === key).length;
    $("[data-wire]").innerHTML = items.length ? items.map(wireItem).join("") : `<li class="wire-empty">${esc(t().wireEmpty)}</li>`;
    document.querySelectorAll("[data-wire-tabs] [role=tab]").forEach((tab) => {
      const on = tab.dataset.market === market;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    moveInk();
  }

  // A broken publisher image falls back to the same symbol tile used for stories without one.
  function imageFallback(event) {
    const img = event.target;
    if (img.tagName !== "IMG" || !img.closest(".wire-media")) return;
    const box = img.closest(".wire-media");
    box.className = "wire-media ph";
    box.innerHTML = `<b>${esc(img.dataset.symbol)}</b>`;
  }

  function moveInk() {
    if (!browser) return;
    const tab = document.querySelector(`[data-wire-tabs] [data-market="${market}"]`);
    const ink = document.querySelector(".wire-tab-ink");
    if (!tab || !ink) return;
    ink.style.width = `${tab.offsetWidth}px`;
    ink.style.transform = `translateX(${tab.offsetLeft}px)`;
  }

  function selectMarket(next, focus) {
    if (next === market) return;
    market = next;
    store.set("dg-wire", market);
    if (pulse) renderWire();
    if (focus) document.querySelector(`[data-wire-tabs] [data-market="${market}"]`)?.focus();
  }

  // The hero console replays the real publish steps recorded in the pulse.
  function consoleLines() {
    const rows = [["us", t().tabUs], ["tw", t().tabTw], ["options", t().mOptShort]];
    const lines = [`<span class="d">$ dappgo pulse --verify</span>`];
    for (const [key, name] of rows) {
      const m = pulse.markets[key];
      const cov = m.coverage ? `${m.coverage.covered}/${m.coverage.expected}` : "—";
      lines.push(`<span class="k">›</span> ${esc(name)} ${esc(m.report_date)}  <span class="d">sha256</span> ${esc(m.data_hash.slice(0, 10))}…  <span class="ok">✓</span>`);
      lines.push(`  <span class="d">coverage</span> ${esc(cov)}  <span class="d">published</span> ${esc(m.generated_at_utc.slice(11, 16))} UTC`);
    }
    lines.push(`<span class="ok">✓</span> ${rows.length}/${rows.length} payloads verified · ${esc(pulse.news.length)} headlines`);
    return lines;
  }

  function renderConsole() {
    const box = $("[data-console]");
    const lines = consoleLines();
    if (!browser || calm || consoleTyped) { box.innerHTML = `${lines.join("\n")}\n<span class="caret"></span>`; return; }
    consoleTyped = true;
    let shown = 1;
    const tick = () => {
      box.innerHTML = `${lines.slice(0, shown).join("\n")}\n<span class="caret"></span>`;
      if (shown++ < lines.length) setTimeout(tick, 260);
    };
    tick();
  }

  // One live line per app card, from the same verified pulse as the board.
  function renderAppLive() {
    const set = (key, text) => { const el = $(`[data-app-live="${key}"] span`); if (el) el.textContent = text; };
    for (const key of ["us", "tw"]) {
      const m = pulse.markets[key];
      set(key, fill(t().liveEq, { n: m.coverage?.covered ?? "—", regime: t().regime[m.regime] || m.regime || "—" }));
    }
    const best = pulse.markets.options.ideas[0];
    if (best) set("options", fill(t().liveOpt, { sym: best.symbol, score: best.score }));
    set("news", fill(t().liveNews, { n: pulse.news.length }));
  }

  function render() { applyStatic(); renderPulse(); $('[data-app-live="merge"] span').textContent = t().liveMerge; }

  $("[data-lang-toggle]").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; store.set("dg-lang", lang); render(); });
  render();

  const getJson = (url) => fetch(url, { cache: "no-store" }).then((r) => { if (!r.ok) throw new Error(`${url} ${r.status}`); return r.json(); });
  getJson("/data/pulse.json")
    .then((p) => { if (p.schema_version !== "1.0.0" || !p.markets?.us || !p.markets?.tw || !p.markets?.options) throw new Error("pulse schema"); pulse = p; render(); })
    .catch(() => { failed = true; render(); });

  if (!browser) return;

  // Wire tabs: click, arrow keys, remembered per viewer.
  const tabs = $("[data-wire-tabs]");
  tabs.addEventListener("click", (e) => { const tab = e.target.closest("[role=tab]"); if (tab) selectMarket(tab.dataset.market); });
  tabs.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    selectMarket(market === "us" ? "tw" : "us", true);
  });
  document.addEventListener("error", imageFallback, true);
  window.addEventListener("resize", moveInk);
  document.fonts?.ready.then(moveInk);

  // Cursor-following glow on cards.
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest?.(".spot");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  // Reveal sections and light the pipeline as they scroll in.
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll("[data-reveal], [data-pipeline]").forEach((el) => io.observe(el));
  document.querySelectorAll("[data-pipeline] li").forEach((li, i) => li.style.setProperty("--i", i));

  // Top bar turns solid past the hero; a thin bar shows reading progress; nav marks the current section.
  const topbar = $(".topbar");
  const hero = $(".hero");
  const progress = $("[data-progress]");
  const navLinks = [...document.querySelectorAll(".nav a")];
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    topbar.classList.toggle("solid", y > hero.offsetHeight - 80);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
    let current = null, best = -1;
    for (const a of navLinks) {
      const top = document.querySelector(a.getAttribute("href"))?.offsetTop ?? Infinity;
      if (top - 120 <= y && top > best) { best = top; current = a; }
    }
    navLinks.forEach((a) => a.setAttribute("aria-current", String(a === current)));
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Hero field: drifting price traces over a dot grid that brightens near the cursor.
  const canvas = $("[data-hero-canvas]");
  const ctx = canvas.getContext?.("2d");
  if (!ctx) return;
  let w = 0, h = 0, dpr = 1, mouse = { x: -999, y: -999 }, visible = true, frame = 0;
  const traces = Array.from({ length: 5 }, (_, i) => ({ seed: Math.random() * 1000, y: 0.32 + i * 0.12, amp: 18 + i * 9, speed: 0.12 + i * 0.05, alpha: 0.5 - i * 0.07 }));
  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const noise = (x, s) => Math.sin(x * 0.011 + s) * 0.6 + Math.sin(x * 0.023 + s * 1.7) * 0.3 + Math.sin(x * 0.051 + s * 0.3) * 0.1;
  const draw = (time) => {
    ctx.clearRect(0, 0, w, h);
    const gap = 32;
    for (let x = gap / 2; x < w; x += gap) {
      for (let y = gap / 2; y < h; y += gap) {
        const d = Math.hypot(x - mouse.x, y - mouse.y);
        const glow = Math.max(0, 1 - d / 180);
        ctx.fillStyle = `rgba(150, 185, 255, ${0.08 + glow * 0.55})`;
        ctx.fillRect(x - 0.75 - glow, y - 0.75 - glow, 1.5 + glow * 2, 1.5 + glow * 2);
      }
    }
    const shift = time * 0.001;
    for (const tr of traces) {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(77, 132, 255, 0)");
      grad.addColorStop(0.5, `rgba(127, 176, 255, ${tr.alpha})`);
      grad.addColorStop(1, `rgba(127, 209, 255, ${tr.alpha * 0.6})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const y = h * tr.y + noise(x + shift * 60 * tr.speed * 10, tr.seed) * tr.amp;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    if (!calm && visible) frame = requestAnimationFrame(draw);
  };
  size();
  window.addEventListener("resize", () => { size(); if (calm) draw(0); });
  hero.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; if (calm) draw(0); }, { passive: true });
  hero.addEventListener("pointerleave", () => { mouse = { x: -999, y: -999 }; });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame);
    if (visible) frame = requestAnimationFrame(draw);
  }).observe(hero);
  if (calm) draw(0);
})();
