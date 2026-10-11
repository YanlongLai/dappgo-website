# Product requirements

- Remove redundant `UNH · United States market` style header metadata and the
  explanatory source/date sentence from US and TW News pages.
- Use `US` and `TW` as stable market labels, with US first in both editions.
- Keep reader context (`stock`, `range`, `q`, `lang`) in the page URL via
  `history.replaceState`. Open article sources in the current tab; browser Back
  must reload the same context. Do not create a history entry for every filter
  click.
- Preserve source/date metadata inside each story and preserve all existing
  data, AI-card, locale, image and responsive behavior.
