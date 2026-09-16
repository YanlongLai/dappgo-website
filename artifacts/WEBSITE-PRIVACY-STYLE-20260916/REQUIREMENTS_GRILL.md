# Requirements grill — WEBSITE-PRIVACY-STYLE-20260916

## Intake

- Status: `ready-for-design`
- Assigned at: `2026-09-16T21:36:49Z`
- Assigned by: `Codex session 01a09cd0-07e4-71c1-89d5-4a4b0e5750be`
- Scope summary: Align the public privacy page with the released DappGo visual system while preserving the latest legal copy already present in the canonical checkout.
- Mutation class: `code`

## Work-item provenance

- Codex task ID: `01a09cd0-07e4-71c1-89d5-4a4b0e5750be`
- Host ID: `local`
- Repository: `YanlongLai/dappgo-website`
- Branch: `feat/website-redesign-20260916`
- Worktree: `dappgo-website-privacy-style-20260916`
- Session started at: `2026-09-16T21:26:03Z`
- Commit SHA: `omitted until promotion`
- Remote ref: `omitted until promotion`
- Pull request: `omitted until promotion`

## Facts verified by AI001

- Repository remote is `https://github.com/YanlongLai/dappgo-website.git`; the feature worktree was clean at `0c938a551d00c58ea140022eb19238d6a6a6f1f5` before this work.
- Canonical `master` had a user-owned, uncommitted `privacy.html` change; its 35 insertions and 35 deletions were reviewed and carried into this worktree before styling.
- Homepage visual source of truth is `assets/demo/demo.css`: Space Grotesk, `--page` / `--surface` / `--ink` / `--muted` / `--line` / `--blue` tokens, shared header, and shared wordmark footer.
- No active website claim or overlapping website task was found during the session/worktree inventory.

## Design-tree rounds

### Round 1 — frontier

#### Q1 — What should the privacy page share with the homepage?

- Question: Should Privacy use the released DappGo header/footer, typography, theme and locale contract while keeping the existing legal sections and `/privacy` route?
- Recommended answer: Yes. Reuse the existing shared stylesheet and visual tokens, add a restrained legal-page layer, keep the legal copy and route stable, and support the existing English / Traditional Chinese and light / dark toggles.
- Owner answer: Confirmed by the request to include Privacy and match the current style; preserving the latest legal copy is the safe legal boundary.
- Evidence/impact: This unlocks a presentation-only redesign without changing data practices, links, claims, or the public route.

## Shared understanding

- Goal: Privacy is visibly part of the current DappGo site rather than an isolated legacy page.
- Non-goals: No new tracking, form, consent, legal claim, data practice, analytics event, or route behavior.
- Acceptance criteria:
  1. Privacy loads the current shared DappGo header, typography, tokens and footer.
  2. Existing latest privacy copy, including Options Explorer / UMP / AdMob disclosures, is preserved.
  3. English / Traditional Chinese and light / dark controls continue to work and share the homepage storage contract.
  4. Mobile layout has no horizontal overflow, keeps navigation usable, and remains readable.
  5. HTML, whitespace, local browser behavior, and production Pages behavior are independently checked.
- Affected products/services: `dappgo-website` Privacy page only.
- Data/provider/platform boundaries: Static GitHub Pages site; no new external runtime dependency or provider mutation.
- Rollout and rollback: Merge the verified PR to `master`; GitHub Pages deploys from `master`. Roll back by reverting the focused commit if live checks fail.
- Success and stop conditions: Ship only if all five acceptance criteria are verified; stop and re-plan on a failed or non-improving validation.
- Protected approvals still required: Owner remains responsible for legal-content approval and production publication direction; this change does not alter legal content beyond carrying the Owner's existing uncommitted copy.

## Readiness decision

- Owner confirmation: Current request: `privacy 是否也加入 並符合現在的style`; prior released homepage is the visual reference.
- Ready for design: `yes`
- Next AI001 action: Complete the scoped privacy layout, then run deterministic checks and browser QA before promotion.
