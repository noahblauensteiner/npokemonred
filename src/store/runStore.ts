import type { RunState } from '../types'

const STORAGE_KEY = 'rr-nuzlocke-run-v1'

const defaultState: RunState = {
  completedIds: [],
  capturedByArea: {},
  deadDexIds: [],
  spoilerRevealedBossIds: [],
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

// Simple pub-sub store — no React context overhead for v1
type Listener = (state: RunState) => void
const listeners = new Set<Listener>()
let current = load()

function notify() {
  listeners.forEach((l) => l(current))
}

export const runStore = {
  getState: () => current,

  subscribe: (fn: Listener): (() => void) => {
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  },

  toggleComplete: (id: string) => {
    const ids = current.completedIds
    current = {
      ...current,
      completedIds: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    }
    save(current)
    notify()
  },

  setCaptured: (areaId: string, dexId: number | null) => {
    current = {
      ...current,
      capturedByArea: { ...current.capturedByArea, [areaId]: dexId },
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
