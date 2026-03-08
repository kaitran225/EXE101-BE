import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Input, Textarea } from '../../components/ui'

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

const MESSAGES = [
  { id: '1', role: 'assistant' as const, text: "Hello! I'm your Premium AI Tutor. How can I help you with your studies today?", time: '10:02' },
  { id: '2', role: 'user' as const, text: 'Can you explain wave-particle duality?', time: '10:03' },
  { id: '3', role: 'assistant' as const, text: "Wave-particle duality means light and matter can behave like a wave or a particle depending on how we measure them.", time: '10:04' },
]

const MAX_FILE_SIZE_MB = 10
const ACCEPT_FILES = '.pdf,.doc,.docx,.txt,.md,image/*'
const MAX_PDF_MB = 25
const SUMMARY_HISTORY = [
  { id: '1', name: 'Quantum_Computing.pdf', time: '2 Hours Ago' },
  { id: '2', name: 'History_of_Rome.pdf', time: 'Yesterday' },
  { id: '3', name: 'Bio_101_Chapter_4.pdf', time: '3 Days Ago' },
]

export default function MeetAi() {
  const [query, setQuery] = useState('')
  const [attachments, setAttachments] = useState<{ id: string; file: File }[]>([])
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [summarizeOpen, setSummarizeOpen] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  const [summaryText, setSummaryText] = useState('')
  const dialogFileInputRef = useRef<HTMLInputElement>(null)
  const summarizeInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list?.length) return
    const newEntries = Array.from(list)
      .filter((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
      .map((f) => ({ id: `${Date.now()}-${f.name}`, file: f }))
    setAttachments((prev) => [...prev, ...newEntries])
    if (dialogFileInputRef.current) dialogFileInputRef.current.value = ''
  }

  const removeAttachment = (id: string) => setAttachments((prev) => prev.filter((a) => a.id !== id))

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start">
      <header className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Meet AI Tutor</h1>
        <p className="text-neutral-600 mt-1">Get instant help with concepts, summaries, and practice. Ask anything or paste your notes.</p>
      </header>

      {/* Column 1: Ask a question */}
      <Card className="p-6 shadow-sm border-2 border-neutral-200 min-w-0">
        <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">Ask a question or paste content</h2>
        <div className="relative mb-4">
          <Textarea
            id="ai-question"
            placeholder="e.g. Explain photosynthesis, summarize chapter 3, or paste your notes..."
            className="min-h-[100px] resize-y pr-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setSummarizeOpen(true)}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-lg border-2 border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
            aria-label="Attach file — open Summarize"
            title="Attach file — opens Summarize to drop or select PDF"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Button variant="primary" size="md">Send</Button>
          <Link to="/ai-support-attachment">
            <Button variant="secondary" size="md">Open full chat</Button>
          </Link>
        </div>
        <button type="button" onClick={() => setChatDialogOpen(true)} className="text-xs font-medium text-violet-600 hover:text-violet-800 mb-4">
          Open chat in popup
        </button>
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

      {/* Summarize popup — opened by attachment icon; user drops/selects file here */}
      {summarizeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSummarizeOpen(false)}>
          <div className="bg-white rounded-2xl border-2 border-neutral-200 shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-neutral-200">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Summarize</h2>
              <div className="flex items-center gap-2">
                <Link to="/focus-room">
                  <Button variant="primary" size="sm" className="rounded-lg text-xs font-bold">Focus room</Button>
                </Link>
                <button type="button" onClick={() => setSummarizeOpen(false)} className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900" aria-label="Close">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1fr] min-h-0 overflow-hidden">
              <div className="p-4 border-r border-neutral-200 flex flex-col gap-4 overflow-y-auto">
                <div>
                  <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2">Drop file here</p>
                  <input ref={summarizeInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleSummarizeFile} aria-label="Choose PDF" />
                  <button
                    type="button"
                    onClick={() => summarizeInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full min-h-[180px] rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 flex flex-col items-center justify-center gap-2 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-100 transition-colors"
                  >
                    <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <span className="text-sm font-semibold text-neutral-600">Drop PDF</span>
                    <span className="text-xs">Max {MAX_PDF_MB}MB</span>
                    {droppedFile && <span className="text-xs font-medium text-violet-600 mt-1 truncate max-w-full px-2">{droppedFile.name}</span>}
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide">History</p>
                    <button type="button" className="p-1 rounded text-neutral-500 hover:bg-neutral-200" aria-label="Refresh">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {SUMMARY_HISTORY.map((item) => (
                      <li key={item.id}>
                        <button type="button" className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-left hover:bg-neutral-100 text-sm font-medium text-neutral-900">
                          <span className="text-neutral-400 shrink-0" aria-hidden><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707L12 3.586A1 1 0 0010.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg></span>
                          <span className="min-w-0 truncate flex-1">{item.name}</span>
                          <span className="text-[10px] text-neutral-500 shrink-0">{item.time}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 flex flex-col min-h-0">
                <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2 flex items-center gap-1"><span aria-hidden>≡</span> Executive summary</p>
                <div className="flex-1 min-h-[200px] rounded-xl border-2 border-neutral-200 bg-white p-4 overflow-y-auto">
                  {summaryText ? (
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">{summaryText}</p>
                  ) : (
                    <div className="space-y-2 text-neutral-300">
                      <div className="h-3 rounded bg-neutral-200 w-full" /><div className="h-3 rounded bg-neutral-200 w-4/5" /><div className="h-3 rounded bg-neutral-200 w-full" /><div className="h-3 rounded bg-neutral-200 w-3/4" /><div className="h-3 rounded bg-neutral-200 w-5/6" /><div className="h-3 rounded border border-dashed border-neutral-300 w-2/3" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" size="sm" className="rounded-lg bg-sky-500 hover:bg-sky-600 border-0" onClick={() => setSummaryText(droppedFile ? 'Summary will appear here after processing. (Mock: This is a placeholder summary for ' + droppedFile.name + '.)' : 'Drop or select a PDF first.')}>Summarize</Button>
                  <Button variant="secondary" size="sm" className="rounded-lg" onClick={() => setSummaryText('')}>Download</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat dialog popup */}
      {chatDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setChatDialogOpen(false)}>
          <div className="bg-white rounded-2xl border-2 border-neutral-200 shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-neutral-200 bg-neutral-50">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Together AI — Chat</h2>
              <button type="button" onClick={() => setChatDialogOpen(false)} className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900" aria-label="Close">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                  {msg.role === 'assistant' && (
                    <span className="w-8 h-8 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center text-violet-600" aria-hidden>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </span>
                  )}
                  <div className={`rounded-xl px-3 py-2 text-sm ${msg.role === 'assistant' ? 'bg-neutral-100 text-neutral-900 border border-neutral-200' : 'bg-violet-100 text-violet-900 border border-violet-200'}`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-neutral-500 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t-2 border-neutral-200 space-y-2">
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {attachments.map(({ id, file }) => (
                    <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-xs">
                      <span className="max-w-[100px] truncate">{file.name}</span>
                      <button type="button" onClick={() => removeAttachment(id)} className="text-neutral-500 hover:text-neutral-900" aria-label={`Remove ${file.name}`}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input ref={dialogFileInputRef} type="file" multiple accept={ACCEPT_FILES} className="hidden" onChange={handleFileChange} aria-label="Attach file" />
                <button type="button" onClick={() => dialogFileInputRef.current?.click()} className="shrink-0 w-10 h-10 rounded-lg border-2 border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100" aria-label="Attach file">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                </button>
                <Input placeholder="Ask anything..." className="flex-1 rounded-lg border-2 border-neutral-200 text-sm" value={chatInput} onChange={(e) => setChatInput(e.target.value)} aria-label="Message" />
                <Button variant="primary" size="sm" className="rounded-lg shrink-0">Send</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
