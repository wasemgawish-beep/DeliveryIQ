interface Props {
  question: string
  onAnswer: (value: boolean) => void
}

export function YesNoStep({ question, onAnswer }: Props) {
  return (
    <section>
      <h1>{question}</h1>
      <div role="group" aria-label={question}>
        <button type="button" onClick={() => onAnswer(true)}>
          Yes
        </button>
        <button type="button" onClick={() => onAnswer(false)}>
          No
        </button>
      </div>
    </section>
  )
}
