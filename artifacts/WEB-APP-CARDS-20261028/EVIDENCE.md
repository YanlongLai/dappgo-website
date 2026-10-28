# Evidence: WEB-APP-CARDS-20261028

Captured on 2026-10-28 (UTC) by a Claude desktop session (producer). Owner request (with a screenshot): the products section was misaligned, and it should get a high-quality UI that makes people want to download the apps.

Root cause: every `.product` row was its own grid (`72px | 1.2fr | 1fr | auto`). The links column was `auto`, so the description column started at a different x position in each row.

| Criterion | Status | Evidence |
|---|---|---|
| Aligned layout | verified (prod) | Single 6-column card grid. On dappgo.com at 1280 px, every card's description sits 25 px from the card edge, and the three research card footers share one y (828 px). |
| Download intent | verified (prod) | Official App Store / Google Play SVG badges, unmodified, 44 px, App Store first. 7 of 7 load with HTTP 200. Each card also has a live line from pulse.json (AMD 56 top setup, 26 US tickers Neutral, 101 TW tickers Mixed, 12 headlines) and three feature bullets limited to existing site claims. |
| Contracts | verified | `node scripts/quality-gate.mjs` passes (catalog, store links, zh coverage, Number Merge Android-only). |
| Responsive/theme | verified (local) | Light and dark at 1280 px. At 375 px, scrollWidth == innerWidth. Reduced motion is respected. |

## Release reconciliation

| Gate | State | Evidence |
|---|---|---|
| Promoted | verified | PR #51 merged as d36dc4732074fa48c8e65498cccef895598c6169. GitHub checks: html x2, links x2 and the gitleaks scan passed. |
| Deployed | verified | The GitHub Pages build for d36dc47 has status `built`. |
| Observed | verified | On dappgo.com (cache-busted), the page serves `home.{css,js}?v=20261028-cards-4` and renders 5 app cards with no Number Merge iOS link and no horizontal scroll. |
| Rollback | ready | Revert merge d36dc47. Pages then redeploys d72e45a. |

## Open
- The Gitea `website-ci` fails on master because of the runner, not the code. The runner uses Node 20.20.2, and `news/tests/engagement.mjs` imports `node:sqlite`, which needs Node 22.5 or later. Fix it by pinning Node 22+ for the runner or for ci.yml. Until then, the gate is the local quality gate plus the GitHub checks.

## Follow-ups (2026-10-28)

| Item | State | Evidence |
|---|---|---|
| Gitea website-ci green | verified | PR #53 (b50f5a4) moved the job to the org `dappgo-ci` runner. Gitea run 1956 on master c66a2ea (which contains b50f5a4) succeeded on `dappgo-ci-runner-worker-1` with Node v22.14.0 and Python 3.12.3. Run 1946 (8a82ca1) also succeeded. Earlier host-runner runs had failed on `node:sqlite`. |
| United States wire uses high-weight stocks | verified (prod) | PR #57 (b99a677): the builder keeps the top 10 US stocks by `fundamentals.market_cap`, one story each, newest first. On dappgo.com: META, NVDA, AAPL, SPCX, TSLA, TSM. |
| Wire strictly newest first | verified (prod) | PR #58 (2884425): the frontend no longer moves the first photo story to the top. On dappgo.com with `home.js?v=20261028-latest-1`, the US tab runs from 18:24 to 15:06 UTC in descending order. home.test asserts this. |
