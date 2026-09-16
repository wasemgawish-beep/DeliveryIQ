import { YesNoStep } from './YesNoStep'

interface Props {
  onAnswer: (value: boolean) => void
}

export function CIIStep({ onAnswer }: Props) {
  return (
    <YesNoStep
      question="Is this a CII (or otherwise signature-required) medication?"
      onAnswer={onAnswer}
    />
  )
}
