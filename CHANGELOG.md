# Changelog

All notable changes to this project will be documented in this file.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added
- 

### Changed
- 

### Fixed
- 

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
- Subscribe CTA always works regardless of dismiss cache.
- Replaced smart quotes with straight quotes in the popup dictionary.
- Lychee link checker: excluded deferred-download fonts and GitHub Pages clean URLs; uses `--root-dir` (absolute) instead of `--base` for local paths; `--base` retained for root-relative paths; skips Google verification HTML; `/terms` excluded from filesystem check.
