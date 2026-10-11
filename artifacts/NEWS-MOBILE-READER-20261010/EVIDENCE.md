# Evidence — NEWS-MOBILE-READER-20261010

## Root causes

- `news/assets/news.css` defined `.skeletons { display: grid; }`. The browser's
  user-agent `[hidden]` rule was therefore overridden after JavaScript set
  `data-skeletons.hidden = true`, leaving the shimmer blocks visible after the
  payload had loaded.
- The mobile edition rendered an informational `.mobile-picker` button that
  had no event handler. The desktop rail was hidden below 620px, so mobile
  readers had no way to search or change ticker.

## Changes

- Added `.skeletons[hidden] { display: none !important; }`.
- Added labelled mobile search and native select controls to both `/tw/` and
  `/us/`.
- Reused the existing query/stock state and payload; filtered search results
  populate the select, while the selected ticker remains available when a
  query would otherwise hide it.
- Added contract assertions for both mobile controls, the hidden skeleton
  rule and the mobile media-query display rule.
- Versioned the CSS/JS asset URLs so Pages' immutable asset policy cannot keep
  a previous reader bundle after this fix.

## Bilingual reader extension

- Added one shared Chinese/English control to both `/tw/` and `/us/`.
- The preference is stored locally under `dappgo-news-language`; switching
  language updates interface labels, accessibility names, controls, status
  messages and market-localized dates without refetching or changing the
  in-memory payload.
- The formal payload was inspected and does not expose authoritative parallel
  translations for article titles or summaries. Those source RSS fields remain
  unchanged, which avoids presenting invented translations as source content.
- The control remains visible in the narrow-screen header and uses native
  buttons with `aria-pressed` state. Desktop stock rail, mobile selector,
  newest-first ordering and immutable gateway pointers remain shared.

## Verification

Verified at `2026-10-11T06:01:07Z` in the feature worktree
`news-mobile-reader-20261010`:

- `node --check news/assets/news.js` — passed.
- `node --check news/functions/api/markets/[market]/dashboard/[file].js` —
  passed.
- `node news/tests/contract.mjs` — passed (`12 files`).
- `scripts/verify-ai-readiness.py` with the managed AI001 runtime — passed.
- `git diff --check` — passed.
- Local Pages-style smoke server using the formal gateway:
  - `/tw/` loaded pointer `33fae46240b4`, populated 102 stock options, and
    skeleton visibility was false after load.
  - `/us/` populated the stock selector (first options: AAPL, ABNB, AMD) and
    skeleton visibility was false after load.
  - Both pages reported zero browser console errors.

Verified at `2026-10-11T06:11:59Z` in the same feature worktree after the
bilingual extension:

- `node --check news/assets/news.js` — passed.
- `node news/tests/contract.mjs` — passed (`12 files`), including language
  hooks, localized control contracts and language-switch CSS.
- `git diff --check` — passed.
- `scripts/verify-ai-readiness.py` with the managed AI001 runtime — passed.
- Local Pages-style smoke server using the formal gateway:
  - `/tw/` loaded pointer `33fae46240b4`, populated the Taiwan stock selector,
    and switched from Chinese to English while retaining the live pointer and
    stories.
  - `/us/` loaded pointer `0eab2a98cf2c`, populated the US stock index, and
    switched from English to Chinese while retaining the live pointer and
    stories.
  - Date output changed locale/time presentation with the toggle; source RSS
    titles and summaries stayed in their original language.
- No RSS pipeline, data gateway, Postiz, provider, schedule or production data
  was changed.

## Merge and production Pages release

Merged to `master` and pushed to `origin/master` at commit
`8eb1d864ee494d502fc1f34ee7a5c6de6d6efc7a`.

The first upload from the repository parent was intentionally not accepted as
the release: it uploaded static assets but did not include the Pages Function,
so `/api/markets/*/dashboard/latest.json` returned 404. The deployment command
was corrected to run from the `news/` project root, where `wrangler.toml`, the
`functions/` tree and `_routes.json` are discovered together.

The final deployment was completed at `2026-10-11T06:18Z`:

- Pages project: `dappgo-news`
- Source commit: `8eb1d864ee494d502fc1f34ee7a5c6de6d6efc7a`
- Deployment ID: `588f9eca-3a83-4f8e-87f1-10db4c7631c8`
- Deployment URL: `https://588f9eca.dappgo-news.pages.dev`
- Custom domain: `https://news.dappgo.com`
- Official command root: `news/`

Production verification at `2026-10-11T06:19Z`:

- `https://news.dappgo.com/tw/` loaded the formal pointer `33fae46240b4`,
  populated the Taiwan stock index and displayed newest-first stories.
- `https://news.dappgo.com/us/` loaded the formal pointer `0eab2a98cf2c`,
  populated the US stock index and displayed article thumbnails and source
  summaries.
- The Pages Function returned the live gateway payload for both markets; the
  deployed static-only preview was not used as production evidence.
- The TW reader switched Chinese → English and the US reader switched English
  → Chinese. Locale labels, dates, controls and accessibility state changed
  while the pointer and story payload remained unchanged.
- The production HTML exposed the bilingual controls and versioned assets;
  no RSS pipeline, Postiz schedule, server runtime or external publication was
  changed.
