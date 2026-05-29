import type { ChecklistEntry } from '../../types'
import { runStore } from '../../store/runStore'
import { useRunStore } from '../../hooks/useRunStore'
import { questSprite } from '../../lib/questSprite'
import { spriteUrl } from '../../lib/dexSprite'

interface Props {
  entries: ChecklistEntry[]
  showOptional: boolean
}

export function ChecklistSection({ entries, showOptional }: Props) {
  const { completedIds } = useRunStore()
  const visible = entries.filter((e) => e.group === 'story' || showOptional)

  return (
    <div className="space-y-3">
      {visible.map((e, i) => (
        <QuestCard
          key={e.id}
          entry={e}
          checked={completedIds.includes(e.id)}
          index={i}
        />
      ))}
    </div>
  )
}

function QuestCard({ entry, checked, index }: { entry: ChecklistEntry; checked: boolean; index: number }) {
  const isLeft = index % 2 === 0
  const isBoss = !!entry.bossId
  const dexId = questSprite(entry.segmentId, entry.bossId)

  return (
    <div className={`flex items-center gap-2 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

      {/* Sprite */}
      <div className="flex-shrink-0 w-14 flex justify-center">
        <img
          src={spriteUrl(dexId)}
          alt=""
          width={52}
          height={52}
          loading="lazy"
          style={{ imageRendering: 'pixelated' }}
          className={`transition-all duration-300 drop-shadow-lg ${
            checked ? 'opacity-30 grayscale scale-90' : isBoss ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {/* Card body */}
      <button
        onClick={() => runStore.toggleComplete(entry.id, isBoss)}
        className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border
          ${isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'}
          ${checked
            ? 'bg-emerald-950/40 border-emerald-800/60'
            : isBoss
            ? 'bg-amber-950/50 border-amber-700 hover:bg-amber-950/80 shadow-[0_0_12px_rgba(217,119,6,0.15)]'
            : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80'
          }
        `}
      >
        {/* Checkbox */}
        <div
          className={`w-4 h-4 rounded-sm flex-shrink-0 border-2 flex items-center justify-center transition-colors
            ${checked ? 'bg-emerald-500 border-emerald-500' : isBoss ? 'border-amber-500' : 'border-slate-500'}
          `}
        >
          {checked && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-snug transition-colors
            ${checked ? 'text-slate-500 line-through' : isBoss ? 'text-amber-200' : 'text-slate-200'}
          `}>
            {entry.label}
          </p>
          {!checked && (
            <p className="text-[10px] text-slate-500 mt-0.5">
              {isBoss ? '🏅 +200 XP' : entry.group === 'optional' ? 'optional' : '+50 XP'}
            </p>
          )}
        </div>
      </button>
    </div>
  )
}
