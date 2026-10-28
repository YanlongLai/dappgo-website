# Number RPG legal review

Review date: 2026-10-27  
Effective date published on the pages: 2026-10-27  
Operator: Yenlung Lai, sole proprietor doing business as DappGo, San Gabriel, California, USA

This is an implementation review against the supplied brief, not a substitute for advice from a qualified privacy, consumer-law, or app-store lawyer. The English copy is the canonical version; the other eleven locales were updated to carry the same required disclosures in their existing languages.

## Scope and evidence reviewed

The review started with `/Users/yan/git/number-rpg/docs/briefs/legal-review.md`, then checked the website copy and the Number RPG implementation before changing public text. Relevant implementation evidence included:

- `number-rpg/legal-content.js`, `number-rpg/legal.js`, and the three Number RPG HTML shells in this worktree.
- Number RPG authentication, account, consent, advertising, messaging, notifications, and RevenueCat purchase code in `/Users/yan/git/number-rpg/src/`.
- `/Users/yan/git/number-rpg/docs/store/app-privacy-ios.md` and `/Users/yan/git/number-rpg/docs/store/data-safety-android.md`.
- `/Users/yan/git/number-rpg-api/docs/api.md` and `/Users/yan/git/number-rpg-api/docs/security.md` for account deletion, device identifiers, provider tokens, push tokens, request handling, and deletion records.

The website content does not claim payment-card data is received by Number RPG, does not claim provider access tokens are stored, and does not describe a privacy-settings control that the app does not currently expose.

## Changes made

### Privacy policy

- Rebuilt the English privacy policy around the actual Number RPG features and propagated it to all 12 locales.
- Identified Yenlung Lai/DappGo as the operator and GDPR/UK GDPR controller, with `admin@dappgo.com` as the privacy, rights, and complaint contact.
- Added plain-language categories of information: account/profile and provider identity, gameplay/social data, purchase and entitlement data, device/technical data, and usage/diagnostic data.
- Added the sources of information: the player, selected sign-in and store providers, the device and game, and other players through social features.
- Added purposes covering gameplay and account recovery, cloud saves, social and leaderboard features, purchase entitlement handling, security/anti-cheat/fraud, requested push notifications and local reminders, consent-gated reliability measurement, and advertising.
- Named Apple, Google/Firebase, Google AdMob, Meta, and RevenueCat and described their relevant Number RPG roles. The copy also explains limited visibility to other players and the absence of in-game chat.
- Documented the actual advertising and consent posture: non-personalized ads until the required consent state, personalized ads only with the required consent and device permissions, iOS App Tracking Transparency, consent-gated Firebase services, optional push notifications, notification/device controls, and the website’s local-storage and Google sign-in behavior.
- Added CCPA/CPRA rights to know/access, delete, correct, and portability where required; the no-money-sale statement; the possible AdMob cross-context behavioral advertising “sharing” disclosure; available opt-out paths; authorized agents; non-discrimination; and the 45-calendar-day response target.
- Added GDPR/UK GDPR legal bases, consent withdrawal, controller identity, data-subject rights, international-transfer safeguards, EEA supervisory-authority and UK ICO complaint routes, and the automated-decision statement.
- Added retention and deletion commitments: account data while active and then deletion after a successful request subject to limited exceptions, analytics/Google Analytics data for 14 months, server request logs for 30 days, push-token cleanup, store/provider retention caveats, and limited legal/security/accounting/fraud/dispute records.
- Added the under-13 position, the parent/guardian contact and deletion process if a child is learned to have provided information, reasonable-security wording, change notice, and contact instructions.

### Terms of service

- Rebuilt the English terms and propagated them to all 12 locales.
- Added age 13+, acceptance, personal non-commercial license, ownership reservation, accounts/guest play, account security, and Apple’s Standard EULA reference for iOS.
- Added virtual-item rules: no cash value, in-game/non-transferable license, consumable versus restorable non-consumable treatment, store billing/refund channels, RevenueCat entitlement handling, and the effect of account deletion on game data and eligible store restoration.
- Added fair-play and acceptable-use rules covering cheating, automation, exploits, score/reward manipulation, invite/gift abuse, impersonation, interference, harm, and unlawful or abusive submitted content.
- Added proportionate enforcement and termination language, a California-limited disclaimer and liability cap with non-waivable-rights carve-outs, and an indemnity limited to third-party claims caused by the user’s unlawful use, breach, or submitted content.
- Added a contact-first dispute path with no mandatory arbitration, a small-claims/consumer-forum carve-out, California governing law, Los Angeles County venue, and an explicit mandatory-consumer-rights carve-out.
- Added change-notice and contact language.

### Account-deletion page

- Updated the canonical and static fallback copy to cover in-app deletion, Google web self-service, and web-form/email requests for Apple, Facebook, and guest accounts.
- Stated the timing precisely: in-app and Google web self-service deletion are immediate; web-form/email requests are completed within 30 days after verification.
- Listed the account, identity, profile, device/session, cloud-save, game, social, fraud, and push-token data removed by successful deletion.
- Explained what may remain: Apple/Google store purchase records and limited DappGo records retained only for tax, accounting, security, fraud, disputes, or legal obligations, followed by deletion or anonymization when the reason ends.
- Kept the existing deletion controls and API endpoints unchanged; the copy now matches their user-facing behavior and avoids asking users to submit passwords, provider tokens, or Apple private keys.

### Implementation and consistency

- Added the Apple Standard EULA link to `number-rpg/legal.js` so the localized `{{appleEula}}` content renders as a real link rather than literal template text.
- Updated the English static fallback text in `privacy/index.html`, `terms/index.html`, and `delete-account/index.html` to match the canonical dynamic content when JavaScript is unavailable.
- Kept the existing page URLs, `data.dappgo.com` API URL, locale order, email address, product/operator names, and effective date consistent.
- Kept this review file under `docs/`; it is not linked from the public legal pages.

## Residual risks requiring lawyer or owner confirmation

- Confirm whether DappGo is subject to the CCPA/CPRA thresholds and which AdMob data flows legally qualify as “sharing.” Confirm whether the current decline/withdrawal controls, device controls, and email route are sufficient for every applicable opt-out requirement, including any required Global Privacy Control handling.
- Confirm the GDPR/UK GDPR territorial scope, controller/independent-controller or processor allocation for each provider, the legal basis for each data flow, any UK representative requirement, and the actual transfer mechanism and supplementary measures for US processing.
- Confirm provider contracts, production settings, retention periods, deletion propagation, and backup expiry for Firebase, AdMob, Meta, RevenueCat, Apple, and Google. The published 14-month analytics and 30-day server-log commitments must remain true operationally.
- Confirm the production data inventory for provider-supplied email, account identifiers, deletion-request email, purchase records, owner-console/audit records, and encrypted backups. The API evidence says provider tokens are not stored and completed deletion scrubs player-linked audit data, but production configuration and operations still need owner verification.
- Confirm the enforceability of the liability cap, indemnity, California-law/Los Angeles-venue language, age provision, and store-refund language for the jurisdictions and consumer audiences served. Obtain native legal review of all translations before relying on them as legal translations.
- Confirm Apple account-deletion/revocation configuration in production and the applicable App Store submission metadata. The API documentation records a warning-only behavior when Apple revocation credentials are absent; this is an operational release risk rather than a copy change.
- Confirm age assurance, parental-consent handling where a local law sets a higher age, and the process for deleting information learned to belong to an under-13 child.

## Verification

- `node --check number-rpg/legal-content.js` — passed.
- Rendered-text comparison — passed for all 12 locales and all three pages; verified rendered text, effective dates, provider placeholders, required copy, and static English fallback coverage.
- `npm run quality` — passed after the legal changes.
- `git diff --check` — passed.
- No commit was created; Claude Code retains commit ownership as requested.
