import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

export default function Personalize3() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">You&apos;re all set</h1>
      <Card>
        <p className="text-neutral-600 mb-6">Your experience is personalized. Start studying!</p>
        <div className="flex gap-3">
          <Link to="/dashboard"><Button variant="primary">Go to dashboard</Button></Link>
          <Link to="/personalize-2"><Button variant="secondary">Back</Button></Link>
        </div>
      </Card>
    </div>
  )
}
