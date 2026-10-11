# Requirements Grill - NEWS-MOBILE-THUMBNAIL-20261010

## Round 1 - Owner request

### Request

Verify the Taiwan and United States News pages in a mobile browser and remove
the visible "Article thumbnail" / "文章縮圖" hint from article cards. Keep
available images and accessible image alternatives; do not change the RSS/data
contract, stock selection, language switch, or source links.

### Decisions

- Scope: `news/tw/`, `news/us/`, shared `news/assets/news.js`, shared contract
  tests and evidence only.
- Keep article images when the payload supplies a permitted `image_url`.
- Remove the visual caption/prompt under images and copy that calls attention to
  thumbnail availability.
- Preserve `alt` text, loading fallback, text-only fallback, source links,
  stock search/select, newest-first order, and Chinese/English UI switching.
- Validate at mobile-width behavior before the Pages deployment, then verify
  both production routes after deployment.

### Readiness

`ready-for-design` and `ready-for-implementation`: the requested behavior is
explicit and does not require a product or data-model decision.

## Acceptance matrix

| Criterion | Status | Evidence | Next action |
| --- | --- | --- | --- |
| Mobile TW and US pages load without persistent skeletons | passed locally | EVIDENCE.md | Run production verification after merge |
| Mobile stock search/selection and language controls remain usable | passed locally | EVIDENCE.md | Run production verification after merge |
| Visible article-thumbnail prompts are removed while images remain | passed locally | EVIDENCE.md | Run production verification after merge |
| RSS/data gateway and source-link behavior are unchanged | passed locally | EVIDENCE.md | Run production verification after merge |
| Main merge and Pages deployment are verified | pending | New run | Deploy only after all checks pass |

## Provenance

- Codex task: `01a11404-c851-7830-a9f2-0494afcd2891`
- Host: `local`
- Repository: `YanlongLai/dappgo-website`
- Worktree label: `news-mobile-thumbnail-20261010`
- Branch: `feature/news-mobile-thumbnail-20261010`
