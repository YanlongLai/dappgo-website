# Requirements grill: WEBSITE-QUALITY-20260916

## Intake

- Status: `ready-for-design`
- Assigned at: `2026-09-17T02:04:02Z`
- Assigned by: `Owner direction: follow the recommended website fixes`
- Scope summary: Repair the measured DappGo website CSP, accessibility, image delivery, performance, and product clarity findings without changing routes or legal policy.
- Mutation class: `code`

## Work-item provenance

- Codex task ID: `01a09cd0-07e4-71c1-89d5-4a4b0e5750be`
- Host ID: `local`
- Repository: `YanlongLai/dappgo-website`
- Branch: `feat/website-redesign-20260916`
- Worktree: `website-redesign-20260916`
- Session started at: `2026-09-17T02:04:02Z`
- Commit SHA: omitted until promotion
- Remote ref: omitted until promotion
- Pull request: omitted until promotion

## Facts verified by AI001

- The canonical registry identifies this checkout as the DappGo Tier 5 website repository.
- The feature worktree was clean at intake and no active coordinator claim existed.
- The canonical `master` checkout contains a pre-existing user-owned `privacy.html` modification and is not used for this implementation.
- Production smoke checks passed for the public routes, but Lighthouse identified performance 71, best practices 93, CSP analytics errors, and a language-toggle accessible-name mismatch.
- Production response headers currently expose `cache-control: max-age=600` and no HTTP CSP or frame-ancestors header.

## Design-tree round

### Round 1 — implementation boundary

- Question: Should this repair round change routes, legal/consent policy, hosting, or analytics identity?
- Recommended answer: No. Keep routes, legal copy, analytics property, and hosting unchanged; make safe source-level fixes and document the hosting-level security-header gate separately.
- Owner answer: `照你的建議修正` confirms the recommended repair scope.
- Evidence/impact: This permits CSP allowlist repair, responsive assets, LCP improvements, and visible product-clarity copy while keeping protected legal/consent and hosting decisions Owner-gated.

## Shared understanding

- Goal: Reduce the measured website quality risks while preserving all current public routes and content boundaries.
- Non-goals: No hosting migration, no new analytics property, no consent/legal-policy rewrite, no new product claims, no route rename, and no production deployment in this worktree.
- Acceptance criteria:
  1. All checked HTML pages use the corrected analytics CSP and no longer claim `frame-ancestors` through an ineffective meta directive.
  2. Language-toggle accessible names contain the visible `中 / EN` label in the homepage, demo, options, legal, support, and 404 shells.
  3. Hero and product screenshots have modern responsive sources with PNG fallback, and only the LCP hero image is high priority.
  4. Homepage copy gives a concrete source-to-publish value proposition without changing the research-only boundary.
  5. Local lint, syntax, link/reference, desktop/mobile smoke checks, and Lighthouse are rerun after implementation.
  6. Hosting-level HTTP security headers remain explicitly documented as pending until the actual edge/hosting owner applies them.
- Affected products/services: DappGo public website and its static GitHub Pages asset delivery.
- Data/provider/platform boundaries: Google Analytics remains the existing provider; no credential or provider setting changes are made. GitHub Pages remains the hosting target.
- Rollout and rollback: Roll back the feature branch commit(s) if visual or route smoke checks regress; deploy only after review and explicit promotion.
- Success and stop conditions: Continue while measured findings improve without regressions; stop and record a new hypothesis if Lighthouse or smoke checks fail.
- Protected approvals still required: Owner approval for consent/legal copy, hosting/CDN security-header changes, and production promotion.

## Readiness decision

- Owner confirmation: `照你的建議修正`
- Ready for design: `yes`
- Next AI001 action: Implement the bounded repair, then independently verify every acceptance row.
