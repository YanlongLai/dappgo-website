# Current checkpoint

## Release observation

PR #19 merged as 79b86a0eb79c7e7fb47b755add03e72c07d05676.
Cloudflare Pages production deployment: 814b72ba.dappgo-news.pages.dev,
project dappgo-news, branch master, including Functions bundle.
Public news-data.js SHA-256 matches source:
5819c6fbc64bb5138d29ad7796c093e2ff4dc6164392ce312df449b7049bfc27.
On 2026-10-11, public /us/ AAPL and all-market cards and /tw/ 2330 cards
were verified switching zh/en. TW 7-day filtering preserves current-report
analysis, language zh-Hant and no horizontal overflow. Independent assurance
passes selector/rendering/formatting scope. Headline generation remains deferred.

Wrangler generated an untracked local .wrangler cache during upload; add a
project-local ignore rule so future deployment does not dirty tracked source.
This documentation/cache-ignore follow-up requires no runtime redeployment.

Implemented local AI reading cards for both markets. Pure selector tests and static reader contract pass; JavaScript syntax passes. Not merged or deployed. Browser confirms US AAPL Chinese commentary and TW 2330 mapped commentary visible without overflow. Independent review identified literal Markdown; repaired with tested plain-text normalization. Follow-up assurance and full responsive matrix pending.

Published US snapshot inspected on 2026-10-11: immutable data-0eab2a98cf2c.json, generated 2026-10-09T19:15:10Z. AAPL news has only original English title/summary, while news_commentary is Traditional Chinese. Report supplies ai_commentary and ai_commentary_en. Current US app news aggregator explicitly preserves original headlines, regardless of UI locale. Therefore translated-title completion requires upstream generation or an existing alternate localized source to be established; no synthetic title claim is made.

Cards use only the selected scope and locale. Absent translations do not borrow commentary from the other locale. Range filters remain article-only and card copy explicitly identifies the current report. No model calls or additional data fetches.

Published ai_commentary is also an object: summary holds aggregate analysis, ticker keys hold per-company analysis. This existing representation is supported alongside ticker-local news_commentary strings, with tests preventing concatenation of all ticker analyses into a fabricated aggregate.

Owner scope resolution: deploy the AI card with live language selection. Translated headline generation is deferred, not claimed complete. Supplied title_zh/title_en fields remain supported; current original titles remain unchanged when absent.

Browser verification: US AAPL and report-summary cards switch zh/en using the same published payload; TW 2330 switches zh/en using envelope ticker entries. At 390px both markets show readable analysis within viewport with no horizontal overflow. Pure tests cover absent scope/locale hide, cleaned Markdown/markers, mapped report summary and ticker commentary, and supplied localized news fields. No source or provider generation is invoked by language changes.
