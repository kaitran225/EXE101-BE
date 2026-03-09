import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, DocumentIcon } from '../../components/common'
import { TaskEditSidebar, type TaskForEdit } from '../../components/TaskEditSidebar'

// Scrum task: different columns have different optional fields
type ScrumTask = {
  tag: string
  title: string
  assignee: string
  startDate?: string
  endDate?: string
  due?: string
  status?: string
  completed?: string
  priority?: string
  estimate?: string
  reporter?: string
  flagged?: boolean
  done?: boolean
  missed?: boolean
}

// Sprint task: optional tag, desc, dates, progress, status, needsFeedback
type SprintTask = {
  title: string
  assignee: string
  tag?: string
  desc?: string
  startDate?: string
  endDate?: string
  due?: string
  progress?: number
  status?: string
  priority?: string
  estimate?: string
  reporter?: string
  completed?: string
  needsFeedback?: boolean
}

const TABS = [
  { id: 'management', label: 'Team management' },
  { id: 'scrum', label: 'Scrum Board' },
  { id: 'sprint', label: 'Sprint Board' },
] as const

type TabId = (typeof TABS)[number]['id']

const TEAM_MEMBERS: { id: string; name: string; role?: string; skills: string[]; code: string }[] = [
  { id: 'alex', name: 'Alex', role: 'Owner', skills: ['Product', 'User Research', 'Roadmap'], code: 'AM' },
  { id: 'jordan', name: 'Jordan', skills: ['Frontend', 'React', 'UI/UX'], code: 'JD' },
  { id: 'sam', name: 'Sam', skills: ['Backend', 'API', 'Database'], code: 'SK' },
  { id: 'casey', name: 'Casey', skills: ['QA', 'Automation', 'Documentation'], code: 'AB' },
]

function getAssigneeDisplay(assigneeCode: string): { name: string; skills: string[] } | undefined {
  const m = TEAM_MEMBERS.find((mem) => mem.code === assigneeCode)
  return m ? { name: m.name, skills: m.skills } : undefined
}

export default function BoardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = (searchParams.get('tab') as TabId) || 'management'
  const setTab = (id: TabId) => setSearchParams({ tab: id })

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-1.5 border-b border-neutral-200 pb-2 mb-2">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              tab === id
                ? 'bg-neutral-900 text-white'
                : 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 'management' && <TeamManagementContent members={TEAM_MEMBERS} />}
      {tab === 'scrum' && <ScrumBoardContent />}
      {tab === 'sprint' && <SprintBoardContent />}
    </div>
  )
}

function TeamManagementContent({ members }: { members: typeof TEAM_MEMBERS }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-neutral-900">Team management</h1>
      <Card heading="Members" className="border-2 border-neutral-200 shadow-sm">
      <ul className="space-y-0">
        {members.map((m, i) => (
          <li
            key={m.id}
            className={`flex justify-between items-start gap-4 py-3 ${i < members.length - 1 ? 'border-b border-neutral-100' : ''}`}
          >
            <div className="min-w-0 flex-1">
              <span className="text-neutral-900 font-medium">
                {m.name}
                {m.role && <span className="text-neutral-500 font-normal"> ({m.role})</span>}
              </span>
              {m.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {m.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 shrink-0">
              Edit
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="secondary" size="sm" className="mt-4 border-2 border-neutral-900">
        Invite member
      </Button>
    </Card>
    </div>
  )
}

// --- Scrum Board (SP Project Alpha): Board | Timeline | Files, Kanban TO-DO | DOING | DONE | MISSED, Task edit sidebar ---
const SCRUM_COLUMNS_INIT: { id: string; title: string; tasks: ScrumTask[] }[] = [
  {
    id: 'todo',
    title: 'TO-DO',
    tasks: [
      { tag: 'RESEARCH', title: 'Draft initial architecture diagram', startDate: 'Oct 1', endDate: 'Oct 12', due: 'Oct 12', assignee: 'JD', priority: 'High', estimate: '2d', reporter: 'AM' },
      { tag: 'DOCS', title: 'Write API specifications', startDate: 'Oct 5', due: 'Oct 15', assignee: 'AM', priority: 'Medium', estimate: '1d' },
      { tag: 'BACKEND', title: 'Set up CI pipeline', due: 'Oct 18', assignee: 'SK', priority: 'High', estimate: '3d' },
    ],
  },
  {
    id: 'doing',
    title: 'DOING',
    tasks: [
      { tag: 'FRONTEND', title: 'Integrate AI Dashboard UI', status: 'In Progress', assignee: 'SK', flagged: true, startDate: 'Oct 8', endDate: 'Oct 20', due: 'Oct 20', priority: 'Urgent', estimate: '5d', reporter: 'JD' },
    ],
  },
  {
    id: 'done',
    title: 'DONE',
    tasks: [
      { tag: 'BACKEND', title: 'Database schema refinement', completed: 'Oct 10', assignee: 'JD', done: true, startDate: 'Oct 1', endDate: 'Oct 10', due: 'Oct 10', priority: 'High', estimate: '1.5d', reporter: 'AM' },
      { tag: 'DESIGN', title: 'User Interview Analysis', completed: 'Oct 09', assignee: 'AM', done: true, startDate: 'Oct 3', endDate: 'Oct 9', due: 'Oct 9', reporter: 'SK' },
    ],
  },
  {
    id: 'missed',
    title: 'MISSED',
    tasks: [
      { tag: 'MEETING', title: 'Weekly Sync (Skipped)', status: 'OVERDUE 3D', assignee: 'AB', missed: true },
    ],
  },
]

function scrumTaskToForEdit(t: ScrumTask): TaskForEdit {
  return { ...t, desc: undefined }
}

function ScrumBoardContent() {
  const [columns, setColumns] = useState(SCRUM_COLUMNS_INIT)
  const [selected, setSelected] = useState<{ task: ScrumTask; columnId: string; taskIndex: number } | null>(null)

  const handleSaveTask = (updated: TaskForEdit) => {
    if (!selected) return
    const { columnId, taskIndex } = selected
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t, i) =>
                i === taskIndex
                  ? {
                      ...t,
                      title: updated.title,
                      assignee: updated.assignee,
                      tag: updated.tag ?? t.tag,
                      startDate: updated.startDate,
                      endDate: updated.endDate,
                      due: updated.due,
                      status: updated.status,
                      completed: updated.completed,
                      priority: updated.priority,
                      estimate: updated.estimate,
                      reporter: updated.reporter,
                    }
                  : t
              ),
            }
          : col
      )
    )
    setSelected(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3 min-h-0">
      <div className="min-h-0 flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900">SP Project Alpha</h2>
            <div className="flex gap-0.5">
              {['Board', 'Timeline', 'Files'].map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={`px-2 py-1 rounded text-xs font-medium ${i === 0 ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-500">JD AM SK +3</span>
            <Button variant="secondary" size="sm" className="py-1 px-2 text-xs h-7">Share</Button>
            <button type="button" className="p-1.5 rounded-md border border-neutral-200 hover:bg-neutral-50" aria-label="Settings">
              <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 overflow-x-auto pb-1 min-h-0">
          {columns.map((col) => (
            <div key={col.id} className="flex flex-col min-w-[200px] bg-neutral-50 rounded-lg border border-neutral-200 p-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-neutral-900">{col.title} ({col.tasks.length})</span>
                <button type="button" className="p-0.5 text-neutral-400 hover:text-neutral-600 text-[10px]" aria-label="Options">⋯</button>
              </div>
              <div className="space-y-1.5 flex-1 min-h-0 overflow-y-auto">
                {col.tasks.map((task, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelected({ task, columnId: col.id, taskIndex: i })}
                    className="w-full text-left p-2 bg-white rounded-md border border-neutral-200 shadow-sm relative hover:border-neutral-300 transition-colors"
                  >
                    {task.flagged && (
                      <span className="absolute top-1 right-1 text-neutral-400" aria-hidden>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                      </span>
                    )}
                    {task.done && (
                      <span className="absolute top-1 right-1 text-emerald-500" aria-hidden>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                    {task.missed && (
                      <span className="absolute top-1 right-1 text-amber-500" aria-hidden>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </span>
                    )}
                    <span className="inline-block px-1 py-0.5 text-[9px] font-bold uppercase bg-neutral-200 text-neutral-700 rounded mb-1">{task.tag}</span>
                    <p className="text-xs font-medium text-neutral-900 leading-tight">{task.title}</p>
                    {task.due && <p className="text-[10px] text-neutral-500 mt-0.5">Due: {task.due}</p>}
                    {task.status && <p className="text-[10px] text-neutral-600 mt-0.5">{task.status}</p>}
                    {task.completed && <p className="text-[10px] text-neutral-500 mt-0.5">Done: {task.completed}</p>}
                    <div className="mt-1 flex items-center gap-1">
                      <span className="w-5 h-5 rounded bg-neutral-300 text-[9px] font-bold flex items-center justify-center text-neutral-700">{task.assignee}</span>
                    </div>
                  </button>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-1 text-neutral-500 text-[10px] py-1 h-6">+ Add Task</Button>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex flex-col min-h-[240px] lg:max-h-[calc(100vh-10rem)] overflow-hidden">
        {selected ? (
          <TaskEditSidebar
            task={scrumTaskToForEdit(selected.task)}
            onSave={handleSaveTask}
            onClose={() => setSelected(null)}
            statusOptions={['TO-DO', 'DOING', 'In Progress', 'DONE', 'MISSED', 'OVERDUE 3D']}
            assigneeDisplay={getAssigneeDisplay(selected.task.assignee)}
          />
        ) : (
          <div className="flex flex-col bg-white rounded-lg border border-neutral-200 p-3 h-full overflow-y-auto">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-900">AI Task Insights</span>
              <svg className="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18 9l-5 5-4-4-3 3" /></svg>
            </div>
            <p className="text-[10px] text-neutral-500 mb-2">Click a task to edit.</p>
            <section className="mb-2">
              <h3 className="text-[10px] font-bold uppercase text-neutral-600 mb-1">Priority Alerts</h3>
              <div className="flex gap-1.5 p-2 rounded-md bg-amber-50 border border-amber-200">
                <span className="text-amber-600 text-[10px]">▲</span>
                <p className="text-[10px] text-amber-800">Bottleneck: &quot;Integrate AI Dashboard UI&quot; delayed.</p>
              </div>
            </section>
            <section className="mb-2">
              <h3 className="text-[10px] font-bold uppercase text-neutral-600 mb-1">Workload</h3>
              <ul className="space-y-1">
                {[{ name: 'James (JD)', pct: 85 }, { name: 'Anna (AM)', pct: 40 }, { name: 'Sam (SK)', pct: 95 }].map((u) => (
                  <li key={u.name} className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neutral-700 w-16 truncate">{u.name}</span>
                    <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${u.pct}%` }} />
                    </div>
                    <span className="text-[9px] font-medium text-neutral-600 w-6">{u.pct}%</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mb-2">
              <h3 className="text-[10px] font-bold uppercase text-neutral-600 mb-1">Suggestions</h3>
              <ul className="space-y-0.5 text-[10px] text-neutral-700">
                <li className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Completion Oct 24.
                </li>
                <li className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Anna free for review.
                </li>
              </ul>
            </section>
            <Button variant="primary" size="sm" className="w-full py-1 text-xs h-7">Generate Report</Button>
          </div>
        )}
      </aside>
    </div>
  )
}

// --- Sprint Board: breadcrumb, SPRINT BOARD ACTIVE, Task Board | Members, TO DO | IN PROGRESS | REVIEW | DONE, Task edit sidebar ---
const SPRINT_COLUMNS_INIT: { id: string; title: string; tasks: SprintTask[] }[] = [
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

function sprintTaskToForEdit(t: SprintTask): TaskForEdit {
  return { ...t }
}

function SprintBoardContent() {
  const [columns, setColumns] = useState(SPRINT_COLUMNS_INIT)
  const [selected, setSelected] = useState<{ task: SprintTask; columnId: string; taskIndex: number } | null>(null)

  const handleSaveTask = (updated: TaskForEdit) => {
    if (!selected) return
    const { columnId, taskIndex } = selected
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t, i) =>
                i === taskIndex
                  ? {
                      ...t,
                      title: updated.title,
                      assignee: updated.assignee,
                      tag: updated.tag ?? t.tag,
                      desc: updated.desc ?? t.desc,
                      startDate: updated.startDate,
                      endDate: updated.endDate,
                      due: updated.due,
                      status: updated.status,
                      progress: updated.progress ?? t.progress,
                      priority: updated.priority,
                      estimate: updated.estimate,
                      reporter: updated.reporter,
                      completed: updated.completed,
                    }
                  : t
              ),
            }
          : col
      )
    )
    setSelected(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3 min-h-0">
      <div className="min-h-0 flex flex-col">
        <p className="text-[10px] text-neutral-500 mb-0.5">Workspace / Team Alpha / Q4 Goals</p>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-neutral-900">Sprint Board</h2>
            <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-700 text-[10px] font-semibold rounded-full">Active</span>
            <div className="flex items-center gap-2 text-[10px] text-neutral-600">
              <span>● {columns.reduce((acc, c) => acc + c.tasks.length, 0)} Tasks</span>
              <span>● 4 Members</span>
              <span>● 2 Days left</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="primary" size="sm" className="py-1 px-2 text-xs h-7">Start meeting</Button>
            <Button variant="secondary" size="sm" className="py-1 px-2 text-xs h-7">New Task</Button>
          </div>
        </div>
        <div className="flex gap-1 border-b border-neutral-200 pb-1.5 mb-2">
          <button type="button" className="px-2 py-1 rounded text-xs font-medium bg-neutral-900 text-white">Task Board</button>
          <button type="button" className="px-2 py-1 rounded text-xs font-medium text-neutral-600 hover:bg-neutral-100">Members</button>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 overflow-x-auto pb-1 min-h-0">
          {columns.map((col) => (
            <div key={col.id} className="flex flex-col min-w-[200px] bg-neutral-50 rounded-lg border border-neutral-200 p-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-neutral-900">{col.title}</span>
                <button type="button" className="p-0.5 text-neutral-400 hover:text-neutral-600 text-[10px]" aria-label="Add">+</button>
              </div>
              <div className="space-y-1.5 flex-1 min-h-0 overflow-y-auto">
                {col.tasks.map((task, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelected({ task, columnId: col.id, taskIndex: i })}
                    className="w-full text-left p-2 bg-white rounded-md border border-neutral-200 shadow-sm hover:border-neutral-300 transition-colors"
                  >
                    {task.tag && <span className="inline-block px-1 py-0.5 text-[9px] font-bold uppercase bg-neutral-200 text-neutral-700 rounded mb-1">{task.tag}</span>}
                    <p className="text-xs font-medium text-neutral-900 leading-tight">{task.title}</p>
                    {task.desc && <p className="text-[10px] text-neutral-600 mt-0.5 line-clamp-2">{task.desc}</p>}
                    {task.progress != null && (
                      <div className="mt-1">
                        <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="mt-1 flex items-center justify-between">
                      <span className="w-5 h-5 rounded-full bg-neutral-300 text-[9px] font-bold flex items-center justify-center text-neutral-700">{task.assignee}</span>
                      <div className="flex items-center gap-0.5">
                        {task.due && <span className="text-[9px] text-neutral-500">{task.due}</span>}
                        {task.status && <span className="text-[9px] text-neutral-600">{task.status}</span>}
                        {task.needsFeedback && <span className="px-1 py-0.5 text-[9px] font-medium border border-amber-400 text-amber-700 rounded">Feedback</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex flex-col min-h-[240px] lg:max-h-[calc(100vh-10rem)] overflow-hidden">
        {selected ? (
          <TaskEditSidebar
            task={sprintTaskToForEdit(selected.task)}
            onSave={handleSaveTask}
            onClose={() => setSelected(null)}
            statusOptions={['TO DO', 'IN PROGRESS', 'In review', 'REVIEW', 'DONE']}
            assigneeDisplay={getAssigneeDisplay(selected.task.assignee)}
          />
        ) : (
          <div className="flex flex-col bg-white rounded-lg border border-neutral-200 p-3 h-full overflow-y-auto space-y-3">
            <p className="text-[10px] text-neutral-500">Click a task to edit.</p>
            <section>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[10px] font-bold uppercase tracking-wide text-neutral-900">Recent Files</h3>
                <button type="button" className="text-[10px] text-neutral-500 hover:text-neutral-700">View All</button>
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                  <DocumentIcon className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                  project_spec_v2.pdf <span className="text-[9px] text-neutral-400">2h</span>
                </li>
                <li className="flex items-center gap-1.5 text-[10px] text-neutral-700">
                  <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  moodboard_final.png <span className="text-[9px] text-neutral-400">5h</span>
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-neutral-900 mb-1">Team <span className="text-neutral-500 font-normal">4/5</span></h3>
              <ul className="space-y-1">
                {['Alice Chen', 'Bob Smith', 'Charlie Kim'].map((line) => (
                  <li key={line} className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-neutral-200 flex-shrink-0" />
                    <span className="text-[10px] text-neutral-700">{line}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="p-2 rounded-md bg-neutral-50 border border-neutral-200">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-neutral-900 mb-1 flex items-center gap-0.5">
                AI Assistant <span className="text-indigo-500">◆</span>
              </h3>
              <p className="text-[10px] text-neutral-700 mb-1.5">Update documentation.</p>
              <Button variant="primary" size="sm" className="py-1 text-xs h-6">Accept</Button>
            </section>
          </div>
        )}
      </aside>
    </div>
  )
}
