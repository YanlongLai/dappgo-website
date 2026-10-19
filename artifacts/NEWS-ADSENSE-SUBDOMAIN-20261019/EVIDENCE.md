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
| Merged source identity | pending | |
| Pages deployment and public readback | pending | |
| Cloudflare Security Events inspection | passed | No `/ads.txt` firewall event; Google API challenge recorded; no rule changed |
| Separate AdSense News site entry | pending | |
| Final review submission | intentionally pending Owner confirmation | |

Historical failures and AdSense review states are preserved; this file never
labels a Google review as approved merely because the site is reachable.
