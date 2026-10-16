# Privacy publication verification

Captured 2026-10-16T15:20Z; verifier: owning session.

- Source commit: `671f8be7823ff94283efaa94cd90cf34f43c768f`.
- Merged PR: https://github.com/YanlongLai/dappgo-website/pull/30 .
- Canonical master: `423d0e735d0332f8e8eab48bcca5294b7f379bf1`.
- Public document: https://dappgo.com/privacy.html . The live document includes the new bilingual, version-scoped Advanced Consent Mode section.
- The `mobile-advanced-consent` section SHA-256 is `0302af736d9adc894e455d3ac8a827f7fdc1f0b202fe4597be80f38bc6570275` in both source and public response after decoding only Cloudflare's reversible email obfuscation. No unrelated markup or whitespace was normalized. Whole-page byte identity is not claimed because Cloudflare transforms email markup.
- The section distinguishes limited Firebase signals from optional detailed custom events, independent ad/ATT choices and withdrawal. No separate old/new-user migration was introduced.

Website implementation, review, merge and public publication are verified. This does not verify either store's privacy questionnaire, any mobile binary, or mobile submission. Those remain owned by the corresponding app work items. GitHub Actions were not run, inspected or counted as passed. No credentials were changed and no server redeployment was performed solely for this evidence.

Rollback: a focused revert of the reviewed privacy change, followed by public-content verification; no rollback was executed.
