# Design verification — 2026-10-11

## Scope and result

Local interactive design and UI/technical specifications are ready for Owner review. This is not a production release or independent approval.

- Worktree: `website-product-design-20261011`
- Branch: `feature/website-product-design-20261011`
- Base: `727a3e579c953b51fc45e08e7234ccfc982a4329` (`origin/master`)
- Claim: `CLM-46BEE90EC6A8`
- Preview: http://127.0.0.1:8792/prototypes/website-product/?lang=zh&theme=light
- Canonical website checkout remained clean. No merge, deployment, advertising change or external submission performed.

## Executed checks

| Check | Observed result |
| --- | --- |
| Node syntax: design.js and catalog.js | Passed |
| Local HTTP preview | HTTP 200 |
| Four products × two languages | Correct selected product, description, destination and loaded screenshot; no horizontal overflow |
| 360, 390, 768 and 1280 CSS-pixel widths | Document width matched viewport width |
| Chinese/light and English/dark visual checks | Reviewed desktop and phone screenshots |
| Mobile navigation | Opens; Escape closes; following an anchor closes menu |
| Product keyboard navigation | ArrowRight moves Options to News and focuses the selected tab |
| Store directory | Four Google Play and two App Store destinations match verified listings; see LINKS.md |
| Visible image resources | No completed images with zero natural width in final layout checks |
| Browser console | No captured errors or warnings in final local preview |
| Canonical source preservation | `git status --short` empty in `/Users/yan/git/dappgo-website` |

Screenshot evidence: [desktop](desktop-preview.jpg), [mobile English dark](mobile-preview.jpg). Product screenshots are illustrative captures, not live report freshness evidence.

## Limitations / remaining acceptance

- Independent read-only reviewer could not execute because its usage quota was exhausted. It did not pass or approve this change. Producer checks above are not an independent review.
- Viewport checks use the browser engine, not physical iPhone/Android devices. Native mobile-browser QA remains a production-integration task.
- The no-JavaScript fallback is present in source but has not been exercised with browser JavaScript disabled.
- Screenshot failure fallback, blocked-storage behavior, full accessibility audit and performance budgets are specified for production implementation; they are not claimed as tested here.
- Owner visual review is pending. Retain this worktree and local server for review. Do not merge/deploy or delete the uncommitted design worktree as cleanup.

## Next step

After visual approval, integrate the selected design into the canonical static entrypoint, preserve legacy anchors and legal/advertising configuration, run the production build/link/accessibility checks in TDD.md, then use the separately authorized release workflow. Keep product destinations in the shared catalog rather than maintaining parallel lists.
