# Technical approach

Audit before editing. Retain the static homepage and News reader architecture; preserve the canonical
catalog, RSS proxy and generated data contract. Fix interactions at their source with regression tests.
Use existing theme tokens and native controls; no new dependency or generated-export edits.

Split work by repository. Homepage/News are in dappgo-website. Three RN apps are separate source repos.
Other session actively owns src/components/ui, settings, package files and shared exports in all apps;
do not edit those boundaries. Audit then claim only non-overlapping screen-level paths.

Validation: website quality gate, News contract/analysis tests, keyboard/mobile/browser checks, RN
TypeScript/Jest plus web exports and platform-specific checks available locally. No GitHub Actions.
Freeze merged SHAs for Pages deployment and record deployment IDs, prior rollback IDs and live behavior.
If a test fails, record a changed hypothesis before repair. Independent review precedes promotion.

Taste skill applies to public marketing sections, not native/dashboard screens. Owner-preserved brand,
data readability and existing behavior take precedence over aesthetic house rules that conflict.
