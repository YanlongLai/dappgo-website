# Evidence: WEBSITE-QUALITY-20260916

Captured: 2026-09-17 (UTC)

## Acceptance evidence

| Criterion | Result | Evidence |
|---|---|---|
| Analytics CSP | Pass | All seven checked HTML shells include the Google Analytics/Tag Manager allowlist; local Lighthouse console audit passed. |
| Meta security declaration | Pass with Owner gate | Ineffective `frame-ancestors` was removed from HTML; production HTTP headers still need the documented hosting action. |
| Language control | Pass | Every shell exposes the visible `中 / EN` text in the accessible name; Lighthouse accessibility score is 100. |
| Responsive image delivery | Pass | Dashboard, Explore, and ticker assets exist at 330/660/1320 WebP sizes with PNG fallbacks; app icons have WebP derivatives. |
| Product clarity | Pass | English and Traditional Chinese homepage copy describes research, options insights, and automation without execution or profit claims. |
| Route/mobile stability | Pass | Desktop 1440px and mobile 390px route smoke passed; no horizontal overflow; lazy-loaded images passed after bottom-of-page scroll. |

## Verification commands

```text
node --test assets/demo/demo.test.cjs                         # 8/8 passed
npx --yes htmlhint@1 index.html demo.html options.html \
  privacy.html terms.html support.html 404.html               # no errors
node --check assets/demo/demo.js                              # passed
git diff --check                                               # passed
npx --yes lighthouse@12 http://127.0.0.1:8777/ --quiet \
  --chrome-flags='--headless=new --no-sandbox' \
  --only-categories=performance,accessibility,best-practices,seo
```

## Lighthouse result

- Performance: 97
- Accessibility: 100
- Best practices: 100
- SEO: 100
- First Contentful Paint: 1.5s
- Largest Contentful Paint: 2.5s (2479ms)
- Total Blocking Time: 20ms
- Console errors audit: pass

## Production-only follow-up

The live response-header check still reports `cache-control: max-age=600` and no HTTP CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, or HSTS header. This is recorded as a hosting/edge Owner action in `docs/website-security-headers.md`; it is not represented as fixed by the source changes.

No commit, push, merge, or production deployment was performed for this repair round.
