import { Link } from 'react-router-dom'
import { Button, Card, Input, Progress } from '../../components/ui'

const todayChats = [
  { id: '1', title: 'Intro to Quantum Physics', active: true },
  { id: '2', title: 'History Exam Prep', active: false },
]
const yesterdayChats = [
  { id: '3', title: 'Python Lists Help', active: false },
  { id: '4', title: 'Essay Outline Gen', active: false },
]

export default function AiSupportAttachment() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-6 min-h-[600px]">
        <aside className="w-64 flex-shrink-0 flex flex-col gap-6 p-4 bg-white border-r border-neutral-900 rounded-r-lg">
          <Button variant="secondary" size="md" className="w-full rounded-[10px] border border-neutral-900 uppercase font-bold">
            + New chat
          </Button>
          <div className="flex flex-col gap-2 overflow-auto flex-1">
            <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-wide">Today</p>
            {todayChats.map((c) => (
              <Link
                key={c.id}
                to="#"
                className={`p-2 rounded-[10px] flex items-center gap-2 text-xs font-semibold ${c.active ? 'bg-black/20' : ''}`}
              >
                <span className="w-3 h-3 flex-shrink-0" aria-hidden />
                {c.title}
              </Link>
            ))}
            <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-wide mt-4">Yesterday</p>
            {yesterdayChats.map((c) => (
              <Link key={c.id} to="#" className="p-2 rounded-[10px] flex items-center gap-2 text-xs font-semibold">
                <span className="w-3 h-3 flex-shrink-0" aria-hidden />
                {c.title}
              </Link>
            ))}
          </div>
          <div className="p-3 bg-blue-200 rounded-[10px] border border-neutral-900 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase">Tokens used</span>
              <span className="text-[10px] font-bold">64%</span>
            </div>
            <Progress value={64} max={100} className="h-2" />
          </div>
        </aside>
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex-1 overflow-auto space-y-4">
            <Card className="max-w-[768px] p-4">
              <p className="text-sm text-neutral-900">
                Hello! I&apos;m your Premium AI Tutor. How can I help you with your studies today?
              </p>
            </Card>
            <div className="max-w-[768px] ml-auto">
              <Card className="p-4 bg-sky-200 border border-neutral-900">
                <p className="text-sm text-neutral-900">[ User message or diagram placeholder ]</p>
              </Card>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-4">
            <div className="flex gap-2 max-w-[768px]">
              <Input placeholder="Type your question or paste content..." className="flex-1" />
              <Button variant="primary" size="md">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
