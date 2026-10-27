# Requirements grill — WEB-REDESIGN-V2-20261027

State: ready-for-design (prototype scope only).

## Round 1 (2026-10-27) — Owner answers
1. Product connection: **live market pulse** (US/TW/Options today) and **latest news feed**. Not in scope now: ticker search, per-product hub pages.
2. Visual direction: **bold new direction** (not an evolution of the current blue/Space Grotesk look).
3. Delivery: **prototype first**; branch/PR/merge only after Owner review.
4. For Business section: **keep prominent**.

## Inspected facts (not Owner questions)
- data.dappgo.com latest pointers are public; payload CORS allows only https://stocks.dappgo.com.
- Payloads are 1.5–4 MB; the homepage needs a compact derived summary.
- news.dappgo.com reads stock news from the same payload via a same-origin Pages Function; deep link `?stock=<SYMBOL>`.
- llms.txt says US Stocks iOS is "coming soon" while product-catalog.json says live (drift to fix at promotion).

## Open for production (decide after prototype review)
- How pulse.json is refreshed in production: scheduled Gitea Actions snapshot commit vs. daily-report pipeline publishing a pulse endpoint vs. gateway CORS for dappgo.com.
