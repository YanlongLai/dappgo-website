# Evidence — WEB-REDESIGN-V2-20261027

Captured 2026-10-27 by claude-73a43bcb (producer). Round 1: prototype. Round 2 (Owner approved the design and asked for a scheduled Gitea refresh plus a PR): promoted to index.html.

| Criterion | Status | Evidence |
|---|---|---|
| Live pulse US/TW/Options with date, regime, movers, stale state | verified (prototype) | pulse.json built from latest pointers: US 2026-10-27 26/26, TW 2026-10-27 101/101, Options 2026-10-27 26/26; rendered at 1440/800/375 px. Stale is set after 96 h. |
| Builder verifies data_hash, fails closed | verified | A forced TW hash mismatch exits 1, and no output file is written. |
| News cards deep-link to news.dappgo.com by market and stock | verified | Wire interleaves US/TW. Each card links to the source and to `news.dappgo.com/<m>/?stock=<SYM>`. It shows only the headline, source name and link. |
| Store/web links match product-catalog.json | verified | Catalog section and card store links render from /config/product-catalog.json at runtime |
| Business section prominent; disclaimer preserved | verified | Full-bleed accent section; pulse fineprint retained |
| Responsive, no console errors | verified | 375 px scrollWidth == innerWidth, and the prototype origin shows no console errors. Dark brand theme only, by the bold-direction choice. |
| Owner review before promotion | verified | Owner: 「設計 OK。用 Gitea Actions 每個交易日定時重建 pulse.json 並 commit，然後把原型升級成正式首頁、開 PR。」 |
| Production homepage keeps ads/analytics/consent/SEO head | verified | The head is carried over unchanged except for the copy, theme-color and preloads. web-ownership.test and home.test metadata checks pass. |
| Offline pulse state | verified (unit) | home.test.cjs: a 503 pulse response sets the chip to `down` and shows the unavailable message |
| Scheduled refresh | implemented, not observed | `.gitea/workflows/homepage-pulse` runs Mon–Fri at 09:20, 20:15 and 22:45 UTC. It clones GitHub master, builds and verifies, commits only on change, and pushes with DAPPGO_WEBSITE_PUSH_TOKEN. It fails closed if the token is missing. |

## Release reconciliation (2026-10-27)

| Gate | State | Evidence |
|---|---|---|
| Promoted | verified | PR #45 was merged as 4a603901f4f83cdc69ea8f7cc7eed293b0ed9df4, pinned to head 3dbd5d4. All 5 GitHub checks passed (html x2, links x2, gitleaks scan). |
| Deployed | verified | The GitHub Pages build for 4a60390 has status `built`. |
| Observed | verified | On dappgo.com (cache-busted), `/`, the home assets, `/data/pulse.json`, `/llms.txt` and `/sitemap.xml` return 200. The title is "DappGo: Markets, compiled daily.", and the AdSense loader and GA are present. In a browser: chip `live` (2026-10-27), 3 market cards, 6 headlines, 5 products, no console errors, no horizontal scroll. |
| Mirror | verified | Gitea `dappgo/dappgo-website` master is at 4a60390, matching GitHub. |
| Scheduled refresh | pending | The Owner is creating DAPPGO_WEBSITE_PUSH_TOKEN. Next gate: the first `homepage-pulse` run (Mon–Fri 09:20 / 20:15 / 22:45 UTC) pushes a refreshed data/pulse.json, and dappgo.com serves it. |
| Rollback | ready | Revert merge 4a60390 on master. GitHub Pages redeploys the previous homepage (bf8fda4). |

## Open
- Owner boundary: create the Gitea repository secret `DAPPGO_WEBSITE_PUSH_TOKEN`. It should be a GitHub fine-grained token scoped to YanlongLai/dappgo-website with Contents read/write and nothing else. Until it exists, every scheduled run fails visibly and the committed pulse ages into the Stale state after 96 h.
- First scheduled run has not been observed. Next gate: the first homepage-pulse run after the secret is added, plus GitHub Pages serving the refreshed data/pulse.json.
- TW headlines have no English title in the current payload. The EN view shows the original Chinese.
- og-image-v2.png still shows the previous design.
- Fixed: llms.txt now lists US Stocks iOS as available.
