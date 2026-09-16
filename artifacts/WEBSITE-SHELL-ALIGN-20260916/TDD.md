# Technical design

The existing `assets/demo/demo.css` remains the source of truth for the site
header, footer, colour tokens, typography, theme tokens, focus treatment, and
responsive menu layout.

`assets/demo/legal.css` supplies the page-specific legal/support content layer.
`assets/demo/page-shell.css` adapts the legacy Options report variables to the
new token names and styles the report note and 404 recovery card.

Options retains its report-specific inline CSS and loader, but now maps locale
storage to both `dappgo-locale` and the legacy `dappgo-lang` key. Terms,
Support, and 404 use small inline shell controllers for theme, locale,
responsive navigation, and cross-tab preference updates.

## Safety boundaries

- No secrets, user data, or external form submissions are introduced.
- External report fetching remains unchanged.
- Existing legal copy and page-specific links are preserved.
- The canonical checkout's unrelated user change remains untouched.
