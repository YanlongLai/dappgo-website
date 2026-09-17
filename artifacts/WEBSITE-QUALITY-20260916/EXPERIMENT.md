# Experiment log: WEBSITE-QUALITY-20260916

## Baseline

The production audit identified four measurable issues: Lighthouse performance 71 with an 8.4s LCP, oversized screenshot payloads, Google Analytics requests blocked by the page CSP, and a language-toggle accessible-name mismatch. Production also returned only `cache-control: max-age=600`; HTTP security headers were not present.

## Attempt 1 — direct WebP conversion with ffmpeg

- Hypothesis: converting the existing PNG screenshots with ffmpeg's WebP encoder would provide responsive modern assets quickly.
- Result: failed because the installed ffmpeg build did not include a usable `libwebp` encoder.
- Decision: return to the asset-generation hypothesis and use the installed Pillow runtime instead of weakening the implementation or skipping responsive sources.

## Attempt 2 — Pillow WebP derivatives plus responsive `<picture>` sources

- Hypothesis: 330/660/1320 WebP derivatives, PNG fallbacks, and priority only on the LCP hero image will reduce the first render without changing the site's visual language or routes.
- Implementation: generated WebP derivatives for dashboard, Explore, and ticker screenshots; added responsive `<picture>` sources; kept below-fold product/portfolio assets lazy and asynchronously decoded; added a 330px source after the first audit showed the mobile browser selecting a larger source than necessary.
- Result: local Lighthouse reached performance 97, accessibility 100, best-practices 100, and SEO 100. LCP was 2.5s, FCP 1.5s, TBT 20ms, and the console-error audit passed.

## Closed-loop verification

- JavaScript tests: 8/8 passed.
- HTMLHint: 7/7 pages passed.
- JavaScript syntax and `git diff --check`: passed.
- Desktop route smoke: all valid routes loaded at 1440px with no horizontal overflow or broken images.
- Mobile route smoke: all valid routes loaded at 390px; after scrolling through lazy content, no broken images remained and no horizontal overflow was detected.
- Interactive checks: language toggle accessible name includes visible `中 / EN`; mobile navigation exposes its close label; product selector changes the product artwork and alt text.

## Residual findings and next hypothesis

1. The remaining cache-lifetime warning is hosting-level: production still uses `max-age=600`. The next hypothesis is to apply long-lived immutable caching for fingerprinted/static assets at the hosting or edge layer, then rerun production Lighthouse.
2. HTTP CSP/frame protection, HSTS, referrer policy, and permissions policy are documented in `docs/website-security-headers.md`; they cannot be made effective by HTML meta tags and require the hosting Owner's approval and deployment.
3. Analytics consent/legal policy was intentionally not changed in this repair round. Any consent-policy change remains an Owner/legal gate.

## Promotion state

The feature branch has been verified locally but has not been committed, pushed, merged, or deployed in this repair round. Promotion remains a separate Owner-authorized step.
