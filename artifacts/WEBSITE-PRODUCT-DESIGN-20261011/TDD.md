# Technical implementation plan

## Boundaries

Keep the existing static site. A homepage redesign does not justify a new framework, API or server. The review prototype lives in `prototypes/website-product/` and uses existing icons/fonts/screenshots plus dated Web screenshots. The approved implementation may update `index.html`, `assets/demo/` and local store-badge assets; `news/`, legal pages, advertising identifiers and production routing remain untouched.

## Production architecture after approval

Use one checked-in product catalog containing stable ID, bilingual title/description, web URL(s), icon/screenshot metadata and explicitly supported store URLs. Validate URL hosts and platform IDs. Render crawlable product and app links into HTML at build time with a small Node script (or retain hand-authored static output with a parity check). Runtime JavaScript enhances tabs, theme and locale; it must not be the only place store links exist. No live RSS/report fetch on the homepage, no iframe embedding of apps, no new scheduled job. News itself already owns freshness.

Shared rendering avoids separate desktop/mobile URL lists. Never construct an iOS listing from an Android package. A missing platform is an omitted link, not a fake Coming Soon promise. Record `verified_on` separately from software release versions. Review store availability before promoting the design; a public page proves listed availability in the checked region, not global availability or installation on every device.

Locale and theme storage must fail safely if blocked. Respect OS color scheme until the user chooses a mode. Stable selected product ID is independent of locale. Use DOM textContent for localized copy; trusted catalog URLs only, no HTML injection from report data.

## Integration sequence

1. Owner reviews local prototype and UI/PRD/TDD. The Owner then explicitly authorizes the bounded store-badge implementation and release.
2. Implement selected design in a clean owning feature worktree from the verified current origin/master; reconcile other sessions before editing canonical assets.
3. Add canonical catalog and deterministic HTML generation, preserve anchors #products/#method/#workflows/#contact/#more-products/#options-explorer or compatible aliases, preserve support/legal routes and existing analytics intent names.
4. Reconcile homepage SEO title/description, structured data and share imagery. Keep canonical dappgo.com and existing URLs. News/Stocks/Options deployments remain independent; no app/service rollout needed.
5. Test built HTML links with JavaScript disabled; test tabs/locale/theme/mobile menu and store availability with JavaScript enabled. Test screen readers and real iOS Safari/Android Chrome separately before claiming device compatibility.
6. Review exact diff; promote through the website release path using the Owner-authorized merge/deployment. Freeze merged SHA and asset digests. Verify the public homepage source and all primary destinations after release, then clean the completed worktree.

## Verification and performance

Behavior coverage: 4 product panels x 2 languages; platform availability and exact destinations; keyboard roving tabs; menu dismissal; blocked localStorage; image failure; 360/390/768/1280 widths; light/dark; reduced motion; no JS access to links. No mobile app build is involved in this marketing-site change.

Budgets for production: homepage first-load transfer <= 600KB compressed excluding user-requested noncritical screenshots; new JS <= 15KB gzip; CSS <= 15KB gzip. Hero uses existing 330/660 WebP variants, explicit dimensions and preload only for the primary image; deferred product screenshots load on demand. Convert dated JPG design captures to responsive WebP/AVIF during implementation. Avoid preloading all product screenshots. Self-host fonts already licensed in the repo.

Measure Lighthouse against the built page, mobile throttling: target LCP < 2.5s, INP field target < 200ms, CLS < 0.1. Do not equate a desktop preview with field performance. Accessibility target WCAG AA; test button/link contrast, keyboard order and 200% zoom.

## Rollback and independent surfaces

Retain previous homepage asset hashes/release before promotion. Roll back only the website artifact if behavior regresses; do not revert News, stock apps, RSS data or Cloudflare tunnel contracts. Never import old worktrees or restore retired Bastion/SD3.5 behavior. Keep AdSense/CMP/payment decisions outside this feature; preserve current IDs during a later merge unless separately authorized.

## Review deliverables

`PRD.md`, `UI_DESIGN.md`, this implementation plan, `LINKS.md`, `EVIDENCE.md` and the local interactive prototype. These demonstrate a design; they do not claim deployment or full production accessibility/performance certification.
