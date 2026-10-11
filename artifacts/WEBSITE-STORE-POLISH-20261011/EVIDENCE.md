# Evidence

Initial: ca03006 clean default branch, no active website claims. Root cause: JPEG internal margins plus wrapper borders; disabled status extends one badge and grid stretches its sibling; card copy length changes download baseline. Implementation and public verification pending.

## Local verification, 2026-10-11

- Implemented official unmodified SVG downloads, equal 44px badge height, no redundant borders, two-column product layout with aligned download rows, accessible noninteractive iOS placeholders, explicit regional News links, bilingual labels and dark-theme news icon contrast.
- Browser widths 360, 390, 768, 1024, 1280: no horizontal overflow; every badge row has equal top coordinates; all six active image rectangles exactly match their anchor rectangles. English/light and Traditional Chinese/dark inspected visually; no broken images. Keyboard focus is visible (3px blue outline). This is desktop-browser viewport emulation, not a physical iOS/Android device test.
- Node homepage suite: 10/10 passed; ownership/privacy suite: 2/2 passed; public AI discovery contract passed; diff whitespace check passed. Translation fixture now covers production as well as historical demo keys; repaired existing anchor check that previously stripped hashes before validating.
- Both news destinations return HTTP 200. Six store hrefs unchanged from the prior verified release; no app binaries or store releases changed.
- Independent reviewer Franklin: no actionable findings in scoped diff; confirmed geometry, availability, links and translations, ran 10 passing tests. Static review complemented by producer browser checks. A subsequent dark-mode icon contrast CSS fix was visually checked locally.
- Engineering disposition: local acceptance verified; merge and public observation pending. Rollback remains a scoped revert to ca03006.
