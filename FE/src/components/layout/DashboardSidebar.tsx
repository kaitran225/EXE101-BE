import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/profile', label: 'Profile' },
  { to: '/dashboard', label: 'Home' },
  { to: '/study-rooms', label: 'Study Rooms' },
  { to: '/teams', label: 'Teams' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/subscription', label: 'Subscription' },
  { to: '/shop', label: 'Shop' },
  { to: '/meet-ai', label: 'Together AI' },
] as const

const iconKeys: Array<'profile' | 'home' | 'study' | 'teams' | 'calendar' | 'gift' | 'shop' | 'ai'> = [
  'profile', 'home', 'study', 'teams', 'calendar', 'gift', 'shop', 'ai',
]

function NavIcon({ icon }: { icon: (typeof iconKeys)[number] }) {
  const iconClass = 'w-5 h-5 flex-shrink-0'
  const icons = {
    profile: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20v-2a5 5 0 0 1 10 0v2" />
      </svg>
    ),
    home: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 10l8-6 8 6v10h-6v-6H10v6H4z" />
      </svg>
    ),
    study: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H2" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a2 2 0 0 0 2 2h8" />
      </svg>
    ),
    teams: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    calendar: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    gift: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    shop: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    ai: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  }
  return icons[icon]
}

export function DashboardSidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`h-full flex flex-col flex-shrink-0 bg-neutral-800 text-white transition-[width] ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
      aria-label="Dashboard navigation"
    >
      <div className="p-3 flex flex-col gap-1 flex-1 min-h-0 overflow-hidden">
        <Link
          to="/dashboard"
          className={`flex items-center p-2 rounded-xl hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors duration-150 ${collapsed ? 'justify-center' : ''}`}
          aria-label="App home"
        >
          <span className="text-xl font-bold text-violet-400 flex-shrink-0">∞</span>
          {!collapsed && <span className="ml-2 text-sm font-bold text-white truncate">together</span>}
        </Link>
        <nav className="flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto" aria-label="Main">
          {navItems.map(({ to, label }, i) => {
            const active =
              location.pathname === to ||
              (to !== '/dashboard' && location.pathname.startsWith(to + '/')) ||
              (to === '/dashboard' && location.pathname === '/dashboard')
            return (
              <Link
                key={`${to}-${label}`}
                to={to}
                title={label}
                className={`self-stretch flex items-center gap-3 rounded-xl py-2.5 transition-colors duration-150 ${
                  collapsed ? 'justify-center px-2' : 'justify-start px-3'
                } ${
                  active
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-neutral-400 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                <NavIcon icon={iconKeys[i]} />
                {!collapsed && (
                  <span className={`text-sm font-medium truncate ${active ? 'font-semibold' : ''}`}>{label}</span>
                )}
              </Link>
            )
          })}
        </nav>
        {!collapsed && (
          <div className="pt-4 border-t border-neutral-600 space-y-3">
            <div>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-2 px-2">Global ranking</p>
              <div className="flex items-center gap-2 py-1.5 px-2">
                <div className="w-7 h-7 rounded-full bg-neutral-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">You</p>
                  <p className="text-[10px] text-neutral-400">Level 24 · #777</p>
                </div>
              </div>
            </div>
            <div className="px-2">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-1.5">Next reward 75%</p>
              <div className="h-2 w-full bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-violet-500 rounded-full" />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">Level 24 + Premium</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c: boolean) => !c)}
          className="mt-2 p-2 rounded-xl text-neutral-400 hover:bg-neutral-700 hover:text-white self-center transition-colors duration-150 active:scale-95"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ease-out ${collapsed ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
