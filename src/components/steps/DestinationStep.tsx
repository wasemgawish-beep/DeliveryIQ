import type { Destination } from '../../rules/types'

interface Props {
  onAnswer: (destination: Destination) => void
}

interface CardConfig {
  destination: Destination
  // Accessible name must stay exactly this string — tests query buttons by it.
  accessibleName: string
  title: string
  subtitle: string
  banner: string
  badge: string
  card: string
  icon: string
}

const cards: CardConfig[] = [
  {
    destination: 'hospital_bedside',
    accessibleName: 'Hospital bedside',
    title: 'Hospital Bedside / Meds2Beds',
    subtitle: 'Stat delivery to a patient room before discharge',
    banner: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
    card: 'border-emerald-200 hover:border-emerald-400 focus-visible:border-emerald-500 has-[:focus-visible]:ring-emerald-500 hover:bg-emerald-50/60',
    icon: '🛏️',
  },
  {
    destination: 'hospital_dc',
    accessibleName: 'Hospital DC',
    title: 'Hospital DC / Clinic',
    subtitle: 'Discharge pickup or clinic-based courier route',
    banner: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-800 ring-amber-600/20',
    card: 'border-amber-200 hover:border-amber-400 focus-visible:border-amber-500 has-[:focus-visible]:ring-amber-500 hover:bg-amber-50/60',
    icon: '🏥',
  },
  {
    destination: 'patient_home',
    accessibleName: 'Patient home',
    title: 'Patient Home / Mail-out',
    subtitle: 'Ships to the patient\u2019s home address',
    banner: 'bg-indigo-500',
    badge: 'bg-indigo-100 text-indigo-800 ring-indigo-600/20',
    card: 'border-indigo-200 hover:border-indigo-400 focus-visible:border-indigo-500 has-[:focus-visible]:ring-indigo-500 hover:bg-indigo-50/60',
    icon: '📦',
  },
]

export function DestinationStep({ onAnswer }: Props) {
  return (
    <section>
      <h1 className="text-2xl font-medium text-slate-900">Where is this delivery going?</h1>
      <div
        role="group"
        aria-label="Where is this delivery going?"
        className="!grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {cards.map((card) => (
          <button
            key={card.destination}
            type="button"
            aria-label={card.accessibleName}
            onClick={() => onAnswer(card.destination)}
            className={`group relative flex flex-col overflow-hidden rounded-xl border-2 bg-white text-left shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${card.card}`}
          >
            <span className={`h-2 w-full ${card.banner}`} aria-hidden="true" />
            <span className="flex flex-1 flex-col gap-3 p-4">
              <span className="flex items-start justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${card.badge}`}
                >
                  <span aria-hidden="true">{card.icon}</span>
                  {card.accessibleName}
                </span>
                <span
                  className="text-transparent transition-colors duration-150 group-hover:text-slate-400 group-focus-visible:text-slate-400"
                  aria-hidden="true"
                >
                  ✓
                </span>
              </span>
              <span className="text-base font-semibold text-slate-900">{card.title}</span>
              <span className="text-sm text-slate-500">{card.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
