import { describe, expect, it } from 'vitest'
import { PATIENT_HOME_RULES, SHORTCUT_RULES } from '../src/rules/deliveryRules'
import { resolveDelivery } from '../src/rules/resolveDelivery'
import type { WizardAnswers } from '../src/rules/types'

const BOOLS = [true, false] as const

describe('resolveDelivery — patient-home rows (all 8 valid combinations)', () => {
  it.each([
    [true, true, true, 'Blue', 'UPS Next Day Air Saver', 'End of next business day', true],
    [true, true, false, 'Blue', 'UPS Next Day Air Saver', 'End of next business day', false],
    [true, false, true, 'Red', 'UPS Second Day Air', 'End of 2nd business day', true],
    [true, false, false, 'Red', 'UPS Second Day Air', 'End of 2nd business day', false],
    [false, true, true, 'Tan', 'UPS Ground', '1-3 business days', true],
    [false, true, false, 'Tan', 'UPS Ground', '1-3 business days', false],
    [false, false, true, 'Tan', 'UPS Ground', '1-3 business days', true],
    [false, false, false, 'Green', 'USPS Ground Advantage', '2-5 business days', false],
  ] as const)(
    'refrigerated=%s specialty=%s cii=%s -> %s / %s / %s / signature=%s',
    (refrigerated, specialty, cii, basket, carrier, eta, signatureRequired) => {
      const result = resolveDelivery({ destination: 'patient_home', refrigerated, specialty, cii })
      expect(result).toEqual({ basket, carrier, eta, signatureRequired })
    },
  )
})

describe('resolveDelivery — destination shortcuts (2 valid rows)', () => {
  it('hospital bedside -> Yellow / Courier (Meds 2 Beds) / same day, signature not applicable', () => {
    const result = resolveDelivery({ destination: 'hospital_bedside' })
    expect(result).toEqual({
      basket: 'Yellow',
      carrier: 'Courier (Meds 2 Beds)',
      eta: 'Same day (typically)',
      signatureRequired: null,
    })
  })

  it('hospital DC -> Clear / Courier (Impact DC) / same day, signature not applicable', () => {
    const result = resolveDelivery({ destination: 'hospital_dc' })
    expect(result).toEqual({
      basket: 'Clear',
      carrier: 'Courier (Impact DC)',
      eta: 'Same day (typically)',
      signatureRequired: null,
    })
  })
})

describe('rules table exhaustiveness (clinical-schema-integrity)', () => {
  it('every combination of refrigerated x specialty x cii resolves to exactly one rule — no gaps, no ambiguous matches', () => {
    for (const refrigerated of BOOLS) {
      for (const specialty of BOOLS) {
        for (const cii of BOOLS) {
          const matches = PATIENT_HOME_RULES.filter(
            (r) => r.refrigerated === refrigerated && r.specialty === specialty && r.cii === cii,
          )
          expect(matches, `refrigerated=${refrigerated} specialty=${specialty} cii=${cii}`).toHaveLength(1)
        }
      }
    }
  })

  it('the patient-home table has exactly 8 rows and the shortcut table has exactly 2 (10 valid combinations total)', () => {
    expect(PATIENT_HOME_RULES).toHaveLength(8)
    expect(SHORTCUT_RULES).toHaveLength(2)
  })
})

describe('resolveDelivery — unmatched input fails loudly', () => {
  it('throws rather than silently defaulting when destination is outside the valid set', () => {
    const invalidAnswers = { destination: 'warehouse' } as unknown as WizardAnswers
    expect(() => resolveDelivery(invalidAnswers)).toThrow(/No delivery rule matched/)
  })
})
