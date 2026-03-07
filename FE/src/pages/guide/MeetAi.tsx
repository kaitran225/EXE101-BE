import { Link } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'

export default function MeetAi() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Meet AI Tutor</h1>
      <Card className="max-w-2xl">
        <p className="text-neutral-600 mb-4">Ask a question or paste your notes for help.</p>
        <Input placeholder="Type your question..." className="mb-4" />
        <div className="flex gap-3">
          <Button variant="primary">Send</Button>
          <Link to="/ai-support-attachment"><Button variant="secondary">Open full chat</Button></Link>
        </div>
      </Card>
      <Card heading="Recent conversations">
        <p className="text-sm text-neutral-500 mb-4">Your recent AI chats will appear here.</p>
        <Link to="/ai-support-attachment"><Button variant="ghost" size="sm">Go to AI Support</Button></Link>
      </Card>
    </div>
  )
}
