import { Link } from 'react-router-dom'
import { Button, Card, Textarea } from '../components/ui'

const todayTasks = [
  { title: 'Read Chapter 4 – Biology', due: 'Due 2:00 PM' },
  { title: 'History Essay Outline', due: 'Due 6:00 PM' },
  { title: 'Python Quiz Prep', due: 'Due 11:59 PM' },
  { title: 'Physics Problem Set 3', due: 'Due 11:59 PM' },
]

// Weekly study hours (realistic: weekdays higher, weekend lower); Thu = today
const studyBarsRaw = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4, active: true },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 1.5 },
]
const studyMaxHours = Math.max(...studyBarsRaw.map((b) => b.hours))
// Bar height as % of max (0–100%); minimum 12% so shortest bar is visible
const studyBars = studyBarsRaw.map((b) => ({
  ...b,
  h: Math.max(12, (b.hours / studyMaxHours) * 100),
  label: b.active ? `${b.hours}h` : undefined,
}))

const upcomingItems = [
  { tag: 'DEADLINE', tagClass: 'bg-orange-500/90 text-white', title: 'Physics Lab Report', time: 'Tomorrow, 11:59 PM' },
  { tag: 'PROJECT', tagClass: 'bg-amber-200 text-neutral-800', title: 'Web Dev Mockups Review', time: 'Fri, 11 AM' },
  { tag: 'MEETING', tagClass: 'bg-sky-200 text-sky-900', title: 'Calculus Study Group', time: 'Sat, 2:00 PM' },
]

const teamCards = [
  { name: 'Calculus II Prep', active: '8 Active' },
  { name: 'Organic Chemistry', active: '14 Active' },
  { name: 'Web Dev Sprint', active: '5 Active' },
  { name: 'History Essay Group', active: '3 Active' },
]

const cardCompact = 'p-4 [&_h3]:pb-1.5 [&_h3]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top row: 40% | 40% | 20% */}
      <div className="grid gap-3 w-full grid-cols-1 sm:grid-cols-[40fr_40fr_20fr]">
        <Card className={`flex items-center gap-2 py-2.5 ${cardCompact}`}>
          <div className="flex-shrink-0 text-orange-500">
            <svg width="24" height="28" viewBox="0 0 40 47" fill="none" className="w-6 h-7" aria-hidden>
              <path d="M5 27.21C5 29.35 5.44 31.38 6.31 33.3 7.19 35.22 8.44 36.9 10.06 38.34 10.02 38.14 10 37.95 10 37.79 10 37.62 10 37.44 10 37.23 10 35.91 10.25 34.67 10.75 33.52 11.25 32.36 11.98 31.31 12.94 30.36L20 23.5l7.06 6.86c.96.95 1.69 2 2.19 3.15.5 1.15.75 2.39.75 3.71 0 .21-.02.41-.06.63.94-1.21 2.19-2.89 3.81-4.33 1.63-1.44 2.88-3.12 3.76-5.04C34.56 31.38 35 29.35 35 27.21c0-2.06-.39-4.01-1.16-5.84-.77-1.84-1.88-3.47-3.34-4.92-.83.54-1.71.94-2.62 1.21a8.1 8.1 0 0 1-2.5.4c-2.58 0-4.82-.85-6.72-2.54-1.9-1.69-2.99-3.77-3.28-6.25-1.63 1.36-3.06 2.77-4.31 4.24-1.25 1.46-2.3 2.95-3.16 4.46-.85 1.5-1.5 3.04-1.94 4.6C5.22 24.14 5 25.69 5 27.21z" fill="currentColor" />
            </svg>
          </div>
          <div className="min-w-0 truncate">
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">Current streak</p>
            <p className="text-base font-bold text-neutral-900">15 Days</p>
          </div>
        </Card>
        <Card className={`flex items-center gap-2 py-2.5 ${cardCompact}`}>
          <div className="flex-shrink-0 text-indigo-400">
            <svg width="24" height="24" viewBox="0 0 50 50" fill="none" className="w-6 h-6" aria-hidden>
              <rect x="2" y="2" width="46" height="46" rx="23" stroke="currentColor" strokeWidth="3" />
              <rect x="25" y="15.1" width="14" height="14" transform="rotate(45 25 15.1)" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <div className="min-w-0 truncate">
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">Experience points</p>
            <p className="text-base font-bold text-neutral-900">12,450 XP</p>
          </div>
        </Card>
        <Card className={`flex items-center gap-2 py-2.5 ${cardCompact}`}>
          <div className="min-w-0 truncate">
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">Coins in wallet</p>
            <p className="text-base font-bold text-neutral-900">1000</p>
          </div>
        </Card>
      </div>

      {/* Main columns 20% | 30% | 50% — Row 1: Today's work | Teams | Study time */}
      <div className="grid grid-cols-1 lg:grid-cols-[20fr_30fr_50fr] gap-3 w-full">
        <Card className={`flex flex-col ${cardCompact}`} heading="Today's work">
          <ul className="space-y-0 divide-y divide-neutral-200 -mx-0.5">
            {todayTasks.map((t, i) => (
              <li key={i} className="flex items-center gap-2 py-1.5 px-0.5">
                <div className="flex-shrink-0 w-3.5 h-3.5 rounded border border-neutral-400 bg-white" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-neutral-900 truncate">{t.title}</p>
                  <p className="text-[10px] text-neutral-500">{t.due}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-neutral-500 font-medium text-xs py-1.5">
            + Add task
          </Button>
        </Card>

        <Card className={cardCompact} heading="Teams joined">
          <div className="grid grid-cols-2 gap-2">
            {teamCards.map((team, i) => (
              <div key={i} className="p-2 rounded-md border border-neutral-200 bg-neutral-50/50 flex flex-col gap-1">
                <p className="text-xs font-semibold text-neutral-900 truncate">{team.name}</p>
                <span className="px-1 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-medium rounded w-fit">
                  {team.active}
                </span>
                <Link to="/teams">
                  <Button variant="secondary" size="sm" className="w-full py-1 text-xs h-7">
                    Join
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        <Card className={`flex flex-col ${cardCompact}`} heading="Study time today">
          <div className="flex justify-end mb-1">
            <Button variant="ghost" size="sm" className="text-[10px] font-medium text-neutral-600 py-0 h-6">
              View analytics
            </Button>
          </div>
          <div className="flex items-end gap-1 h-[140px]">
            {studyBars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5 min-w-0 h-full">
                {b.label && <span className="text-[9px] font-semibold text-neutral-600">{b.label}</span>}
                <div
                  className={`w-full rounded-t min-h-[6px] ${b.active ? 'bg-violet-500' : 'bg-neutral-300'}`}
                  style={{ height: `${b.h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-0 pt-1 mt-0.5 border-t border-neutral-200">
            {studyBars.map((b, i) => (
              <span key={i} className="flex-1 text-center text-[9px] font-medium text-neutral-500 uppercase">
                {b.day}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Main columns 20% | 30% | 50% — Row 2: Upcoming | Open rooms | Meetings + Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-[20fr_30fr_50fr] gap-3 w-full">
        <Card className={cardCompact} heading="Upcoming meetings">
          <ul className="space-y-1">
            {upcomingItems.map((item, i) => (
              <li key={i} className="p-1.5 rounded-md border border-neutral-200 bg-neutral-50/50">
                <div className="flex justify-between items-start gap-1">
                  <span className={`shrink-0 px-1 py-0.5 rounded text-[9px] font-semibold uppercase ${item.tagClass}`}>
                    {item.tag}
                  </span>
                  <span className="text-[9px] text-neutral-500">{item.time}</span>
                </div>
                <p className="text-xs font-medium text-neutral-900 mt-0.5 truncate">{item.title}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className={cardCompact}>
          <div className="flex items-center justify-between gap-2 pb-1.5 mb-3 border-b border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900">Open study rooms</h3>
            <Button variant="ghost" size="sm" className="text-[10px] font-medium text-neutral-600 py-0 h-6 shrink-0">
              Join randomly
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {teamCards.map((room, i) => (
              <div key={i} className="p-2 rounded-md border border-neutral-200 bg-neutral-50/50 flex flex-col gap-1">
                <p className="text-xs font-semibold text-neutral-900 truncate">{room.name}</p>
                <span className="px-1 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-medium rounded w-fit">
                  {room.active}
                </span>
                <Link to="/study-room">
                  <Button variant="secondary" size="sm" className="w-full py-1 text-xs h-7">
                    Enter
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className={cardCompact}>
            <div className="flex items-center justify-between gap-2 pb-1.5 mb-3 border-b border-neutral-200">
              <h3 className="text-sm font-semibold text-neutral-900">Upcoming tasks</h3>
              <Link to="/meetings">
                <Button variant="secondary" size="sm" className="text-[10px] font-medium py-1 h-7 shrink-0">
                  Start / Join
                </Button>
              </Link>
            </div>
            <ul className="space-y-1">
              {upcomingItems.slice(0, 2).map((item, i) => (
                <li key={i} className="p-1.5 rounded-md border border-neutral-200 bg-neutral-50/50">
                  <div className="flex justify-between items-start gap-1">
                    <span className={`shrink-0 px-1 py-0.5 rounded text-[9px] font-semibold uppercase ${item.tagClass}`}>
                      {item.tag}
                    </span>
                    <span className="text-[9px] text-neutral-500">{item.time}</span>
                  </div>
                  <p className="text-xs font-medium text-neutral-900 mt-0.5 truncate">{item.title}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card className={cardCompact} heading="Quick notes">
            <Textarea
              placeholder="Start typing a note..."
              className="min-h-[60px] resize-y text-xs py-2"
            />
            <Button variant="ghost" size="sm" className="w-full mt-1.5 text-neutral-500 font-medium text-xs py-1">
              + Add note
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
