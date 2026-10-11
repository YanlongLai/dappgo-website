(function () {
  "use strict";

  const root = document.querySelector("[data-news-app]");
  if (!root) return;

  const market = root.dataset.market;
  const defaultLanguage = market === "tw" ? "zh" : "en";
  const languageStorageKey = "dappgo-news-language";
  const savedLanguage = (() => {
    try {
      const value = localStorage.getItem(languageStorageKey);
      return ["zh", "en"].includes(value) ? value : null;
    } catch (_) {
      return null;
    }
  })();
  const browserLanguage = (() => {
    try {
      const languages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
      return /^zh(?:-|$)/i.test(String(languages[0] || "")) ? "zh" : "en";
    } catch (_) {
      return "en";
    }
  })();
  const validLanguage = (value) => ["zh", "en"].includes(value) ? value : null;
  const validRange = (value) => ["all", "7", "30"].includes(value) ? value : "all";
  function readViewState() {
    const params = new URLSearchParams(window.location.search);
    return {
      stock: params.get("stock") || null,
      query: params.get("q") || "",
      range: validRange(params.get("range")),
      language: validLanguage(params.get("lang")) || savedLanguage || (market === "us" ? browserLanguage : defaultLanguage)
    };
  }
  const initialView = readViewState();
  const proxyRoot = `/api/markets/${market}/dashboard/`;
  const pointerUrl = `${proxyRoot}latest.json`;
  const state = { pointer: null, payload: null, stock: initialView.stock, query: initialView.query, range: initialView.range, language: initialView.language, refreshTimer: null, errorMessage: null };
  const els = {
    stockList: root.querySelector("[data-stock-list]"),
    search: root.querySelector("[data-stock-search]"),
    mobileSearch: root.querySelector("[data-stock-search-mobile]"),
    mobileSelect: root.querySelector("[data-mobile-stock-select]"),
    company: root.querySelector("[data-company-name]"),
    updated: root.querySelector("[data-updated]"),
    stories: root.querySelector("[data-stories]"),
    analysis: root.querySelector("[data-ai-analysis]"),
    count: root.querySelector("[data-count]"),
    status: root.querySelector("[data-status]"),
    statusDot: root.querySelector("[data-status-dot]"),
    update: root.querySelector("[data-update-banner]"),
    reload: root.querySelector("[data-update-reload]"),
    skeletons: root.querySelector("[data-skeletons]"),
    error: root.querySelector("[data-error]"),
    languageButtons: [...root.querySelectorAll("[data-language]")]
  };

  function labels() {
    const chinese = state.language === "zh";
    const taiwan = market === "tw";
    const marketName = taiwan ? (chinese ? "台灣市場" : "Taiwan market") : (chinese ? "美國市場" : "United States market");
    return {
      documentTitle: `DappGo News · ${taiwan ? (chinese ? "台灣市場" : "Taiwan") : (chinese ? "美國市場" : "United States")}`,
      marketName,
      navTw: "TW",
      navUs: "US",
      stockIndex: chinese ? "股票索引" : "Stock index",
      searchStock: chinese ? "輸入股名或代號" : "Search company or ticker",
      railNote: chinese ? "以股票為線索，以來源為依據。<br><br>最新 → 最舊。日期不完整時，網站不猜測精確時間。" : "Follow a ticker, keep the source visible.<br><br>Newest → oldest. Date-only stories are never given a guessed time.",
      stockSelection: chinese ? "股票選擇" : "Stock selection",
      readStock: chinese ? "閱讀股票" : "Read stock",
      selectStock: chinese ? "選擇股票" : "Select stock",
      companyCrumb: taiwan ? (chinese ? "台灣市場 / 公司新聞" : "TAIWAN / COMPANY NEWS") : (chinese ? "美國市場 / 公司新聞" : "UNITED STATES / COMPANY NEWS"),
      dateRange: chinese ? "期間篩選" : "Date range",
      rangeAll: chinese ? "全部" : "All",
      range7: chinese ? "7 天" : "7 days",
      range30: chinese ? "30 天" : "30 days",
      updateAvailable: chinese ? "有較新的新聞資料。" : "Newer published news is available.",
      updateReading: chinese ? "更新閱讀" : "Refresh reading",
      loadingNews: chinese ? "載入新聞" : "Loading news",
      allMarket: chinese ? "全部市場消息" : "All market news",
      storyCount: chinese ? "則" : "stories",
      newestToOldest: chinese ? "最新 → 最舊" : "newest → oldest",
      noNews: chinese ? "目前沒有可顯示的新聞。" : "No news is available for this selection.",
      noSummary: chinese ? "來源未提供獨立摘要，請前往原文閱讀完整內容。" : "The source did not provide a separate summary. Read the original article for full context.",
      readSource: chinese ? "閱讀原文" : "Read source",
      source: chinese ? "新聞來源" : "Source",
      brandAria: taiwan ? (chinese ? "DappGo News 台灣版" : "DappGo News Taiwan") : (chinese ? "DappGo News 美國版" : "DappGo News United States"),
      marketNav: chinese ? "市場版本" : "Market editions",
      language: chinese ? "語言" : "Language",
      privacy: chinese ? "隱私" : "Privacy",
      terms: chinese ? "條款" : "Terms",
      footerLine: chinese ? "看見事件。保留脈絡。" : "See the event. Keep the context.",
      dateUnavailable: chinese ? "日期未提供" : "Date unavailable",
      dataLabel: chinese ? "資料" : "Data",
      dataLoading: chinese ? "資料載入中…" : "Data loading…",
      loadingStatus: chinese ? "載入已發布新聞…" : "Loading published news…",
      dataTimeUnavailable: chinese ? "資料時間無法取得" : "Data time unavailable",
      live: chinese ? "即時" : "Live",
      dataUnavailable: chinese ? "資料暫時無法取得" : "Data unavailable",
      unableToLoad: chinese ? "無法載入" : "Unable to load",
      unableToRefresh: chinese ? "無法更新" : "Unable to refresh"
    };
  }

  function applyLanguage() {
    const copy = labels();
    document.documentElement.lang = state.language === "zh" ? "zh-Hant" : "en";
    document.title = copy.documentTitle;
    root.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (value != null) element.textContent = value;
    });
    root.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = copy[element.dataset.i18nHtml];
      if (value != null) element.innerHTML = value;
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const value = copy[element.dataset.i18nPlaceholder];
      if (value != null) element.placeholder = value;
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const value = copy[element.dataset.i18nAriaLabel];
      if (value != null) element.setAttribute("aria-label", value);
    });
    els.languageButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === state.language)));
    if (state.payload) {
      renderStocks();
      renderStories();
    }
    if (state.pointer) {
      els.updated.textContent = state.pointer.generated_at_utc ? `${copy.dataLabel} ${formatDate(state.pointer.generated_at_utc)}` : copy.dataTimeUnavailable;
      setStatus(`${copy.live} ${copy.marketName} · pointer ${String(state.pointer.hash || "").slice(0, 12)}`, "ok");
    } else if (state.errorMessage) {
      els.error.textContent = `${copy.dataUnavailable}: ${state.errorMessage}`;
      setStatus(copy.dataUnavailable, "error");
    } else {
      setStatus(copy.loadingStatus, "loading");
    }
  }

  function setStatus(message, kind) {
    if (els.status) els.status.textContent = message;
    if (els.statusDot) els.statusDot.className = `status-dot${kind ? ` is-${kind}` : ""}`;
  }

  function syncViewUrl() {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (state.stock) params.set("stock", state.stock);
    else params.delete("stock");
    if (state.query) params.set("q", state.query);
    else params.delete("q");
    if (state.range !== "all") params.set("range", state.range);
    else params.delete("range");
    params.set("lang", state.language);
    const search = params.toString();
    window.history.replaceState(null, "", `${url.pathname}${search ? `?${search}` : ""}${url.hash}`);
  }

  function syncRangeButtons() {
    root.querySelectorAll("[data-range]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.range === state.range)));
  }

  function applyViewStateFromUrl() {
    const next = readViewState();
    state.stock = next.stock;
    state.query = next.query;
    state.range = next.range;
    state.language = next.language;
    syncRangeButtons();
    applyLanguage();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function formatDate(value) {
    if (!value) return labels().dateUnavailable;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value.slice(0, 10);
    return new Intl.DateTimeFormat(state.language === "zh" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: market === "tw" ? "Asia/Taipei" : "America/New_York" }).format(date);
  }

  function dayKey(value) {
    if (!value) return "unknown";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return new Intl.DateTimeFormat(state.language === "zh" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: market === "tw" ? "Asia/Taipei" : "America/New_York" }).format(date);
  }

  function stripTitlePrefix(title, summary) {
    if (!summary) return null;
    let clean = String(summary).trim();
    const normalizedTitle = String(title || "").replace(/\s+/g, " ").trim();
    const normalizedSummary = clean.replace(/\s+/g, " ").trim();
    if (normalizedTitle && normalizedSummary.toLowerCase().startsWith(normalizedTitle.toLowerCase())) clean = clean.slice(String(title).length).replace(/^\s*[-:|–—·]\s*/, "").trim();
    clean = clean.replace(/\s+(Yahoo(?:\s+(股市|財經))?|Reuters|MarketWatch|CNBC)\s*$/i, "").trim();
    if (!clean || clean.toLowerCase() === normalizedTitle.toLowerCase()) return null;
    return clean;
  }

  function entries() {
    const tickers = state.payload && state.payload.ticker_data ? state.payload.ticker_data : {};
    return Object.entries(tickers).map(([symbol, item]) => ({ symbol, name: item.name || symbol, news: Array.isArray(item.news) ? item.news : [] })).sort((a, b) => a.symbol.localeCompare(b.symbol));
  }

  function compactMobileName(name, symbol) {
    const value = String(name || symbol || "").trim();
    const alias = value.match(/\(([^()]{1,24})\)$/);
    if (alias && !/^(class|series)\b/i.test(alias[1].trim())) return alias[1].trim();
    const compact = value
      .replace(/\b(Inc\.?|Corporation|Corp\.?|Company|Limited|Incorporated|Holdings?|plc|ETF)\b/gi, "")
      .replace(/\s+/g, " ")
      .replace(/\s+([.,)])/g, "$1")
      .replace(/[.,]\s*$/, "")
      .trim();
    return compact.length > 30 ? `${compact.slice(0, 29).trimEnd()}…` : compact;
  }

  function mobileLabel(entry) {
    return `${entry.symbol} · ${compactMobileName(entry.name, entry.symbol)}`;
  }

  function usableImage(item) {
    return item && !["restricted", "unavailable"].includes(item.image_status) && typeof item.image_url === "string" && /^https:\/\//i.test(item.image_url) ? item.image_url : null;
  }

  function articleId(item, index) {
    return item.provider_id || item.url || `${item.title || "story"}-${index}`;
  }

  function renderStocks() {
    const copy = labels();
    const filter = state.query.toLowerCase();
    const allEntries = entries();
    const all = allEntries.filter((entry) => `${entry.symbol} ${entry.name}`.toLowerCase().includes(filter));
    if (state.stock && state.stock !== "all" && !allEntries.some((entry) => entry.symbol === state.stock)) state.stock = "all";
    if (!state.stock && all.length) state.stock = all[0].symbol;
    const allButton = `<button class="stock-button" type="button" data-stock="all" aria-current="${state.stock === "all" ? "true" : "false"}"><span>${escapeHtml(copy.allMarket)}</span><small>ALL</small></button>`;
    const buttons = all.map((entry) => `<button class="stock-button" type="button" data-stock="${escapeHtml(entry.symbol)}" aria-current="${state.stock === entry.symbol ? "true" : "false"}"><span>${escapeHtml(entry.name)}</span><small>${escapeHtml(entry.symbol)}</small></button>`).join("");
    els.stockList.innerHTML = allButton + buttons;
    els.stockList.querySelectorAll("[data-stock]").forEach((button) => button.addEventListener("click", () => { state.stock = button.dataset.stock; syncViewUrl(); renderStocks(); renderStories(); }));
    const selectedEntry = allEntries.find((entry) => entry.symbol === state.stock);
    const mobileEntries = selectedEntry && state.stock !== "all" && !all.some((entry) => entry.symbol === state.stock) ? [selectedEntry, ...all] : all;
    if (els.mobileSelect) {
      els.mobileSelect.innerHTML = `<option value="all">${escapeHtml(copy.allMarket)}</option>${mobileEntries.map((entry) => `<option value="${escapeHtml(entry.symbol)}" title="${escapeHtml(entry.name)} · ${escapeHtml(entry.symbol)}" aria-label="${escapeHtml(entry.name)} · ${escapeHtml(entry.symbol)}">${escapeHtml(mobileLabel(entry))}</option>`).join("")}`;
      els.mobileSelect.value = state.stock || "all";
    }
    if (els.search && els.search.value !== state.query) els.search.value = state.query;
    if (els.mobileSearch && els.mobileSearch.value !== state.query) els.mobileSearch.value = state.query;
  }

  function selectedEntries() {
    const all = entries();
    return state.stock === "all" ? all : all.filter((entry) => entry.symbol === state.stock);
  }

  function renderStories() {
    const copy = labels();
    renderAnalysis();
    const selected = selectedEntries();
    const company = selected[0] || { symbol: state.stock || "", name: copy.marketName };
    const stories = selected.flatMap((entry) => entry.news.map((item, index) => ({ ...item, symbol: entry.symbol, company: entry.name, key: articleId(item, index) })));
    stories.sort((a, b) => String(b.published_at_utc || b.date || "").localeCompare(String(a.published_at_utc || a.date || "")) || a.key.localeCompare(b.key));
    const filtered = stories.filter((item) => {
      if (state.range === "all") return true;
      const published = new Date(item.published_at_utc || item.date || 0).getTime();
      return published && Date.now() - published <= Number(state.range) * 86400000;
    });
    els.company.textContent = state.stock === "all" ? copy.allMarket : company.name;
    els.count.textContent = `${filtered.length} ${copy.storyCount} · ${copy.newestToOldest}`;
    if (!filtered.length) {
      els.stories.innerHTML = `<div class="empty">${escapeHtml(copy.noNews)}</div>`;
      return;
    }
    const groups = new Map();
    filtered.forEach((item) => { const key = dayKey(item.published_at_utc || item.date); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
    els.stories.innerHTML = Array.from(groups.entries()).map(([date, items]) => `<div class="date-rule">${escapeHtml(date)}<span>${items.length} ${copy.storyCount}</span></div>${items.map((item, index) => renderStory(item, index === 0 && groups.size === 1)).join("")}`).join("");
    els.stories.querySelectorAll("img[data-fallback]").forEach((image) => image.addEventListener("error", () => { const story = image.closest(".story"); if (story) { story.classList.add("is-text-only"); const media = story.querySelector(".story-media"); if (media) media.remove(); } }, { once: true }));
  }

  function renderStory(item, lead) {
    item = DappGoNewsData.localizedNews(item, state.language);
    const copy = labels();
    const image = usableImage(item);
    const summary = stripTitlePrefix(item.title, item.summary);
    const publisher = item.source || item.provider || copy.source;
    const stockTag = `${item.symbol} / ${item.company}`;
    const media = image ? `<figure class="story-media"><img data-fallback loading="lazy" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" width="${Number(item.image_width) || 1200}" height="${Number(item.image_height) || 675}"></figure>` : "";
    return `<article class="story ${lead ? "lead" : ""} ${image ? "has-media" : "is-text-only"}"><div class="story-grid"><div class="story-meta"><span class="source">${escapeHtml(publisher)}</span><span>· ${escapeHtml(item.provider || "RSS")}</span><time datetime="${escapeHtml(item.published_at_utc || item.date || "")}">${escapeHtml(formatDate(item.published_at_utc || item.date))}</time></div><h3>${escapeHtml(item.title || "Untitled story")}</h3>${media}<p class="story-excerpt">${escapeHtml(summary || copy.noSummary)}</p><div class="story-footer"><span class="story-tags">${escapeHtml(stockTag)}</span><a class="read-link" href="${escapeHtml(item.url || "#")}">${escapeHtml(copy.readSource)} ↗</a></div></div></article>`;
  }

  function renderAnalysis() {
    const result = DappGoNewsData.analysis(state.payload, state.stock, state.language);
    els.analysis.hidden = !result;
    if (!result) { els.analysis.innerHTML = ""; return; }
    const clean = value => escapeHtml(DappGoNewsData.plainAnalysis(value));
    const title = state.language === "zh" ? "AI 解讀" : "AI analysis";
    const note = state.language === "zh" ? "最新已發布資料的解析，不隨新聞期間篩選改寫。" : "Analysis from the latest published report, independent of the news date filter.";
    els.analysis.innerHTML = `<h2>${title}</h2><p class="analysis-note">${note}</p>${result.summary ? `<p class="analysis-copy">${clean(result.summary)}</p>` : ""}${result.highlights.length ? `<ul>${result.highlights.map(value => `<li>${clean(value)}</li>`).join("")}</ul>` : ""}`;
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async function loadPayload() {
    const pointer = await fetchJson(pointerUrl);
    const dataUrl = pointer.data_url_v2;
    if (typeof dataUrl !== "string" || !/^dashboard\/data-[a-f0-9]{12,64}\.json$/i.test(dataUrl)) throw new Error("Gateway pointer has no immutable data_url_v2");
    const payload = await fetchJson(`${proxyRoot}${dataUrl.slice("dashboard/".length)}`);
    if (!payload || typeof payload.ticker_data !== "object") throw new Error("Payload has no ticker_data");
    return { pointer, payload };
  }

  function applyLoaded(result) {
    const copy = labels();
    state.pointer = result.pointer;
    state.payload = result.payload;
    state.errorMessage = null;
    els.skeletons.hidden = true;
    els.error.hidden = true;
    els.updated.textContent = result.pointer.generated_at_utc ? `${copy.dataLabel} ${formatDate(result.pointer.generated_at_utc)}` : copy.dataTimeUnavailable;
    setStatus(`${copy.live} ${copy.marketName} · pointer ${String(result.pointer.hash || "").slice(0, 12)}`, "ok");
    renderStocks();
    renderStories();
    syncRangeButtons();
    syncViewUrl();
  }

  async function initialLoad() {
    try { applyLoaded(await loadPayload()); schedulePoll(); }
    catch (error) { const copy = labels(); state.errorMessage = error.message; els.skeletons.hidden = true; els.error.hidden = false; els.error.textContent = `${copy.unableToLoad} ${copy.marketName} news: ${error.message}`; setStatus(copy.dataUnavailable, "error"); }
  }

  async function poll() {
    try {
      const pointer = await fetchJson(pointerUrl);
      if (state.pointer && pointer.hash !== state.pointer.hash) els.update.classList.add("is-visible");
      else if (!state.pointer) applyLoaded(await loadPayload());
    } catch (_) { /* Existing last-good view remains readable. */ }
    schedulePoll();
  }

  function schedulePoll() { clearTimeout(state.refreshTimer); state.refreshTimer = setTimeout(poll, 120000 + Math.floor(Math.random() * 15000)); }

  function updateQuery(value) { state.query = value; syncViewUrl(); renderStocks(); }

  els.search.addEventListener("input", (event) => updateQuery(event.target.value));
  els.mobileSearch.addEventListener("input", (event) => updateQuery(event.target.value));
  els.mobileSelect.addEventListener("change", (event) => { state.stock = event.target.value; syncViewUrl(); renderStocks(); renderStories(); });
  els.languageButtons.forEach((button) => button.addEventListener("click", () => {
    const next = button.dataset.language;
    if (!["zh", "en"].includes(next) || next === state.language) return;
    state.language = next;
    try { localStorage.setItem(languageStorageKey, next); } catch (_) { /* Preference is optional. */ }
    syncViewUrl();
    applyLanguage();
  }));
  els.reload.addEventListener("click", async () => {
    els.update.classList.remove("is-visible");
    try {
      applyLoaded(await loadPayload());
    } catch (error) {
      const copy = labels();
      state.errorMessage = error.message;
      setStatus(copy.dataUnavailable, "error");
      els.error.hidden = false;
      els.error.textContent = `${copy.unableToRefresh} ${copy.marketName} news: ${error.message}`;
    }
  });
  root.querySelectorAll("[data-range]").forEach((button) => button.addEventListener("click", () => { state.range = button.dataset.range; syncViewUrl(); syncRangeButtons(); renderStories(); }));
  window.addEventListener("popstate", applyViewStateFromUrl);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") poll(); });
  applyLanguage();
  initialLoad();
}());
