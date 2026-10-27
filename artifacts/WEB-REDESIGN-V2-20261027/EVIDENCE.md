# Evidence — WEB-REDESIGN-V2-20261027

Captured 2026-10-27 by claude-73a43bcb (producer). Prototype only; nothing promoted to index.html.

| Criterion | Status | Evidence |
|---|---|---|
| Live pulse US/TW/Options with date, regime, movers, stale state | verified (prototype) | pulse.json built from latest pointers: US 2026-10-27 26/26, TW 2026-10-27 101/101, Options 2026-10-27 26/26; rendered at 1440/800/375 px. Stale is set after 96 h. |
| Builder verifies data_hash, fails closed | verified | A forced TW hash mismatch exits 1, and no output file is written. |
| News cards deep-link to news.dappgo.com by market and stock | verified | Wire interleaves US/TW. Each card links to the source and to `news.dappgo.com/<m>/?stock=<SYM>`. It shows only the headline, source name and link. |
| Store/web links match product-catalog.json | verified | Catalog section and card store links render from /config/product-catalog.json at runtime |
| Business section prominent; disclaimer preserved | verified | Full-bleed accent section; pulse fineprint retained |
| Responsive, no console errors | verified | 375 px scrollWidth == innerWidth, and the prototype origin shows no console errors. Dark brand theme only, by the bold-direction choice. |
| Owner review before promotion | pending | — |

## Open for production
- pulse.json refresh path is not decided (scheduled Gitea Actions snapshot vs. a pulse endpoint published by the daily-report pipeline).
- The offline/"pulse unavailable" UI state is implemented but has not been exercised in a browser.
- TW headlines have no English title in the current payload. The EN view shows the original Chinese.
- llms.txt says US Stocks iOS is "coming soon", which conflicts with the catalog's "live". Fix this at promotion.
