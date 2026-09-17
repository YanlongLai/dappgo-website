# TDD: Website quality repair

## Implementation

1. Keep the current static-site architecture and shell routes.
2. Extend the existing meta CSP with the Google Analytics endpoint families required by the current tag, add `object-src 'none'`, and remove the ineffective meta `frame-ancestors` directive.
3. Keep frame-embedding protection as a hosting-level action in `docs/website-security-headers.md` rather than pretending a meta directive is effective.
4. Add WebP sources at 660px and 1320px for the three options screenshots, keep PNG fallbacks, and use responsive `picture` sources in the hero and product viewer.
5. Add compact WebP sources for app icons and lazy/deferred decoding for below-fold cards.
6. Ensure every language toggle accessible name includes the visible `中 / EN` text.
7. Tighten the homepage value proposition in both supported locales without changing the legal disclaimer.

## Verification

- `git diff --check`
- HTMLHint and repository link/reference lint
- JavaScript syntax check and existing demo test
- Local static-server route checks at desktop and mobile widths
- Lighthouse performance, accessibility, best-practices, and SEO
- Browser console check for CSP errors and language toggle behavior

## Rollback

Revert the focused feature commit(s), preserving the canonical worktree's unrelated `privacy.html` change. PNG fallback assets remain available even if a modern-image source is rolled back.
