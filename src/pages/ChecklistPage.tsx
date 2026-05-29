import { useState } from 'react'
import checklistRaw from '../data/checklist.json'
import type { ChecklistEntry } from '../types'
import { ChecklistSection } from '../components/checklist/ChecklistSection'
import { runStore } from '../store/runStore'

const checklist = (checklistRaw as ChecklistEntry[]).sort((a, b) => a.order - b.order)

export function ChecklistPage() {
  const [showOptional, setShowOptional] = useState(false)

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-100">Run Checklist</h2>
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

      <ChecklistSection entries={checklist} showOptional={showOptional} />

      <div className="mt-8 pt-4 border-t border-slate-800">
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
