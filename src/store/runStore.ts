import type { RunState } from '../types'

const STORAGE_KEY = 'rr-nuzlocke-run-v1'

const defaultState: RunState = {
  completedIds: [],
  capturedByArea: {},
  deadDexIds: [],
  spoilerRevealedBossIds: [],
  xp: 0,
}

function load(): RunState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return { ...defaultState }
  }
}

function save(state: RunState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

type Listener = (state: RunState) => void
const listeners = new Set<Listener>()
let current = load()

function notify() {
  listeners.forEach((l) => l(current))
}

export const XP_PER_CATCH = 50
export const XP_PER_STORY = 50
export const XP_PER_GYM = 200

export function xpToLevel(xp: number) {
  const level = Math.floor(xp / 100) + 1
  const progress = xp % 100
  const toNext = 100
  return { level, progress, toNext }
}

export const runStore = {
  getState: () => current,

  subscribe: (fn: Listener): (() => void) => {
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  },

  toggleComplete: (id: string, isBoss: boolean) => {
    const ids = current.completedIds
    const wasComplete = ids.includes(id)
    const xpGain = wasComplete ? 0 : isBoss ? XP_PER_GYM : XP_PER_STORY
    current = {
      ...current,
      completedIds: wasComplete ? ids.filter((x) => x !== id) : [...ids, id],
      xp: current.xp + xpGain,
    }
    save(current)
    notify()
  },

  setCaptured: (areaId: string, dexId: number | null) => {
    const prev = current.capturedByArea[areaId]
    const isNewCatch = dexId !== null && prev !== dexId
    current = {
      ...current,
      capturedByArea: { ...current.capturedByArea, [areaId]: dexId },
      xp: current.xp + (isNewCatch ? XP_PER_CATCH : 0),
    }
    save(current)
    notify()
  },

  toggleDead: (dexId: number) => {
    const dead = current.deadDexIds
    current = {
      ...current,
      deadDexIds: dead.includes(dexId) ? dead.filter((x) => x !== dexId) : [...dead, dexId],
    }
    save(current)
    notify()
  },

  revealBoss: (bossId: string) => {
    if (current.spoilerRevealedBossIds.includes(bossId)) return
    current = {
      ...current,
      spoilerRevealedBossIds: [...current.spoilerRevealedBossIds, bossId],
    }
    save(current)
    notify()
  },

  resetRun: () => {
    current = { ...defaultState }
    save(current)
    notify()
  },
}
