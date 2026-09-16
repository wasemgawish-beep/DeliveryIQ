import type { Destination } from '../../rules/types'

interface Props {
  onAnswer: (destination: Destination) => void
}

export function DestinationStep({ onAnswer }: Props) {
  return (
    <section>
      <h1>Where is this delivery going?</h1>
      <div role="group" aria-label="Where is this delivery going?">
        <button type="button" onClick={() => onAnswer('hospital_bedside')}>
          Hospital bedside
        </button>
        <button type="button" onClick={() => onAnswer('hospital_dc')}>
          Hospital DC
        </button>
        <button type="button" onClick={() => onAnswer('patient_home')}>
          Patient home
        </button>
      </div>
    </section>
  )
}
