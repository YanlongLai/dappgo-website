# Requirements grill — NEWS-MOBILE-READER-20261010

## User outcome

On a phone, `news.dappgo.com/tw/` and `/us/` must settle into the news
reader instead of flashing or leaving blank loading blocks. A reader must be
able to search by ticker/company and choose a ticker without switching to a
desktop layout.

## Scope

- Fix the loading skeleton's hidden-state behavior.
- Add a mobile search field and native stock selector for both editions.
- Reuse the existing `state.query`, `state.stock`, payload and read-only gateway.
- Keep the desktop rail, gateway allowlist, polling cadence and story rendering
  contract unchanged.
- Add regression checks for the CSS and mobile controls.
- Version static CSS/JS asset URLs whenever their contents change, because the
  Pages headers intentionally cache `/assets/*` as immutable.

## Explicit non-goals

- No RSS pipeline, provider, Airflow, Postiz or production data changes.
- No new API, database, authentication, analytics or paid Cloudflare feature.
- No mobile-app source changes; this is the Cloudflare Pages News reader.
- No removal of the existing desktop search or stock index.

## Failure modes and decisions

| Failure | Required behavior |
| --- | --- |
| Gateway payload is slow | Show a bounded skeleton only while loading; hide it on success or error. |
| Gateway payload fails | Show the existing readable error state; do not leave shimmer blocks visible. |
| Search has no matches | Keep the selector usable with the existing selection when possible and show the existing empty-news state. |
| A selected ticker is filtered out | Keep that selected ticker in the native selector so the user can see and change it. |
| Reduced-motion preference | Preserve the existing no-animation behavior. |

## Acceptance evidence required

1. `node --check news/assets/news.js`.
2. `node news/tests/contract.mjs` with explicit assertions for hidden
   skeletons and mobile controls.
3. `git diff --check`.
4. Local Pages route smoke test for `/tw/` and `/us/` at a mobile viewport,
   confirming controls are visible after load and no console errors occur.
5. External route check after selective Pages deployment, without mutating the
   formal RSS pipeline.
