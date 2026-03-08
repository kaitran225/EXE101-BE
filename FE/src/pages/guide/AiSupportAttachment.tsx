import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Progress } from '../../components/ui'

const SIDEBAR_CHATS = [
  { id: '1', title: 'Intro to Quantum Physics', active: true, time: 'Today' },
  { id: '2', title: 'History Exam Prep', active: false, time: 'Today' },
  { id: '3', title: 'Python Lists Help', active: false, time: 'Yesterday' },
  { id: '4', title: 'Essay Outline Gen', active: false, time: 'Yesterday' },
]

const MESSAGES = [
  { id: '1', role: 'assistant' as const, text: "Hello! I'm your Premium AI Tutor. How can I help you with your studies today? You can ask for explanations, summaries, or practice questions.", time: '10:02' },
  { id: '2', role: 'user' as const, text: 'Can you explain wave-particle duality in simple terms?', time: '10:03' },
  { id: '3', role: 'assistant' as const, text: "Sure. Wave-particle duality means that light (and matter like electrons) sometimes behaves like a wave and sometimes like a particle, depending on how we measure it. Think of it as one thing showing two different 'faces' in different experiments.", time: '10:04' },
]

export default function AiSupportAttachment() {
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] min-h-[520px]">
      <div className="flex flex-1 min-h-0 rounded-2xl border-2 border-neutral-200 bg-white shadow-sm overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 flex flex-col border-r border-neutral-200 bg-neutral-50/80">
          <div className="p-3 border-b border-neutral-200">
            <Link
              to="/ai-support-attachment"
              className="inline-flex w-full items-center justify-center gap-2 font-medium rounded-xl px-4 py-2 text-sm min-h-[44px] bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-100"
            >
              + New chat
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <section>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2 mb-2">Conversations</p>
              <ul className="space-y-0.5">
                {SIDEBAR_CHATS.map((c) => (
                  <li key={c.id}>
                    <Link
                      to="#"
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        c.active
                          ? 'bg-violet-100 text-violet-900'
                          : 'text-neutral-700 hover:bg-neutral-200/80'
                      }`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-neutral-200 flex-shrink-0 flex items-center justify-center text-neutral-500" aria-hidden>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </span>
                      <span className="min-w-0 truncate flex-1">{c.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="p-3 border-t border-neutral-200">
            <div className="rounded-xl bg-violet-50 border border-violet-200 p-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-violet-900">Tokens used</span>
                <span className="text-xs font-semibold text-violet-700">64%</span>
              </div>
              <Progress value={64} max={100} className="h-2 rounded-full" />
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <span className="w-9 h-9 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center text-violet-600" aria-hidden>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'assistant'
                      ? 'bg-neutral-100 text-neutral-900 border border-neutral-200'
                      : 'bg-violet-100 text-violet-900 border border-violet-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-[10px] text-neutral-500 mt-1.5">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-neutral-200 bg-neutral-50/50">
            <div className="flex gap-2 max-w-2xl mx-auto">
              <Input
                placeholder="Type your question or paste content..."
                className="flex-1 rounded-xl border-2 border-neutral-200 focus:border-violet-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Message"
              />
              <Button variant="primary" size="md" className="rounded-xl shrink-0">
                Send
              </Button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 text-center">You can attach files or paste text. The AI can summarize, quiz you, or explain.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
