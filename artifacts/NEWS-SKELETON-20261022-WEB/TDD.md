# Implementation and verification

Design: use the existing card border/radius, muted gray-green blocks, a 36px round source marker, source/date lines, two title lines, image rectangle and summary/footer bars. Match stacked cards on narrow screens and the web text/image grid on wide screens. The round marker represents a publisher, never an invented user account.

Loading state: expose a single localized status; skeleton geometry is decorative. Use low-contrast shimmer, stop for reduced motion, and clean up native animations. Reuse initial skeleton content for the feed tail. Separate idle Load more copy from the Loading more status.

Pagination: immutable payload is already local. The Owner explicitly requests a pagination delay. Coalesce each page into one 600ms task and reveal its skeleton only after 300ms; no added network fetch. Initial API loads also reveal skeletons only after 300ms, switching to explanatory indeterminate progress at 8 seconds. Coalesce repeated scroll/click events, cancel on view changes and refresh, and retain existing card nodes during web append. Include date-group continuation counts. Keep a manual button for keyboard and unsupported observers.

Experiment: simulate deferred fetches and timer queues; assert initial/retry success/failure cleanup, overlapping append prevention, cancellation, append-only node behavior and exhaustion. Native pure scheduler tests exercise cancellation and duplicate requests. Run website quality, app tests/typecheck and both Expo exports, inspect responsive screenshots and native runtime when available, then independent read-only review.

Falsifier: any old card replacement during append, stale queue after a view change, a skeleton left after error, repeated accessible placeholders, or changed ad gates rejects this design before release.

Release: two PRs from isolated claimed worktrees; merge exact reviewed commits. Deploy only news/ to existing Cloudflare Pages dappgo-news using the merged website SHA. Record previous deployment and new deployment ID; verify public versioned asset bytes, routes, feed/API and ads contract. Native merge/build validation is not a store release. Preserve private screenshots/logs outside Git, remove only owned clean merged worktrees and release exact claims.
