import { useState, useMemo } from 'react'
import { Button } from '../../components/ui'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

export default function Calendar() {
  const today = useMemo(() => new Date(), [])
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
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

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{monthLabel}</h1>
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
        <div className="grid grid-cols-7 bg-neutral-100 border-b-2 border-neutral-200">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map(({ date, isCurrentMonth }, i) => {
            const key = toDateKey(date)
            const isToday = isSameDay(date, today)
            const events = fakeEvents[key] ?? []
            return (
              <div
                key={i}
                className={`min-h-[100px] p-2 flex flex-col border-b border-r border-neutral-200 last:border-r-0 bg-white hover:bg-neutral-50/80 transition-colors ${
                  !isCurrentMonth ? 'bg-neutral-50/60' : ''
                }`}
              >
                <span
                  className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-semibold shrink-0 ${
                    isToday
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
