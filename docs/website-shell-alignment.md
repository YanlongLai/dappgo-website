# Website shell alignment

Updated: 2026-09-16

The released DappGo visual shell now covers every public HTML page:

- `/` and `/demo.html` keep the current product shell.
- `/options.html` uses the same logo, responsive header, language control,
  theme control, mobile navigation, and legal footer while preserving the
  live report loader and bilingual commentary.
- `/terms.html` and `/support.html` use the same shell and legal content layer.
- `/404.html` uses the same shell with a compact recovery card.

## Shared behaviour

- The current favicon is the single brand mark used by every shell.
- Desktop navigation collapses into the existing menu control at the mobile
  breakpoint.
- Theme preference uses `dappgo-theme`; locale preference accepts both the
  current `dappgo-locale` contract and legacy `dappgo-lang` storage.
- Public report, legal, support, and 404 content remains available without
  JavaScript-dependent navigation.

## Verification contract

Before release, verify every public page at 1440px and 390px widths:

1. Header and footer are present.
2. Main content has no horizontal overflow.
3. The mobile menu opens and closes from the keyboard-accessible button.
4. Options language switching still re-renders the report commentary.
5. Legal/support links resolve to the canonical `.html` routes.
6. The page has no uncaught console errors.

The 2026-09-16 release evidence is recorded in
`artifacts/WEBSITE-SHELL-ALIGN-20260916/EVIDENCE.md`.
