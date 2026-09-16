# Requirements grill

## User outcome

Apply the released DappGo website shell to public pages that were still using
the older layout, without removing their page-specific information or
functional behaviour.

## Scope

- Options report page
- Terms page
- Support page
- 404 page
- Shared shell extension CSS and release evidence

## Explicit non-goals

- No rewrite of legal wording or report data contracts.
- No change to the private/demo-only route policy.
- No modification of the pre-existing uncommitted `privacy.html` change in the
  canonical checkout.

## Failure questions

- Does a legacy selector override the new header or footer?
- Does 390px content overflow horizontally?
- Does the Options report loader still render after shell changes?
- Do locale and theme preferences remain compatible with existing pages?
- Can a user recover from 404 without relying on browser history?
