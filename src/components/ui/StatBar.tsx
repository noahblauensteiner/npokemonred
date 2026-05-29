interface Props {
  label: string
  value: number
  delta?: number
}

function barColor(value: number): string {
  if (value >= 120) return 'bg-emerald-400'
  if (value >= 90) return 'bg-green-500'
  if (value >= 60) return 'bg-yellow-400'
  if (value >= 40) return 'bg-orange-400'
  return 'bg-red-500'
}

export function StatBar({ label, value, delta = 0 }: Props) {
  const pct = Math.min(100, (value / 180) * 100)
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-right text-[10px] font-bold text-slate-400 uppercase">{label}</span>
      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor(value)}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-7 text-right text-xs font-mono text-slate-300">{value}</span>
      {delta !== 0 && (
        <span className={`text-[10px] font-bold ${delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {delta > 0 ? `+${delta}` : delta}
        </span>
      )}
    </div>
  )
}
