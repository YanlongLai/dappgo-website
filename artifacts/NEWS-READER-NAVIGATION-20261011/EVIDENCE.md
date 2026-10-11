# NEWS-READER-NAVIGATION-20261011 evidence

## Change

- Removed the redundant selected-company symbol/market line and source/date
  editorial sentence from both News editions.
- Reordered the market switcher to `US`, then `TW`, with those stable labels
  in both languages.
- Kept story source and publication date in each card, removed new-tab
  navigation, and persisted `stock`, `range`, `q`, and `lang` in the current
  URL so browser Back restores the reader context.

## Local verification

- `node --check news/assets/news.js` — passed.
- `node news/tests/analysis.mjs` — passed.
- `node news/tests/contract.mjs` — passed.
- `git diff --check` — passed.

## Acceptance mapping

- Header cleanup: both `news/us/index.html` and `news/tw/index.html` no longer
  contain `data-company-symbol` or `companyIntro`; contract test enforces it.
- Market order: both pages contain `US` before `TW`; contract test enforces it.
- Reader return path: `news.js` uses same-tab story links, URL state, and a
  `popstate` restoration handler; contract test enforces the implementation.
- Responsive behavior: existing mobile search/select and responsive layout
  remain unchanged; production browser verification is required after merge.

## Deployment verification

To be recorded after merge: merged source SHA, Cloudflare Pages deployment
ID, `/us/` and `/tw/` HTTP checks, rendered header/nav state, one same-tab
article navigation followed by browser Back, and mobile no-overflow checks.
