import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

export default function Personalize2() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Personalize — Step 2</h1>
      <Card heading="Schedule">
        <p className="text-neutral-600 mb-4">When do you usually study?</p>
        <div className="flex gap-3">
          <Link to="/personalize-3"><Button variant="primary">Next</Button></Link>
          <Link to="/personalize"><Button variant="secondary">Back</Button></Link>
        </div>
      </Card>
    </div>
  )
}
