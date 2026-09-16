# TDD — Privacy visual-system alignment

## Implementation design

- `privacy.html` retains its static legal sections and adds the shared DappGo header/footer structure.
- `assets/demo/demo.css` supplies the same Space Grotesk font, color tokens, controls, responsive header, and wordmark footer as the homepage.
- `assets/demo/legal.css` scopes layout and typography to `.legal-page`, neutralizes legacy generic `nav` / `main` / `footer` rules, and provides mobile and reduced-motion behavior.
- The existing inline script is updated to read and write `dappgo-locale` with backward-compatible `dappgo-lang` fallback, preserve `dappgo-theme`, and manage the mobile menu.

## Verification cases

1. Parse the HTML and check for missing closing tags / invalid markup with the repository's available validator.
2. Run `git diff --check` and content assertions for the current date, Options Explorer disclosures, UMP, AdMob, and `Yenlung Lai`.
3. Run the existing homepage test suite to ensure the shared stylesheet and homepage behavior are not regressed.
4. In a local browser at desktop and 390px widths, inspect computed font, shared header/footer classes, no horizontal overflow, and no console errors.
5. Toggle language and theme; assert the document language, visible copy, storage keys, and menu state.
6. After promotion, check `/privacy`, `/privacy.html`, the shared CSS, and the favicon over HTTPS, then repeat a live browser smoke check.

## Failure routing

- If a deterministic test fails while the scope and dependency boundary remain correct, return to `hypothesis`, record the root cause, and add a discriminating check before changing code.
- If a failure reveals that the existing page structure or route boundary is wrong, return to `decomposition`, update this design record, and start a bounded revision.
