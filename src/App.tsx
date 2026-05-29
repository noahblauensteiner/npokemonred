import { useState } from 'react'
import { EncountersPage } from './pages/EncountersPage'
import { BossesPage } from './pages/BossesPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { ItemsPage } from './pages/ItemsPage'

type Tab = 'checklist' | 'encounters' | 'bosses' | 'items'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'checklist', label: 'Checklist', icon: '✓' },
  { id: 'encounters', label: 'Encounters', icon: '⚡' },
  { id: 'bosses', label: 'Gyms', icon: '🏅' },
  { id: 'items', label: 'Items', icon: '🎒' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('checklist')

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col max-w-2xl mx-auto">
      <header className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-red-700 flex-shrink-0" />
          <div>
            <h1 className="font-bold text-slate-100 leading-none text-sm">
              Radical Red Nuzlocke
            </h1>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">v4.1 · Badge 1 Scope</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {tab === 'checklist' && <ChecklistPage />}
        {tab === 'encounters' && <EncountersPage />}
        {tab === 'bosses' && <BossesPage />}
        {tab === 'items' && <ItemsPage />}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-slate-900 border-t border-slate-800 flex">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors ${
              tab === id ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-lg leading-none">{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
