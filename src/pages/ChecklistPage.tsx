import { useState } from 'react'
import checklistRaw from '../data/checklist.json'
import type { ChecklistEntry } from '../types'
import { ChecklistSection } from '../components/checklist/ChecklistSection'
import { XpCard } from '../components/ui/XpCard'
import { runStore } from '../store/runStore'

const checklist = (checklistRaw as ChecklistEntry[]).sort((a, b) => a.order - b.order)

export function ChecklistPage() {
  const [showOptional, setShowOptional] = useState(false)

  return (
    <div className="py-4">
      <XpCard />

      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quest Log</h2>
        <button
          onClick={() => setShowOptional((p) => !p)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            showOptional
              ? 'bg-slate-600 border-slate-500 text-slate-200'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
        >
          {showOptional ? 'Hide optional' : 'Show optional'}
        </button>
      </div>

      <div className="px-3">
        <ChecklistSection entries={checklist} showOptional={showOptional} />
      </div>

      <div className="mt-8 pt-4 mx-4 border-t border-slate-800">
        <button
          onClick={() => {
            if (window.confirm('Reset your entire run? This cannot be undone.')) {
              runStore.resetRun()
            }
          }}
          className="text-xs text-red-500 hover:text-red-400 underline"
        >
          Reset run
        </button>
      </div>
    </div>
  )
}
