# Evidence and checkpoints

Intake 2026-10-17: website origin/master bc113548d8281884f2496d9daebedbe740599227, clean, no active claim.
Homepage live navigation and current product/store destinations inspected. News implementation is in
website/news (not Meta). Runtime UI, tests, merge and deployment remain pending.

## Delegation

DEL-WEB-QUALITY-APPS: bounded independent repository audits and screen fixes; success measured by concrete
regressions, types/tests and export checks; reversible Git changes; no secrets/provider/store mutations;
preserve-brand product direction confirmed. AI-assisted implementation, main agent integrates and reviews.
Workers must read applicable instructions, inspect ownership and claim before editing. Never overlap
mobile-product-links active scopes. Each worker reports changed files and unresolved platform evidence.

## Acceptance

All acceptance rows pending at intake. No production or native release claim has been made.

## Website implementation and local verification

- Homepage: 44px theme/menu targets; keyboard menu opening moves to its first link;
  focus exit and breakpoint change close the menu; keyboard workflow entry pauses autoplay.
- News US/TW: bilingual unmatched-search feedback and clear control, selected-stock keyboard
  focus restoration, 16px mobile inputs/selects, 44px controls, wrapping metadata/footer/filter
  layouts, localized disclaimer, bounded 15s JSON requests and explicit coalesced retry.
  Failed refreshes preserve the last readable data and retain the error through locale changes.
- Full website quality command passes after adding News contracts, locale selectors, JS syntax
  and four behavior tests. Homepage behavior tests: 12 pass. Initial News contract failed solely
  because the intentional cache-busting asset revision changed; expectation was updated without
  deleting assertions, then the whole quality command passed.
- Browser with existing read-only RSS gateway, 390x844: US search with no match, Chinese switch,
  clear search, MSFT selection and 7-day filter passed; URL reflects state and no horizontal overflow.
  Homepage keyboard Enter opens menu with first-link focus; Escape closes; Chinese/dark-theme
  rendering inspected at 390x844 with no horizontal overflow.

## Design audit interpretation

Updated design-taste-frontend used for the public-site component audit, not as an instruction to
redesign the RN data applications. Owner explicitly chose preserve-brand refinement.
Baseline automatic taste audit returned 11 failures/4 warnings (aesthetic rubric); post audit
returns 12/4 with an extra 320px width. This is NOT a passing taste score. Existing brand shadows,
numbered workflow, rules and palette are intentionally retained; no decorative video/motion is
added to chase the gallery rubric. News source names and full source headlines are data provenance,
not decorative eyebrows to remove or rewrite. Functional quality gates are separate from this audit.
The inspector's unknown 320px preset used a 200px-high viewport, so its missing-first-screen-action
warning is not a phone-height acceptance result. Manual responsive checks use 844px height.

Independent source review and three RN workers remain in progress. Merge, deployment and clean
remain pending; other sessions' worktrees and mobile-product-links scopes remain untouched.

## Independent repair and verification

Boole found P2: pointer focus on Pause ran before its click, inverting the action. Replanned
the focus hypothesis: the playback control owns its click state, while other workflow focus
pauses autoplay. Added a focusin-then-click regression. Independent re-review accepted the
repair and confirmed the test fails when the guard is removed in memory.
AI001 finding FND-15BCD5A8F6C3 / attempt ATT-FA1141927ADA independently verified passed.
Reviewed tracked diff SHA-256: 4d7041885676b5ed1d94521f2b49a3e2fc5b9501f4b8e6f28cc2c1632126939b.
Final local suite: 19 behavior tests plus News contracts/analysis, catalog, performance, syntax
and four Python discovery tests pass. No claims of screen-reader or actual mobile-device testing.

Additional browser verification: 320x844 homepage has no horizontal overflow and menu/theme
targets both measure 44x44. Taiwan News loads live gateway data, filters 2330, switches to Chinese
and displays 台積電 with no overflow at 390x844. Captures: home-mobile-dark.png and news-tw-mobile.png.

The official release ledger requires exact Owner confirmation before production. Requested
APPROVE WEB-QUALITY-20261017 owner; source work and review continue while awaiting that record.
