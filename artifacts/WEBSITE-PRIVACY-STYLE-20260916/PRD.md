# PRD — Privacy visual-system alignment

## Outcome

Make `privacy.html` feel native to the current DappGo website while keeping the privacy policy's latest approved wording and public URL intact.

## Scope

- Replace the legacy navigation shell with the released DappGo header pattern.
- Add the released typography and visual tokens through the existing `demo.css` plus a privacy-specific override layer.
- Recompose the policy introduction as a restrained trust-oriented hero and readable legal content column.
- Replace the legacy footer with the released wordmark footer.
- Keep bilingual content, theme behavior, route links, metadata, and legal disclosures intact.

## Exclusions

- No changes to the meaning of the privacy policy, data practices, consent, analytics, advertising, or retention.
- No new JavaScript dependency, network provider, tracking call, form, or external mutation.
- No changes to `terms.html`, product apps, or the canonical worktree's uncommitted file.

## Acceptance matrix

| ID | Criterion | Status | Evidence | Next action |
| --- | --- | --- | --- | --- |
| P-01 | Shared DappGo header and footer render on Privacy | pending | local browser capture | Run local visual QA |
| P-02 | Latest legal copy is preserved | verified-in-progress | canonical diff reviewed before styling | Compare exact tracked substitutions |
| P-03 | Locale and theme controls remain functional | pending | browser interaction checks | Test EN/繁中 and light/dark |
| P-04 | Mobile layout is readable and overflow-free | pending | mobile browser metrics | Test 390px viewport |
| P-05 | Static and live Pages checks pass | pending | command and curl output | Run pre/post-promotion checks |

## Risks and rollback

- Risk: legacy inline rules could override shared styles. Mitigation: load the shared stylesheet after legacy rules and use a scoped legal override layer.
- Risk: legal copy drift while integrating the dirty canonical file. Mitigation: compare the exact 35-line substitution set and run content assertions.
- Rollback: revert the focused privacy-style commit; the prior merged homepage release remains the baseline.
