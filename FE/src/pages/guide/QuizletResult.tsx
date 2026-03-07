import { Link } from 'react-router-dom'
import { Button, Card, Progress } from '../../components/ui'

export default function QuizletResult() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Quiz result</h1>
      <Card className="text-center">
        <p className="text-4xl font-bold text-primary mb-2">85%</p>
        <p className="text-neutral-600 mb-6">You got 8 out of 10 correct.</p>
        <Progress value={8} max={10} />
        <div className="flex gap-4 justify-center mt-6">
          <Link to="/quizlet"><Button variant="primary">Retry</Button></Link>
          <Link to="/dashboard"><Button variant="secondary">Back to dashboard</Button></Link>
        </div>
      </Card>
    </div>
  )
}
