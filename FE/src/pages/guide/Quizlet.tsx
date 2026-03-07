import { Link } from 'react-router-dom'
import { Button, Card, Progress } from '../../components/ui'

export default function Quizlet() {
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold uppercase">Question 7 / 10</span>
        <span className="text-xl font-bold uppercase">70% complete</span>
      </div>
      <Progress value={7} max={10} />
      <Card>
        <p className="text-sm font-bold uppercase text-neutral-500 mb-2">Topic: Neural Networks</p>
        <p className="text-2xl font-bold text-center py-8">
          &quot;Back propagation is primarily used to calculate the gradient of the loss function with respect to the weights in a neural network.&quot;
        </p>
        <div className="flex gap-8 justify-center pt-6">
          <Button variant="primary" size="lg">True</Button>
          <Button variant="secondary" size="lg">False</Button>
        </div>
      </Card>
      <div className="flex justify-end">
        <Link to="/quizlet-result"><Button variant="secondary">Exit quiz</Button></Link>
      </div>
    </div>
  )
}
