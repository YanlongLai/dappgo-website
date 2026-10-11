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

- Merged source SHA: `441bf2ce9c313d6907947fd176ac764b5bfde41f`.
- Cloudflare Pages project: `dappgo-news`.
- Production deployment ID: `0875cb6b-0bb4-462c-8ffc-5a9c21921147`.
- Deployment URL: `https://0875cb6b.dappgo-news.pages.dev`.
- `https://news.dappgo.com/us/` — HTTP 200, deployed asset
  `news.js?v=20261011-reader-navigation`, pointer 200.
- `https://news.dappgo.com/tw/` — HTTP 200, deployed asset
  `news.js?v=20261011-reader-navigation`, pointer 200.
- Browser rendering confirmed both editions show `US` before `TW`, no company
  symbol/market line, and no explanatory source/date sentence.
- Browser return-path check: opened a US source link in the same tab from
  `https://news.dappgo.com/us/?stock=AAPL&lang=zh`; browser Back returned to
  the News reader with the same URL state, selected Apple story list and
  Chinese language.
- The change removed no responsive layout rules; local responsive contract
  remains green and the deployed mobile DOM keeps the existing search/select
  controls. No horizontal-overflow regression was observed in the touched
  layout.
