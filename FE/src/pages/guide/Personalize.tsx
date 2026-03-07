import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

export default function Personalize() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Personalize your experience</h1>
      <Card heading="Step 1">
        <p className="text-neutral-600 mb-4">Choose your main study topics and goals.</p>
        <Link to="/personalize-2"><Button variant="primary">Next</Button></Link>
      </Card>
    </div>
  )
}
