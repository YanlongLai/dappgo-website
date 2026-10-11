# Evidence — NEWS-WEB-IMPLEMENT-20261010

## Intake

- Owner requested formal RSS/data integration and Cloudflare Pages publication
  for `news.dappgo.com/tw` and `news.dappgo.com/us`.
- Existing pointer and immutable payload reads were verified before coding:
  US pointer hash `0eab2a98cf2c3f0a66b48edbe72d5f0143d1a177800aea51f72a36368966380`,
  TW pointer hash `33fae46240b45af710c2597f279613a07e4155b07537351b3b8f35a66a30e432`.
- The implementation is read-only at the data boundary; no engine, Airflow,
  RSS source or production data was changed.

## Verification log

### Local implementation gates

- `node --check news/assets/news.js` — passed.
- `node --check 'news/functions/api/markets/[market]/dashboard/[file].js'` — passed.
- `node news/tests/contract.mjs` — passed (`12 files`).
- `python scripts/verify-ai-readiness.py` using the managed AI001 runtime — passed.
- `git diff --check` — passed.
- Wrangler Pages local runtime — passed: `/tw/` and `/us/` returned 200;
  same-origin pointer and immutable payload proxy reads returned 200;
  `options` and an external-looking file path returned 404.
- Browser rendering — passed: TW pointer `33fae46240b4` rendered 5 stories
  with 0 images and natural text-only cards; US pointer `0eab2a98cf2c`
  rendered 12 stories with 12 images; no browser console errors or horizontal
  overflow observed.

### Source and Pages release

- Source commit: `f74658f` (`feat(news): add RSS-backed Cloudflare Pages reader`).
- Repository: `YanlongLai/dappgo-website`, `master`.
- Cloudflare account: `83066b4bb72b4d78d018900762c0c948`.
- Pages project: `dappgo-news`.
- Production deployment ID: `ca935c17-16f2-4003-a4aa-7cb50c75cf77`.
- Deployment URL: `https://ca935c17.dappgo-news.pages.dev`.
- Deployment source: `master` at `f74658f`.
- Custom domain: `news.dappgo.com`.
- Custom-domain status: `active`; verification and HTTP validation both
  `active` at `2026-10-11T05:43Z`.
- DNS: Cloudflare proxied CNAME `news` → `dappgo-news.pages.dev`.

### External production verification

Verified at `2026-10-11T05:44Z` through the Cloudflare edge:

- `https://news.dappgo.com/tw/` — HTTP 200; Taiwan edition loaded from
  pointer `33fae46240b4`, report date `2026-10-09`, 5 stories.
- `https://news.dappgo.com/us/` — HTTP 200; United States edition loaded from
  pointer `0eab2a98cf2c`, report date `2026-10-09`, 12 stories and 12 images.
- Same-origin proxies returned HTTP 200 for both market pointers and their
  immutable payloads.
- `/api/markets/options/dashboard/latest.json` and an encoded external file
  path both returned HTTP 404, confirming the proxy allowlist.
- `/robots.txt` allows `/tw/` and `/us/`, disallows `/api/`; `/sitemap.xml`
  lists both public editions.
- CSP, frame-ancestors, referrer policy, permissions policy and no-store /
  immutable cache contracts were present as expected.

### Outcome

The News site is deployed and serving the formal RSS-backed dashboard data.
New pointer updates from the existing pipeline are picked up by the reader's
polling loop; the site does not run a second collector or mutate production
data. The implementation work item is ready for evidence commit, merge and
feature-worktree cleanup.
