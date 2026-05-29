const SEGMENT_SPRITES: Record<string, number> = {
  'pallet-town':    1,    // Bulbasaur — starter choice
  'route-1':        16,   // Pidgey
  'viridian-city':  25,   // Pikachu
  'route-2-south':  29,   // Nidoran♀
  'viridian-forest':10,   // Caterpie
  'route-2-north':  32,   // Nidoran♂
  'pewter-city':    95,   // Onix
  'route-3':        56,   // Mankey
  'mt-moon':        35,   // Clefairy
  'route-4':        58,   // Growlithe
  'cerulean-city':  121,  // Starmie
}

const BOSS_ACE: Record<string, number> = {
  'brock':  112,  // Rhydon
  'misty':  121,  // Starmie
}

export function questSprite(segmentId: string, bossId: string | null): number {
  if (bossId && BOSS_ACE[bossId]) return BOSS_ACE[bossId]
  return SEGMENT_SPRITES[segmentId] ?? 25
}
