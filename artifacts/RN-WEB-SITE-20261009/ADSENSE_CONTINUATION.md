# Owner-approved AdSense review continuation

The Owner explicitly superseded the original no-script acceptance boundary on
2026-10-09: add the official publisher script, request review, and prepare consent
management. Preserve the historical frozen manifest; do not rewrite prior evidence.
This continuation does not authorize paid services, native changes or manual ad
slots. The three browser apps remain ads-off pending approval and consent proof.

The official account UI provided publisher ca-pub-7851819017318644. The review
request was submitted and site details changed to Under review / Review requested.
Approval is external and remains pending. Add the asynchronous loader to the
marketing homepage head, retaining ownership metadata and ads.txt. Narrow CSP
allowances cover the loader and Google consent messages; this is not a claim that
all future ad-serving CSP resources are supported. Google documents strict CSP
for full serving; validate that separately before ad activation.

Acceptance: exact publisher, single async loader in head, no manual slots, native
app-ads.txt unchanged, public bytes match promoted source, and verified UI review
state. Consent message publication and visitor behavior require separate evidence.

DEL-ADSENSE-REVIEW: clear bounded source diff; deterministic publisher/script tests;
reversible reviewed revert; reviewer has no provider mutation or secret access;
product context limited to explicit Owner authorization. Delegate read-only source
and privacy consistency review, not consent-policy or external publication decisions.

## Observed outcome

- Website PR #14 merged: 38a7924f33f437612897cff62212f7e8fe05a46f.
- GitHub Pages deployment of that SHA completed successfully. Public homepage
  contains the exact async publisher loader in head; ads.txt remains correct.
- Chrome observed the loader plus Google's downstream show_ads_impl script.
  No error/warning entries were captured during this page load. This is loader
  evidence, not proof of eligible ads or completed consent behavior.
- Google site detail confirmed Under review / Review requested.
- European regulations message is Published for dappgo.com, English default,
  consent/manage enabled, reject enabled for every listed applicable region.
  Revenue-oriented consent optimization is off; optional logo display is off.
  Privacy policy points to https://dappgo.com/privacy.html.
- UI says message availability may take up to one hour. Region-specific display,
  refusal/withdrawal behavior, US-state privacy configuration and final Google
  approval remain unverified. Three browser apps retain adsMode=off.
- Independent Nash review passed after fixing premature consent wording;
  ownership/privacy tests 2/2 passed, diff check passed. Native publisher unchanged.
- PR attachment hit the existing task attachment count limit; PR URL remains
  https://github.com/YanlongLai/dappgo-website/pull/14.

Do not report this website change as completed Cloudflare Pages app deployment.
The original Expo asset assembly repair and production CORS rollout remain open.
