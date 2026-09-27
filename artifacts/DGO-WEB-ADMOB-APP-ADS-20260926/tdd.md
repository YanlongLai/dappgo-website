# TDD — AdMob publisher authorization file

## Hypothesis

AdMob's app verification is blocked because the Play listing has no developer website and the required root-level `app-ads.txt` is absent at `dappgo.com`.

## Change

Publish only the exact Google-provided publisher line at `/app-ads.txt`; do not modify unrelated site content.

## Verification

1. Before release, verify the file is a single plain-text line with no placeholder or additional publisher.
2. After site deployment, require HTTP 200 over HTTPS and byte-for-byte expected line (allowing one final newline).
3. Re-run AdMob's in-console app-ads check and record the result.
4. Treat AdMob readiness review and app-level request recovery as separate later observations.

## Rollback

If the publisher line is rejected or domain ownership is disputed, remove the file through a reviewed revert and do not add guessed entries. The Play Console website field remains Owner-controlled and should only be reverted with an explicit decision.
