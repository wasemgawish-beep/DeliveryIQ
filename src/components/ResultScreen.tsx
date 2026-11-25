import type { DeliveryResult } from '../rules/types'

interface Props {
  result: DeliveryResult
  onRestart: () => void
}

export function ResultScreen({ result, onRestart }: Props) {
  return (
    <section>
      <h1>Delivery routing</h1>
      <dl>
        <dt>Basket</dt>
        <dd>{result.basket}</dd>
        <dt>Shipping Method</dt>
        <dd>{result.carrier}</dd>
        <dt>Estimated delivery</dt>
        <dd>{result.eta}</dd>
        {result.signatureRequired !== null && (
          <>
            <dt>Signature required</dt>
            <dd>{result.signatureRequired ? 'Yes' : 'No'}</dd>
          </>
        )}
      </dl>
      <button type="button" onClick={onRestart}>
        Start over
      </button>
    </section>
  )
}
