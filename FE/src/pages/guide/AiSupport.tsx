import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

const SUMMARY_HISTORY = [
  { id: '1', name: 'Quantum_Computing.pdf', time: '2 Hours Ago' },
  { id: '2', name: 'History_of_Rome.pdf', time: 'Yesterday' },
  { id: '3', name: 'Bio_101_Chapter_4.pdf', time: '3 Days Ago' },
]

const ACTIONS = [
  {
    title: 'Summarize',
    description: 'Get a concise summary of your notes or long text.',
    icon: '📋',
    href: '/ai-support-attachment',
    openSummarizePopup: true,
  },
  {
    title: 'Quiz me',
    description: 'Generate practice questions from your material.',
    icon: '❓',
    href: '/ai-support-attachment',
    openSummarizePopup: false,
  },
  {
    title: 'Explain',
    description: 'Break down concepts in simpler terms step by step.',
    icon: '💡',
    href: '/ai-support-attachment',
    openSummarizePopup: false,
  },
]

const MAX_PDF_MB = 25

export default function AiSupport() {
  const [summarizeOpen, setSummarizeOpen] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  const [summaryText, setSummaryText] = useState('')
  const summarizeInputRef = useRef<HTMLInputElement>(null)

  const handleSummarizeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size <= MAX_PDF_MB * 1024 * 1024) setDroppedFile(file)
    if (summarizeInputRef.current) summarizeInputRef.current.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file?.type === 'application/pdf' && file.size <= MAX_PDF_MB * 1024 * 1024) setDroppedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 w-full max-w-6xl">
      <div className="flex flex-col gap-6 min-w-0">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">AI Support</h1>
          <p className="text-neutral-600 mt-1">Use the AI to summarize, quiz you, or explain concepts from your study material.</p>
        </div>

        <Card className="p-5 shadow-sm border-2 border-neutral-200 bg-gradient-to-br from-violet-50/50 to-white">
        <p className="text-neutral-700 mb-4">
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
            action.openSummarizePopup ? (
              <button
                key={action.title}
                type="button"
                onClick={() => setSummarizeOpen(true)}
                className="w-full text-left"
              >
                <Card className="p-4 h-full hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group border-2 border-neutral-200">
                  <span className="text-xl mb-2 block" aria-hidden>{action.icon}</span>
                  <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-violet-700">{action.title}</h3>
                  <p className="text-sm text-neutral-600">{action.description}</p>
                </Card>
              </button>
            ) : (
              <Link key={action.title} to={action.href}>
                <Card className="p-4 h-full hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group border-2 border-neutral-200">
                  <span className="text-xl mb-2 block" aria-hidden>{action.icon}</span>
                  <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-violet-700">{action.title}</h3>
                  <p className="text-sm text-neutral-600">{action.description}</p>
                </Card>
              </Link>
            )
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

      {/* Summarize popup — open first, then drop/select PDF inside */}
      {summarizeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSummarizeOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border-2 border-neutral-200 shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-neutral-200">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Summarize</h2>
              <div className="flex items-center gap-2">
                <Link to="/focus-room">
                  <Button variant="primary" size="sm" className="rounded-lg text-xs font-bold">
                    Focus room
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setSummarizeOpen(false)}
                  className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1fr] min-h-0 overflow-hidden">
              {/* Left: Drop file + History */}
              <div className="p-4 border-r border-neutral-200 flex flex-col gap-4 overflow-y-auto">
                <div>
                  <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2">Drop file here</p>
                  <input
                    ref={summarizeInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={handleSummarizeFile}
                    aria-label="Choose PDF"
                  />
                  <button
                    type="button"
                    onClick={() => summarizeInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full min-h-[180px] rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 flex flex-col items-center justify-center gap-2 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-100 transition-colors"
                  >
                    <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm font-semibold text-neutral-600">Drop PDF</span>
                    <span className="text-xs">Max {MAX_PDF_MB}MB</span>
                    {droppedFile && (
                      <span className="text-xs font-medium text-violet-600 mt-1 truncate max-w-full px-2">{droppedFile.name}</span>
                    )}
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide">History</p>
                    <button type="button" className="p-1 rounded text-neutral-500 hover:bg-neutral-200" aria-label="Refresh">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {SUMMARY_HISTORY.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-left hover:bg-neutral-100 text-sm font-medium text-neutral-900"
                        >
                          <span className="text-neutral-400 shrink-0" aria-hidden>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707L12 3.586A1 1 0 0010.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <span className="min-w-0 truncate flex-1">{item.name}</span>
                          <span className="text-[10px] text-neutral-500 shrink-0">{item.time}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Right: Executive summary */}
              <div className="p-4 flex flex-col min-h-0">
                <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <span aria-hidden>≡</span> Executive summary
                </p>
                <div className="flex-1 min-h-[200px] rounded-xl border-2 border-neutral-200 bg-white p-4 overflow-y-auto">
                  {summaryText ? (
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">{summaryText}</p>
                  ) : (
                    <div className="space-y-2 text-neutral-300">
                      <div className="h-3 rounded bg-neutral-200 w-full" />
                      <div className="h-3 rounded bg-neutral-200 w-4/5" />
                      <div className="h-3 rounded bg-neutral-200 w-full" />
                      <div className="h-3 rounded bg-neutral-200 w-3/4" />
                      <div className="h-3 rounded bg-neutral-200 w-5/6" />
                      <div className="h-3 rounded border border-dashed border-neutral-300 w-2/3" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg bg-sky-500 hover:bg-sky-600 border-0"
                    onClick={() => setSummaryText(droppedFile ? 'Summary will appear here after processing. (Mock: This is a placeholder summary for ' + droppedFile.name + '.)' : 'Drop or select a PDF first.')}
                  >
                    Summarize
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-lg" onClick={() => setSummaryText('')}>
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
