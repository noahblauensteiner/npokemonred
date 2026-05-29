import { useState } from 'react'
import type { Boss } from '../../types'
import { TypeBadge } from '../ui/TypeBadge'
import { SpriteImg } from '../ui/SpriteImg'
import { runStore } from '../../store/runStore'
import { useRunStore } from '../../hooks/useRunStore'

interface Props {
  boss: Boss
}

export function BossCard({ boss }: Props) {
  const { spoilerRevealedBossIds } = useRunStore()
  const revealed = spoilerRevealedBossIds.includes(boss.id)
  const [localReveal, setLocalReveal] = useState(false)
  const showDetails = revealed || localReveal

  function handleReveal() {
    setLocalReveal(true)
    runStore.revealBoss(boss.id)
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
      {/* Header — always visible */}
      <div className="px-4 py-3 bg-slate-800 flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-bold text-lg text-slate-100">{boss.name}</h3>
          <p className="text-xs text-slate-400">{boss.gym} · {boss.badgeName}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Level cap</div>
          <div className="font-mono font-bold text-amber-400 text-lg">Lv {boss.levelCap}</div>
        </div>
      </div>

      {/* Types + team size — always visible */}
      <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {boss.types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
        <span className="text-xs text-slate-400">{boss.teamSize} Pokémon</span>
      </div>

      {/* Tips — always visible */}
      {boss.tips && (
        <div className="px-4 py-2 bg-blue-950/40 border-b border-blue-900/50">
          <p className="text-xs text-blue-300">{boss.tips}</p>
        </div>
      )}

      {/* Team — hidden behind spoiler gate */}
      <div className="px-4 py-3">
        {!showDetails ? (
          <button
            onClick={handleReveal}
            className="w-full py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 text-sm hover:bg-slate-700 transition-colors"
          >
            Reveal movesets & abilities
          </button>
        ) : (
          <div className="space-y-3">
            {boss.team.map((member) => (
              <div key={member.dexId} className="flex gap-3 items-start p-2 bg-slate-800 rounded-xl">
                <SpriteImg dexId={member.dexId} name={member.name} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-100">{member.name}</span>
                    <span className="text-xs text-slate-500">Lv {member.level}</span>
                  </div>
                  <div className="flex gap-1 mt-0.5 flex-wrap">
                    {member.types.map((t) => (
                      <TypeBadge key={t} type={t} small />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {member.ability} · {member.nature} · {member.item}
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {member.moves.map((mv) => (
                      <span key={mv} className="px-1.5 py-0.5 bg-slate-700 rounded text-[10px] text-slate-300">
                        {mv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
