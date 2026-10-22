# Contract design

R2 producer/consumer boundary: the existing GitHub Pages deployment publishes mobile-version-policy.json. Three native clients consume schemaVersion 1, an operator revision and independent ios/android minimumVersion fields keyed by their fixed application IDs. Strict numeric MAJOR.MINOR.PATCH comparison admits versions greater than or equal to the floor.

No account data, credentials, arbitrary store URLs or remote code are carried. The client uses HTTPS, cache avoidance, bounded time/body size and validation. No cached success unlocks a failed check. Review candidates use the same minimum baseline without a reviewer bypass.

Tests validate the producer against the product catalog and all six entries; consumer tests cover missing or malformed data, native identity, lower/equal/higher versions, network failures, lifecycle and transaction deferral. Deployment must precede the final native gate verification.
