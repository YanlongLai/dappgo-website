# Evidence - NEWS-MOBILE-THUMBNAIL-20261010

## Scope

- Removed the visible `Article thumbnail` / `文章縮圖` prompt and caption.
- Kept supplied article images, image `alt` text, lazy loading and failed-image text-only fallback.
- Kept the existing RSS/data gateway, stock selection, language switch, story ordering and source links unchanged.
- No changes to RSS ingestion, data files, Postiz, schedules or server runtime.

## Local verification

Verified 2026-10-11T06:30:41Z with Wrangler Pages Dev from the `news/` project root on a 390x844 mobile viewport.

- Taiwan route `/tw/`: published pointer `33fae46240b4`, five stories loaded, search `2330` narrowed the selector, selecting `台積電 · 2330` rendered the matching company stories, English switch rendered `TAIWAN EDITION`, no thumbnail prompt text, no horizontal overflow (`scrollWidth=390`).
- United States route `/us/`: published pointer `0eab2a98cf2c`, twelve stories loaded, search `TSLA` narrowed the selector, selecting `Tesla Inc. · TSLA` rendered the matching company stories, Chinese switch rendered the Chinese edition, no thumbnail prompt text, no horizontal overflow (`scrollWidth=390`).
- Mobile visual check: controls, story heading, date/source metadata and article content are visible in the first viewport; the page is not a persistent skeleton.
- Local API requests returned 200 for both market pointers and data manifests.

The first production check exposed a cache-version defect: the deployed HTML
still referenced the previous `news.js?v=20261010-bilingual-reader` asset, so
the edge could execute the old copy dictionary even when the HTML was current.
The fix changes both route asset URLs to
`news.js?v=20261011-mobile-reader` (and the stylesheet URL for parity) and
adds a contract assertion so future copy changes cannot reuse the stale asset
version silently.

## Automated checks

- `node --check news/assets/news.js` passed.
- `node news/tests/contract.mjs` passed: `news reader contract: passed (12 files)`.
- `git diff --check` passed.

## Remaining gates

- Merge to `master`, deploy the Pages project from `/news` so Pages Functions remain included, then verify `https://news.dappgo.com/tw/` and `https://news.dappgo.com/us/` with a cache-busting query.
