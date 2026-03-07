import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

export default function StudyRoom() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Study room: Advanced Calculus Session</h1>
        <p className="text-neutral-600 mb-4">4 members online · Mathematics</p>
        <div className="flex gap-4">
          <Button variant="primary">Join session</Button>
          <Link to="/study-rooms"><Button variant="secondary">Leave</Button></Link>
        </div>
      </Card>
    </div>
  )
}
