# ADR-0001: Deterministic 4-input wizard over a version-controlled rules table
- Status: Accepted
- Date: 2026-09-16

## Decision
DeliveryIQ resolves delivery routing (basket, carrier, ETA, signature
requirement) from four self-reported inputs — destination, refrigerated,
specialty, CII/signature-required — looked up against a small,
version-controlled rules table. There is no drug-name or NDC-level lookup:
the liaison reports the delivery's attributes directly rather than the
system inferring them from a specific medication.

## Context
The old "Delivery" tool on the Clinical Aid hub is being replaced. The
routing decision is fully enumerable: 3 destination values, where
"patient home" further branches on 3 booleans, for exactly 10 valid input
combinations total, each mapping to one unambiguous outcome. CII/signature
routing carries compliance weight, so the mapping needs a visible,
reviewable change history independent of general application changes.

## Alternatives considered
- **Drug-name lookup against a maintained drug attribute database** — would
  require building and maintaining a drug attribute reference (refrigeration
  need, specialty status, CII schedule) as a separate system of record.
  Rejected as unnecessary complexity once attributes-as-input became viable;
  the liaison already knows these attributes for the delivery in front of
  them.
- **Rules hardcoded directly in UI/route logic** — would work, but change
  history would be entangled with unrelated app changes, and reviewing a
  rules change would mean reading conditionals rather than a table. Rejected
  because separating rules from app logic is near-zero cost here and
  preserves an auditable change history for a table with CII/compliance
  weight.
- **Standalone app outside Clinical Aid** — rejected: no infrastructure
  benefit, and this replaces an existing hub-listed tool rather than
  introducing a new one.

## Rationale
This is a fully enumerable, bounded decision table. Deterministic logic is
strictly better than any form of inference here: it's reproducible,
auditable, and fails loudly (a missing rule throws) instead of failing
confidently (a plausible-sounding wrong answer). See ADR-0002 for the
runtime consequence of this: zero generative AI anywhere in this path.

## Consequences
- Adding or changing a routing outcome means editing `src/rules/
  deliveryRules.ts` and its test coverage — a small, reviewable diff with
  full git history, not an app deploy that also touches UI logic.
- The rules table is exhaustively tested: every point in the input space is
  asserted to resolve to exactly one rule (see
  `tests/resolveDelivery.test.ts`), and out-of-domain input is asserted to
  throw rather than silently default (see clinical-schema-integrity
  guidance).
- No PHI is captured as input or output — the wizard takes no patient
  identifiers — so this ADR does not by itself trigger the
  `clinical-hipaa-safeguards` skill. See `docs/regulatory/
  0001-deliveryiq-triggers.md` for the full regulatory-trigger checklist.
- Out of scope by this decision, not silently dropped: any drug-name/NDC
  lookup, a drug attribute reference database, and an admin UI for editing
  the rules table (changes go through normal code review for now).
