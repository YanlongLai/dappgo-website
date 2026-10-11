(function (global) {
  "use strict";
  const text = value => typeof value === "string" ? value.trim() : "";
  function localizedNews(item, language) {
    return { ...item, title: text(item[`title_${language}`]) || text(item.title), summary: text(item[`summary_${language}`]) || text(item.summary) };
  }
  function analysis(payload, stock, language) {
    const owner = stock === "all" ? payload : payload?.ticker_data?.[stock];
    if (!owner) return null;
    const prefix = stock === "all" ? "ai_commentary" : "news_commentary";
    const key = language === "en" ? `${prefix}_en` : prefix;
    const reportKey = language === "en" ? "ai_commentary_en" : "ai_commentary";
    const report = payload?.[reportKey];
    const mapped = report && typeof report === "object" ? text(report[stock === "all" ? "summary" : stock]) : "";
    const summary = text(owner[`${key}_summary`]) || text(owner[key]) || mapped;
    const highlights = Array.isArray(owner[`${key}_highlights`]) ? owner[`${key}_highlights`].map(text).filter(Boolean) : [];
    return summary || highlights.length ? { summary, highlights } : null;
  }
  function plainAnalysis(value) {
    return text(value).replace(/\[\[(?:[a-z]+[:|])?([^\]]+)\]\]/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/^#{1,6}\s+/gm, "");
  }
  const api = { localizedNews, analysis, plainAnalysis };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.DappGoNewsData = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
