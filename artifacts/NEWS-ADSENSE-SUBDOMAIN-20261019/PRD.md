# Product requirements

## Goal

Make the independent News site technically discoverable to AdSense and
determine whether the existing `dappgo.com` rejection is caused by a current
Cloudflare access failure or by a stale/previous crawl result.

## Scope

1. Publish `news/ads.txt` with the active AdSense publisher line.
2. Keep root, US, and TW News routes readable and crawlable.
3. Verify Cloudflare Security Events around the AdSense UI's latest update.
4. Add the News subdomain as a separate AdSense site and record its status.

## Success

- `https://news.dappgo.com/ads.txt` returns 200, `text/plain`, with the exact
  active publisher declaration.
- `https://news.dappgo.com/`, `/us/`, and `/tw/` remain reachable.
- Cloudflare evidence records whether Google traffic was blocked, challenged,
  or allowed; any mitigation is path-specific and reversible.
- AdSense contains a distinct `news.dappgo.com` site entry. Site review status
  is reported exactly, without equating code presence with approval.

## Rollback

Revert the focused commit or restore the previous Pages deployment. Removing
the News site declaration is independent of the existing `dappgo.com` site.
