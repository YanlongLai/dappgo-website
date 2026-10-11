# Technical design

Use a small URL-view-state adapter in `news.js`: parse and validate known
parameters at startup, write only known non-default values with
`replaceState`, and reapply on `popstate`. The immutable data pointer and
payload remain unchanged. Remove the header nodes rather than hiding them with
CSS; guard the renderer against their absence. Remove `target=_blank` from
story links so the browser's native history is the return path. Contract tests
assert nav order/labels, no redundant copy, same-tab links, URL state helpers,
and current data/AI contracts.
