# Post-release verification

Captured 2026-10-17 19:03 UTC. Acceptance remains open.

Homepage and News source 07b814c02726e01611b9dc8280065d7791babe8d
was merged through website PR 34. News deployment eb211411 serves an exact
302 from `/` to `/us/?lang=en`; a production browser confirms English selected.
Homepage mobile keyboard navigation, Escape, language and theme controls pass.
Public JS/CSS bytes match this merged source. HTML differs only by the identified
Cloudflare edge-injected challenge precursor script; removing that specific
injected script reproduces the source bytes exactly.

US PR 40 merged to 80cd2313f958e432d0a460551e6b4e7a98c554e9; TW PR 23
to 3ec332c86f59c5530e3822757530f8cdb3707f30. Stocks deployment fa9dece3.
Options PR 39 merged to ce4310a013c56b9f90d3d2e30de2603a97286178;
deployment 9a7da821. Canonical immutable assembly binds these source SHAs and
lock digests. All six production JS/CSS files match; nine successful route probes
and four missing-asset/unknown-country probes match expected status.
The original probe log lacks per-row hostname/deployment/capture-time fields;
it is parent-recorded observation, not independently bound deployment attestation.

## Blocking asset observation

The first production US browser load displayed `Error: A network error occurred`.
Retry restored the dashboard, but this recovery is not acceptance. Read-only HTTP
verification subsequently found exported icon-font URLs under
`assets/node_modules/@expo/vector-icons/` returning 404 across US, TW and Options.
The same FontAwesome request returns 404 at the immutable Stocks Pages hostname,
so this is not solely a custom-domain cache discrepancy. SpaceMono is outside
that subtree. Fonts are present in the private assembly manifests. Root cause
investigation confirmed Pages uploader exclusion of nested node_modules.

Independent reviewer Volta inspected installed Wrangler 4.149.0's Pages uploader:
its ignore list contains `**/node_modules` before recursive upload traversal.
The Stocks manifest has 74 affected binary files (38 TTF and 36 PNG). Independently
sampled US/TW fonts and navigation PNGs return 404; SpaceMono returns 200. The
startup layout requires FontAwesome and throws font-load errors. This explains
why a local preview and JS/CSS-only verification missed the production failure.
Boole independently verified all 94 Stocks and 49 Options local manifest bytes,
all three lock digests, and merge-tree equality, but correctly retained blocked
production acceptance. Options has a further 37 uploader-excluded binary assets.

Bounded next repair: relocate only validated generated binaries to
`assets/vendor/`, rewrite emitted references, reject collisions/unresolved paths,
and re-fingerprint modified JS/CSS before generating a new immutable manifest.
Changing bytes at an existing immutable JS URL is not an acceptable repair.
Verify both country prefixes, image density variants, binary hash preservation,
no final uploader-excluded paths, then live fonts/images and browser cold start.

AI001 finding FND-CE570E4B8D64 escalated the released work item. The attempted
remediation registration was rejected because an Owner-approved experimenting
state is required. No repair code, gate changes, new deployment or cleanup has
been performed after that refusal. Owner approval for this bounded packaging
repair is required before continuing. The existing pre-release review is retained
as historical evidence, not used to override the failed post-release check.

## Owner-authorized continuation

On 2026-10-17 19:06 UTC the Owner explicitly approved the described asset
packaging repair, independent review, redeployment, verification and cleanup.
The runtime recorded the approval and Owner transition to experimenting;
Manager remediation attempt ATT-4652F2131AA8 is active (iteration 3).
The refusal above remains historical evidence. DEL-PACKAGING-01 delegates the
deterministic, independently testable, reversible local Meta packaging repair
to Volta; no external mutation is delegated before review. Parent owns release
and the top-level acceptance; peer/assurance remain independent. Scope is clear,
low product-context dependence and no credential/data-source change.

## Temporary mitigation

At 19:08:37–38 UTC the parent used Cloudflare's official Pages rollback API,
after confirming the current canonical deployments still matched this session's
failed versions. Stocks was restored from fa9dece3-a9b3-4c6d-ab1b-7012f212f79a
to 63d2ec90-a458-4726-8e0b-e7934f506bba; Options from
9a7da821-a588-4428-8613-b0aa6014df7f to 7bff8d9f-f977-4ce0-b3ce-89e81277ae51.
Both API calls returned success and immediate project reads confirmed the exact
canonical target. The older immutable endpoints returned 200 for FontAwesome,
whereas the failed uploads returned 404. No credential was modified or output.
News/homepage remain on the verified new release. This mitigation is not repair
acceptance; the new source features await corrected packaging and redeployment.

## Independent repair review

Boole accepted exact Meta source commit
54a5a04217f3bb459fc0565bb4eee63d2aad86fd: 28 independent focused tests passed;
all 111 binary assets across real US/TW/Options exports were preserved byte-for-byte,
mapped references updated, all three rewritten bundles parsed, and new filenames
matched content fingerprints. Four-file source/test digest (unchanged before and
after review) 939050ca02438f2d8eed26e94c53b52100f073bbc31fb85989a5dc9e747e6fca;
full commit diff digest db07b40bee0fd88abd040286a4af91268f60252afeb0c3bf17fd23e452d1dccf.
Raw security/provenance, collision and uploader-exclusion guards were retained.
This is implementation assurance only; full Meta gate, promotion, corrected
deployment and live binary/cold-start acceptance remain separate required gates.

Keep this failure and original deployment identities; do not mark all web
surfaces healthy, close the goal, or remove pending worktrees. No native store
submission, credential, ad policy, data source, schedule or self-hosted service
change occurred. Repair must preserve binary validation and immutable source
provenance and verify live fonts as well as JS/CSS.

## Fixed-pin integration reconciliation

The original workspace-wide check exited 1: the global pnpm now requires Node
22.13+ and failed under Node 20 before executing shared tests; the shared main
App checkouts contained another session's tracking/product-link changes whose
local dependencies were not installed. These are retained failures, not silently
marked green. No other session's source or dependencies were changed.

Dalton independently rechecked the exact three selected App merge commits using
Node 20.20.2 and local tsc/Jest binaries: US 154 suites/1379 tests, TW 149/1276,
Options 91/791 all passed; tsc exited 0 for each. HEAD and clean status remained
unchanged. The standalone shared checkout 0319bed8 passed tsc and 38 suites/650
tests using local binaries. That is not the App lockfile's d79c5ce8 shared revision;
each App test/build uses its installed lockfile-bound dependency instead.

The authoritative verify-everything.sh is rerun against a private symlink map
selecting these exact worktrees and the unchanged engine/report/shared checkouts,
with a Node version supported by the installed global pnpm. Its completion is
still pending at this entry. Website has evidence-only uncommitted changes, not
an entirely clean checkout. Website quality passed separately: catalog/local
links, size budgets, 15 homepage/ownership tests, five News interaction tests,
News contracts/selectors and four AI-readiness tests. Lychee is unavailable and
its wrapper labels a skip as success; it is explicitly not a verified external
link check. Boole independently accepted this pin-specific reconciliation while
requiring the running full command's final result before promotion.

The pinned-workspace full command completed at 19:26 UTC, exit 0. Logs:
`/tmp/dappgo-web-asset-repair.biireJ/dappgo-verify.i9R0oi1T`.
Thirteen executed checks passed, one external-link scanner skipped. The wrapper's
printed "14/14" includes that skip and is not used as fourteen verified checks.
All three complete tsc/Jest commands passed, as did engines, report chains,
shared library, catalog, graph and pipeline contract. Prior failed invocation
`dappgo-verify.MflaZQhz` remains historical. Readiness now permits reviewed Meta
PR 586 promotion and corrected Pages assembly/deployment; public acceptance is
still pending. No self-hosted/native or unrelated main source is promoted.

## Final outcome, 2026-10-17 19:32 UTC

The historical pending/blocked entries above are superseded by the executed
repair and live receipts in ASSET_REPAIR_RELEASE.md. Meta PR 586 is merged,
Stocks 91089fc0 and Options 0c7b36b0 are canonical, all 129 non-HTML assets match
(including 111 previously excluded vendor binaries), all 14 route checks pass.
Three App browser loads, US/TW 390px and Options 390/320px interaction checks
passed with loaded fonts and zero uncaught errors/document overflow. The
Options deep-link quote-unavailable recovery remains explicitly documented.
Boole independently verified manifest receipts and 18 live asset samples.
The AI001 ledger recorded a healthy scoped web observation; acceptance criteria
are verified. Evidence-only merge and this session's safe cleanup remain; no
additional runtime deployment is needed for evidence. Original failures remain.
