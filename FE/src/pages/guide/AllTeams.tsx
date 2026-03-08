import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui'

/* My Teams: large cards */
const myTeamsData = [
  { id: '1', tag: 'ACADEMIC', code: 'CS101', subtitle: 'Fundamentals', members: 6 },
  { id: '2', tag: 'ACADEMIC', code: 'MATH201', subtitle: 'Calculus II', members: 8 },
  { id: '3', tag: 'ACADEMIC', code: 'BIO101', subtitle: 'Intro Biology', members: 5 },
  { id: '4', tag: 'ACADEMIC', code: 'CHEM101', subtitle: 'General Chem', members: 4 },
]

/* Archived: smaller cards, green Active tag, VÀO HỌC button */
const archivedData = [
  { id: 'a1', name: 'Calculus II Prep', active: '8 Active' },
  { id: 'a2', name: 'Organic Chemistry', active: '14 Active' },
  { id: 'a3', name: 'Web Dev Sprint', active: '5 Active' },
  { id: 'a4', name: 'History Essay Group', active: '3 Active' },
  { id: 'a5', name: 'Physics Lab', active: '6 Active' },
  { id: 'a6', name: 'Data Structures', active: '12 Active' },
]

function MyTeamCard({ tag, code, subtitle, members }: (typeof myTeamsData)[0]) {
  return (
    <Link
      to="/teams/board"
      className="flex-shrink-0 min-w-[160px] w-[180px] sm:min-w-[180px] sm:w-[200px] md:w-[220px] flex flex-col rounded-xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="px-2 pt-2">
        <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded bg-neutral-700 text-white">
          {tag}
        </span>
      </div>
      <div className="p-2 flex flex-col flex-1 min-h-0">
        <div className="w-full aspect-[4/3] max-h-[100px] rounded-md border-2 border-dashed border-neutral-300 bg-white flex items-center justify-center text-[9px] font-medium text-neutral-400 uppercase">
          [Image]
        </div>
        <p className="mt-1.5 text-xs font-bold text-neutral-900 truncate">{code}</p>
        <p className="text-[11px] text-neutral-600 truncate">{subtitle}</p>
        <div className="mt-auto pt-1.5 flex items-center gap-1">
          <div className="flex -space-x-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-neutral-400 border-2 border-white flex-shrink-0"
                aria-hidden
              />
            ))}
          </div>
          <span className="text-[9px] font-semibold text-neutral-600 uppercase">
            {members} members
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArchivedCard({ name, active }: (typeof archivedData)[0]) {
  return (
    <div className="flex flex-col rounded-md border border-neutral-200 bg-neutral-50/50 p-2 hover:border-neutral-300 transition-colors">
      <p className="text-xs font-semibold text-neutral-900 truncate">{name}</p>
      <span className="mt-1 px-1 py-0.5 bg-neutral-200 text-neutral-800 text-[9px] font-medium rounded w-fit">
        {active}
      </span>
      <Link to="/teams/board" className="mt-auto pt-2">
        <Button variant="secondary" size="sm" className="w-full py-1 text-xs h-7">
          Go to study
        </Button>
      </Link>
    </div>
  )
}

export default function AllTeams() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col h-full min-h-0 gap-3 p-3 md:p-4">
      {/* Header — same as StudyRoom: white bar, border-2, rounded-2xl, shadow-md */}
       <div className="flex items-center justify-between gap-3">
       <div className="flex items-center gap-2 min-w-0">
          <span className="text-neutral-600 shrink-0" aria-hidden>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <div>
            <h1 className="text-base md:text-lg font-bold text-neutral-900 truncate tracking-tight">MY TEAMS</h1>
            <p className="text-xs text-neutral-500 truncate hidden sm:block">Join the study room and focus together as much as you can.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-end min-w-0">
        <span className="px-2.5 py-1 text-sm border border-neutral-200 rounded-lg bg-neutral-50 font-semibold text-neutral-900">Study entries 4/5</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-sm border border-neutral-200 rounded-lg bg-neutral-50 font-semibold text-neutral-900">
            <svg className="w-3.5 h-3.5 text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 23c-4.97 0-9-2.58-9-7 0-2.9 1.5-5.2 3.8-6.5C5.5 8.5 4 6.1 4 3.5 4 1 7 0 9.5 0c2 0 3.5 1 4.2 2.5 1.5-1.5 3.5-2.5 5.8-2.5C21 0 24 1 24 3.5c0 2.6-1.5 5-2.8 6 2.3 1.3 3.8 3.6 3.8 6.5 0 4.42-4.03 7-9 7z" />
            </svg>
            Study streak 15 Days
          </span>
          <div className="relative w-full min-w-0 max-w-[12rem] sm:w-40">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 pr-2 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300"
              aria-label="Search"
            />
          </div>
          <button type="button" className="w-9 h-9 rounded-lg border border-neutral-200 bg-white text-neutral-600 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-400" aria-label="Settings">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <Link to="/notifications" className="w-9 h-9 rounded-lg border border-neutral-200 bg-white text-neutral-600 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-400" aria-label="Notifications">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Link>
          
        </div>
       </div>

      {/* Main: content panel + sidebar — responsive: stack on small, row on lg+ */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 gap-3 overflow-hidden">
        <main className="flex-1 min-w-0 flex flex-col p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-auto">
          <section className="mb-4">
            <h2 className="inline-block px-3 py-1.5 rounded-xl bg-neutral-700 text-white text-xs font-bold uppercase tracking-wide mb-2">
              My Teams
            </h2>
            <div className="relative flex items-center gap-2">
              <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto scroll-smooth py-1 min-h-[180px] [scrollbar-width:thin]"
              >
                {myTeamsData.map((t) => (
                  <MyTeamCard key={t.id} {...t} />
                ))}
              </div>
            </div>
          </section>
          <section>
            <h2 className="inline-block px-3 py-1.5 rounded-xl bg-neutral-700 text-white text-xs font-bold uppercase tracking-wide mb-2">
              Archived teams
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
              {archivedData.map((t) => (
                <div key={t.id} className="min-w-0">
                  <ArchivedCard {...t} />
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right sidebar — full width when stacked, fixed width on lg+ */}
        <aside className="w-full lg:w-80 lg:shrink-0 flex flex-col overflow-hidden bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between gap-2 pb-1.5 pt-4 px-4 border-b border-neutral-200">
            <h2 className="text-sm font-semibold text-neutral-900">Quick actions</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0 flex flex-col gap-4">
            <Link
              to="/team-management"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 hover:bg-neutral-100 transition-colors text-neutral-700 py-6 sm:py-8 px-4"
            >
              <span className="text-2xl font-bold leading-tight">+</span>
              <span className="text-sm font-bold mt-1">Create new team</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
