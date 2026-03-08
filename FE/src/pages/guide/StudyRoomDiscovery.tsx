import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'math', label: 'Mathematics' },
  { key: 'science', label: 'Science' },
  { key: 'lang', label: 'Languages' },
] as const

type Room = {
  id: string
  title: string
  topic: 'math' | 'science' | 'lang'
  tags: string[]
  description: string
  membersCurrent: number
  membersMax: number
}

const FAKE_ROOMS: Room[] = [
  { id: '1', title: 'Advanced Calculus Group Session', topic: 'math', tags: ['calculus', 'chapter 4', 'exercises'], description: 'Reviewing Chapter 4 exercises. Join to study together.', membersCurrent: 4, membersMax: 10 },
  { id: '2', title: 'Linear Algebra Problem Solving', topic: 'math', tags: ['linear algebra', 'matrices', 'eigenvalues'], description: 'Working through problem set 3. All levels welcome.', membersCurrent: 2, membersMax: 8 },
  { id: '3', title: 'Statistics & Probability Prep', topic: 'math', tags: ['statistics', 'probability', 'exam prep'], description: 'Final exam review. Practice problems and Q&A.', membersCurrent: 6, membersMax: 12 },
  { id: '4', title: 'Organic Chemistry Study Group', topic: 'science', tags: ['chemistry', 'organic', 'reactions'], description: 'Mechanisms and synthesis. Bring your notes.', membersCurrent: 5, membersMax: 10 },
  { id: '5', title: 'Biology Lab Report Help', topic: 'science', tags: ['biology', 'lab', 'report writing'], description: 'Drafting lab reports. Peer review and feedback.', membersCurrent: 3, membersMax: 6 },
  { id: '6', title: 'Physics Mechanics Workshop', topic: 'science', tags: ['physics', 'mechanics', 'problem solving'], description: 'Newton\'s laws and applications. Practice problems.', membersCurrent: 7, membersMax: 10 },
  { id: '7', title: 'Spanish Conversation Practice', topic: 'lang', tags: ['spanish', 'conversation', 'speaking'], description: 'Casual conversation in Spanish. All levels.', membersCurrent: 4, membersMax: 8 },
  { id: '8', title: 'French Grammar & Reading', topic: 'lang', tags: ['french', 'grammar', 'reading'], description: 'Subjonctif and reading comprehension. B1/B2.', membersCurrent: 2, membersMax: 6 },
  { id: '9', title: 'English Writing Workshop', topic: 'lang', tags: ['english', 'writing', 'essays'], description: 'Essay structure and peer editing. Academic writing.', membersCurrent: 5, membersMax: 8 },
  { id: '10', title: 'Differential Equations Review', topic: 'math', tags: ['differential equations', 'ODE', 'exam'], description: 'Pre-midterm review. Past papers and exercises.', membersCurrent: 3, membersMax: 8 },
  { id: '11', title: 'General Chemistry Concepts', topic: 'science', tags: ['chemistry', 'general', 'stoichiometry'], description: 'Stoichiometry and equilibrium. First-year focus.', membersCurrent: 8, membersMax: 12 },
  { id: '12', title: 'Japanese Kanji Practice', topic: 'lang', tags: ['japanese', 'kanji', 'N3'], description: 'Kanji drilling and vocabulary. JLPT N3 level.', membersCurrent: 4, membersMax: 6 },
]

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

  const filteredRooms = useMemo(
    () => FAKE_ROOMS.filter((room) => matchRoom(room, search, category)),
    [search, category]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">Study Room Discovery</h1>
          <p className="text-sm text-neutral-600">Connect with peers in focused environments. Join a live session or create your own space.</p>
        </div>
        <Link to="/study-rooms/create-new">
          <Button variant="secondary" size="md">+ Create Room</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Search rooms by title, topic, or tags..."
          className="max-w-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search rooms"
        />
        <div className="flex gap-1.5 border-b border-neutral-200 pb-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setCategory(f.key)}
              className={`px-2.5 py-1 text-xs font-medium rounded-t transition-colors ${
                category === f.key
                  ? 'font-bold text-neutral-900 border-b-2 border-neutral-900 bg-neutral-50'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.length === 0 ? (
          <p className="col-span-full text-neutral-500 text-xs">No rooms match your search. Try a different term or category.</p>
        ) : (
          filteredRooms.map((room) => (
            <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow flex flex-col p-4">
              <h3 className="font-bold text-base mb-1">{room.title}</h3>
              <p className="text-xs text-neutral-500 mb-1.5">
                {FILTERS.find((f) => f.key === room.topic)?.label ?? room.topic} · {room.membersCurrent}/{room.membersMax} members
              </p>
              <p className="text-xs text-neutral-700 mb-3 flex-1">{room.description}</p>
              {room.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {room.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-200 text-neutral-700 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <Link to="/study-room">
                <Button variant="secondary" size="sm" className="text-xs">Join</Button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
