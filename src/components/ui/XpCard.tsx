import { xpToLevel, XP_PER_CATCH } from '../../store/runStore'
import { useRunStore } from '../../hooks/useRunStore'

export function XpCard() {
  const { xp, capturedByArea, deadDexIds } = useRunStore()
  const { level, progress, toNext } = xpToLevel(xp)

  const caughtCount = Object.values(capturedByArea).filter((v) => v !== null).length
  const aliveCount = caughtCount - deadDexIds.filter((id) =>
    Object.values(capturedByArea).includes(id)
  ).length

  const pct = (progress / toNext) * 100

  return (
    <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 shadow-xl">
      <div className="flex items-start justify-between gap-3">
        {/* Level badge */}
        <div className="flex flex-col items-center bg-slate-950/60 rounded-xl px-3 py-2 min-w-[52px]">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Lv</span>
          <span className="text-2xl font-black text-amber-400 leading-none mt-0.5">{level}</span>
        </div>

        {/* XP bar + stats */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300">Trainer XP</span>
            <span className="text-[10px] font-mono text-slate-500">{progress} / {toNext}</span>
          </div>

          <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-xs text-slate-400">
                <span className="font-bold text-slate-200">{caughtCount}</span> caught
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-xs text-slate-400">
                <span className="font-bold text-slate-200">{deadDexIds.length}</span> KO'd
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="text-xs text-slate-400">
                <span className="font-bold text-slate-200">{aliveCount}</span> alive
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50">
        <p className="text-[10px] text-slate-600 text-center">
          Catch a Pokémon to earn +{XP_PER_CATCH} XP · Defeat a gym for +200 XP
        </p>
      </div>
    </div>
  )
}
