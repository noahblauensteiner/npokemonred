import type { EncounterEntry, RomhackEntry } from '../../types'
import { SpriteImg } from '../ui/SpriteImg'
import { TypeBadge } from '../ui/TypeBadge'
import { StatBar } from '../ui/StatBar'
import { runStore } from '../../store/runStore'
import { useRunStore } from '../../hooks/useRunStore'

interface Props {
  entry: EncounterEntry
  areaId: string
  romhack?: RomhackEntry
}

export function EncounterCard({ entry, areaId, romhack }: Props) {
  const { capturedByArea, deadDexIds } = useRunStore()
  const captured = capturedByArea[areaId]
  const isThisCapture = captured === entry.dexId
  const isDead = deadDexIds.includes(entry.dexId)

  return (
    <div
      className={`rounded-xl border p-3 transition-colors ${
        isDead
          ? 'border-red-900 bg-red-950/40 opacity-60'
          : isThisCapture
          ? 'border-emerald-600 bg-emerald-950/40'
          : 'border-slate-700 bg-slate-900'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <SpriteImg dexId={entry.dexId} name={entry.name} size={56} />
          {isDead && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded">
              <span className="text-red-400 text-lg font-bold">✕</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-100">{entry.name}</span>
            <span className="text-[10px] text-slate-500">#{String(entry.dexId).padStart(3, '0')}</span>
          </div>

          <div className="flex gap-1 mt-1 flex-wrap">
            {(romhack?.types ?? []).map((t) => (
              <TypeBadge key={t} type={t} small />
            ))}
          </div>

          <div className="text-xs text-slate-400 mt-1">
            Lv {entry.minLevel}–{entry.maxLevel}
            {entry.rate ? ` · ${entry.rate}%` : ''}
          </div>

          {romhack && !romhack.noChanges && (
            <div className="text-[10px] text-amber-400 mt-1 italic">{romhack.strategyTip}</div>
          )}
        </div>

        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={() => runStore.setCaptured(areaId, isThisCapture ? null : entry.dexId)}
            className={`px-2 py-1 text-[10px] rounded font-bold transition-colors ${
              isThisCapture
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {isThisCapture ? 'Caught ✓' : 'Catch'}
          </button>
          {isThisCapture && (
            <button
              onClick={() => runStore.toggleDead(entry.dexId)}
              className={`px-2 py-1 text-[10px] rounded font-bold transition-colors ${
                isDead ? 'bg-red-700 text-white' : 'bg-slate-700 text-slate-300 hover:bg-red-900'
              }`}
            >
              {isDead ? 'Dead' : 'KO'}
            </button>
          )}
        </div>
      </div>

      {romhack && !romhack.noChanges && (
        <div className="mt-3 border-t border-slate-700 pt-2">
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            {(['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const).map((s) => (
              <StatBar
                key={s}
                label={s}
                value={romhack.baseStats[s]}
                delta={romhack.statDeltas[s]}
              />
            ))}
          </div>
          <div className="mt-2 flex gap-1 flex-wrap">
            {romhack.abilities.map((a) => (
              <span key={a} className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
