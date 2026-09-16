import { useState } from 'react'
import { resolveDelivery } from '../rules/resolveDelivery'
import type { DeliveryResult, Destination } from '../rules/types'
import { CIIStep } from './steps/CIIStep'
import { DestinationStep } from './steps/DestinationStep'
import { RefrigeratedStep } from './steps/RefrigeratedStep'
import { SpecialtyStep } from './steps/SpecialtyStep'
import { ResultScreen } from './ResultScreen'

type Step = 'destination' | 'refrigerated' | 'specialty' | 'cii' | 'result'

interface PatientHomeProgress {
  refrigerated?: boolean
  specialty?: boolean
}

export function Wizard() {
  const [step, setStep] = useState<Step>('destination')
  const [progress, setProgress] = useState<PatientHomeProgress>({})
  const [result, setResult] = useState<DeliveryResult | null>(null)

  function handleDestination(destination: Destination) {
    if (destination === 'patient_home') {
      setProgress({})
      setStep('refrigerated')
      return
    }
    setResult(resolveDelivery({ destination }))
    setStep('result')
  }

  function handleRefrigerated(refrigerated: boolean) {
    setProgress((prev) => ({ ...prev, refrigerated }))
    setStep('specialty')
  }

  function handleSpecialty(specialty: boolean) {
    setProgress((prev) => ({ ...prev, specialty }))
    setStep('cii')
  }

  function handleCii(cii: boolean) {
    if (progress.refrigerated === undefined || progress.specialty === undefined) {
      throw new Error('Reached the CII step without refrigerated/specialty answers')
    }
    setResult(
      resolveDelivery({
        destination: 'patient_home',
        refrigerated: progress.refrigerated,
        specialty: progress.specialty,
        cii,
      }),
    )
    setStep('result')
  }

  function handleRestart() {
    setProgress({})
    setResult(null)
    setStep('destination')
  }

  switch (step) {
    case 'destination':
      return <DestinationStep onAnswer={handleDestination} />
    case 'refrigerated':
      return <RefrigeratedStep onAnswer={handleRefrigerated} />
    case 'specialty':
      return <SpecialtyStep onAnswer={handleSpecialty} />
    case 'cii':
      return <CIIStep onAnswer={handleCii} />
    case 'result':
      if (!result) {
        throw new Error('Reached the result step with no result computed')
      }
      return <ResultScreen result={result} onRestart={handleRestart} />
  }
}
