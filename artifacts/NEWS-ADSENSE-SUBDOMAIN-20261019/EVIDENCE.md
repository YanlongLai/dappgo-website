# Evidence

## Baseline

- Source baseline: `505e2b599cd5597b9fb7ae86fdba0443b02244f1`, clean isolated
  worktree `fix/adsense-news-site-20261019`.
- Active publisher observed in AdSense and public `dappgo.com/ads.txt`:
  `ca-pub-7851819017318644`.
- `dappgo.com` public root and `ads.txt` were reachable during the baseline
  check; AdSense UI still displayed the historical/current site issue
  `網站關閉或無法使用` and Ads.txt `找不到`.
- `news.dappgo.com/ads.txt` returned 404 before this change.

## Cloudflare Security Events read-only check

- Checked `dappgo.com` Security Events in the Cloudflare dashboard for the
  previous 24 hours at 2026-10-19 16:32 PDT.
- The sampled Google-origin events were AS15169 (Google LLC), IPs in
  `66.249.88.0/24`, and were marked `受控的查問` by `Bot Fight 模式`.
- The inspected request was `GET news.dappgo.com/api/markets/us/dashboard/latest.json`
  with user agent `okhttp/4.9.2`; it was not an AdSense `ads.txt` request.
- A path-filtered read-only query for `/ads.txt` returned no matching firewall
  activity in the selected 24-hour sample.
- No WAF/Bot Fight rule was changed. The evidence supports leaving the global
  protection intact: these were non-verified Google-origin API requests, not a
  demonstrated block of `dappgo.com/ads.txt` or the AdSense loader.

## Acceptance ledger

| Criterion | Status | Evidence |
|---|---|---|
| Exact News ads.txt source | passed | `news/ads.txt`; exact active publisher line and final newline |
| Local contract and quality checks | passed | News tests and `npm run quality` |
| Merged source identity | passed | PR #37, merge `c767c88b431b12e9757fc2aef0ee84986bda619e` |
| Pages deployment and public readback | passed | Production deployment `8f424f95-9478-44e0-b0d9-d4444d4e4812`; custom routes verified |
| Cloudflare Security Events inspection | passed | No `/ads.txt` firewall event; Google API challenge recorded; no rule changed |
| Separate AdSense News site entry | blocked by Google account state | Add-site dialog says `您似乎加入過這個網站了`; Sites list search shows no News row |
| Final review submission | intentionally pending Owner confirmation | |

## Deployment readback

- Cloudflare Pages project: `dappgo-news`.
- Source: merged `master` commit `c767c88`.
- Deployment: `https://8f424f95.dappgo-news.pages.dev`.
- `https://news.dappgo.com/ads.txt`: HTTP 200, `text/plain; charset=utf-8`,
  exact body `google.com, pub-7851819017318644, DIRECT, f08c47fec0942fa0`.
- `https://news.dappgo.com/`: HTTP 302 to the English US route; `/us/` and
  `/tw/`: HTTP 200. Each route contains exactly one active AdSense loader.

## AdSense account action

The existing AdSense account is `pub-7851819017318644`. The add-site dialog
accepted the typed `news.dappgo.com` value only far enough to report that the
site appears to have already been added; it did not save a new visible site
row. A filtered Sites list returned no News row. No review request was clicked,
and no approval or ad serving is claimed.

Historical failures and AdSense review states are preserved; this file never
labels a Google review as approved merely because the site is reachable.
