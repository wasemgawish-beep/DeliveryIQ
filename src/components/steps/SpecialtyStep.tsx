import { YesNoStep } from './YesNoStep'

interface Props {
  onAnswer: (value: boolean) => void
}

export function SpecialtyStep({ onAnswer }: Props) {
  return <YesNoStep question="Is this a specialty medication?" onAnswer={onAnswer} />
}
