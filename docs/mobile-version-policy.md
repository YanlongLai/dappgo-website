# Native minimum-version policy

`https://dappgo.com/mobile-version-policy.json` is the anonymous HTTPS policy
for US Stocks, TW Stocks and Options Explorer. The existing GitHub Pages
deployment publishes this file from the website default branch. Schema v1
keys each fixed native application ID and platform independently. The initial
floor is `1.6.0` for all six combinations. Versions at or above their floor
may run; a newer App Store/Play review candidate therefore needs no exception.

The clients verify native installed identity and compare numeric version
components. Unreachable, malformed or missing policy blocks use with Retry.
There is no cached-success/offline bypass. Store links are fixed in each client;
the policy cannot redirect users to another website or install source.
An old installed binary without this gate cannot be remotely blocked by it.

Before increasing a floor, record scoped release authority and verify that the
affected version is available to the intended users on that platform, including
territories, rollout eligibility and store propagation. Approval, upload or a
saved draft alone is not availability. Increase only the applicable app and
platform entry and change `revision`; never couple iOS and Android rollout
timing. A legitimate rollback is a reviewed policy change with a new revision.

Run `node --test scripts/mobile-version-policy.test.cjs` and the three native
client policy suites before promotion. After merge verify Pages' exact commit,
anonymous HTTPS JSON response and all six entries before submitting clients.
Preserve publication evidence and the previous policy for rollback. Do not
change DNS, access controls, billing or credentials to deploy this file.
