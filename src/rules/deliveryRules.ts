import type { Destination } from './types'

/**
 * Source of truth for patient-home delivery routing. Kept as data, not
 * conditionals, so changes to CII/signature routing go through normal
 * code review with a visible diff, independent of UI/app logic changes.
 *
 * signatureRequired is deliberately NOT a column here — it's derived
 * from `cii` in resolveDelivery.ts so the two values can never drift
 * apart on a future edit.
 */
export interface PatientHomeRule {
  refrigerated: boolean
  specialty: boolean
  cii: boolean
  basket: string
  carrier: string
  eta: string
}

export interface ShortcutRule {
  destination: Extract<Destination, 'hospital_bedside' | 'hospital_dc'>
  basket: string
  carrier: string
  eta: string
}

export const PATIENT_HOME_RULES: readonly PatientHomeRule[] = [
  { refrigerated: true, specialty: true, cii: true, basket: 'Blue', carrier: 'UPS Next Day Air Saver', eta: 'End of next business day' },
  { refrigerated: true, specialty: true, cii: false, basket: 'Blue', carrier: 'UPS Next Day Air Saver', eta: 'End of next business day' },
  { refrigerated: true, specialty: false, cii: true, basket: 'Red', carrier: 'UPS Second Day Air', eta: 'End of 2nd business day' },
  { refrigerated: true, specialty: false, cii: false, basket: 'Red', carrier: 'UPS Second Day Air', eta: 'End of 2nd business day' },
  { refrigerated: false, specialty: true, cii: true, basket: 'Tan', carrier: 'UPS Ground', eta: '1-3 business days' },
  { refrigerated: false, specialty: true, cii: false, basket: 'Tan', carrier: 'UPS Ground', eta: '1-3 business days' },
  { refrigerated: false, specialty: false, cii: true, basket: 'Tan', carrier: 'UPS Ground', eta: '1-3 business days' },
  { refrigerated: false, specialty: false, cii: false, basket: 'Green', carrier: 'USPS Ground Advantage', eta: '2-5 business days' },
] as const

export const SHORTCUT_RULES: readonly ShortcutRule[] = [
  { destination: 'hospital_bedside', basket: 'Yellow', carrier: 'Courier (Meds 2 Beds)', eta: 'Same day (typically)' },
  { destination: 'hospital_dc', basket: 'Clear', carrier: 'Courier (Impact DC)', eta: 'Same day (typically)' },
] as const
