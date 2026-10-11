# Implementation and verification

Targeted native-CSS evolution. Design dials: variance 4, motion 2, density 4. Preserve page structure and brand. Replace composite JPG crops with locally hosted official badge artwork; preserve intrinsic ratios and remove redundant wrapper borders/backgrounds. Display unavailable iOS as a same-height noninteractive platform placeholder with Coming soon. Use a shared row geometry and bottom-aligned card download regions. Keep regional news inside one card with two clear links.

Verify real production HTML translations (not only the older demo fixture), six store hrefs and two news hrefs, no clickable unavailable state, image bounds and row geometry, mobile overflow and both themes. Version changed assets to prevent stale CSS/JS mixing. Rollback: revert this scoped PR to ca03006; no service or data changes.

DEL-1: independent read-only review is bounded to this diff, testable, reversible, has no external effects and needs only the specified UI requirements. Reviewer does not edit or deploy. Producer runs browser checks independently.
