# Web-only release review

Scope: homepage, News US/TW, and RN-exported US Stocks, TW Stocks and Options.
Owner approved preserve-brand refinement and web deployment, plus a deterministic
News root landing on US English. Native store deployment is explicitly excluded.

## Independent evidence

- Homepage/News: Boole and Laplace independently accepted the interaction changes.
  Pause focus/click inversion was reproduced and repaired; mutation regression passed.
- News root addition: Boole and Volta accepted the exact 302 and CSP-safe fallback.
  Four-file manifest SHA-256:
  d969d9d47615edf8dbc69cfea7f09f0d7b4398dbdf65dcce210ffe0180234a95.
  Local HTTP 302 Location /us/?lang=en; browser arriving with a previously saved
  Chinese preference selected English and could switch back to Chinese.
- US: Dalton accepted the final native-condition-preserving web early return.
  Final source diff eb2131c6cd7aed133c355ba3a6c4db4e3e996035a111cc12ce87b577fae64def.
  Integrated producer checks: 154 suites / 1379 tests, Android preset 15, types,
  web 7/7, i18n, iOS source sync, export and four responsive browser scenarios pass.
  PR https://github.com/YanlongLai/dappgo-us-stocks-app/pull/40.
- TW: Volta accepted contrast and final tab routing. Nine-file source/test digest
  ec3f179d71c639c03e6fbe55213d50c27a267ff510c59f6fd0a08d2d6d4983f7.
  Integrated checks: 149 suites / 1276 tests, Android preset 21, types, web 7/7,
  export and 320/390 browser cases pass. Retry contrast is 14.65:1 light / 11.43:1 dark.
  PR https://github.com/YanlongLai/dappgo-tw-stocks-app/pull/23.
- Options: Boole independently verified real-engine cache-present/same-hash recovery,
  changed-hash recovery and preserved warning states for offline/unknown/missing-hash
  outcomes. Latest native-layout cleanup passed nine header contracts and seven
  suites / 53 tests. Five-file source manifest
  bc0032239c4cad108f4cbde9a03d39d2227a313f625f4ac6050390b0f0437d26.
  Final integrated checks now pass: 91 suites / 791 tests, types, i18n, web 6/6,
  export and three browser scenarios. Header checks pass unchanged; only three
  absent generated Android project checks remain outside web-only validation.
  Final reviewed PR head: a4c41598e11139dbc25b0ad04514b83306b4a51f.
  PR https://github.com/YanlongLai/dappgo-options-app/pull/39.

## Release and rollback boundaries

Only merged, clean source may enter the canonical immutable Pages assembler.
Homepage uses existing legacy GitHub Pages branch publication; News and both RN
bundles use their existing Cloudflare Pages projects. No self-hosted service rollout,
new infrastructure, billing, IAM, ad-policy, data-source or schedule change.
GitHub Actions are excluded. Prior deployment IDs are retained in EVIDENCE.md.

After upload verify exact production identity, representative asset bytes, country
and deep-link refresh, missing-asset 404, browser controls, language and overflow.
Merged/deployed/observed milestones must be recorded separately; this review is
release readiness, not proof of production success. Revert the focused homepage
commit or restore the previous Pages deployment if a regression is observed.

Criterion 5 pre-release review verifies the separation-of-identity contract:
the canonical assembler's 21 passing checks reject dirty/changed sources, bind
source commits and lock digests, and keep private release metadata outside uploads.
PR heads are checked before merge; immutable merged source is then rebuilt, and
live bytes/deployment IDs are a separate mandatory observation gate. The goal
checkpoint for actual deployed/observed acceptance stays pending until those live
checks finish. This readiness review must not be cited as proof of deployment.

## Explicit residual scope

No Xcode/Gradle build, signed native binary, device/simulator, screen-reader,
physical safe-area or fresh App Store Connect/Play inventory was performed.
Options' absent generated Android project checks are not passed. Native branches,
types, source/config and platform-specific tests are evidence only of compatibility
at those layers; native release still requires its own checks.
Other-session-owned shared UI has pre-existing 320px stock-row truncation and
nonzero web inset limitations in Settings. They are unchanged, not silently repaired
or claimed resolved here. Protected shared files match the approved upstream merge.
No unrelated worktree, credential, historical failure or provider record is removed.
