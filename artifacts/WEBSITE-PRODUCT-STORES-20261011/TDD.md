# TDD — Platform store badges

## Implementation boundary

Keep the existing static HTML/CSS/vanilla JavaScript site. Add local cropped derivatives of the Owner-supplied badge artwork under `assets/store-badges/`; do not add a framework or runtime request. Keep URLs hand-authored in the homepage because this is a small audited catalog; verify them with a deterministic link test before release.

The homepage remains responsible only for navigation. It does not detect the visitor's OS, invent store URLs, fetch app metadata, or infer an app release from a badge.

## Availability model

Each app card has two platform slots:

1. `available`: an external anchor with `target="_blank"`, `rel="noopener noreferrer"`, and a verified exact URL.
2. `coming-soon`: a semantic non-interactive element with `aria-disabled="true"`, no `href`, no tabindex, and localized status text.

The same component rules apply to the featured Options card and the three/four app cards. Theme-aware badge variants are selected by CSS; this avoids loading both visual variants into a visible state.

## Verification

- static parse: all badge image paths exist, all active URLs use the approved host and expected app identifier, disabled slots have no href/tabindex;
- browser: English/Traditional Chinese, light/dark, 360/390/768/1280 widths, no horizontal overflow, keyboard focus does not enter disabled slots;
- accessibility: visible status for disabled slots, meaningful link names, focus ring, no new unlabeled control;
- security: external links use `noopener noreferrer`, no new inline tracking or form submission;
- regression: existing homepage anchors, analytics, AdSense/CMP identifiers, legal links and app binaries are unchanged;
- deployment: merge one pinned website commit, publish through the existing GitHub Pages path, then verify the public HTML and all active URLs.

## Rollback

Revert the website commit and remove only the new badge assets if a public link or layout regression is observed. Do not touch mobile repositories, store metadata, data pipelines, or Cloudflare services.
