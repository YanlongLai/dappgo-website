(function () {
  "use strict";

  const root = document.querySelector("[data-news-app]");
  if (!root) return;

  const market = root.dataset.market;
  const marketLabel = market === "tw" ? "台灣市場" : "United States";
  const locale = market === "tw" ? "zh-TW" : "en-US";
  const proxyRoot = `/api/markets/${market}/dashboard/`;
  const pointerUrl = `${proxyRoot}latest.json`;
  const state = { pointer: null, payload: null, stock: null, query: "", range: "all", refreshTimer: null };
  const els = {
    stockList: root.querySelector("[data-stock-list]"),
    search: root.querySelector("[data-stock-search]"),
    mobileSearch: root.querySelector("[data-stock-search-mobile]"),
    mobileSelect: root.querySelector("[data-mobile-stock-select]"),
    company: root.querySelector("[data-company-name]"),
    symbol: root.querySelector("[data-company-symbol]"),
    updated: root.querySelector("[data-updated]"),
    stories: root.querySelector("[data-stories]"),
    count: root.querySelector("[data-count]"),
    status: root.querySelector("[data-status]"),
    statusDot: root.querySelector("[data-status-dot]"),
    update: root.querySelector("[data-update-banner]"),
    reload: root.querySelector("[data-update-reload]"),
    skeletons: root.querySelector("[data-skeletons]"),
    error: root.querySelector("[data-error]")
  };

  function setStatus(message, kind) {
    if (els.status) els.status.textContent = message;
    if (els.statusDot) els.statusDot.className = `status-dot${kind ? ` is-${kind}` : ""}`;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function formatDate(value) {
    if (!value) return market === "tw" ? "日期未提供" : "Date unavailable";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value.slice(0, 10);
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: market === "tw" ? "Asia/Taipei" : "America/New_York" }).format(date);
  }

  function dayKey(value) {
    if (!value) return "unknown";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric", timeZone: market === "tw" ? "Asia/Taipei" : "America/New_York" }).format(date);
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

  function usableImage(item) {
    return item && !["restricted", "unavailable"].includes(item.image_status) && typeof item.image_url === "string" && /^https:\/\//i.test(item.image_url) ? item.image_url : null;
  }

  function articleId(item, index) {
    return item.provider_id || item.url || `${item.title || "story"}-${index}`;
  }

  function renderStocks() {
    const filter = state.query.toLowerCase();
    const allEntries = entries();
    const all = allEntries.filter((entry) => `${entry.symbol} ${entry.name}`.toLowerCase().includes(filter));
    if (!state.stock && all.length) state.stock = all[0].symbol;
    const allButton = `<button class="stock-button" type="button" data-stock="all" aria-current="${state.stock === "all" ? "true" : "false"}"><span>${market === "tw" ? "全部市場消息" : "All market news"}</span><small>ALL</small></button>`;
    const buttons = all.map((entry) => `<button class="stock-button" type="button" data-stock="${escapeHtml(entry.symbol)}" aria-current="${state.stock === entry.symbol ? "true" : "false"}"><span>${escapeHtml(entry.name)}</span><small>${escapeHtml(entry.symbol)}</small></button>`).join("");
    els.stockList.innerHTML = allButton + buttons;
    els.stockList.querySelectorAll("[data-stock]").forEach((button) => button.addEventListener("click", () => { state.stock = button.dataset.stock; renderStocks(); renderStories(); }));
    const selectedEntry = allEntries.find((entry) => entry.symbol === state.stock);
    const mobileEntries = selectedEntry && state.stock !== "all" && !all.some((entry) => entry.symbol === state.stock) ? [selectedEntry, ...all] : all;
    if (els.mobileSelect) {
      const allLabel = market === "tw" ? "全部市場消息" : "All market news";
      els.mobileSelect.innerHTML = `<option value="all">${allLabel}</option>${mobileEntries.map((entry) => `<option value="${escapeHtml(entry.symbol)}">${escapeHtml(entry.name)} · ${escapeHtml(entry.symbol)}</option>`).join("")}`;
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
    const selected = selectedEntries();
    const company = selected[0] || { symbol: state.stock || "", name: market === "tw" ? "台灣市場" : "United States" };
    const stories = selected.flatMap((entry) => entry.news.map((item, index) => ({ ...item, symbol: entry.symbol, company: entry.name, key: articleId(item, index) })));
    stories.sort((a, b) => String(b.published_at_utc || b.date || "").localeCompare(String(a.published_at_utc || a.date || "")) || a.key.localeCompare(b.key));
    const filtered = stories.filter((item) => {
      if (state.range === "all") return true;
      const published = new Date(item.published_at_utc || item.date || 0).getTime();
      return published && Date.now() - published <= Number(state.range) * 86400000;
    });
    els.company.textContent = state.stock === "all" ? (market === "tw" ? "全部市場消息" : "All market news") : company.name;
    els.symbol.textContent = state.stock === "all" ? market.toUpperCase() : `${company.symbol} · ${market === "tw" ? "TWSE" : "US MARKET"}`;
    els.count.textContent = `${filtered.length} ${market === "tw" ? "則" : "stories"} · newest → oldest`;
    if (!filtered.length) {
      els.stories.innerHTML = `<div class="empty">${market === "tw" ? "目前沒有可顯示的新聞。" : "No news is available for this selection."}</div>`;
      return;
    }
    const groups = new Map();
    filtered.forEach((item) => { const key = dayKey(item.published_at_utc || item.date); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
    els.stories.innerHTML = Array.from(groups.entries()).map(([date, items]) => `<div class="date-rule">${escapeHtml(date)}<span>${items.length} ${market === "tw" ? "則" : "stories"}</span></div>${items.map((item, index) => renderStory(item, index === 0 && groups.size === 1)).join("")}`).join("");
    els.stories.querySelectorAll("img[data-fallback]").forEach((image) => image.addEventListener("error", () => { const story = image.closest(".story"); if (story) { story.classList.add("is-text-only"); const media = story.querySelector(".story-media"); if (media) media.remove(); } }, { once: true }));
  }

  function renderStory(item, lead) {
    const image = usableImage(item);
    const summary = stripTitlePrefix(item.title, item.summary);
    const publisher = item.source || item.provider || (market === "tw" ? "新聞來源" : "Source");
    const stockTag = `${item.symbol} / ${item.company}`;
    const media = image ? `<figure class="story-media"><img data-fallback loading="lazy" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" width="${Number(item.image_width) || 1200}" height="${Number(item.image_height) || 675}"><figcaption>${escapeHtml(publisher)} · article thumbnail</figcaption></figure>` : "";
    return `<article class="story ${lead ? "lead" : ""} ${image ? "has-media" : "is-text-only"}"><div class="story-grid"><div class="story-meta"><span class="source">${escapeHtml(publisher)}</span><span>· ${escapeHtml(item.provider || "RSS")}</span><time datetime="${escapeHtml(item.published_at_utc || item.date || "")}">${escapeHtml(formatDate(item.published_at_utc || item.date))}</time></div><h3>${escapeHtml(item.title || "Untitled story")}</h3>${media}<p class="story-excerpt">${escapeHtml(summary || (market === "tw" ? "來源未提供獨立摘要，請前往原文閱讀完整內容。" : "The source did not provide a separate summary. Read the original article for full context."))}</p><div class="story-footer"><span class="story-tags">${escapeHtml(stockTag)}</span><a class="read-link" href="${escapeHtml(item.url || "#")}" target="_blank" rel="noopener noreferrer">${market === "tw" ? "閱讀原文" : "Read source"} ↗</a></div></div></article>`;
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
    state.pointer = result.pointer;
    state.payload = result.payload;
    els.skeletons.hidden = true;
    els.error.hidden = true;
    els.updated.textContent = result.pointer.generated_at_utc ? `Data ${formatDate(result.pointer.generated_at_utc)}` : "Data time unavailable";
    setStatus(`Live ${marketLabel} data · pointer ${String(result.pointer.hash || "").slice(0, 12)}`, "ok");
    renderStocks();
    renderStories();
  }

  async function initialLoad() {
    try { applyLoaded(await loadPayload()); schedulePoll(); }
    catch (error) { els.skeletons.hidden = true; els.error.hidden = false; els.error.textContent = `Unable to load ${marketLabel} news: ${error.message}`; setStatus("Data unavailable", "error"); }
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

  function updateQuery(value) { state.query = value; renderStocks(); }

  els.search.addEventListener("input", (event) => updateQuery(event.target.value));
  els.mobileSearch.addEventListener("input", (event) => updateQuery(event.target.value));
  els.mobileSelect.addEventListener("change", (event) => { state.stock = event.target.value; renderStocks(); renderStories(); });
  els.reload.addEventListener("click", async () => {
    els.update.classList.remove("is-visible");
    try {
      applyLoaded(await loadPayload());
    } catch (error) {
      setStatus("Data unavailable", "error");
      els.error.hidden = false;
      els.error.textContent = `Unable to refresh ${marketLabel} news: ${error.message}`;
    }
  });
  root.querySelectorAll("[data-range]").forEach((button) => button.addEventListener("click", () => { state.range = button.dataset.range; root.querySelectorAll("[data-range]").forEach((item) => item.setAttribute("aria-pressed", String(item === button))); renderStories(); }));
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") poll(); });
  initialLoad();
}());
