# Spec: DeliveryIQ delivery-routing wizard

## Objective
Give hospital-site pharmacy liaisons a guided, 4-question wizard that
deterministically returns the correct delivery basket, carrier, estimated
delivery timeframe, and whether signature capture is required. This ships
as a standalone tool intended to eventually replace the existing
"Delivery" tool on the Clinical Aid hub — the hub swap itself is a
deferred manual step, not part of this release (see Out of scope below).
See ADR-0001 for why this is a deterministic lookup rather than a
drug-database lookup.

## Requirements
- Ask destination first: hospital bedside, hospital DC, or patient home.
- If hospital bedside or hospital DC: resolve immediately via the
  2-row shortcut table, skipping the other three questions.
- If patient home: ask refrigerated → specialty → CII/signature-required,
  in that order, and resolve via the 8-row patient-home table.
- Display basket, carrier, and ETA on every result. Display
  signature-required only when it has a defined value — not applicable on
  the two courier shortcut routes, by confirmed design (see Open
  Questions).
- The rules table (`src/rules/deliveryRules.ts`) is the single source of
  truth, kept separate from UI/route logic, with `signatureRequired` on
  patient-home rows derived from `cii` at lookup time (not a stored column)
  so the two values cannot drift apart on a future edit.
- An input combination outside the valid set must throw, not silently
  resolve to a default.

## Out of scope
- Drug-name or NDC-level lookup; a drug attribute reference database.
- An admin UI for editing the rules table — changes go through normal code
  review.
- A redirect from the old Delivery tool — no external links to it were
  ever shared.
- Actually wiring the Clinical Aid hub's tool list to this new module — no
  hub codebase exists in this build environment; this is a standalone
  build for now (see ADR-0002).

## Acceptance criteria
- [x] All 8 patient-home input combinations resolve to the exact basket/
      carrier/ETA/signature values in the rules table.
- [x] Both destination shortcuts resolve to the exact basket/carrier/ETA
      in the shortcut table.
- [x] Every reachable path through the wizard UI ends on a rendered result
      screen — no dead end, no unmatched-state error surfaced to the
      liaison.
- [x] An out-of-domain input to the resolver throws rather than defaulting.
- [x] Basket color is displayed on the result screen alongside carrier and
      ETA (confirmed requirement).
- [x] Whether `signatureRequired` should display at all for the two
      courier-shortcut rows — resolved with the Founder: it's always true
      by standard courier practice and doesn't vary, so it's intentionally
      not displayed. See Open Questions below.

## Test plan
- **Unit** (`tests/resolveDelivery.test.ts`): all 8 patient-home
  combinations and both shortcut rows assert exact output values;
  exhaustiveness test iterates the full refrigerated × specialty × cii
  boolean space and asserts exactly one matching rule per point (no gaps,
  no ambiguous multi-match); negative test passes an out-of-domain
  destination (via type cast, since the type system otherwise prevents it)
  and asserts `resolveDelivery` throws rather than defaulting.
- **Integration** (`tests/wizard.integration.test.tsx`): walks all 10 valid
  UI paths (8 patient-home + 2 shortcuts) via React Testing Library +
  user-event, asserting each lands on the result screen with correct
  displayed values; asserts "Start over" returns to the destination
  question with no leftover state.
- **No external dependency** in this feature, so no failure-path/fallback
  testing beyond the unmatched-input case applies (confirmed — no payer
  API, EHR, or courier API calls exist in this scope).

## Open questions
See `docs/specs/open-questions.md`.
