import { useState } from 'react'
import type { AreaEncounters, RomhackEntry } from '../../types'
import { EncounterCard } from './EncounterCard'
import { useRunStore } from '../../hooks/useRunStore'

interface Props {
  area: AreaEncounters
  romhackMap: Record<string, RomhackEntry>
  segmentName: string
}

const METHOD_LABELS: Record<string, string> = {
  grass: 'Grass',
  surf: 'Surf',
  'fishing-old': 'Old Rod',
  'fishing-good': 'Good Rod',
  'fishing-super': 'Super Rod',
  headbutt: 'Headbutt',
  gift: 'Gift',
}

export function AreaEncounterPanel({ area, romhackMap, segmentName }: Props) {
  const [expanded, setExpanded] = useState(true)
  const { capturedByArea } = useRunStore()
  const hasCatch = capturedByArea[area.areaId] != null

  return (
    <section className="mb-4">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-100">{segmentName}</span>
          {hasCatch && <span className="w-2 h-2 rounded-full bg-emerald-400" title="Captured" />}
        </div>
        <span className="text-slate-400 text-sm">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="mt-2 space-y-4">
          {area.methods.map((m) => (
            <div key={m.method}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 mb-2">
                {METHOD_LABELS[m.method] ?? m.method}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {m.pokemon.map((p) => (
                  <EncounterCard
                    key={p.dexId}
                    entry={p}
                    areaId={area.areaId}
                    romhack={romhackMap[String(p.dexId)]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
