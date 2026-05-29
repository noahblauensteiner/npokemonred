import { useEffect, useState } from 'react'
import type { RunState } from '../types'
import { runStore } from '../store/runStore'

export function useRunStore(): RunState {
  const [state, setState] = useState<RunState>(runStore.getState)
  useEffect(() => {
    const unsub = runStore.subscribe(setState)
    return () => unsub()
  }, [])
  return state
}
