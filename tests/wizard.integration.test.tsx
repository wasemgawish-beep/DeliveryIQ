import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Wizard } from '../src/components/Wizard'

async function click(user: ReturnType<typeof userEvent.setup>, name: string) {
  await user.click(screen.getByRole('button', { name }))
}

describe('Wizard — destination shortcuts skip the other three questions', () => {
  it('hospital bedside resolves directly to a result screen', async () => {
    const user = userEvent.setup()
    render(<Wizard />)
    await click(user, 'Hospital bedside')

    expect(await screen.findByRole('heading', { name: 'Delivery routing' })).toBeInTheDocument()
    expect(screen.getByText('Yellow')).toBeInTheDocument()
    expect(screen.getByText('Shipping Method')).toBeInTheDocument()
    expect(screen.queryByText('Carrier')).not.toBeInTheDocument()
    expect(screen.getByText('Courier (Meds 2 Beds)')).toBeInTheDocument()
    expect(screen.getByText('Same day (typically)')).toBeInTheDocument()
    // Signature is always captured on courier routes by standard practice
    // (confirmed with the Founder) and doesn't vary, so it's intentionally
    // not rendered here — see docs/specs/open-questions.md.
    expect(screen.queryByText('Signature required')).not.toBeInTheDocument()
  })

  it('hospital DC resolves directly to a result screen', async () => {
    const user = userEvent.setup()
    render(<Wizard />)
    await click(user, 'Hospital DC')

    expect(await screen.findByRole('heading', { name: 'Delivery routing' })).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Courier (Impact DC)')).toBeInTheDocument()
    expect(screen.queryByText('Signature required')).not.toBeInTheDocument()
  })
})

describe('Wizard — all 8 patient-home paths resolve to a result screen', () => {
  const paths = [
    { refrigerated: true, specialty: true, cii: true, basket: 'Blue' },
    { refrigerated: true, specialty: true, cii: false, basket: 'Blue' },
    { refrigerated: true, specialty: false, cii: true, basket: 'Red' },
    { refrigerated: true, specialty: false, cii: false, basket: 'Red' },
    { refrigerated: false, specialty: true, cii: true, basket: 'Tan' },
    { refrigerated: false, specialty: true, cii: false, basket: 'Tan' },
    { refrigerated: false, specialty: false, cii: true, basket: 'Tan' },
    { refrigerated: false, specialty: false, cii: false, basket: 'Green' },
  ] as const

  it.each(paths)(
    'refrigerated=$refrigerated specialty=$specialty cii=$cii -> $basket',
    async ({ refrigerated, specialty, cii, basket }) => {
      const user = userEvent.setup()
      render(<Wizard />)

      await click(user, 'Patient home')
      await click(user, refrigerated ? 'Yes' : 'No')
      await click(user, specialty ? 'Yes' : 'No')
      await click(user, cii ? 'Yes' : 'No')

      expect(await screen.findByRole('heading', { name: 'Delivery routing' })).toBeInTheDocument()
      expect(screen.getByText(basket)).toBeInTheDocument()
      expect(screen.getByText('Signature required')).toBeInTheDocument()
      expect(screen.getByText(cii ? 'Yes' : 'No')).toBeInTheDocument()
    },
  )
})

describe('Wizard — restart', () => {
  it('Start over returns to the destination question with no leftover state', async () => {
    const user = userEvent.setup()
    render(<Wizard />)

    await click(user, 'Hospital bedside')
    await screen.findByRole('heading', { name: 'Delivery routing' })
    await click(user, 'Start over')

    expect(screen.getByRole('heading', { name: 'Where is this delivery going?' })).toBeInTheDocument()
  })
})
