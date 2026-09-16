import { YesNoStep } from './YesNoStep'

interface Props {
  onAnswer: (value: boolean) => void
}

export function RefrigeratedStep({ onAnswer }: Props) {
  return <YesNoStep question="Does this delivery require refrigeration?" onAnswer={onAnswer} />
}
