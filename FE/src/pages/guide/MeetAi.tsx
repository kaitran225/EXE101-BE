import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Textarea } from '../../components/ui'

const QUICK_PROMPTS = [
  'Explain this concept in simple terms',
  'Summarize my notes',
  'Generate practice questions',
  'Help me with problem solving',
]

const RECENT_CHATS = [
  { id: '1', title: 'Intro to Quantum Physics', preview: 'Wave-particle duality...', time: '2h ago' },
  { id: '2', title: 'Calculus Chain Rule', preview: 'Derivative of composite...', time: 'Yesterday' },
  { id: '3', title: 'Essay Outline Help', preview: 'Thesis and three main...', time: '2 days ago' },
]

export default function MeetAi() {
  const [query, setQuery] = useState('')

  return (
    <div className="grid grid-cols-1 lg:grid-cols gap-8 w-full items-start">
      <header className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Meet AI Tutor</h1>
        <p className="text-neutral-600 mt-1">Get instant help with concepts, summaries, and practice. Ask anything or paste your notes.</p>
      </header>

      {/* Column 1: Ask a question */}
      <Card className="p-6 shadow-sm border-2 border-neutral-200 min-w-0">
        <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">Ask a question or paste content</h2>
        <Textarea
          id="ai-question"
          placeholder="e.g. Explain photosynthesis, summarize chapter 3, or paste your notes..."
          className="min-h-[100px] resize-y mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mb-5">
          <Button variant="primary" size="md">Send</Button>
          <Link to="/ai-support-attachment">
            <Button variant="secondary" size="md">Open full chat</Button>
          </Link>
        </div>
        <div className="pt-4 border-t border-neutral-200">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Quick prompts</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setQuery(prompt)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Column 2: Recent conversations */}
      <Card heading="Recent conversations" className="shadow-sm border-2 border-neutral-200 min-w-0 lg:max-w-[480px]">
        <p className="text-sm text-neutral-500 mb-4">Pick up where you left off or start a new chat.</p>
        <ul className="space-y-2">
          {RECENT_CHATS.map((c) => (
            <li key={c.id}>
              <Link
                to="/ai-support-attachment"
                className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center text-violet-600 group-hover:bg-violet-200" aria-hidden>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-900 truncate">{c.title}</p>
                  <p className="text-xs text-neutral-500 truncate">{c.preview}</p>
                </div>
                <span className="text-xs text-neutral-400 flex-shrink-0">{c.time}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/ai-support-attachment" className="inline-block mt-4 pt-4 border-t border-neutral-200">
          <Button variant="ghost" size="sm">View all in AI Support</Button>
        </Link>
      </Card>

      {/* Right column: info + CTA (fills bottom on tall screens) */}
      <aside className="hidden lg:flex flex-col gap-4 w-[300px] shrink-0 min-h-[420px]">
        <Card className="p-5 shadow-sm border-2 border-neutral-200 bg-neutral-50/50 shrink-0">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">How AI Tutor helps</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex gap-2">
              <span className="text-violet-500 shrink-0">•</span>
              Explain concepts in simpler terms
            </li>
            <li className="flex gap-2">
              <span className="text-violet-500 shrink-0">•</span>
              Summarize long notes or chapters
            </li>
            <li className="flex gap-2">
              <span className="text-violet-500 shrink-0">•</span>
              Generate practice questions
            </li>
            <li className="flex gap-2">
              <span className="text-violet-500 shrink-0">•</span>
              Walk through problem solving
            </li>
          </ul>
        </Card>
        <Card className="p-5 shadow-sm border-2 border-neutral-200 shrink-0">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Tip</h3>
          <p className="text-sm text-neutral-600">
            Paste your lecture notes or a paragraph, then ask &quot;Summarize this&quot; or &quot;Quiz me on this&quot; for best results.
          </p>
        </Card>
        <Link
          to="/ai-support-attachment"
          className="flex-1 min-h-[120px] flex flex-col justify-center p-5 rounded-xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100 transition-colors"
        >
          <p className="text-sm font-semibold text-violet-900">Open full chat</p>
          <p className="text-xs text-violet-700 mt-0.5">Continue in AI Support with full conversation history.</p>
        </Link>
      </aside>
    </div>
  )
}
