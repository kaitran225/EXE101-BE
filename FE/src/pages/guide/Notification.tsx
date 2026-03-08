import { useState } from 'react'
import { Button, Card } from '../../components/ui'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'teams', label: 'Teams' },
] as const

type TabId = (typeof TABS)[number]['id']

type NotificationType = 'deadline' | 'team' | 'ai' | 'achievement' | 'message'

type NotificationItem = {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  priority?: boolean
  unread?: boolean
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Biology Quiz Deadline',
    description: 'Your "Cell Division" quiz is closing in 4 hours. Don\'t forget to submit your final answers.',
    time: '2h ago',
    priority: true,
  },
  {
    id: '2',
    type: 'team',
    title: 'Team Update: Physics Project',
    description: 'Sarah uploaded a new draft of the "Thermodynamics" research paper to the group workspace.',
    time: '5h ago',
  },
  {
    id: '3',
    type: 'ai',
    title: 'AI Study Insight',
    description: 'Based on your last session, you might want to review "Organic Chemistry" concepts before the exam.',
    time: 'Yesterday',
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'You\'ve earned the "Early Bird" badge for completing 5 focus sessions before 8:00 AM.',
    time: 'Yesterday',
  },
  {
    id: '5',
    type: 'message',
    title: 'New Message: Calculus Group',
    description: 'Alex: "Does anyone have the notes from Tuesday\'s lecture on integrals?"',
    time: '2 days ago',
    unread: true,
  },
]

function getIcon(type: NotificationType) {
  const base = 'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0'
  switch (type) {
    case 'deadline':
      return (
        <span className={`${base} bg-amber-100 text-amber-700`} aria-hidden>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      )
    case 'team':
      return (
        <span className={`${base} bg-sky-100 text-sky-700`} aria-hidden>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
      )
    case 'ai':
      return (
        <span className={`${base} bg-violet-100 text-violet-700`} aria-hidden>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </span>
      )
    case 'achievement':
      return (
        <span className={`${base} bg-amber-100 text-amber-700`} aria-hidden>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </span>
      )
    case 'message':
      return (
        <span className={`${base} bg-emerald-100 text-emerald-700`} aria-hidden>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </span>
      )
  }
}

function filterByTab(items: NotificationItem[], tab: TabId): NotificationItem[] {
  if (tab === 'all') return items
  if (tab === 'upcoming') return items.filter((n) => n.type === 'deadline' || n.priority)
  if (tab === 'teams') return items.filter((n) => n.type === 'team' || n.type === 'message')
  return items
}

export default function Notification() {
  const [tab, setTab] = useState<TabId>('all')
  const filtered = filterByTab(NOTIFICATIONS, tab)

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Notification Board</h1>
          <p className="text-neutral-600 mt-1">Don&apos;t miss out on study announcements and group activities.</p>
        </div>
        <button
          type="button"
          className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 transition-colors"
          aria-label="Notification settings"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <div className="flex gap-2 border-b border-neutral-200 pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-sky-600 text-white'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {filtered.map((n) => (
          <li key={n.id}>
            <Card
              className={`p-4 flex gap-4 items-start border-2 transition-colors ${
                n.unread ? 'bg-neutral-50 border-neutral-200' : 'border-neutral-200'
              }`}
            >
              {getIcon(n.type)}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-neutral-900">{n.title}</h3>
                <p className="text-sm text-neutral-600 mt-1">{n.description}</p>
                {n.priority && (
                  <span className="inline-block mt-2 text-xs font-semibold text-amber-600">Priority</span>
                )}
              </div>
              <span className="text-xs font-medium text-neutral-500 shrink-0 px-2 py-1 rounded bg-neutral-100">
                {n.time}
              </span>
            </Card>
          </li>
        ))}
      </ul>

      {filtered.length > 0 && (
        <div className="flex justify-center pt-2">
          <Button variant="primary" size="md">Show older notifications</Button>
        </div>
      )}
    </div>
  )
}
