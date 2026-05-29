import encountersRaw from '../data/encounters.json'
import romhackRaw from '../data/romhack.json'
import segmentsRaw from '../data/segments.json'
import type { AreaEncounters, RomhackEntry, Segment } from '../types'
import { AreaEncounterPanel } from '../components/encounter/AreaEncounterPanel'

const encounters = encountersRaw as AreaEncounters[]
const romhackMap = romhackRaw as Record<string, RomhackEntry>
const segments = segmentsRaw as Segment[]

const segmentNameMap = Object.fromEntries(segments.map((s) => [s.id, s.name]))

export function EncountersPage() {
  return (
    <div className="px-4 py-4 space-y-2">
      <h2 className="text-lg font-bold text-slate-100 mb-4">Encounter Pools</h2>
      {encounters.map((area) => (
        <AreaEncounterPanel
          key={area.areaId}
          area={area}
          romhackMap={romhackMap}
          segmentName={segmentNameMap[area.areaId] ?? area.areaId}
        />
      ))}
    </div>
  )
}
