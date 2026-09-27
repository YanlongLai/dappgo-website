# PRD — Publish AdMob app-ads.txt for Element Pals

## Outcome

Make the official DappGo website verifiable by AdMob for the published Android package `com.dappgo.numbermerge`, using only the exact publisher relationship shown in the AdMob account.

## Scope

- Add a root-level `app-ads.txt` containing `google.com, pub-7851819017318644, DIRECT, f08c47fec0942fa0`.
- Keep the site's existing domain and static hosting configuration.
- Verify the deployed HTTPS response and AdMob checker result.

## Out of scope

- No changes to unrelated website pages, privacy or terms.
- No edits to any AdMob ID, ad unit, app binary, consent gate, or unused AdMob record.
- No claim that ads are serving until request metrics confirm real production traffic.
