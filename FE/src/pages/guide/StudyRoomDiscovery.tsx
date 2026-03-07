import { Link } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'math', label: 'Mathematics' },
  { key: 'science', label: 'Science' },
  { key: 'lang', label: 'Languages' },
]

export default function StudyRoomDiscovery() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-2">Study Room Discovery</h1>
          <p className="text-lg text-neutral-600">Connect with peers in focused environments. Join a live session or create your own space.</p>
        </div>
        <Link to="/study-rooms/create-new">
          <Button variant="secondary" size="lg">+ Create Room</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <Input placeholder="Search rooms by title, topic, or tags..." className="max-w-2xl" />
        <div className="flex gap-2 border-b border-neutral-200 pb-2">
          {filters.map((f) => (
            <span
              key={f.key}
              className={`px-2 py-1 text-sm cursor-pointer ${f.key === 'all' ? 'font-bold border-b-2 border-neutral-900' : ''}`}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Advanced Calculus Group Session</h3>
            <p className="text-sm text-neutral-500 mb-2">Mathematics · 4/10 members</p>
            <p className="text-sm text-neutral-700 mb-4">Reviewing Chapter 4 exercises. Join to study together.</p>
            <Link to="/study-room">
              <Button variant="secondary" size="sm">Join</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
