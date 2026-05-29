import type { ChecklistEntry } from '../../types'
import { runStore } from '../../store/runStore'
import { useRunStore } from '../../hooks/useRunStore'

interface Props {
  entries: ChecklistEntry[]
  showOptional: boolean
}

export function ChecklistSection({ entries, showOptional }: Props) {
  const { completedIds } = useRunStore()

  const visible = entries.filter((e) => e.group === 'story' || showOptional)
  const storyEntries = visible.filter((e) => e.group === 'story')
  const optionalEntries = visible.filter((e) => e.group === 'optional')

  const doneCount = visible.filter((e) => completedIds.includes(e.id)).length

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-slate-500">
          {doneCount} / {visible.length} complete
        </span>
        <div className="h-1.5 flex-1 mx-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: visible.length ? `${(doneCount / visible.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      <div className="space-y-1">
        {storyEntries.map((e) => (
          <ChecklistRow key={e.id} entry={e} checked={completedIds.includes(e.id)} />
        ))}

        {optionalEntries.length > 0 && (
          <>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2 pb-1 px-1">
              Optional
            </p>
            {optionalEntries.map((e) => (
              <ChecklistRow key={e.id} entry={e} checked={completedIds.includes(e.id)} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function ChecklistRow({ entry, checked }: { entry: ChecklistEntry; checked: boolean }) {
  return (
    <button
      onClick={() => runStore.toggleComplete(entry.id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
        checked ? 'bg-emerald-950/40 border border-emerald-800' : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'
      }`}
    >
      <div
        className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center ${
          checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'
        }`}
      >
        {checked && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
      </div>
      <span className={`text-sm ${checked ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
        {entry.label}
      </span>
      {entry.group === 'optional' && (
        <span className="ml-auto text-[10px] text-slate-500 flex-shrink-0">optional</span>
      )}
    </button>
  )
}
