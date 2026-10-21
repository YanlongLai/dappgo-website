(function (global) {
  "use strict";
  const text = value => typeof value === "string" ? value.trim() : "";
  function localizedNews(item, language) {
    return { ...item, title: text(item[`title_${language}`]) || text(item.title), summary: text(item[`summary_${language}`]) || text(item.summary) };
  }
  function isViewpoint(value) {
    const content = text(value);
    if (!content) return false;
    // The optional US news plan is a source index and generic checklist, not
    // a company interpretation. Never promote it into the AI viewpoint card.
    // Keep rejecting raw field dumps and unavailable placeholders, but allow
    // the published source-bound historical viewpoint when model prose is
    // unavailable. Optional news quality is rendered separately below.
    return !/(新聞來源摘錄|source quotations|以下僅為輸入觀察|conditional readings of supplied ticker observations|模型說明暫時不可用|model commentary is temporarily unavailable|不足以形成方向性個股觀點|insufficient for a directional company view|\b(?:close_usd|ma20_usd|ma60_usd|rsi14|fact_refs)\b)/i.test(content);
  }
  function analysis(payload, stock, language) {
    if (!payload || (stock !== "all" && !payload.ticker_data?.[stock])) return null;
    const reportKey = language === "en" ? "ai_commentary_en" : "ai_commentary";
    const report = payload?.[reportKey];
    const mapped = report && typeof report === "object" ? text(report[stock === "all" ? "summary" : stock]) : stock === "all" ? text(report) : "";
    // Only the report's analysis has an appropriate provenance for this card.
    // Optional news_commentary is a source-selection plan; unknown legacy text
    // may also be a source recap, so we abstain rather than guess its meaning.
    const concise = stock === "all" ? text(payload[language === "en" ? "ai_commentary_summary_en" : "ai_commentary_summary"]) : "";
    const summary = concise || (stock === "all" ? mapped.split(/\n\s*\n/)[0] : mapped);
    if (!isViewpoint(summary)) return null;
    const owner = stock === "all" ? null : payload.ticker_data[stock];
    // News-plan quality is a separate optional source-context contract. It
    // must not hide a valid per-ticker AI viewpoint from the report.
    const accepted = owner?.news_ai_quality?.status === "accepted";
    const suffix = language === "en" ? "_en" : "";
    const sourceSummary = accepted ? text(owner[`news_commentary_summary${suffix}`]) : "";
    const sourceBody = accepted ? text(owner[`news_commentary${suffix}`]) : "";
    const reportedLine = sourceBody.split("\n").find(line => /:\s*[「“]/.test(line)) || "";
    const hasCuratedSummary = Object.prototype.hasOwnProperty.call(owner || {}, `news_commentary_summary${suffix}`);
    const context = /相關報導|reported context/i.test(sourceSummary)
      ? sourceSummary
      : hasCuratedSummary && !sourceSummary ? "" : reportedLine;
    return { summary, highlights: [], context, contextUrl: context ? text(owner?.news_commentary_primary_url) : "" };
  }
  function plainAnalysis(value) {
    return text(value).replace(/\[\[(?:[a-z]+[:|])?([^\]]+)\]\]/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/^#{1,6}\s+/gm, "");
  }
  const api = { localizedNews, analysis, plainAnalysis };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.DappGoNewsData = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
