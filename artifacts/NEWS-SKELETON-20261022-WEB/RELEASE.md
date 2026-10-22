# Scoped promotion

Decision: continue to normal PR merge and News-only Pages deployment after exact revision review and secret scans. Authority is the Owner's existing task-scoped merge/deploy/cleanup request plus explicit News website/App parity request; no store release authority is inferred.

Validation closure: website and native News UI. Deployment closure: Cloudflare Pages dappgo-news only. Native iOS/Android source is merged and exports validated; Apple App Store and Google Play releases are not submitted by this work item.

Previous News production deployment: 62da0cc5-3695-4465-8374-f924b8848f4e, website source e4763e9e2098c982b51f12c7304ec90ad375f05c. The exact merged source, PR URLs, new Pages ID and public asset digests are recorded in the session's immutable private NEWS-SKELETON-20261022 final evidence after release. If post-release verification fails, use the existing Pages rollback to that previous deployment rather than editing production files.

Cleanup: remove only the two owned clean merged skeleton worktrees and their feature branches, release exact claims, retain logs/screenshots/source identities outside those worktrees. All other sessions' worktrees are preserved.
