# NEWS-BROWSER-LANGUAGE-DEFAULT-20261011 evidence

## Local gates

- `node --check news/assets/news.js` — passed.
- `node news/tests/analysis.mjs` — passed (`Locale and scope selectors: passed`).
- `node news/tests/contract.mjs` — passed (`news reader contract: passed (12 files)`).
- `git diff --check` — passed.
- AI001 coordinator heartbeat — passed for claim `CLM-72807B0DA064`.

## Release and deployment

- Feature commit: `b18bd57e63e9f21d995197a02fafa97342bd98f7`.
- Pull request: [#23](https://github.com/YanlongLai/dappgo-website/pull/23), merged.
- Merged main commit: `254c8d09b0eb90eacb44077d98e00914eb0e1935`.
- Cloudflare Pages project: `dappgo-news`.
- Production deployment: `32d40195-6925-46e3-b923-b58e0d4355b9`.
- Preview URL: https://32d40195.dappgo-news.pages.dev
- Deployment source: `254c8d0`.

## Production checks

Checked on 2026-10-11 after deployment with cache-busting query
`verify=browser-locale-20261011`:

- `https://news.dappgo.com/` — HTTP 200; landing document contains the
  executable redirect to `/us/` and no legacy `/tw/` redirect.
- `https://news.dappgo.com/us/` — HTTP 200; serves
  `news.js?v=20261011-browser-locale` and `lang="en"` markup.
- `https://news.dappgo.com/tw/` — HTTP 200; serves the same new resolver and
  retains `lang="zh-Hant"` markup.
- The resolver is covered by contract tests for `navigator.languages` and
  `navigator.language`; its precedence is explicit `?lang=` → saved manual
  choice → first browser language (`zh*` → Chinese) → English for US.
- Existing reader navigation, source links, RSS payloads, and AI analysis were
  not changed by this release.

GitHub Actions remain paused under the Owner instruction and are not counted
as passed. The local AI001 gates and the production HTTP/source checks above
are the recorded evidence for this release.
