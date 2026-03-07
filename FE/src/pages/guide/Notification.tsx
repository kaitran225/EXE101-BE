import { Card } from '../../components/ui'

export default function Notification() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <Card>
        <ul className="divide-y divide-neutral-200">
          <li className="py-4">
            <p className="font-medium">Study room &quot;Calculus Group&quot; starts in 10 min</p>
            <p className="text-sm text-neutral-500">Just now</p>
          </li>
          <li className="py-4">
            <p className="font-medium">You earned 50 XP</p>
            <p className="text-sm text-neutral-500">1 hour ago</p>
          </li>
        </ul>
      </Card>
    </div>
  )
}
