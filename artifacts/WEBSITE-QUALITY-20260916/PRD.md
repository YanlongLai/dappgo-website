# PRD: Website quality repair

## Problem

The public site is functionally healthy, but a current Lighthouse audit shows a slow LCP, oversized image payloads, blocked Google Analytics requests caused by an incomplete CSP, and a label-in-name accessibility issue on the language control.

## Outcome

The website should load the first useful product visual faster, serve appropriately sized assets, allow the existing analytics configuration to operate without CSP console errors, and expose a language-control name that matches its visible label. The homepage should also state the concrete research-to-publish value without implying trading execution or personalized advice.

## Constraints

- Preserve all existing URLs, forms, legal boundaries, and analytics property ID.
- Keep original PNG assets as fallbacks.
- Do not claim HTTP security headers are active when GitHub Pages has not applied them.
- Do not add fake proof, financial performance claims, or unsupported product availability.

## Acceptance matrix

| ID | Criterion | Status | Evidence | Next action |
|---|---|---|---|---|
| Q-01 | CSP allowlist covers current analytics endpoints | verified | `index.html`, all shell CSP audit, local browser/Lighthouse console check | Recheck after production promotion |
| Q-02 | Ineffective meta `frame-ancestors` removed and hosting gap documented | verified-with-owner-gate | HTML source audit and `docs/website-security-headers.md`; production headers still lack the HTTP controls | Hosting Owner applies and verifies response headers |
| Q-03 | Visible language label is contained in accessible name on every shell | verified | source audit, Lighthouse accessibility 100, interactive toggle check | Recheck after production promotion |
| Q-04 | Hero/product images use responsive modern sources with fallback | verified | WebP 330/660/1320 inventory, `<picture>` source audit, local Lighthouse performance 97 | Recheck with production Lighthouse after promotion |
| Q-05 | Homepage copy clarifies research-only value | verified | homepage English/Traditional Chinese copy and product CTA audit | Owner review before publication |
| Q-06 | Existing public routes and mobile layout remain healthy | verified | desktop/mobile route smoke, zero broken images after lazy-load scroll, no horizontal overflow | Recheck after production promotion |
