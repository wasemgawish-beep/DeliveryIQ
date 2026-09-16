# Regulatory triggers: DeliveryIQ
- Status: Resolved — confirmed by the Founder (2026-09-16)
- Date raised: 2026-09-16
- Date resolved: 2026-09-16

Per CLAUDE.md Section 10.5: these three questions do not have a universal
answer and were not mine to self-certify. This document raised them and
recorded a recommended reading for each below; the Founder's actual
determination — the binding answer, not my recommendation — is recorded
in the section immediately below. The original recommended-reading record
is kept as-is afterward for history, not overwritten.

## Founder determination (binding)
Confirmed by the Founder:
- **Not SaMD** — routes logistics, not a clinical/diagnostic judgment.
- **No PHI collected** — the wizard takes no patient identifiers.
- **Not information-blocking** — doesn't gate access to health information.

This determination supersedes the "Status: Recommended reading only" lines
in each section below as the actual, binding answer for all three
questions; those sections are retained unedited beneath this one as the
record of what was raised and reasoned through before the Founder signed
off.

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

**Status:** Recommended reading only — not a determination on its own.
Resolved — see "Founder determination (binding)" above.

## PHI / BAA
**Question:** Does DeliveryIQ touch protected health information on behalf
of another party?

**My reading:** No, as scoped. The wizard takes no patient identifiers as
input and returns none as output — its only inputs are destination and
three delivery-attribute booleans. No patient-level data is stored,
displayed, or transmitted by this feature.

**Status:** Recommended reading only — not a determination on its own.
Resolved — see "Founder determination (binding)" above. If a future
revision adds any patient-identifying context (e.g., tying a routing
decision to a specific patient record), this determination must be
revisited and the `clinical-hipaa-safeguards` skill consulted.

## Information blocking
**Question:** Does DeliveryIQ gate, delay, or withhold clinical information
from a clinician or patient?

**My reading:** No. DeliveryIQ is an internal logistics tool used by a
pharmacy liaison to determine how a delivery ships; it does not gate,
delay, or withhold any clinical information from a clinician or patient. It
has no review/approval pipeline in its path (Section 10.2 does not apply
here — DeliveryIQ has no generative AI component at all).

**Status:** Recommended reading only — not a determination on its own.
Resolved — see "Founder determination (binding)" above.

## Related
See `docs/specs/open-questions.md` for the separate, non-regulatory open
question about whether `signatureRequired` should be displayed at all for
the two courier-shortcut routes.
