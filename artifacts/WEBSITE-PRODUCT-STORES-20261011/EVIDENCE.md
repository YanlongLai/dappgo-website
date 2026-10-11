# Implementation evidence — 2026-10-11

## Current status

Implementation, merge, deployment and public smoke verification are complete for the bounded homepage change.

- Worktree: `website-product-design-20261011`
- Branch: `feature/website-product-design-20261011`
- Base: `727a3e579c953b51fc45e08e7234ccfc982a4329`
- Claim: `CLM-24E8A07DDE9F`
- Source commit: `15cee40` (merge commit containing the cache-coherence repair)
- Pages build: `15cee40f9e6cdab359e2ae905e0fd674dda909b4`, `status=built`, updated `2026-10-11T16:35:29Z`
- Public URL: `https://dappgo.com/`
- Changed boundaries: `index.html`, `assets/demo/`, `assets/store-badges/`
- Preserved: mobile repositories, app binaries/store metadata, News/Stocks data, AdSense/CMP identifiers, legal pages and service infrastructure.

## Availability matrix verified in source

| App | Android | iOS |
| --- | --- | --- |
| US Stocks | active Google Play link | disabled, `Coming soon` |
| TW Stocks | active Google Play link | active App Store link |
| Options Explorer | active Google Play link | active App Store link |
| Number Merge | active Google Play link | disabled, `Coming soon` |

The four active Android destinations and two active iOS destinations match `WEBSITE-PRODUCT-DESIGN-20261011/LINKS.md`. The unavailable states are non-focusable elements without `href`.

## Checks completed

- `node --test assets/demo/demo.test.cjs`: 9 passed, 0 failed.
- `node --check assets/demo/demo.js`: passed.
- `node --check prototypes/website-product/design.js`: passed.
- `node --check prototypes/website-product/catalog.js`: passed.
- Local root asset resolver: 45 local URL references resolved.
- `git diff --check`: passed.
- Local browser at 1280px and 390px: no horizontal overflow; four download groups present; six active store links present; two disabled iOS slots have `tabIndex=-1` and no `href`.
- Local browser language/theme: Traditional Chinese translated `下載平台` and `即將推出`; dark theme selected the dark badge variants.
- External active links use `target="_blank"` and `rel="noopener noreferrer"`.
- Read-only HTTP checks returned `200` for all six active store URLs and the four requested web destinations.
- A production smoke test exposed stale cached `demo.js` pairing with the new HTML and producing `undefined` for new Traditional Chinese keys. The systemic repair is release-scoped `?v=20261011-stores` on both homepage CSS and JavaScript references; the local asset test now strips query strings before checking files. Revalidation is required after the follow-up Pages build.

## Notes and remaining release gates

- The supplied source image is retained as `assets/store-badges/store-platforms.jpg`; four cropped variants are used by the page. Source/attribution terms are recorded in `LINKS.md` and should remain part of future asset review.
- Independent review was previously unavailable because the reviewer quota was exhausted; this is recorded, not treated as a pass.
- Public `dappgo.com` smoke verification: versioned CSS/JavaScript assets loaded; all six active store URLs, four store groups, two disabled iOS slots and badge images were present; 390px width had no horizontal overflow; English and Traditional Chinese rendered the new availability labels correctly.
