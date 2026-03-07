import { Link } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'

export default function RecommendRoomMatching() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 uppercase mb-4">Find the best study room for you</h1>
        <p className="text-lg text-neutral-900 mb-8">
          Describe what you&apos;re studying and Together AI will match you with the best study group for your goals.
        </p>
      </div>
      <Card className="p-6 flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div className="flex flex-col gap-2">
            <label className="text-neutral-900 text-xl font-bold uppercase">Goals</label>
            <Input placeholder="Goals..." className="h-24" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-neutral-900 text-xl font-bold uppercase">Subject</label>
            <Input placeholder="Subject..." className="h-24" />
          </div>
        </div>
        <Button variant="primary" size="lg" className="bg-blue-300 border-2 border-neutral-900 text-neutral-900 uppercase">
          Match with AI
        </Button>
      </Card>
      <div className="pt-8">
        <h2 className="text-2xl font-bold text-neutral-900 uppercase mb-6">Recommended for you</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-36 bg-white border-b border-neutral-900 flex items-start p-2">
                <span className="text-orange-500 text-[10px] font-bold uppercase">LIVE</span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Advanced Calculus Group</h3>
                <p className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">Mathematics</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="px-2 py-1 bg-green-300 rounded-lg text-xs font-medium">12 Active</span>
                  <Link to="/study-room">
                    <Button variant="secondary" size="sm" className="bg-sky-200 uppercase">Join</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
