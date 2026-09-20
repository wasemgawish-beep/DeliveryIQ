import { Wizard } from './components/Wizard'

function App() {
  return (
    <main>
      <header className="-mx-6 -mt-12 mb-8 flex items-center justify-between bg-slate-900 px-6 py-4 sm:px-8">
        <span className="text-lg font-semibold tracking-tight text-white">DeliveryIQ</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300 ring-1 ring-inset ring-sky-400/40">
          CNH Specialty
        </span>
      </header>
      <Wizard />
    </main>
  )
}

export default App
