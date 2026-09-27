# Requirements — DGO-WEB-ADMOB-APP-ADS-20260926

## Request and authorization

- Owner requested that AdMob be checked and fixed because the live Element Pals app showed no ad requests.
- Owner explicitly authorized setting the Play Console developer website to `https://dappgo.com/` and publishing AdMob's exact publisher line at that domain.
- Scope: publish the exact app-ads authorization text at the canonical site's root and record verification evidence.
- No privacy/terms changes, app binary change, duplicate AdMob record deletion, or change to UMP consent behavior.

## Verified facts

- This repository's canonical domain is `dappgo.com` (`CNAME`); GitHub Pages is the configured static host.
- `https://dappgo.com/app-ads.txt` returned HTTP 404 before the change.
- AdMob verification instructed the owner to publish exactly:
  `google.com, pub-7851819017318644, DIRECT, f08c47fec0942fa0`
- Play Console's app-specific developer website field was blank before the authorized change and now shows `https://dappgo.com` as published.

## Acceptance

1. The root `app-ads.txt` contains only the publisher line supplied by AdMob.
2. After authorized website publication, the canonical HTTPS URL returns HTTP 200 and exact text.
3. AdMob's explicit app-ads recheck accepts the file; otherwise preserve the returned failure evidence and do not report verification complete.
4. Do not report ad request recovery until an actual production app session reaches an ad placement and AdMob app-level Requests updates.
