import { PATIENT_HOME_RULES, SHORTCUT_RULES } from './deliveryRules'
import type { DeliveryResult, WizardAnswers } from './types'

/**
 * Resolves wizard answers to exactly one delivery routing result.
 * Throws rather than falling back to a default when no rule matches —
 * a missing rule must fail loudly, not produce a plausible-looking
 * wrong answer.
 */
export function resolveDelivery(answers: WizardAnswers): DeliveryResult {
  if (answers.destination !== 'patient_home') {
    const rule = SHORTCUT_RULES.find((r) => r.destination === answers.destination)
    if (!rule) {
      throw new Error(`No delivery rule matched destination "${answers.destination}"`)
    }
    return {
      basket: rule.basket,
      carrier: rule.carrier,
      eta: rule.eta,
      // Resolved with the Founder: signature is always captured on these
      // courier routes as standard practice, independent of CII/drug, so
      // it doesn't vary and isn't a meaningful field for the liaison to
      // see. null, not true/false: it's intentionally not displayed
      // rather than confirmed one way or the other for display purposes.
      // See docs/specs/open-questions.md.
      signatureRequired: null,
    }
  }

  const { refrigerated, specialty, cii } = answers
  const rule = PATIENT_HOME_RULES.find(
    (r) => r.refrigerated === refrigerated && r.specialty === specialty && r.cii === cii,
  )
  if (!rule) {
    throw new Error(
      `No delivery rule matched refrigerated=${refrigerated}, specialty=${specialty}, cii=${cii}`,
    )
  }
  return {
    basket: rule.basket,
    carrier: rule.carrier,
    eta: rule.eta,
    signatureRequired: cii,
  }
}
