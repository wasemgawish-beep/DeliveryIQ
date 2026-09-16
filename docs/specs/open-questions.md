# Open questions: DeliveryIQ

## Signature-required display on the two destination-shortcut rows
**Status: Resolved (2026-09-16) — confirmed with the Founder.**

For the hospital-bedside and hospital-DC courier rows, it was not
originally confirmed whether `signatureRequired` should be displayed at
all, or whether it's not applicable to those in-person courier deliveries.

**Original build assumption (superseded below):** not applicable / not
displayed, implemented as `signatureRequired: null` — see the "Resolution"
section for what this means now that it's confirmed rather than assumed.

**Needs confirmation from:** the Founder, per the original build brief.

### Resolution
Confirmed with the Founder: the two courier shortcut routes (Meds 2 Beds,
Impact DC) always capture a signature as standard courier practice,
regardless of the drug being delivered. This holds independent of CII
status and doesn't vary by delivery — it's a constant fact about the
courier workflow, not a per-delivery decision. Because it never varies,
it isn't a meaningful field for the liaison to see on these two routes,
and CII does not need to be asked on the shortcut paths (it already
wasn't, per the original wizard-flow design in ADR-0001).

**What changed in code:** `signatureRequired` for the two shortcut rows
stays `null` in `resolveDelivery.ts`, and `ResultScreen.tsx` still doesn't
render a signature line for them — the runtime behavior is unchanged. Only
the meaning of `null` changed: it now reads "not applicable, by confirmed
design" rather than "not yet confirmed." Comments in `types.ts` and
`resolveDelivery.ts` were updated accordingly so a future reader doesn't
mistake this for an open item.

**No wizard-flow change needed:** the shortcut paths already skip the
refrigerated/specialty/CII questions entirely (ADR-0001's destination-
shortcut design), so nothing further to change there.
