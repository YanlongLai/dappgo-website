# Changelog

All notable changes to this project will be documented in this file.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Changed
- The United States wire now draws from the ten highest-weight stocks by market cap, one story per stock, newest first.
- Homepage returns to the DappGo blue base (light with system dark mode, deep-blue hero and business band) and gains a live publish-run console, a hero market-field canvas, count-up stats, scroll reveal, cursor spotlight and a scroll progress bar.
- On the wire is split into United States and Taiwan tabs (United States first, choice remembered) and shows the publisher preview image when the engine resolved one; the pulse keeps up to six headlines per market.
- DappGo News uses its submitted app icon; Number Merge is listed as Android-only.

### Added
- Bold homepage redesign ("Markets, compiled daily") showing today's US stocks, Taiwan stocks and US options reports and a mixed US/TW headline wire, each linked into its product.
- `scripts/build-pulse.mjs` derives the ~14 KB `data/pulse.json` from hash-verified data.dappgo.com pointers (fails closed, skips unchanged); `scripts/verify-pulse.mjs` enforces its contract.
- Gitea Actions `homepage-pulse` refreshes the pulse on trading days and pushes to GitHub master; `website-ci` runs the quality gate.
- Product screenshots from the current Options Explorer iPhone build for the public product story.

### Changed
- Reworked the homepage into a product-led, mobile-first presentation with a shared DappGo visual system.
- Updated Options Explorer language to describe public market research, the current server pipeline, and clear research-only boundaries.
- Synchronized AI crawler guidance and sitemap metadata with the current public pages and platform status.
- Aligned the gitleaks push gate with the repository's configured `master` branch.

### Fixed
- `llms.txt` now lists US Stocks iOS as available, matching the product catalog.
- Removed stale public claims about GitHub Actions ownership and model-count implementation details.

## [0.1.0] - 2026-05-05

Initial documented release. Backfilled from git history.

### Added
- Initial DappGo B2B website on GitHub Pages.
- SEO scaffolding: Open Graph, Twitter Card, JSON-LD, sitemap, `robots.txt`.
- Google Analytics 4 (G-C9K7KCERPP) + Bing Webmaster Tools verification.
- Favicon + 404 page + Open Graph social-share image.
- Privacy policy and terms pages (App Store submission ready).
- `llms.txt` for AI crawler discovery, including v1 schema URLs and references to the v2 schema repo + MCP server.
- `/options` standalone case-study page with bilingual AI commentary.
- "What's New" section + 3-product subscribe popup.
- Non-intrusive subscribe popup (bottom-right desktop, bottom-sheet mobile).
- Phase 0 backend integration with cumulative security / SEO / UX hardening.
- Case Studies section + clarified AI positioning (not crypto).
- Major website enhancement: process, tech stack, industries, footer.
- Live Backtest Dashboard link (replacing the "Coming Soon" placeholder).
- `[[type:text]]` highlight markers parsed into coloured spans on `/options`.
- Latest daily options report embedded inside the `#options` section.
- `[[u:text]]` underline variant on `/options`.

### Changed
- Subscribe form defaults to English and no longer auto-matches the site UI language.
- Removed flagship section; redesigned popup top accent.

### Fixed
- Fixed `/options` rendering for the current bilingual object-shaped AI commentary payload and aligned freshness checks with the US market date.
- Subscribe CTA always works regardless of dismiss cache.
- Replaced smart quotes with straight quotes in the popup dictionary.
- Lychee link checker: excluded deferred-download fonts and GitHub Pages clean URLs; uses `--root-dir` (absolute) instead of `--base` for local paths; `--base` retained for root-relative paths; skips Google verification HTML; `/terms` excluded from filesystem check.
