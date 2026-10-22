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
  const PAGE_SIZE = 10;
  const SKELETON_DELAY_MS = 300;
  const PAGE_DELAY_MS = 600;
  const SLOW_LOAD_MS = 8000;
  function readViewState() {
    const params = new URLSearchParams(window.location.search);
    return {
      stock: params.get("stock") || null,
      query: params.get("q") || "",
      language: validLanguage(params.get("lang")) || savedLanguage || (market === "us" ? browserLanguage : defaultLanguage)
    };
  }
  const initialView = readViewState();
  const proxyRoot = `/api/markets/${market}/dashboard/`;
  const pointerUrl = `${proxyRoot}latest.json`;
  const state = { pointer: null, payload: null, stock: initialView.stock, query: initialView.query, language: initialView.language, visibleCount: PAGE_SIZE, refreshTimer: null, loadMoreObserver: null, appending: false, errorMessage: null };
  const engagement = window.DappGoNewsEngagement?.createClient();
  let analysisScope = null;
  let analysisOpen = false;
  let lastAnalysisMarkup = null;
  const els = {
    stockList: root.querySelector("[data-stock-list]"),
    search: root.querySelector("[data-stock-search]"),
    mobileSearch: root.querySelector("[data-stock-search-mobile]"),
    mobileSelect: root.querySelector("[data-mobile-stock-select]"),
    company: root.querySelector("[data-company-name]"),
    updated: root.querySelector("[data-updated]"),
    stories: root.querySelector("[data-stories]"),
    analysis: root.querySelector("[data-ai-analysis]"),
    analytics: root.querySelector("[data-analytics-choice]"),
    count: root.querySelector("[data-count]"),
    status: root.querySelector("[data-status]"),
    statusDot: root.querySelector("[data-status-dot]"),
    update: root.querySelector("[data-update-banner]"),
    reload: root.querySelector("[data-update-reload]"),
    skeletons: root.querySelector("[data-skeletons]"),
    moreSkeletons: root.querySelector("[data-more-skeletons]"),
    loadStatus: root.querySelector("[data-load-status]"),
    error: root.querySelector("[data-error]"),
    retry: root.querySelector("[data-retry]"),
    loadMore: root.querySelector("[data-load-more]"),
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
      updateAvailable: chinese ? "有較新的新聞資料。" : "Newer published news is available.",
      updateReading: chinese ? "更新閱讀" : "Refresh reading",
      loadingNews: chinese ? "載入新聞" : "Loading news",
      slowLoading: chinese ? "新聞仍在載入中；若持續等待，請確認網路連線。" : "Still loading published news. Please check your connection if this takes longer.",
      publishedStories: chinese ? "已發布新聞" : "Published stories",
      loadMore: chinese ? "載入更多新聞" : "Load more stories",
      allMarket: chinese ? "全部市場消息" : "All market news",
      storyCount: chinese ? "則" : "stories",
      newestToOldest: chinese ? "最新 → 最舊" : "newest → oldest",
      noNews: chinese ? "目前沒有可顯示的新聞。" : "No news is available for this selection.",
      emptyTitle: chinese ? "目前沒有已發布新聞" : "No published news yet",
      emptyBody: chinese ? "這個市場或股票目前沒有可閱讀的新聞資料。" : "There are no published stories for this market or stock yet.",
      exploreAll: chinese ? "探索全部市場新聞" : "Explore all market news",
      showing: chinese ? "顯示" : "Showing",
      loadingMore: chinese ? "載入更多新聞…" : "Loading more stories…",
      allLoaded: chinese ? "已顯示全部新聞" : "All published stories are shown",
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
      published: chinese ? "已發布新聞" : "Published news",
      skipToNews: chinese ? "跳至新聞內容" : "Skip to news",
      dataUnavailable: chinese ? "資料暫時無法取得" : "Data unavailable",
      unableToLoad: chinese ? "無法載入" : "Unable to load",
      unableToRefresh: chinese ? "無法更新" : "Unable to refresh",
      noStocks: chinese ? "找不到符合的股票，請換個名稱或代號。" : "No matching stocks. Try another company or ticker.",
      clearSearch: chinese ? "清除搜尋" : "Clear search",
      retry: chinese ? "重新載入" : "Try again",
      aiTitle: chinese ? "AI 解讀" : "AI analysis",
      aiOpen: chinese ? "點擊展開 AI 解讀" : "Tap to open AI analysis",
      aiClose: chinese ? "收合 AI 解讀" : "Close AI analysis",
      aiNote: chinese ? "來自最新已發布報表，搭配來源新聞閱讀。" : "From the latest published report, alongside source news.",
      aiLoading: chinese ? "載入 AI 解讀…" : "Loading AI analysis…",
      aiSlow: chinese ? "AI 解讀仍在載入中；請稍候或確認網路連線。" : "AI analysis is still loading. Please wait or check your connection.",
      aiMissing: chinese ? "此選擇暫無已發布的 AI 解讀。" : "No published AI analysis is available for this selection.",
      aiError: chinese ? "AI 解讀暫時無法取得，請使用上方的重新載入。" : "AI analysis is unavailable. Use Try again above.",
      analyticsOn: chinese ? "匿名使用統計：開啟" : "Anonymous usage metrics: on",
      analyticsOff: chinese ? "匿名使用統計：關閉" : "Anonymous usage metrics: off",
      analyticsPrivacy: chinese ? "已依瀏覽器隱私設定關閉統計" : "Metrics disabled by browser privacy settings",
      analyticsNote: chinese ? "統計 AI 展開次數、股票與每日匿名訪客；可隨時關閉。" : "Counts AI opens, stocks and daily anonymous readers. You can opt out.",
      disclaimer: chinese ? "標題、摘要與來源連結來自既有已發布資料。僅供資訊參考，不構成投資建議。" : "Titles, summaries and source links come from the existing published data pipeline. For information only, not investment advice."
    };
  }

  function applyLanguage() {
    cancelAppend();
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
    if (!state.payload) renderAnalysis();
    renderAnalyticsChoice();
    if (state.errorMessage) {
      els.error.textContent = `${copy.dataUnavailable}: ${state.errorMessage}`;
      setStatus(copy.dataUnavailable, "error");
    } else if (state.pointer) {
      els.updated.textContent = state.pointer.generated_at_utc ? `${copy.dataLabel} ${formatDate(state.pointer.generated_at_utc)}` : copy.dataTimeUnavailable;
      setStatus(`${copy.published} · ${copy.marketName}`, "ok");
    } else if (state.errorMessage) {
      els.error.textContent = `${copy.dataUnavailable}: ${state.errorMessage}`;
      setStatus(copy.dataUnavailable, "error");
    } else {
      setStatus(copy.loadingStatus, "loading");
    }
    updateLoadingStatus();
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
    params.delete("range");
    params.set("lang", state.language);
    const search = params.toString();
    window.history.replaceState(null, "", `${url.pathname}${search ? `?${search}` : ""}${url.hash}`);
  }

  function applyViewStateFromUrl() {
    const next = readViewState();
    state.stock = next.stock;
    state.query = next.query;
    state.language = next.language;
    state.visibleCount = PAGE_SIZE;
    applyLanguage();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function formatDate(value) {
    if (!value) return labels().dateUnavailable;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value.slice(0, 10);
    return new Intl.DateTimeFormat(state.language === "zh" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short", timeZone: market === "tw" ? "Asia/Taipei" : "America/New_York" }).format(date);
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
    root.querySelectorAll("[data-search-feedback]").forEach((element) => {
      element.textContent = state.query.trim() && !all.length ? copy.noStocks : "";
      element.hidden = !element.textContent;
    });
    root.querySelectorAll("[data-clear-search]").forEach((button) => {
      button.hidden = !state.query;
      button.setAttribute("aria-label", copy.clearSearch);
    });
    if (state.stock && state.stock !== "all" && !allEntries.some((entry) => entry.symbol === state.stock)) state.stock = "all";
    if (!state.stock && all.length) state.stock = all[0].symbol;
    const allButton = `<button class="stock-button" type="button" data-stock="all" aria-current="${state.stock === "all" ? "true" : "false"}"><span>${escapeHtml(copy.allMarket)}</span><small>ALL</small></button>`;
    const buttons = all.map((entry) => `<button class="stock-button" type="button" data-stock="${escapeHtml(entry.symbol)}" aria-current="${state.stock === entry.symbol ? "true" : "false"}"><span>${escapeHtml(entry.name)}</span><small>${escapeHtml(entry.symbol)}</small></button>`).join("");
    els.stockList.innerHTML = allButton + buttons;
    els.stockList.querySelectorAll("[data-stock]").forEach((button) => button.addEventListener("click", () => {
      state.stock = button.dataset.stock;
      state.visibleCount = PAGE_SIZE;
      syncViewUrl(); renderStocks(); renderStories();
      // Rendering replaces the buttons. Restore focus to the selected control,
      // without moving focus during typing, refreshes or language changes.
      [...els.stockList.querySelectorAll("[data-stock]")].find((next) => next.dataset.stock === state.stock)?.focus({ preventScroll: true });
    }));
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

  function storyItems() {
    const seen = new Set();
    return selectedEntries().flatMap((entry) => entry.news.map((item, index) => ({ ...item, symbol: entry.symbol, company: entry.name, key: articleId(item, index) })))
      .filter((item) => {
        const key = `${item.key}|${item.title || ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).sort((a, b) => String(b.published_at_utc || b.date || "").localeCompare(String(a.published_at_utc || a.date || "")) || a.key.localeCompare(b.key));
  }

  function renderStories(appendFrom = 0) {
    if (!appendFrom) cancelAppend();
    const copy = labels();
    renderAnalysis();
    const selected = selectedEntries();
    const company = selected[0] || { symbol: state.stock || "", name: copy.marketName };
    const stories = storyItems();
    const visible = stories.slice(0, state.visibleCount);
    els.company.textContent = state.stock === "all" ? copy.allMarket : company.name;
    els.count.textContent = stories.length ? `${Math.min(state.visibleCount, stories.length)} ${copy.showing} / ${stories.length} ${copy.storyCount} · ${copy.newestToOldest}` : `0 ${copy.storyCount}`;
    if (!stories.length) {
      els.stories.innerHTML = `<div class="empty-state" role="status"><div class="empty-icon" aria-hidden="true">▧</div><h3>${escapeHtml(copy.emptyTitle)}</h3><p>${escapeHtml(copy.emptyBody)}</p><button type="button" class="empty-cta" data-empty-cta>${escapeHtml(copy.exploreAll)}</button></div>`;
      els.stories.querySelector("[data-empty-cta]")?.addEventListener("click", () => {
        state.stock = "all";
        state.visibleCount = PAGE_SIZE;
        syncViewUrl(); renderStocks(); renderStories();
      });
      if (els.loadMore) els.loadMore.hidden = true;
      return;
    }
    const groups = new Map();
    visible.forEach((item) => { const key = dayKey(item.published_at_utc || item.date); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
    let previousDay = appendFrom ? dayKey(visible[appendFrom - 1].published_at_utc || visible[appendFrom - 1].date) : null;
    const markup = visible.slice(appendFrom).map((item, index) => {
      const date = dayKey(item.published_at_utc || item.date);
      const heading = date !== previousDay ? `<div class="date-rule">${escapeHtml(date)}<span data-day-count="${escapeHtml(date)}">${groups.get(date).length} ${copy.storyCount}</span></div>` : "";
      previousDay = date;
      return heading + renderStory(item, !appendFrom && index === 0 && groups.size === 1);
    }).join("");
    if (appendFrom) els.stories.insertAdjacentHTML("beforeend", markup);
    else els.stories.innerHTML = markup;
    els.stories.querySelectorAll("[data-day-count]").forEach((node) => { node.textContent = `${groups.get(node.dataset.dayCount)?.length || 0} ${copy.storyCount}`; });
    els.stories.querySelectorAll("img[data-fallback]:not([data-fallback-bound])").forEach((image) => {
      image.dataset.fallbackBound = "true";
      image.addEventListener("error", () => { const story = image.closest(".story"); if (story) { story.classList.add("is-text-only"); const media = story.querySelector(".story-media"); if (media) media.remove(); } }, { once: true });
    });
    updatePagination();
  }

  function updatePagination() {
    if (!els.loadMore) return;
    const total = currentStoryCount();
    els.loadMore.hidden = !total;
    els.loadMore.disabled = loading || state.appending || state.visibleCount >= total;
    els.loadMore.textContent = state.appending ? labels().loadingMore : state.visibleCount >= total ? labels().allLoaded : labels().loadMore;
    if (!loading && !state.appending && state.visibleCount < total) observeLoadMore();
  }

  function observeLoadMore() {
    state.loadMoreObserver?.disconnect();
    if (!els.loadMore || state.visibleCount >= currentStoryCount()) return;
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver((entries) => {
        if (state.loadMoreObserver !== observer) return;
        if (entries.some((entry) => entry.isIntersecting)) appendNextPage();
      }, { rootMargin: "360px 0px" });
      state.loadMoreObserver = observer;
      observer.observe(els.loadMore);
    }
  }

  function currentStoryCount() {
    return storyItems().length;
  }

  let appendTimer = null;
  let appendRevealTimer = null;
  let appendGeneration = 0;
  let loadingPhase = "waiting";
  function updateLoadingStatus() {
    const slow = loading && loadingPhase === "slow";
    els.loadStatus.classList.toggle("is-slow", slow);
    els.loadStatus.textContent = slow ? labels().slowLoading : loading && loadingPhase === "skeleton" ? labels().loadingNews : state.appending && !els.moreSkeletons.hidden ? labels().loadingMore : "";
  }

  function cancelAppend() {
    appendGeneration++;
    clearTimeout(appendTimer);
    clearTimeout(appendRevealTimer);
    appendTimer = null;
    appendRevealTimer = null;
    state.appending = false;
    state.loadMoreObserver?.disconnect();
    state.loadMoreObserver = null;
    els.moreSkeletons.hidden = true;
    els.stories.setAttribute("aria-busy", String(loading));
    updateLoadingStatus();
    updatePagination();
  }

  function renderSkeleton(item) {
    const hasMedia = usableImage(item);
    return `<div class="story skeleton-card ${hasMedia ? "has-media" : "is-text-only"}" aria-hidden="true"><div class="story-grid"><div class="story-meta"><span class="skeleton-block skeleton-avatar"></span><span class="skeleton-source-lines"><span class="skeleton-block skeleton-source"></span><span class="skeleton-block skeleton-provider"></span></span><span class="skeleton-block skeleton-date"></span></div><h3><span class="skeleton-block skeleton-title"></span><span class="skeleton-block skeleton-title short"></span></h3>${hasMedia ? `<figure class="story-media skeleton-block skeleton-media"></figure>` : ""}<p class="story-excerpt"><span class="skeleton-block skeleton-copy"></span><span class="skeleton-block skeleton-copy"></span><span class="skeleton-block skeleton-copy short"></span></p><div class="story-footer"><span class="skeleton-block skeleton-tag"></span><span class="skeleton-block skeleton-action"></span></div></div></div>`;
  }

  function appendNextPage() {
    if (loading || state.appending || !els.loadMore || state.visibleCount >= currentStoryCount()) return;
    state.appending = true;
    state.loadMoreObserver?.disconnect();
    const upcoming = storyItems().slice(state.visibleCount, state.visibleCount + 2);
    els.moreSkeletons.innerHTML = upcoming.map(renderSkeleton).join("");
    const mediaItems = upcoming.filter(usableImage);
    els.moreSkeletons.querySelectorAll(".skeleton-media").forEach((node, index) => {
      const item = mediaItems[index];
      if (Number.isFinite(item.image_width) && item.image_width > 0 && Number.isFinite(item.image_height) && item.image_height > 0) node.style.aspectRatio = `${item.image_width} / ${item.image_height}`;
    });
    els.moreSkeletons.hidden = true;
    els.loadMore.disabled = true;
    els.loadMore.textContent = labels().loadingMore;
    els.stories.setAttribute("aria-busy", "true");
    updateLoadingStatus();
    const generation = ++appendGeneration;
    // Coalesce scroll events. This expands local data without another API request.
    appendRevealTimer = setTimeout(() => {
      if (generation !== appendGeneration) return;
      els.moreSkeletons.hidden = false;
      updateLoadingStatus();
    }, SKELETON_DELAY_MS);
    appendTimer = setTimeout(() => {
        if (generation !== appendGeneration) return;
        appendTimer = null;
        clearTimeout(appendRevealTimer);
        const previousCount = state.visibleCount;
        state.visibleCount = Math.min(previousCount + PAGE_SIZE, currentStoryCount());
        state.appending = false;
        els.moreSkeletons.hidden = true;
        renderStories(previousCount);
        els.stories.setAttribute("aria-busy", "false");
        updateLoadingStatus();
    }, PAGE_DELAY_MS);
  }

  function renderStory(item, lead) {
    item = DappGoNewsData.localizedNews(item, state.language);
    const copy = labels();
    const image = usableImage(item);
    const summary = stripTitlePrefix(item.title, item.summary);
    const publisher = item.source || item.provider || copy.source;
    const stockTag = `${item.symbol} / ${item.company}`;
    const media = image ? `<figure class="story-media"><img data-fallback loading="lazy" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" width="${Number(item.image_width) || 1200}" height="${Number(item.image_height) || 675}"></figure>` : "";
    return `<article class="story ${lead ? "lead" : ""} ${image ? "has-media" : "is-text-only"}"><div class="story-grid"><div class="story-meta"><span class="source-avatar" aria-hidden="true">${escapeHtml(Array.from(String(publisher).trim())[0] || "N")}</span><span class="source-lines"><span class="source">${escapeHtml(publisher)}</span><small>${escapeHtml(item.provider || "RSS")}</small></span><time datetime="${escapeHtml(item.published_at_utc || item.date || "")}">${escapeHtml(formatDate(item.published_at_utc || item.date))}</time></div><h3>${escapeHtml(item.title || "Untitled story")}</h3>${media}<p class="story-excerpt">${escapeHtml(summary || copy.noSummary)}</p><div class="story-footer"><span class="story-tags">${escapeHtml(stockTag)}</span><a class="read-link" href="${escapeHtml(item.url || "#")}">${escapeHtml(copy.readSource)} ↗</a></div></div></article>`;
  }

  function renderAnalyticsChoice() {
    if (!els.analytics || !engagement) return;
    const copy = labels();
    els.analytics.textContent = engagement.privacySignal() ? copy.analyticsPrivacy : engagement.enabled() ? copy.analyticsOn : copy.analyticsOff;
    els.analytics.disabled = engagement.privacySignal();
    els.analytics.setAttribute("aria-pressed", String(engagement.enabled()));
    els.analytics.setAttribute("title", copy.analyticsNote);
    const note = root.querySelector("[data-analytics-note]");
    if (note) note.textContent = copy.analyticsNote;
  }

  function analysisSkeleton() {
    return `<div class="analysis-skeleton" aria-hidden="true"><p class="analysis-copy">${Array.from({ length: 8 }, (_, index) => `<span class="skeleton-block analysis-line ${index >= 6 ? "mobile-line" : ""} ${index === 7 ? "short" : ""}"></span>`).join("")}</p></div>`;
  }

  function renderAnalysis() {
    const scope = `${market}:${state.stock || "all"}`;
    if (scope !== analysisScope) { analysisScope = scope; analysisOpen = false; }
    const result = state.payload ? DappGoNewsData.analysis(state.payload, state.stock, state.language) : null;
    const copy = labels();
    const pending = loading && !state.payload;
    const hadFocus = document.activeElement?.hasAttribute?.("data-analysis-toggle");
    const disabled = !pending && !result;
    const topic = state.stock && state.stock !== "all" ? state.stock : copy.allMarket;
    const prompt = disabled ? copy.aiMissing : analysisOpen ? copy.aiClose : copy.aiOpen;
    let content = "";
    if (analysisOpen) {
      if (pending) {
        const status = loadingPhase === "slow" ? copy.aiSlow : copy.aiLoading;
        content = loadingPhase === "waiting" ? "" : `<div class="analysis-loading" role="status"><span class="analysis-load-label ${loadingPhase === "slow" ? "analysis-slow" : ""}">${status}</span></div>${loadingPhase === "skeleton" ? analysisSkeleton() : ""}`;
      } else if (result) {
        const clean = value => escapeHtml(DappGoNewsData.plainAnalysis(value));
        const contextLabel = state.language === "zh" ? "相關報導 · 來源說法" : "Related report · Publisher account";
        let sourceUrl = "";
        try {
          const parsed = new URL(result.contextUrl);
          if (["https:", "http:"].includes(parsed.protocol) && !parsed.username && !parsed.password) sourceUrl = parsed.href;
        } catch { /* Retain attributed text when no safe source link exists. */ }
        const sourceLink = sourceUrl ? `<a class="read-link" href="${escapeHtml(sourceUrl)}">${copy.readSource} ↗</a>` : "";
        content = `<p class="analysis-note">${copy.aiNote}</p>${result.summary ? `<p class="analysis-copy">${clean(result.summary)}</p>` : ""}${result.context ? `<div class="analysis-context"><strong>${contextLabel}</strong><p>${clean(result.context)}</p>${sourceLink}</div>` : ""}${result.highlights.length ? `<ul>${result.highlights.map(value => `<li>${clean(value)}</li>`).join("")}</ul>` : ""}`;
      } else content = `<p class="analysis-note" role="status">${state.errorMessage ? copy.aiError : copy.aiMissing}</p>`;
    }
    els.analysis.hidden = false;
    els.analysis.setAttribute("aria-busy", String(analysisOpen && pending));
    const markup = `<h2 class="analysis-heading"><button type="button" class="analysis-toggle" data-analysis-toggle aria-expanded="${analysisOpen}" aria-controls="analysis-content" ${disabled && !analysisOpen ? "disabled" : ""}><span class="analysis-heading-copy"><span class="analysis-topic">${escapeHtml(topic)}</span><span>${copy.aiTitle}</span><span class="analysis-prompt">${prompt}</span></span><span class="analysis-chevron ${!analysisOpen && !disabled ? "is-inviting" : ""}" aria-hidden="true">⌄</span></button></h2><div id="analysis-content" class="analysis-content" ${analysisOpen ? "" : "hidden"}>${content}</div>`;
    if (markup === lastAnalysisMarkup) return;
    lastAnalysisMarkup = markup;
    els.analysis.innerHTML = markup;
    if (hadFocus) els.analysis.querySelector("[data-analysis-toggle]")?.focus({ preventScroll: true });
  }

  async function fetchJson(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } finally { clearTimeout(timeout); }
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
    els.retry.hidden = true;
    els.updated.textContent = result.pointer.generated_at_utc ? `${copy.dataLabel} ${formatDate(result.pointer.generated_at_utc)}` : copy.dataTimeUnavailable;
    setStatus(`${copy.published} · ${copy.marketName}`, "ok");
    renderStocks();
    renderStories();
    syncViewUrl();
  }

  let loading = false;
  let skeletonTimer = null;
  let slowLoadingTimer = null;
  async function initialLoad() {
    if (loading) return;
    loading = true;
    cancelAppend();
    loadingPhase = "waiting";
    els.skeletons.hidden = true;
    els.error.hidden = true;
    els.retry.hidden = true;
    updateLoadingStatus();
    renderAnalysis();
    if (!state.payload) skeletonTimer = setTimeout(() => {
      loadingPhase = "skeleton";
      els.skeletons.hidden = false;
      updateLoadingStatus();
      renderAnalysis();
    }, SKELETON_DELAY_MS);
    slowLoadingTimer = setTimeout(() => {
      loadingPhase = "slow";
      els.skeletons.hidden = true;
      updateLoadingStatus();
      renderAnalysis();
    }, SLOW_LOAD_MS);
    els.retry.disabled = true;
    els.reload.disabled = true;
    els.stories.setAttribute("aria-busy", "true");
    try {
      applyLoaded(await loadPayload());
      els.update.classList.remove("is-visible");
      schedulePoll();
    } catch (error) {
      const copy = labels(); state.errorMessage = error.message;
      els.skeletons.hidden = true; els.error.hidden = false; els.retry.hidden = false;
      els.error.textContent = `${state.payload ? copy.unableToRefresh : copy.unableToLoad} ${copy.marketName}: ${error.message}`;
      setStatus(copy.dataUnavailable, "error");
    } finally {
      clearTimeout(skeletonTimer); clearTimeout(slowLoadingTimer);
      loadingPhase = "waiting";
      loading = false; els.retry.disabled = false; els.reload.disabled = false;
      els.stories.setAttribute("aria-busy", "false");
      updateLoadingStatus();
      updatePagination();
      renderAnalysis();
    }
  }

  async function poll() {
    if (loading) { schedulePoll(); return; }
    try {
      const pointer = await fetchJson(pointerUrl);
      if (state.pointer && pointer.hash !== state.pointer.hash) els.update.classList.add("is-visible");
      else if (!state.pointer) await initialLoad();
    } catch (_) { /* Existing last-good view remains readable. */ }
    schedulePoll();
  }

  function schedulePoll() { clearTimeout(state.refreshTimer); state.refreshTimer = setTimeout(poll, 120000 + Math.floor(Math.random() * 15000)); }

  function updateQuery(value) { state.query = value; state.visibleCount = PAGE_SIZE; syncViewUrl(); renderStocks(); renderStories(); }

  els.search.addEventListener("input", (event) => updateQuery(event.target.value));
  els.mobileSearch.addEventListener("input", (event) => updateQuery(event.target.value));
  root.querySelectorAll("[data-clear-search]").forEach((button) => button.addEventListener("click", () => {
    updateQuery("");
    button.closest(".search").querySelector("input").focus();
  }));
  els.mobileSelect.addEventListener("change", (event) => { state.stock = event.target.value; state.visibleCount = PAGE_SIZE; syncViewUrl(); renderStocks(); renderStories(); });
  els.languageButtons.forEach((button) => button.addEventListener("click", () => {
    const next = button.dataset.language;
    if (!["zh", "en"].includes(next) || next === state.language) return;
    state.language = next;
    try { localStorage.setItem(languageStorageKey, next); } catch (_) { /* Preference is optional. */ }
    syncViewUrl();
    applyLanguage();
  }));
  els.analysis.addEventListener("click", (event) => {
    const button = event.target.closest("[data-analysis-toggle]");
    if (!button || button.disabled) return;
    analysisOpen = !analysisOpen;
    if (analysisOpen) engagement?.recordOpen({ market, stock: state.stock || "all", language: state.language });
    renderAnalysis();
  });
  els.analytics?.addEventListener("click", () => {
    if (!engagement || engagement.privacySignal()) return;
    engagement.setEnabled(!engagement.enabled());
    renderAnalyticsChoice();
  });
  els.reload.addEventListener("click", initialLoad);
  els.retry.addEventListener("click", initialLoad);
  els.loadMore?.addEventListener("click", appendNextPage);
  window.addEventListener("popstate", applyViewStateFromUrl);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") poll(); });
  applyLanguage();
  initialLoad();
}());
