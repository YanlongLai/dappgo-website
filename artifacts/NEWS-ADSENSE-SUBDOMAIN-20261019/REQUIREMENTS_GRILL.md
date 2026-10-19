# Requirements grill

Status: ready-for-design, 2026-10-19.

The Owner requested a separate AdSense site path for `news.dappgo.com`, an
`ads.txt` declaration, and a Cloudflare Security Events investigation for the
existing `dappgo.com` site. The active publisher ID observed in the Owner's
AdSense account and public site is `ca-pub-7851819017318644`.

## In scope

- Add the exact Google-authorized publisher declaration to the News Pages root.
- Add deterministic source and deployment checks for the declaration.
- Inspect recent Cloudflare events associated with Google/AdSense crawling.
- Add `news.dappgo.com` to the existing AdSense account when the UI allows it.
- Prepare the site for review without claiming approval.

## Non-goals and boundaries

- Do not change publisher IDs, service-account keys, DNS, tunnel routes, or the
  existing AdSense loader/CSP unless evidence proves a narrowly scoped defect.
- Do not delete or reapply `dappgo.com` solely because its last AdSense crawl
  was stale.
- Do not weaken Cloudflare WAF globally or bypass bot/security controls.
- Do not click a final AdSense review/submission action without a fresh Owner
  confirmation immediately before the external submission.
- Do not modify the active News viewpoint feature files outside this worktree.

## Acceptance question

Can a separate News `ads.txt` and verified public reachability remove the
technical availability blocker while preserving the existing security posture?
