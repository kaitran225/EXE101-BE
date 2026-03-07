import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

export default function AiSupport() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">AI support</h1>
      <Card>
        <p className="mb-4">Get help with your study material. The AI can summarize, quiz you, or explain concepts.</p>
        <div className="flex gap-3">
          <Link to="/ai-support-attachment"><Button variant="primary">Open chat</Button></Link>
          <Link to="/meet-ai"><Button variant="secondary">Back to Meet AI</Button></Link>
        </div>
      </Card>
    </div>
  )
}
