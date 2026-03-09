import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiBotIcon, Button, Card, ChatInputBar, Modal, QuizletQuizModal, Textarea } from '../../../components/common'
import { MOCK_QUIZLET_CARDS, ACCEPT_FILES, MAX_FILE_SIZE_MB, FOCUS_ROOM_TODAY_TASKS as TODAY_TASKS, FOCUS_ROOM_CHAT_MESSAGES as CHAT_MESSAGES } from '../../../mocks'

export default function FocusRoom() {
  const [showEndModal, setShowEndModal] = useState(false)
  const [notes, setNotes] = useState('')
  const [quizletCards, setQuizletCards] = useState<typeof MOCK_QUIZLET_CARDS | null>(null)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<{ id: string; file: File }[]>([])
  const [summarizeOpen, setSummarizeOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list?.length) return
    const newEntries = Array.from(list)
      .filter((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
      .map((f) => ({ id: `${Date.now()}-${f.name}`, file: f }))
    setAttachments((prev) => [...prev, ...newEntries])
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col h-screen w-screen bg-white">
      {/* Header: just Focus Room bar */}
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b-2 border-neutral-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500" aria-hidden>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </span>
          <h1 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">Focus Room</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-lg bg-neutral-100 border-2 border-neutral-200 font-mono text-sm tabular-nums text-neutral-900">01:42:15</span>
          <Button
            variant="primary"
            size="sm"
            className="!bg-error !border-error hover:!opacity-90"
            onClick={() => setShowEndModal(true)}
          >
            End
          </Button>
          <span className="w-9 h-9 rounded-full bg-neutral-200 border-2 border-neutral-300" aria-hidden />
        </div>
      </header>

      {/* Main: 3 columns 20% | 50% | 30% */}
      <div className="flex-1 grid grid-cols-[20fr_50fr_30fr] min-h-0 bg-neutral-50/50">
        {/* Left sidebar */}
        <aside className="min-w-0 flex flex-col gap-4 p-4 border-r-2 border-neutral-200 bg-white overflow-y-auto">
          <Card className="p-4 border-2 border-neutral-200 shadow-sm">
            <div className="flex items-center gap-2 text-highlight mb-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 23c-.2 0-.4-.1-.5-.2-.3-.2-7.5-5.2-9.2-6.4-.4-.3-.5-.8-.2-1.2.3-.4.8-.5 1.2-.2 1.5 1 7.3 5 8.7 5.9.4.2.6.6.6 1.1 0 .5-.2.9-.6 1.1l-1.2.8c-.3.2-.7.2-1 .1l-1.2-.6c-.2-.1-.4-.3-.5-.5l-.6-1.2c-.2-.3-.1-.7.1-1l.8-1.2c.2-.4.2-.9-.1-1.3-.6-.8-1.4-1.5-2.2-2.1-1.2-.9-2.5-1.6-3.8-2.1-.4-.2-.9-.1-1.2.2l-1 1.2c-.2.3-.2.7 0 1l.6 1.2c.1.2.3.4.5.5l1.2.6c.3.1.7.1 1-.1l1.2-.8c.4-.2.9-.2 1.3.1.8.6 1.6 1.3 2.2 2.1.2.4.2.9-.1 1.3l-.8 1.2c-.2.3-.2.7-.1 1l.6 1.2c.1.2.3.4.5.5l1.2.6c.3.1.7.2 1-.1l1.2-.8c.5-.3 1.1-.2 1.4.3.2.3.2.7.1 1.1-1.7 1.2-9.2 6.4-9.2 6.4-.2.1-.3.2-.5.2z" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Current streak</span>
            </div>
            <p className="text-2xl font-bold text-highlight">15 Days</p>
          </Card>
          <Card className="p-4 border-2 border-neutral-200 shadow-sm flex-1 min-h-0 flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Today&apos;s work</h2>
            <ul className="space-y-2 flex-1 min-h-0 overflow-y-auto">
              {TODAY_TASKS.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded border-2 border-neutral-300 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-900">{t.title}</p>
                    <p className="text-xs text-neutral-500">{t.due}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-3 w-full border-2 border-neutral-200">
              + Add task
            </Button>
          </Card>
          <Card className="p-4 border-2 border-neutral-200 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-600 mb-3">Achievements</h2>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <span key={i} className="w-10 h-10 rounded-full border-2 border-neutral-300 bg-neutral-100" aria-hidden />
              ))}
            </div>
          </Card>
        </aside>

        {/* Center */}
        <main className="min-w-0 flex flex-col p-6 gap-4 overflow-y-auto bg-white border-r-2 border-neutral-200">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 mb-2">Summary</h2>
            <Card className="p-4 min-h-[120px] border-2 border-neutral-200 text-neutral-500 text-sm">
              {quizletCards
                ? 'AI has generated quizlet sets below. Click "Do the quiz" on any card to start.'
                : 'Session summary will appear here after you study.'}
            </Card>
          </section>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setQuizletCards(quizletCards ? null : MOCK_QUIZLET_CARDS)}
            >
              {quizletCards ? 'Hide Quizlet' : 'Generate Quizlet'}
            </Button>
            <Button variant="secondary" size="sm">Flashcards</Button>
            <Button variant="secondary" size="sm">Mindmaps</Button>
          </div>
          {quizletCards && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 mb-2">Quizlet sets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {quizletCards.map((card) => (
                  <Card key={card.id} className="p-4 border-2 border-neutral-200 flex flex-col min-h-[10rem]">
                    <div className="flex-1 min-h-0">
                      <p className="text-sm font-bold text-neutral-900">{card.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{card.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0 pt-3 mt-auto">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowQuizModal(true)}
                      >
                        Do the quiz
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
          <section className="mt-auto pt-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 mb-2">Quick notes</h2>
            <div className="flex gap-2">
              <Textarea
                placeholder="Start writing notes..."
                className="flex-1 min-h-[80px] resize-y border-2 border-neutral-200"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button variant="secondary" size="sm" className="shrink-0 self-end">Add</Button>
            </div>
          </section>
        </main>

        {/* Right: Chat */}
        <aside className="min-w-0 flex flex-col border-l-2 border-neutral-200 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent px-4 py-3 border-b-2 border-neutral-200">
            Conversation
          </h2>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {CHAT_MESSAGES.map((m, i) => (
              <div key={i} className={m.ai ? 'flex justify-center' : m.own ? 'flex justify-end' : ''}>
                <div className={m.ai ? 'flex gap-2 max-w-[85%]' : 'max-w-[85%]'}>
                  {m.ai && (
                    <span className="w-7 h-7 rounded-full bg-accent-muted flex-shrink-0 flex items-center justify-center overflow-hidden" aria-hidden>
                      <AiBotIcon className="w-6 h-6" />
                    </span>
                  )}
                  <div
                    className={`rounded-xl px-3 py-2 border-2 ${
                      m.ai
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-600 text-xs'
                        : m.own
                          ? 'bg-accent-muted border-primary/20 text-neutral-900'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  >
                    {!m.ai && (
                      <p className="text-[10px] font-semibold text-neutral-500 mb-0.5">
                        {m.user}{m.time ? ` · ${m.time}` : ''}
                      </p>
                    )}
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t-2 border-neutral-200 shrink-0">
            <ChatInputBar
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onSend={() => {}}
              onFileChange={handleFileChange}
              acceptFiles={ACCEPT_FILES}
              placeholder="Type your question..."
              attachmentCount={attachments.length}
              secondaryActions={
                <>
                  <button type="button" onClick={() => setSummarizeOpen(true)} className="text-xs font-medium text-primary hover:text-primary-hover">Summarize</button>
                  <button type="button" onClick={() => setDialogOpen(true)} className="text-xs font-medium text-primary hover:text-primary-hover">Open chat in popup</button>
                </>
              }
            />
          </div>
        </aside>
      </div>

      <Modal open={summarizeOpen} onClose={() => setSummarizeOpen(false)} title="Summarize">
        <p className="text-sm text-neutral-600 mb-4">Summarize feature — coming soon.</p>
        <Button variant="primary" size="sm" onClick={() => setSummarizeOpen(false)}>Close</Button>
      </Modal>
      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} title="Open chat in popup">
        <p className="text-sm text-neutral-600 mb-4">Chat popup — coming soon.</p>
        <Button variant="primary" size="sm" onClick={() => setDialogOpen(false)}>Close</Button>
      </Modal>

      {showQuizModal && (
        <QuizletQuizModal onClose={() => setShowQuizModal(false)} />
      )}

      {/* End session modal — large, app theme, session statistics */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40" onClick={() => setShowEndModal(false)}>
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border-2 border-neutral-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-accent-muted to-white px-8 pt-10 pb-12">
              <p className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-10">
                Done! You did well today.
              </p>
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="flex-1 max-w-[140px] rounded-xl bg-white/80 border-2 border-neutral-200 px-4 py-5 text-center shadow-sm">
                  <p className="text-2xl md:text-3xl font-bold text-primary tabular-nums">1h 42m</p>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wide mt-1.5">Time studied</p>
                </div>
                <div className="flex-1 max-w-[140px] rounded-xl bg-white/80 border-2 border-neutral-200 px-4 py-5 text-center shadow-sm">
                  <p className="text-2xl md:text-3xl font-bold text-accent tabular-nums">04</p>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wide mt-1.5">Quizzes</p>
                </div>
                <div className="flex-1 max-w-[140px] rounded-xl bg-white/80 border-2 border-neutral-200 px-4 py-5 text-center shadow-sm">
                  <p className="text-2xl md:text-3xl font-bold text-highlight tabular-nums">23</p>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wide mt-1.5">Flashcards</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t-2 border-neutral-200 bg-neutral-50/50">
              <Button variant="primary" size="md" className="flex-1" onClick={() => setShowEndModal(false)}>
                Continue study
              </Button>
              <Link to="/dashboard" className="flex-1">
                <Button variant="secondary" size="md" className="w-full">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
