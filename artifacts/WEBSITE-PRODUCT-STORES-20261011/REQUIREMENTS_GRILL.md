# Requirements grill — 2026-10-11

## Readiness

`ready-for-design` and `ready-for-implementation` based on the Owner's direct instruction:

> Use the supplied store artwork, make the app download icons more professional, show iOS and Android for every app, disable unavailable iOS versions with Coming soon, follow the design and technical documents, verify each platform, merge and deploy.

## Scope

In scope: the static DappGo homepage, local store-badge assets, platform availability copy, verified web/store links, bilingual rendering, theme rendering, keyboard/mobile behavior, and the existing website release path.

Out of scope: app binaries, store submissions, AdSense/CMP settings, stock/news data, Cloudflare service policy, and native app behavior. No app release is inferred from a homepage badge.

## Decisions resolved by inspection

- Four Android listings are public and verified in the existing design evidence.
- TW Stocks and Options Explorer have verified public iOS listings.
- US Stocks and Number Merge have no verified iOS listing for this homepage; render disabled Coming soon states.
- Number Merge remains an Android-only app card; it is not represented as a News or market-research web product.
- The supplied artwork is downloaded into the worktree and cropped into the four badge variants needed by the light/dark design. The source URL is recorded in LINKS.md.

## Safety and release boundary

The change is reversible static HTML/CSS/asset/translation work. The Owner authorized merge and deployment in the current request. Preserve existing analytics, AdSense/CMP identifiers, legal routes, canonical metadata and all mobile app binaries. Do not announce app-store availability beyond the verified links.
