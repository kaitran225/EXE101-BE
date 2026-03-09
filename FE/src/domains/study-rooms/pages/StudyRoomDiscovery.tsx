import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Input } from '../../../components/common'
import { FILTERS, FAKE_ROOMS, MY_ROOM_IDS, SUGGESTED_IDS, STUDY_ROOMS_TABS, type Room } from '../../../mocks'

type TabKey = (typeof STUDY_ROOMS_TABS)[number]['key']

function matchRoom(room: Room, query: string, category: string): boolean {
  const q = query.trim().toLowerCase()
  const byCategory = category === 'all' || room.topic === category
  if (!q) return byCategory
  const inTitle = room.title.toLowerCase().includes(q)
  const inTopic = room.topic.toLowerCase().includes(q) || FILTERS.find((f) => f.key === room.topic)?.label.toLowerCase().includes(q)
  const inTags = room.tags.some((t) => t.toLowerCase().includes(q))
  const inDesc = room.description.toLowerCase().includes(q)
  return byCategory && (inTitle || inTopic || inTags || inDesc)
}

export default function StudyRoomDiscovery() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [tab, setTab] = useState<TabKey>('explore')

  const filteredBySearch = useMemo(
    () => FAKE_ROOMS.filter((room: Room) => matchRoom(room, search, category)),
    [search, category]
  )

  const roomsToShow = useMemo(() => {
    if (tab === 'explore') return filteredBySearch
    if (tab === 'my') return filteredBySearch.filter((r) => MY_ROOM_IDS.includes(r.id))
    return filteredBySearch.filter((r) => SUGGESTED_IDS.includes(r.id))
  }, [tab, filteredBySearch])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-4 border-b-2 border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-1 uppercase tracking-tight">Study rooms</h1>
          <p className="text-sm text-neutral-600">Find a room or create your own to study with others.</p>
        </div>
        <div className="flex items-center gap-2 flex-nowrap">
          <Input
            placeholder="Search..."
            className="w-40 sm:w-48 border-2 border-neutral-200 rounded-lg shrink-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search rooms"
          />
          <Link to="/study-rooms/recommend" className="shrink-0">
            <Button variant="secondary" size="md" className="border-2 border-neutral-200">Find matching room</Button>
          </Link>
          <Link to="/study-rooms/create-new" className="shrink-0">
            <Button variant="primary" size="md">+ Create room</Button>
          </Link>
        </div>
      </div>

      {/* Tabs: Explore | My rooms | Suggested */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 border-b-2 border-neutral-200">
          {STUDY_ROOMS_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t transition-colors -mb-px ${
                tab === t.key
                  ? 'bg-white border-2 border-neutral-200 border-b-0 text-sky-600'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Link to="/study-rooms/recommend">
          <Button variant="secondary" size="sm" className="border-2 border-neutral-200">Matching room</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setCategory(f.key)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors border-2 ${
                category === f.key
                  ? 'font-bold text-neutral-900 bg-sky-50 text-sky-800 border-sky-200'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-neutral-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {roomsToShow.length === 0 ? (
          <p className="col-span-full text-neutral-500 text-sm py-8 text-center">
            {tab === 'my'
              ? 'You haven’t joined any rooms yet. Switch to Explore to find one.'
              : 'No rooms match. Try a different search or category.'}
          </p>
        ) : (
          roomsToShow.map((room) => (
            <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow flex flex-col p-4 border-2 border-neutral-200">
              <h3 className="font-bold text-base mb-1">{room.title}</h3>
              <p className="text-xs text-neutral-500 mb-1.5">
                {FILTERS.find((f) => f.key === room.topic)?.label ?? room.topic} · <span className="text-emerald-600 font-medium">{room.membersCurrent} Active</span> · {room.membersMax} max
              </p>
              <p className="text-xs text-neutral-700 mb-3 flex-1">{room.description}</p>
              {room.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {room.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-700 rounded border border-neutral-200">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <Link to="/study-room">
                <Button variant="secondary" size="sm" className="text-xs border-2 border-neutral-200">Join</Button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
