# News feed loading design

Status: ready-for-design → implementation. Tier R2; website promotion is R3.

Authority: the Owner requests matching skeleton screens on news.dappgo.com and News App, including initial loading and scrolling for more stories. The same session already authorizes merge, website deployment and cleanup. Store production/submission remains outside this task.

Goal: preserve DappGo's warm paper/forest palette and editorial card layout while showing round publisher placeholders, title bars, summary bars and media space during loading. Latest Owner refinement: skeleton geometry must closely follow the real card across screen sizes; use subtle shimmer, suppress skeletons for responses below 300ms, replace them with explanatory progress after a long wait, and delay/coalesce pagination. Website and native app share the immutable news API, but render independently; implement both consumers without changing the data contract.

Acceptance:
- Initial load and failed-load retry show two decorative skeleton cards and one localized loading announcement.
- Incremental loading shows skeletons at the feed tail while keeping already rendered stories in place; button and automatic scroll share one cancellable queue.
- Pending appends cannot cross stock, market, language, search, refresh or unmount boundaries; no duplicate batches or additional network requests.
- Reduced motion produces static placeholders; assistive technology ignores individual shapes and hears one status. Existing ads/consent/entitlement behavior is preserved.
- Web US/TW, desktop/mobile, empty/error/retry, keyboard controls and pagination are checked. Native iOS and Android exports are checked separately, with native execution evidence recorded only where actually available.

Scope: news reader UI and focused regression tests only. No market-data changes, social publication, billing, credentials or app-store submission. Stop promotion for a failed functional/secret-scan/review gate.

Discovery: Website is in Meta registry. News App remote is verified as YanlongLai/dappgo-news-app, but Meta developer-repos/catalog omit it; discovery is degraded and the explicit user request plus repository source define its bounded scope. No registry edits in this item.
