const TYPE_COLORS: Record<string, string> = {
  Normal: 'bg-stone-400 text-stone-900',
  Fire: 'bg-orange-500 text-white',
  Water: 'bg-blue-500 text-white',
  Electric: 'bg-yellow-400 text-yellow-900',
  Grass: 'bg-green-500 text-white',
  Ice: 'bg-cyan-300 text-cyan-900',
  Fighting: 'bg-red-700 text-white',
  Poison: 'bg-purple-500 text-white',
  Ground: 'bg-amber-600 text-white',
  Flying: 'bg-indigo-400 text-white',
  Psychic: 'bg-pink-500 text-white',
  Bug: 'bg-lime-500 text-lime-900',
  Rock: 'bg-stone-600 text-white',
  Ghost: 'bg-violet-700 text-white',
  Dragon: 'bg-violet-500 text-white',
  Dark: 'bg-stone-800 text-white',
  Steel: 'bg-slate-400 text-slate-900',
  Fairy: 'bg-pink-300 text-pink-900',
}

export function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? 'bg-slate-600 text-white'
}
