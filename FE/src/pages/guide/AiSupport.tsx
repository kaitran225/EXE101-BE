import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

const ACTIONS = [
  {
    title: 'Summarize',
    description: 'Get a concise summary of your notes or long text.',
    icon: '📋',
    href: '/ai-support-attachment',
  },
  {
    title: 'Quiz me',
    description: 'Generate practice questions from your material.',
    icon: '❓',
    href: '/ai-support-attachment',
  },
  {
    title: 'Explain',
    description: 'Break down concepts in simpler terms step by step.',
    icon: '💡',
    href: '/ai-support-attachment',
  },
]

export default function AiSupport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 w-full max-w-6xl">
      <div className="flex flex-col gap-8 min-w-0">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">AI Support</h1>
          <p className="text-neutral-600 mt-1">Use the AI to summarize, quiz you, or explain concepts from your study material.</p>
        </div>

        <Card className="p-6 shadow-sm border-2 border-neutral-200 bg-gradient-to-br from-violet-50/50 to-white">
        <p className="text-neutral-700 mb-6">
          Get help with your study material. Upload or paste content, then choose how you want to use it: get a summary, generate quiz questions, or ask for explanations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/ai-support-attachment">
            <Button variant="primary" size="md">Open chat</Button>
          </Link>
          <Link to="/meet-ai">
            <Button variant="secondary" size="md">Back to Meet AI Tutor</Button>
          </Link>
        </div>
      </Card>

      <div>
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">What you can do</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ACTIONS.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="p-5 h-full hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group border-2 border-neutral-200">
                <span className="text-2xl mb-3 block" aria-hidden>{action.icon}</span>
                <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-violet-700">{action.title}</h3>
                <p className="text-sm text-neutral-600">{action.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      </div>

      {/* Right panel: fills empty space */}
      <aside className="hidden lg:flex flex-col gap-6">
        <Card className="p-5 shadow-sm border-2 border-neutral-200 bg-neutral-50/50">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Quick links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/ai-support-attachment" className="text-violet-600 hover:text-violet-800 font-medium">Open full chat</Link>
            </li>
            <li>
              <Link to="/meet-ai" className="text-neutral-600 hover:text-neutral-900">Meet AI Tutor</Link>
            </li>
          </ul>
        </Card>
        <Card className="p-5 shadow-sm border-2 border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">In the chat you can</h3>
          <p className="text-sm text-neutral-600">Paste notes, attach files, and ask for summaries, quizzes, or step-by-step explanations. Your conversation history is saved.</p>
        </Card>
      </aside>
    </div>
  )
}
