# Technical approach

Audit before editing. Retain the static homepage and News reader architecture; preserve the canonical
catalog, RSS proxy and generated data contract. Fix interactions at their source with regression tests.
Use existing theme tokens and native controls; no new dependency or generated-export edits.

The News root uses an exact Cloudflare Pages 302 redirect to /us/?lang=en, with a
meta-refresh/link fallback for static hosts. Do not use inline JavaScript under the
strict CSP or change direct country-page language preference resolution.

Split work by repository. Homepage/News are in dappgo-website. Three RN apps are separate source repos.
Other session actively owns src/components/ui, settings, package files and shared exports in all apps;
do not edit those boundaries. Audit then claim only non-overlapping screen-level paths.

Validation: website quality gate, News contract/analysis tests, keyboard/mobile/browser checks, RN
TypeScript/Jest plus web exports and platform-specific checks available locally. No GitHub Actions.
Freeze merged SHAs for Pages deployment and record deployment IDs, prior rollback IDs and live behavior.
If a test fails, record a changed hypothesis before repair. Independent review precedes promotion.

## Approved upload-safe packaging repair

The Owner approved bounded repair after production observation found Wrangler's
Pages uploader excludes nested node_modules paths. This is a packaging boundary,
not an RN source or data change. A separate claimed Meta worktree owns the
canonical assembler repair. Preserve strict raw-export binary validation; move
only those validated dependency assets into an upload-safe vendor namespace in
private staging. Fail on collision, unresolved references or excluded final
paths. Preserve binary bytes and density variants. Rewrite emitted references
and re-fingerprint changed JS/CSS before final inventory generation so immutable
URLs never identify changed bytes. Keep exact merged app source pins unchanged.

Rebuild new immutable bundles, independently review and merge the assembler,
selectively upload Stocks/Options only, then verify every live manifest asset
(including fonts and images), representative deep routes and cold browser loads.
No further News/homepage runtime change is required for this repair. No keys,
native store release, security weakening or unrelated service deployment.

Taste skill applies to public marketing sections, not native/dashboard screens. Owner-preserved brand,
data readability and existing behavior take precedence over aesthetic house rules that conflict.
