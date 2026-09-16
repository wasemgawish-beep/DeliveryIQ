# DeliveryIQ

A guided delivery-routing wizard for hospital-site pharmacy liaisons.
Answer four questions — destination, refrigerated, specialty, CII/
signature-required — and get the correct delivery basket, carrier,
estimated delivery timeframe, and whether signature capture is required.

Ships as a standalone tool intended to eventually replace the previous
"Delivery" tool on the Clinical Aid hub — the hub swap is a deferred
manual step, not part of this release (see
`docs/specs/deliveryiq-wizard-spec.md`). See
`docs/adr/0001-deterministic-rules-table-wizard.md` for why this is a
deterministic lookup rather than a drug-database lookup, and
`docs/specs/open-questions.md` for a resolved question about
signature-required display on the courier shortcut routes.

> **Clinical-framing note:** resolved — the Founder ran the app locally
> (`npm run dev`) and reviewed the liaison-facing wording (e.g.
> "Specialty," "CII / signature required") directly in the wizard.
> Confirmed accurate as-is; no changes needed.

## How a liaison uses it
1. Open the wizard and answer **Where is this delivery going?**
   - **Hospital bedside** or **Hospital DC** → you'll see the result
     immediately; no further questions.
   - **Patient home** → answer three more yes/no questions in order:
     refrigeration required, specialty medication, CII/signature-required.
2. The result screen shows the basket color, carrier, and estimated
   delivery window. For patient-home deliveries it also shows whether
   signature capture is required.
3. Click **Start over** to route another delivery.

## Development

```bash
npm install
npm run dev         # local dev server
npm run typecheck   # tsc project build, no emit
npm test            # vitest — unit + integration suite
npm run build        # production build to dist/
```

CI (`.github/workflows/ci.yml`) runs typecheck, tests, and build on every
push to `main` and on every pull request.

## Rules table
`src/rules/deliveryRules.ts` is the source of truth for routing outcomes,
kept deliberately separate from UI/route logic so changes to it (which can
carry CII/compliance weight) are reviewable in isolation with their own git
history. There is currently no admin UI for editing it — changes go
through normal code review, by design (see ADR-0001).
