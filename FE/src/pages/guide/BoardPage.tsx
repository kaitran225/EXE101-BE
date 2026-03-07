import { useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui'

const TABS = [
  { id: 'scrum', label: 'Scrum Board' },
  { id: 'sprint', label: 'Sprint Board' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function BoardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = (searchParams.get('tab') as TabId) || 'scrum'
  const setTab = (id: TabId) => setSearchParams({ tab: id })

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 mb-4">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === id
                ? 'bg-neutral-900 text-white'
                : 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 'scrum' && <ScrumBoardContent />}
      {tab === 'sprint' && <SprintBoardContent />}
    </div>
  )
}

// --- Scrum Board (SP Project Alpha): Board | Timeline | Files, Kanban TO-DO | DOING | DONE | MISSED, AI Task Insights sidebar ---
const SCRUM_COLUMNS = [
  {
    id: 'todo',
    title: 'TO-DO',
    count: 3,
    tasks: [
      { tag: 'RESEARCH', title: 'Draft initial architecture diagram', due: 'Oct 12', assignee: 'JD' },
      { tag: 'DOCS', title: 'Write API specifications', due: 'Oct 15', assignee: 'AM' },
      { tag: 'BACKEND', title: 'Set up CI pipeline', due: 'Oct 18', assignee: 'SK' },
    ],
  },
  {
    id: 'doing',
    title: 'DOING',
    count: 1,
    tasks: [
      { tag: 'FRONTEND', title: 'Integrate AI Dashboard UI', status: 'In Progress', assignee: 'SK', flagged: true },
    ],
  },
  {
    id: 'done',
    title: 'DONE',
    count: 2,
    tasks: [
      { tag: 'BACKEND', title: 'Database schema refinement', completed: 'Oct 10', assignee: 'JD', done: true },
      { tag: 'DESIGN', title: 'User Interview Analysis', completed: 'Oct 09', assignee: 'AM', done: true },
    ],
  },
  {
    id: 'missed',
    title: 'MISSED',
    count: 1,
    tasks: [
      { tag: 'MEETING', title: 'Weekly Sync (Skipped)', status: 'OVERDUE 3D', assignee: 'AB', missed: true },
    ],
  },
]

function ScrumBoardContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 min-h-0">
      <div className="min-h-0 flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-neutral-900">SP Project Alpha</h2>
            <div className="flex gap-1">
              {['Board', 'Timeline', 'Files'].map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={`px-3 py-1.5 rounded text-sm font-medium ${i === 0 ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">JD AM SK +3</span>
            <Button variant="secondary" size="sm">Share</Button>
            <button type="button" className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50" aria-label="Settings">
              <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto pb-2 min-h-0">
          {SCRUM_COLUMNS.map((col) => (
            <div key={col.id} className="flex flex-col min-w-[260px] bg-neutral-50 rounded-xl border border-neutral-200 p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-neutral-900">{col.title} ({col.count})</span>
                <button type="button" className="p-1 text-neutral-400 hover:text-neutral-600" aria-label="Options">⋯</button>
              </div>
              <div className="space-y-2 flex-1 min-h-0 overflow-y-auto">
                {col.tasks.map((task, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-neutral-200 shadow-sm relative">
                    {task.flagged && <span className="absolute top-2 right-2 text-neutral-400" aria-hidden>🔖</span>}
                    {task.done && <span className="absolute top-2 right-2 text-emerald-500" aria-hidden>✓</span>}
                    {task.missed && <span className="absolute top-2 right-2 text-amber-500" aria-hidden>ⓘ</span>}
                    <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase bg-neutral-200 text-neutral-700 rounded mb-2">{task.tag}</span>
                    <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                    {task.due && <p className="text-xs text-neutral-500 mt-1">Due: {task.due}</p>}
                    {task.status && <p className="text-xs text-neutral-600 mt-1">{task.status}</p>}
                    {task.completed && <p className="text-xs text-neutral-500 mt-1">Completed: {task.completed}</p>}
                    <div className="mt-2 flex items-center gap-1">
                      <span className="w-6 h-6 rounded bg-neutral-300 text-[10px] font-bold flex items-center justify-center text-neutral-700">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 text-neutral-500 text-xs">+ Add Task</Button>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex flex-col bg-white rounded-xl border border-neutral-200 p-4 h-fit lg:max-h-[calc(100vh-12rem)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold uppercase tracking-wide text-neutral-900">AI Task Insights</span>
          <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18 9l-5 5-4-4-3 3" /></svg>
        </div>
        <p className="text-xs text-neutral-500 mb-4">Automated analysis of velocity & bottlenecks.</p>
        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase text-neutral-600 mb-2">Priority Alerts</h3>
          <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <span className="text-amber-600 mt-0.5">▲</span>
            <p className="text-xs text-amber-800">A potential bottleneck: &quot;Integrate AI Dashboard UI&quot; is delayed. Consider reassigning resources.</p>
          </div>
        </section>
        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase text-neutral-600 mb-2">Workload</h3>
          <ul className="space-y-2">
            {[{ name: 'James (JD)', pct: 85 }, { name: 'Anna (AM)', pct: 40 }, { name: 'Sam (SK)', pct: 95 }].map((u) => (
              <li key={u.name} className="flex items-center gap-2">
                <span className="text-xs text-neutral-700 w-24 truncate">{u.name}</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${u.pct}%` }} />
                </div>
                <span className="text-[10px] font-medium text-neutral-600 w-8">{u.pct}%</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase text-neutral-600 mb-2">Suggestions</h3>
          <ul className="space-y-2 text-xs text-neutral-700">
            <li className="flex gap-2">☑ Projected completion Oct 24.</li>
            <li className="flex gap-2">👤 Anna has capacity. Assign &quot;Database schema&quot; review.</li>
          </ul>
        </section>
        <Button variant="primary" size="sm" className="w-full">Generate Report</Button>
      </aside>
    </div>
  )
}

// --- Sprint Board: breadcrumb, SPRINT BOARD ACTIVE, 12 Tasks / 4 Members / 2 Days left, Task Board | Members, Start meeting / New Task, TO DO | IN PROGRESS | REVIEW | DONE, Recent Files + Team + AI Assistant ---
const SPRINT_COLUMNS = [
  {
    id: 'todo',
    title: 'TO DO',
    tasks: [
      { tag: 'DESIGN', title: 'Homepage Wireframe', desc: 'Create low fidelity wireframes for the new landing page structure.', due: 'Due tomorrow', assignee: 'A' },
      { tag: 'RESEARCH', title: 'Competitor Analysis', assignee: 'B' },
    ],
  },
  {
    id: 'progress',
    title: 'IN PROGRESS',
    tasks: [
      { tag: 'DEV', title: 'Setup React Repo', desc: 'Initialize project with Vite and Tailwind configuration.', progress: 60, assignee: 'C', status: 'In review' },
    ],
  },
  {
    id: 'review',
    title: 'REVIEW',
    tasks: [
      { tag: 'CONTENT', title: 'Copywriting Draft', desc: 'First pass at the About Us page text.', assignee: 'D', needsFeedback: true },
    ],
  },
  {
    id: 'done',
    title: 'DONE',
    tasks: [
      { title: 'Kickoff Meeting', assignee: 'A' },
    ],
  },
]

function SprintBoardContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 min-h-0">
      <div className="min-h-0 flex flex-col">
        <p className="text-xs text-neutral-500 mb-1">Workspace / Team Alpha / Q4 Goals</p>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-neutral-900">Sprint Board</h2>
            <span className="px-2.5 py-1 bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-full">Active</span>
            <div className="flex items-center gap-4 text-xs text-neutral-600">
              <span className="flex items-center gap-1">● 12 Tasks</span>
              <span className="flex items-center gap-1">● 4 Members</span>
              <span className="flex items-center gap-1">● 2 Days left</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm">Start meeting</Button>
            <Button variant="secondary" size="sm">New Task</Button>
          </div>
        </div>
        <div className="flex gap-2 border-b border-neutral-200 pb-2 mb-4">
          <button type="button" className="px-3 py-1.5 rounded bg-neutral-900 text-white text-sm font-medium">Task Board</button>
          <button type="button" className="px-3 py-1.5 rounded text-sm font-medium text-neutral-600 hover:bg-neutral-100">Members</button>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto pb-2 min-h-0">
          {SPRINT_COLUMNS.map((col) => (
            <div key={col.id} className="flex flex-col min-w-[240px] bg-neutral-50 rounded-xl border border-neutral-200 p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-neutral-900">{col.title}</span>
                <button type="button" className="p-1 text-neutral-400 hover:text-neutral-600" aria-label="Add">+</button>
              </div>
              <div className="space-y-2 flex-1 min-h-0 overflow-y-auto">
                {col.tasks.map((task, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-neutral-200 shadow-sm">
                    {task.tag && <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase bg-neutral-200 text-neutral-700 rounded mb-2">{task.tag}</span>}
                    <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                    {task.desc && <p className="text-xs text-neutral-600 mt-1">{task.desc}</p>}
                    {task.progress != null && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-neutral-300 text-[10px] font-bold flex items-center justify-center text-neutral-700">{task.assignee}</span>
                      <div className="flex items-center gap-1">
                        {task.due && <span className="text-[10px] text-neutral-500">{task.due}</span>}
                        {task.status && <span className="text-[10px] text-neutral-600">{task.status}</span>}
                        {task.needsFeedback && <span className="px-1.5 py-0.5 text-[10px] font-medium border border-amber-400 text-amber-700 rounded">Needs feedback</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex flex-col bg-white rounded-xl border border-neutral-200 p-4 h-fit lg:max-h-[calc(100vh-12rem)] overflow-y-auto space-y-6">
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-neutral-900">Recent Files</h3>
            <button type="button" className="text-xs text-neutral-500 hover:text-neutral-700">View All</button>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-neutral-700">
              <span className="text-neutral-400">📄</span> project_spec_v2.pdf <span className="text-[10px] text-neutral-400">2h ago</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-neutral-700">
              <span className="text-neutral-400">🖼</span> moodboard_final.png <span className="text-[10px] text-neutral-400">5h ago</span>
            </li>
          </ul>
        </section>
        <section>
          <h3 className="text-xs font-bold uppercase tracking-wide text-neutral-900 mb-2">Team Members <span className="text-neutral-500 font-normal">4/5 Active</span></h3>
          <ul className="space-y-2">
            {['Alice Chen, Product Designer', 'Bob Smith, Frontend Dev', 'Charlie Kim, Backend Dev'].map((line) => (
              <li key={line} className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0" />
                <span className="text-sm text-neutral-700">{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
          <h3 className="text-xs font-bold uppercase tracking-wide text-neutral-900 mb-2 flex items-center gap-1">
            AI Assistant <span className="text-indigo-500">◆</span>
          </h3>
          <p className="text-xs text-neutral-700 mb-2">Suggested task: Update documentation based on recent code changes.</p>
          <Button variant="primary" size="sm">Accept</Button>
        </section>
      </aside>
    </div>
  )
}
