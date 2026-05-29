// PokeAPI sprites — no network required at runtime (served from CDN, cached by PWA)
export function spriteUrl(dexId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`
}
