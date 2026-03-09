import { useState, useMemo } from 'react'
import { Button } from '../../components/common'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type ChatMessage = { role: 'ai' | 'user'; text: string }
const INITIAL_AI_MESSAGE: ChatMessage = {
  role: 'ai',
  text: "Hello, I can help you schedule your week. Try saying 'Schedule a study session for Biology next Tuesday' or 'Add a group project meeting for Monday at 4 PM'.",
}

type CalendarEvent = { title: string; type: 'class' | 'deadline' | 'meeting' | 'today' }
function buildFakeEvents(): Record<string, CalendarEvent[]> {
  const y = new Date().getFullYear()
  const m = new Date().getMonth()
  const todayKey = `${y}-${String(m + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
  return {
    [todayKey]: [{ title: 'Today', type: 'today' }],
    [`${y}-${String(m + 1).padStart(2, '0')}-05`]: [{ title: 'Essay due', type: 'deadline' }],
    [`${y}-${String(m + 1).padStart(2, '0')}-08`]: [{ title: '10:00 Bio lab', type: 'class' }, { title: '2:00 Study group', type: 'meeting' }],
    [`${y}-${String(m + 1).padStart(2, '0')}-12`]: [{ title: 'Math quiz', type: 'class' }],
    [`${y}-${String(m + 1).padStart(2, '0')}-15`]: [{ title: 'Project draft due', type: 'deadline' }],
    [`${y}-${String(m + 1).padStart(2, '0')}-20`]: [{ title: 'Team sync', type: 'meeting' }],
  }
}

function toDateKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getCalendarDays(year: number, month: number): { date: Date; isCurrentMonth: boolean }[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const start = new Date(first)
  const startDow = start.getDay()
  const mondayOffset = startDow === 0 ? -6 : 1 - startDow
  start.setDate(first.getDate() + mondayOffset)
  const out: { date: Date; isCurrentMonth: boolean }[] = []
  const cur = new Date(start)
  const end = new Date(last)
  end.setDate(end.getDate() + 1)
  while (cur < end || out.length % 7 !== 0) {
    out.push({
      date: new Date(cur),
      isCurrentMonth: cur.getMonth() === month,
    })
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

const EVENT_STYLES: Record<CalendarEvent['type'], string> = {
  today: 'bg-violet-600 text-white font-semibold',
  deadline: 'bg-amber-500 text-white font-medium',
  class: 'bg-sky-100 text-sky-900 border border-sky-200',
  meeting: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
}

function getMockAiReply(userText: string, viewDate: Date): string {
  const lower = userText.toLowerCase()
  const monthStr = viewDate.toLocaleString('en-US', { month: 'short' })
  const year = viewDate.getFullYear()
  if (lower.includes('meeting') || lower.includes('event') || lower.includes('add') || lower.includes('schedule')) {
    const dayMatch = lower.match(/(next )?monday|(next )?tuesday|(next )?wednesday|(next )?thursday|(next )?friday|(next )?saturday|(next )?sunday|monday|tuesday|wednesday|thursday|friday|saturday|sunday/i)
    const timeMatch = lower.match(/\d{1,2}\s*(:\d{2})?\s*(am|pm)/i) || lower.match(/(\d{1,2})\s*(\d{2})?\s*(am|pm)/i)
    const dayName = dayMatch ? dayMatch[0].replace('next ', '').trim() : 'Monday'
    const timeStr = timeMatch ? timeMatch[0] : '4:00 PM'
    const titleMatch = userText.match(/(?:add|schedule)\s+(?:a\s+)?(?:group\s+)?(?:project\s+)?(?:meeting|event)\s+for\s+(.+?)(?:\s+at\s+|\s+on\s+|$)/i)
      || userText.match(/(.+?)\s+(?:on|for)\s+(?:next\s+)?(?:mon|tue|wed|thu|fri|sat|sun)/i)
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+at\s+\d.*$/i, '').trim() || 'Event' : 'Group Project Meeting'
    return `Sure! I've added "${title}" to ${dayName}, ${monthStr} ${year} at ${timeStr}. Would you like me to notify your squad?`
  }
  if (lower.includes('optimize') || lower.includes('week')) {
    return "I've looked at your week. I suggest blocking 9–11 AM on Tue and Thu for deep work, and keeping Wed afternoon free for meetings. Want me to add these blocks?"
  }
  if (lower.includes('focus') || lower.includes('time')) {
    return "Based on your calendar, you have focus time: Tue 9–11 AM, Thu 2–4 PM, and Sat morning. I can add a recurring 'Focus' block for these slots if you’d like."
  }
  return "I can add events, optimize your week, or find focus time. Try: 'Add a meeting for Monday at 4 PM' or tap Optimize week below."
}

export default function Calendar() {
  const today = useMemo(() => new Date(), [])
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([INITIAL_AI_MESSAGE])
  const [chatInput, setChatInput] = useState('')
  const fakeEvents = useMemo(buildFakeEvents, [])

  const monthLabel = viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const days = useMemo(
    () => getCalendarDays(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate.getFullYear(), viewDate.getMonth()]
  )

  const goPrev = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))
  const goNext = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))
  const goToday = () => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
  const isViewingCurrentMonth =
    viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth()

  const sendMessage = () => {
    const text = chatInput.trim()
    if (!text) return
    setChatInput('')
    setChatMessages((prev) => [...prev, { role: 'user', text }])
    const reply = getMockAiReply(text, viewDate)
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'ai', text: reply }])
    }, 400)
  }

  const runOptimizeWeek = () => {
    setChatMessages((prev) => [...prev, { role: 'user', text: 'Optimize my week' }])
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'ai', text: "I've looked at your week. I suggest blocking 9–11 AM on Tue and Thu for deep work, and keeping Wed afternoon free for meetings. Want me to add these blocks?" }])
    }, 400)
  }

  const runFindFocusTime = () => {
    setChatMessages((prev) => [...prev, { role: 'user', text: 'Find my focus time' }])
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'ai', text: "Based on your calendar, you have focus time: Tue 9–11 AM, Thu 2–4 PM, and Sat morning. I can add a recurring 'Focus' block for these slots if you'd like." }])
    }, 400)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Calendar column */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">{monthLabel}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm" onClick={goPrev} aria-label="Previous month">
                ← Prev
              </Button>
              <Button
                variant={isViewingCurrentMonth ? 'primary' : 'secondary'}
                size="sm"
                onClick={goToday}
                aria-label="Go to current month"
              >
                Today
              </Button>
              <Button variant="secondary" size="sm" onClick={goNext} aria-label="Next month">
                Next →
              </Button>
              <Button variant="ghost" size="sm" className="ml-2">
                + Add event
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-neutral-200 bg-white overflow-hidden shadow-sm">
            {/* Weekday labels — separate row */}
            <div className="grid grid-cols-7 border-b-2 border-neutral-200 bg-neutral-100 [&>*]:border-r [&>*]:border-neutral-200 [&>*:nth-child(7)]:border-r-0">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-neutral-600"
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Day cells grid */}
            <div className="grid grid-cols-7 [&>*:nth-child(7n)]:border-r-0 [&>*:nth-last-child(-n+7)]:pb-0 [&>*:nth-last-child(-n+7)]:border-b-0">
              {days.map(({ date, isCurrentMonth }, i) => {
                const key = toDateKey(date)
                const isToday = isSameDay(date, today)
                const events = fakeEvents[key] ?? []
                return (
                  <div
                    key={i}
                    className={`min-h-[100px] p-2 flex flex-col border-b border-r border-neutral-200 bg-white hover:bg-neutral-50/80 transition-colors ${!isCurrentMonth ? 'bg-neutral-50/60' : ''
                      }`}
                  >
                    <span
                      className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-semibold shrink-0 ${isToday
                        ? 'bg-violet-600 text-white'
                        : isCurrentMonth
                          ? 'text-neutral-900'
                          : 'text-neutral-400'
                        }`}
                    >
                      {date.getDate()}
                    </span>
                    <div className="flex flex-col gap-1 mt-1 flex-1 min-h-0 overflow-hidden">
                      {events.slice(0, 3).map((ev, j) => (
                        <div
                          key={j}
                          className={`px-2 py-1 rounded-md text-[11px] leading-tight truncate ${EVENT_STYLES[ev.type]}`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <span className="text-[10px] text-neutral-500 font-medium">+{events.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* AI Support panel — fixed width, consistent input/Send height */}
        <aside className="w-full lg:w-[340px] shrink-0 flex flex-col rounded-2xl border-2 border-neutral-200 bg-white shadow-sm overflow-hidden max-h-[calc(100vh-8rem)]">
          <div className="shrink-0 px-4 py-2.5 bg-sky-100 border-b-2 border-sky-200">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="text-violet-600 font-bold">∞</span>
              Together AI
            </h2>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5">
            {chatMessages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                <div
                  className={`max-w-[92%] rounded-lg px-2.5 py-1.5 ${m.role === 'user'
                    ? 'bg-violet-100 border border-violet-200 text-violet-900'
                    : 'bg-neutral-100 border border-neutral-200 text-neutral-900'
                    }`}
                >
                  {m.role === 'ai' && <span className="text-[9px] font-semibold text-neutral-500 uppercase block mb-0.5">AI Assistant</span>}
                  {m.role === 'user' && <span className="text-[9px] font-semibold text-violet-600 uppercase block mb-0.5">You</span>}
                  <p className="text-xs font-medium leading-snug">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 p-3 border-t-2 border-neutral-200 space-y-2">
            <div className="flex gap-2 items-stretch">
              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 min-w-0 h-9 px-3 rounded-lg border-2 border-neutral-200 text-neutral-900 placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button variant="primary" size="sm" onClick={sendMessage} className="shrink-0 h-9 min-h-0 px-3 rounded-lg text-xs font-semibold">
                Send
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button variant="secondary" size="sm" className="h-8 min-h-0 py-0 px-2.5 text-xs rounded-lg" onClick={runOptimizeWeek}>
                Optimize week
              </Button>
              <Button variant="secondary" size="sm" className="h-8 min-h-0 py-0 px-2.5 text-xs rounded-lg" onClick={runFindFocusTime}>
                Find focus time
              </Button>
            </div>
          </div>
        </aside>
      </div>
      {/* Event types legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-violet-600" /> Today
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-500" /> Deadline
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-sky-100 border border-sky-200" /> Class
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" /> Meeting
        </span>
      </div>
    </div>
  )
}
