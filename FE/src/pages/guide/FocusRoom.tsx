import { Button, Card } from '../../components/ui'

export default function FocusRoom() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl bg-neutral-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Current streak</h2>
        <p className="text-3xl font-bold text-orange-400">15 Days</p>
      </div>
      <Card heading="Today&apos;s tasks">
        <ul className="space-y-3">
          {['Read Chapter 4 Notes — Due 2:00 PM', 'History Essay Outline — Due 6:00 PM', 'Python Quiz Prep — Due 11:59 PM'].map((t, i) => (
            <li key={i} className="flex items-center gap-3 p-3 border-b border-neutral-100 last:border-0">
              <span className="w-5 h-5 rounded border border-neutral-200" />
              <span className="text-sm">{t}</span>
            </li>
          ))}
        </ul>
        <Button variant="ghost" size="sm" className="mt-4">+ Add task</Button>
      </Card>
    </div>
  )
}
