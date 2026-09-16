# Privacy page visual-system alignment

Status: implemented locally; promotion and live observation are pending.

`privacy.html` now uses the same visual foundation as the current DappGo website while retaining the latest privacy copy for Options Explorer, feedback, push notifications, Firebase, Google UMP, and AdMob.

- The current DappGo header, bilingual navigation, theme control, mobile menu, wordmark footer, spacing, cobalt accents, neutral surfaces, and typography are reused.
- `assets/demo/legal.css` scopes legal-page styling so the legacy legal markup remains readable without changing the homepage or Terms page.
- The existing English and Traditional Chinese policy sections remain intact, including the current controller name and 2026-09-09 update date.
- Locale detection reads `dappgo-locale` and supports the older `dappgo-lang` key; language changes update navigation, page title, and policy copy.
- Light/dark theme controls, responsive desktop/mobile layout, skip navigation, and the mobile menu are included in the same interaction model as the homepage.

## Verification

| Check | Result |
| --- | --- |
| HTMLHint on `index.html`, `options.html`, `privacy.html`, and `404.html` | Pass — 4 files, 0 errors |
| Existing homepage behavior tests | Pass — 8/8 |
| Privacy content, stale-copy, and tag-pair assertions | Pass |
| Desktop browser QA at 1440px | Pass — no horizontal overflow or console errors |
| Mobile browser QA at 390px | Pass — no horizontal overflow; menu opens and closes |
| English/繁體中文 round trip | Pass |
| Theme round trip | Pass |
| GitHub Pages promotion and live observation | Pending |

## Release boundary

This change is a visual-system alignment and copy-preservation update. It does not introduce tracking, advertising behavior, authentication, or a new legal basis. Substantive legal review remains an owner responsibility before publication.
