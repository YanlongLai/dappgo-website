# Public product destinations

Verified 2026-10-11. These are marketing links, not store submission or deployment actions.

| Product | Web | Android | iOS requested for this design |
|---|---|---|---|
| US Stocks | https://stocks.dappgo.com/us/ | https://play.google.com/store/apps/details?id=com.dappgo.usstocksapp | Not included |
| TW Stocks | https://stocks.dappgo.com/tw/ | https://play.google.com/store/apps/details?id=com.dappgo.twstocksapp | https://apps.apple.com/app/id6768116538 |
| Options Explorer | https://options.dappgo.com/us/ | https://play.google.com/store/apps/details?id=com.dappgo.optionsapp | https://apps.apple.com/app/id6768116720 |
| DappGo News | https://news.dappgo.com/ (US /us/; Taiwan /tw/) | No listing | No listing |
| Number Merge | No web game included | https://play.google.com/store/apps/details?id=com.dappgo.numbermerge | Not included |

Evidence: all four Google Play public pages identify Dappgo and show Install. TW Stocks Apple page displays version 1.0.3 and a store acquisition action. Apple public lookup endpoint for country=tw returns TW Stocks 6768116538 version 1.0.3 and Options Explorer 6768116720 version 1.5.14, seller Yenlung Lai. All four Web entry points return HTTP 200; browser checks show the US/TW/Options dashboards and News stock index loaded. This does not certify market-data freshness or each platform's native release parity.

Sources: the six official listing URLs above and `https://itunes.apple.com/lookup?id=6768116538,6768116720&country=tw`. App package IDs independently match their canonical app.json files. Final marketing links omit a forced storefront country so Apple can use the reader's region; availability may vary by region.

Number Merge listing title remains Number Merge while its description also uses Element Pals: Merge Quest. The design follows the public listing title and does not change the app's branding or store metadata.

Screenshots: existing Options mobile shots under assets/screenshots/options; Web screenshots captured from the four public products on 2026-10-11 under prototypes/website-product/screens. Screenshot values are illustrative snapshots, not live metrics. No external photos or generated product mockups.

Store badge artwork: Owner supplied `https://static.vecteezy.com/system/resources/thumbnails/054/637/748/small_2x/set-pack-app-store-symbol-logo-google-play-store-icon-icons-free-vector.jpg`. The original and four cropped light/dark derivatives are stored under `assets/store-badges/` for the homepage implementation. License/attribution terms for the source should remain part of the website asset review before any future redesign replaces this artwork.
