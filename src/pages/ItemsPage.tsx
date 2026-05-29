import itemsRaw from '../data/items.json'
import segmentsRaw from '../data/segments.json'
import type { Item, Segment } from '../types'

const items = itemsRaw as Item[]
const segments = segmentsRaw as Segment[]

const TAG_STYLES: Record<string, string> = {
  TM: 'bg-purple-900 text-purple-300',
  'held-item': 'bg-blue-900 text-blue-300',
  'key-item': 'bg-amber-900 text-amber-300',
  'evolution-item': 'bg-pink-900 text-pink-300',
  pickup: 'bg-slate-700 text-slate-300',
}

const segmentOrder = Object.fromEntries(segments.map((s) => [s.id, s.order]))

const groupedItems = items.reduce<Record<string, Item[]>>((acc, item) => {
  acc[item.segmentId] ??= []
  acc[item.segmentId].push(item)
  return acc
}, {})

const segmentNameMap = Object.fromEntries(segments.map((s) => [s.id, s.name]))

const sortedSegments = Object.keys(groupedItems).sort(
  (a, b) => (segmentOrder[a] ?? 999) - (segmentOrder[b] ?? 999)
)

export function ItemsPage() {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-bold text-slate-100 mb-4">Notable Items</h2>
      <div className="space-y-6">
        {sortedSegments.map((segId) => (
          <section key={segId}>
            <h3 className="text-sm font-bold text-slate-400 mb-2">
              {segmentNameMap[segId] ?? segId}
            </h3>
            <div className="space-y-2">
              {groupedItems[segId].map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 mt-0.5 ${TAG_STYLES[item.tag] ?? 'bg-slate-700 text-slate-300'}`}>
                    {item.tag}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.locationDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
