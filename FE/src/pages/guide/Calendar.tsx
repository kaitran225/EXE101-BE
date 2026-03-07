import { useState, useMemo } from 'react'
import { Button } from '../../components/ui'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type CalendarEvent = { title: string; type: 'class' | 'deadline' | 'today' }
const FAKE_EVENTS: Record<string, CalendarEvent[]> = {
  '2023-10-03': [{ title: '10:00 AM - Bio L…', type: 'class' }],
  '2023-10-05': [{ title: 'Essay Due', type: 'deadline' }],
  '2023-10-11': [{ title: '02:00 PM - Math…', type: 'class' }],
  '2023-10-19': [{ title: 'TODAY', type: 'today' }],
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

export default function Calendar() {
  const [viewDate, setViewDate] = useState(() => new Date(2023, 9, 1))
  const today = useMemo(() => new Date(), [])

  const monthLabel = viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()
  const days = useMemo(
    () => getCalendarDays(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate.getFullYear(), viewDate.getMonth()]
  )

  const goPrev = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))
  const goNext = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <h1 className="text-4xl font-bold text-neutral-900 uppercase tracking-tight">{monthLabel}</h1>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={goPrev} className="min-w-[7rem] uppercase font-bold text-sm bg-blue-300 border-neutral-900">
              &lt; Previous
            </Button>
            <Button variant="secondary" onClick={goNext} className="uppercase font-bold text-sm bg-blue-300 border-neutral-900">
              Next &gt;
            </Button>
            <Button variant="ghost" className="ml-4 uppercase font-bold text-sm text-black/50 border border-black/50">
              + Add event
            </Button>
          </div>
        </div>

        <div className="border-2 border-neutral-900 overflow-hidden rounded-sm">
          <div className="grid grid-cols-7 bg-black/30">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="p-3 text-center text-neutral-900 text-xs font-bold uppercase tracking-wide border-r border-b border-neutral-900 last:border-r-0"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 bg-white">
            {days.map(({ date, isCurrentMonth }, i) => {
              const key = toDateKey(date)
              const isToday = isSameDay(date, today)
              const base = FAKE_EVENTS[key] ?? []
              const hasToday = base.some((e) => e.type === 'today')
              const events = hasToday ? base : base.concat(isToday ? [{ title: 'TODAY', type: 'today' as const }] : [])
              return (
                <div
                  key={i}
                  className="min-h-28 p-2 flex flex-col border-r border-b border-neutral-900 last:border-r-0 bg-white"
                >
                  <span
                    className={`text-sm font-bold leading-6 ${
                      isCurrentMonth ? 'text-neutral-900' : 'text-gray-400'
                    }`}
                  >
                    {date.getDate()}
                  </span>
                  <div className="flex flex-col gap-1 mt-1 flex-1 min-h-0">
                    {events.map((ev, j) => (
                      <div
                        key={j}
                        className={`px-1 py-0.5 rounded text-[10px] leading-4 truncate ${
                          ev.type === 'today'
                            ? 'bg-purple-700 text-neutral-100 font-bold'
                            : ev.type === 'deadline'
                              ? 'bg-orange-500 text-neutral-100 font-bold'
                              : 'bg-sky-200 text-neutral-900'
                        }`}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
