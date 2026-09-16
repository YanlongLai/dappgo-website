# Automation-led website demo

## Scope and provenance

- Work item: WEBSITE-REDESIGN-20260916
- Codex task: 01a09cd0-07e4-71c1-89d5-4a4b0e5750be
- Host: local
- Repository: YanlongLai/dappgo-website
- Branch: feat/website-redesign-20260916
- Worktree label: dappgo-website-redesign-20260916
- Deliverable: the promoted production homepage at `/`, with `demo.html` retained as a noindex comparison page.
- Owner direction: more distinctive design, clearer company positioning, and visible automation.

## Requirement gate and design read

Ready for design: the Owner explicitly requested a demo; routine visual choices are reversible. No further material product decision is required. Preserve the existing homepage, routes, legal pages, product identities, and other sessions' changes.

Reading this as a product-studio landing page for market-research readers and automation clients: precise, confident, visually expressive, with an editorial engineering aesthetic.

Design dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 5, VISUAL_DENSITY 4. Cobalt is the single brand accent. UI frames are rounded; typography and section divisions supply structure. Space Grotesk is self-hosted, with system CJK fallbacks.

## Audit and hypothesis

The previous demo relies on abstract headings, similar sections, and static descriptions of automation. A stronger hierarchy, an identifiable product, and an interactive data-to-research sequence should make DappGo easier to understand on first view.

Build a separate visual direction with a two-line value proposition, genuine Options Explorer captures, a user-controlled workflow illustration, varied product compositions, and direct social/subscription links. Workflow animation describes the process, not live production health. Number Merge is a game, not an automation utility. No invented usage, performance, investment outcomes, or store-availability claims.

## Acceptance and verification plan

| Criterion                                | Status                  | Evidence / next action                                                                                                                                                     |
| ---------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Distinctive company-specific design      | verified locally        | Inspected real 1440px and 390px browser renders; strong product hero, interactive workflow, varied section layouts                                                         |
| Real product content and honest workflow | verified                | Real Options Explorer captures; workflow explicitly labeled as illustration, not telemetry; no invented store links or outcomes                                            |
| Useful interaction                       | verified locally        | Browser: screen switcher, workflow controls, mobile navigation, service disclosure, locale and theme controls; eight dependency-free behavior tests pass                  |
| Responsive and accessible                | verified for demo scope | Both locales checked at 320, 390, 768, 1024, 1440px with no horizontal overflow; keyboard and reduced-motion behavior tested; primary text contrast pairs all exceed 4.5:1 |
| Complete EN / Traditional Chinese        | verified                | No empty/undefined translation strings; language round trip and dynamic labels tested; English app captures explicitly identified                                          |
| Original work preserved                  | verified                | Existing routes, legal pages, public forms, analytics ID, and pre-existing `privacy.html` change preserved; the new homepage reuses the verified demo assets and behavior       |
| Owner can inspect the released homepage  | verified in production  | `https://dappgo.com/` returns the promoted homepage; `demo.html` remains available locally and is marked noindex for comparison                                          |

## Verification record — 2026-09-16

Commands: `node --check assets/demo/demo.js`, `node --test assets/demo/demo.test.cjs`, `git diff --check`, and pinned Prettier 3.6.2. Eight tests passed, zero failed. All 46 initial HTML references resolve to existing local files, in-page anchors, or the established external destinations; no duplicate IDs. Browser inspection found no broken images, missing translated text, or console warnings/errors.

Behavior tests cover automatic playback only while visible, explicit pause, hidden-tab suspension, default reduced-motion behavior and preference changes, keyboard selection, actual screenshot switching, menu dismissal, and blocked localStorage. Tests use a minimal DOM harness; visual and pointer behavior were separately checked in the real in-app browser. This is not a claim of full assistive-technology or Safari-device certification.

Primary contrast ratios: body 15.31:1; muted text 5.50:1; primary button 5.68:1; dark body 16.29:1; dark muted 9.29:1; workflow secondary text 7.64:1.

Repair loop: removed an unimplemented product-page destination; restored caption contrast over hero screenshots; joined workflow connectors to the engine; increased mobile workflow-label readability. Rechecked links, JS, responsive dimensions, and both themes after changes. The coordinator lease was explicitly renewed/taken over by the same task during continuation; no other session's files were reclaimed or cleaned.

Assets: genuine product screenshots and existing app icons; self-hosted Space Grotesk (OFL license included); Simple Icons 11.15.0 for social brands (license included); existing Lucide icon family for workflow inputs. No third-party runtime JavaScript or analytics was added.

Goal checkpoint: production homepage implemented, promoted, deployed, and observed; no known blocking website defect. The first live capture briefly showed image placeholders during first paint; a second browser check after the assets loaded showed the actual Options Explorer screenshots, with 1320×2868 source dimensions and no console errors. No independent reviewer approval is claimed.

## Release boundary

The standalone `demo.html` remains a noindex comparison page. Commit `3576ace79baa8072571f97e9a6c41adb70d08eb9` was pushed on `feat/website-redesign-20260916` and merged through [PR #1](https://github.com/YanlongLai/dappgo-website/pull/1) as master commit `3dd889a45d025e038607742ae4b895b6c2eac05e`. GitHub Pages deployment run `35145589260` completed successfully for that exact master SHA. On 2026-09-16 at 20:24 UTC, the live homepage, stylesheet, script, favicon, and Options screenshot asset returned HTTP 200; the Pages API reported `status: built`, `cname: dappgo.com`, HTTPS enforced, and an approved certificate. Browser observation confirmed the new hero, real app screenshots, responsive layout, and no console warnings/errors. The subsequent documentation deployment, Pages run `35146628706`, also completed successfully; that run emitted one non-blocking platform annotation that GitHub's generated Pages job is forcing `actions/upload-artifact@v4` from Node.js 20 to Node.js 24. This generated step is not defined in this repository, so it is tracked as a known-benign platform follow-up rather than a website defect. `options.html`, support, privacy, terms, and public Google Forms remain separate routes. No contact-form submission or production configuration mutation is performed by the page itself. Self-review is performed in this session; no independent reviewer approval is claimed. Next gate: Owner visual review of the live homepage and routine monitoring of the first production traffic.
