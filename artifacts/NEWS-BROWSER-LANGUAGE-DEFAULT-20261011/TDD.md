# Technical design

Use the browser's ordered `navigator.languages` list, falling back to
`navigator.language`, and classify a value beginning with `zh` as Chinese.
The US page resolves language in this order: valid URL `lang`, saved manual
choice, browser locale, then English. The TW page uses valid URL `lang`, saved
manual choice, then its existing Chinese default. Replace the root static
redirect with a small non-blocking inline redirect to `/us/`; the reader
chooses the language after load without adding a second data source.

Contract tests cover the root destination, locale detection hooks and
precedence. Existing News reader and data tests remain required.
