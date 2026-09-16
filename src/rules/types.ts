export type Destination = 'hospital_bedside' | 'hospital_dc' | 'patient_home'

export interface PatientHomeAnswers {
  destination: 'patient_home'
  refrigerated: boolean
  specialty: boolean
  cii: boolean
}

export interface ShortcutAnswers {
  destination: 'hospital_bedside' | 'hospital_dc'
}

export type WizardAnswers = PatientHomeAnswers | ShortcutAnswers

export interface DeliveryResult {
  basket: string
  carrier: string
  eta: string
  /**
   * null = not applicable, by confirmed design (the two courier shortcut
   * routes). Signature is always captured on those routes as standard
   * courier practice, independent of CII/drug, so it doesn't vary and
   * isn't a meaningful field to show. Resolved with the Founder — see
   * docs/specs/open-questions.md.
   */
  signatureRequired: boolean | null
}
