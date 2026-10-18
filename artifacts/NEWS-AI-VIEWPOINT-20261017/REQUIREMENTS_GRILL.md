# Requirements intake

Readiness: ready-for-design. The Owner explicitly requested diagnosis, repair, merge and deployment before resuming the separate News App work. The production US/TW payload and website selector were inspected rather than asking the Owner for observable facts.

Goal: restore a truthful, stock-specific AI viewpoint card with language switching. Non-goals: manual report replay, social publication, credential changes, or relaxing upstream grounding checks. The existing published US `news_commentary` is a model-selected source quotation/watchpoint plan, while `ai_commentary` is per-stock quantitative analysis; TW has per-stock `ai_commentary` and no optional news commentary. Prefer an available stock-scoped analysis over source quotations, and abstain on missing/generic content. Repairing upstream content quality is a separate bounded engine change if the selector alone cannot satisfy acceptance.

Acceptance: US/TW selected stock and all-market cards use the correct language, no article list is labeled an AI viewpoint, absent analysis hides the card, regression tests pass, and the deployed asset is verified. Production report regeneration follows the existing natural schedule unless separately authorized.

Provenance: task `01a141c5-8985-7853-a8a7-b479936ed1e4`, host `local`, `YanlongLai/dappgo-website`, branch `fix/news-ai-viewpoint-20261017`, logical worktree `dappgo-news-ai-viewpoint-20261017`.
