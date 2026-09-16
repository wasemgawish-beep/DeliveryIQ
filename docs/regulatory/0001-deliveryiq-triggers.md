# Regulatory triggers: DeliveryIQ
- Status: Questions raised, pending Human in Charge confirmation
- Date: 2026-09-16

Per CLAUDE.md Section 10.5: these three questions do not have a universal
answer and are not mine to self-certify. This document raises them and
records a recommended reading for each; the feature is not "ready to ship"
until the Human in Charge records an explicit answer to each, independent
of whether the recommended reading looks obviously correct.

## SaMD
**Question:** Could DeliveryIQ's output function the way a physical medical
device's reading would — could it plausibly drive a clinical decision on
its own?

**My reading:** No. DeliveryIQ does not make a clinical or dosing decision;
it routes an already-determined delivery to a basket/carrier/ETA based on
logistics attributes (refrigeration need, specialty handling, CII/
signature requirement) that the liaison self-reports about a delivery that
has already been clinically determined upstream. The tool has no input or
output that represents a diagnosis, a dosing recommendation, or a
treatment decision.

**Status:** Recommended reading only — not a determination. Awaiting
Human in Charge confirmation.

## PHI / BAA
**Question:** Does DeliveryIQ touch protected health information on behalf
of another party?

**My reading:** No, as scoped. The wizard takes no patient identifiers as
input and returns none as output — its only inputs are destination and
three delivery-attribute booleans. No patient-level data is stored,
displayed, or transmitted by this feature.

**Status:** Recommended reading only — not a determination. Awaiting
Human in Charge confirmation. If a future revision adds any patient-
identifying context (e.g., tying a routing decision to a specific patient
record), this determination must be revisited and the
`clinical-hipaa-safeguards` skill consulted.

## Information blocking
**Question:** Does DeliveryIQ gate, delay, or withhold clinical information
from a clinician or patient?

**My reading:** No. DeliveryIQ is an internal logistics tool used by a
pharmacy liaison to determine how a delivery ships; it does not gate,
delay, or withhold any clinical information from a clinician or patient. It
has no review/approval pipeline in its path (Section 10.2 does not apply
here — DeliveryIQ has no generative AI component at all).

**Status:** Recommended reading only — not a determination. Awaiting
Human in Charge confirmation.

## Related
See `docs/specs/open-questions.md` for the separate, non-regulatory open
question about whether `signatureRequired` should be displayed at all for
the two courier-shortcut routes.
