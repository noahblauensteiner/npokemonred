export type BadgeGate = 0 | 1 // 0 = pre-Brock, 1 = pre-Misty

export interface Segment {
  id: string
  name: string
  badgeGate: BadgeGate
  order: number
  note?: string
}

export type EncounterMethod =
  | 'grass'
  | 'surf'
  | 'fishing-old'
  | 'fishing-good'
  | 'fishing-super'
  | 'headbutt'
  | 'gift'

export interface EncounterEntry {
  dexId: number
  name: string
  minLevel: number
  maxLevel: number
  rate: number // encounter %
}

export interface EncounterMethod_ {
  method: EncounterMethod
  pokemon: EncounterEntry[]
}

export interface AreaEncounters {
  areaId: string
  methods: EncounterMethod_[]
}

export type Role = 'sweeper' | 'wall' | 'pivot' | 'support' | 'utility' | 'mixed'

export interface StatBlock {
  hp: number
  atk: number
  def: number
  spa: number
  spd: number
  spe: number
}

export interface RomhackEntry {
  dexId: number
  name: string
  types: string[]
  abilities: string[]
  baseStats: StatBlock
  statDeltas: StatBlock
  role: Role
  strategyTip: string
  noChanges: boolean
}

export interface TeamMember {
  dexId: number
  name: string
  level: number
  types: string[]
  item: string
  ability: string
  nature: string
  moves: string[]
  evs: Partial<StatBlock>
}

export interface Boss {
  id: string
  name: string
  gym: string
  badgeId: number
  badgeName: string
  levelCap: number
  types: string[]
  teamSize: number
  team: TeamMember[]
  tips: string
}

export type ItemTag = 'TM' | 'held-item' | 'key-item' | 'evolution-item' | 'pickup'

export interface Item {
  id: string
  name: string
  segmentId: string
  tag: ItemTag
  locationDescription: string
}

export type ChecklistGroup = 'story' | 'optional'

export interface ChecklistEntry {
  id: string
  group: ChecklistGroup
  order: number
  label: string
  segmentId: string
  bossId: string | null
}

export interface RunState {
  completedIds: string[]
  capturedByArea: Record<string, number | null> // areaId -> dexId or null (failed/skipped)
  deadDexIds: number[] // dexIds of deceased Pokémon
  spoilerRevealedBossIds: string[]
  xp: number
}
