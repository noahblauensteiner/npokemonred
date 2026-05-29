import bossesRaw from '../data/bosses.json'
import type { Boss } from '../types'
import { BossCard } from '../components/boss/BossCard'

const bosses = bossesRaw as Boss[]

export function BossesPage() {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-bold text-slate-100 mb-4">Gym Leaders</h2>
      <div className="space-y-6">
        {bosses.map((boss) => (
          <BossCard key={boss.id} boss={boss} />
        ))}
      </div>
    </div>
  )
}
