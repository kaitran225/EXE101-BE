import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiBotIcon, Button, IconButton } from '../common'
import { useAuth } from '../../contexts/AuthContext'
import type { UserRole } from '../../mocks/auth'

const userNavItems = [
  { to: '/dashboard', label: 'Home' },
  { to: '/study-rooms', label: 'Study Rooms' },
  { to: '/meetings', label: 'Meetings' },
  { to: '/teams', label: 'Teams' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/subscription', label: 'Subscription' },
  { to: '/shop', label: 'Shop' },
  { to: '/meet-ai', label: 'Together AI' },
] as const

const adminNavItems = [
  { to: '/admin', label: 'Admin Home' },
  { to: '/admin/users', label: 'Admin Users' },
  { to: '/admin/account', label: 'Admin Account' },
] as const

const iconKeys: Array<'home' | 'study' | 'meetings' | 'teams' | 'calendar' | 'gift' | 'shop' | 'ai' | 'admin' | 'users' | 'settings'> = [
  'home', 'study', 'meetings', 'teams', 'calendar', 'gift', 'shop', 'ai',
]

function NavIcon({ icon }: { icon: (typeof iconKeys)[number] }) {
  const iconClass = 'w-5 h-5 flex-shrink-0'
  const icons = {
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
    meetings: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
    ai: <AiBotIcon className="w-6 h-6 flex-shrink-0" />,
    admin: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    users: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="3.5" />
        <path d="M20 8v6M17 11h6" />
      </svg>
    ),
    settings: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V22a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.36.48.57 1.08.6 1.7.03.62-.12 1.24-.44 1.76-.32.52-.8.94-1.36 1.19-.56.25-1.17.34-1.76.25" />
      </svg>
    ),
  }
  return icons[icon]
}

export function DashboardSidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const role = (user?.role ?? 'USER') as UserRole
  const navItems = role === 'ADMIN' ? adminNavItems : userNavItems
  const navIcons = role === 'ADMIN' ? (['admin', 'users', 'settings'] as const) : iconKeys
  const homePath = role === 'ADMIN' ? '/admin' : '/dashboard'

  return (
    <aside
      className={`relative h-full flex flex-col flex-shrink-0 bg-[var(--color-background)] border-r border-[var(--color-border)] text-white transition-[width] ${collapsed ? 'w-14' : 'w-56'
        }`}
      aria-label="Dashboard navigation"
    >
      <div className="p-2.5 flex flex-col gap-1 flex-1 min-h-0 overflow-hidden">
        <Link
          to={homePath}
          className={`flex items-center p-1.5 rounded-xl hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors duration-150 ${collapsed ? 'justify-center' : ''}`}
          aria-label="App home"
        >
          <div className="flex h-10 items-center justify-center">
            <img src="/together/horizontal-icon.svg" alt="Together" className="h-7 w-auto flex-shrink-0" />
          </div>
        </Link>
        <nav className="flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto" aria-label="Main">
          {navItems.map(({ to, label }, i) => {
            const active =
              location.pathname === to ||
              (to !== homePath && location.pathname.startsWith(to + '/')) ||
              (to === homePath && location.pathname === homePath)
            return (
              <Link
                key={`${to}-${label}`}
                to={to}
                title={label}
                className={`self-stretch flex items-center gap-3 rounded-lg py-2 transition-colors duration-150 ${collapsed ? 'justify-center px-2' : 'justify-start px-2.5'
                  } ${active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-900'
                  }`}
              >
                <NavIcon icon={navIcons[i]} />
                {!collapsed && (
                  <span className={`text-sm font-medium truncate ${active ? 'font-semibold' : ''}`}>{label}</span>
                )}
              </Link>
            )
          })}
        </nav>
      <div className="pt-4 border-t border-neutral-700 space-y-2">
          {collapsed ? (
            <Link
              to="/profile"
              className="flex justify-center p-2 rounded-xl hover:bg-neutral-700 transition-colors duration-150"
              aria-label="Go to profile"
            >
              <div className="w-7 h-7 rounded-full bg-neutral-600 flex-shrink-0" />
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 py-1.5 px-2 rounded-xl hover:bg-neutral-700 transition-colors duration-150"
                aria-label="Go to profile"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">{user?.fullName ?? 'You'}</p>
                  <p className="text-[10px] text-neutral-400">Level 24 · #777</p>
                </div>
              </Link>
              <Button
                type="button"
                onClick={logout}
                variant="ghost"
                size="sm"
                className="w-full !justify-start text-left text-xs font-semibold px-2 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Peel tab: outside overflow-hidden so both right corners stay rounded */}
      <IconButton
        type="button"
        onClick={() => setCollapsed((c: boolean) => !c)}
        className="absolute right-0 bottom-6 w-8 h-11 rounded-l-none rounded-tr-2xl rounded-br-2xl bg-neutral-800 text-neutral-300 transition-all duration-200 active:scale-95 -translate-y-1/2 translate-x-full z-10 hover:bg-neutral-700 hover:text-white"
        label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        icon={<svg className={`w-4 h-4 transition-transform duration-200 ease-out ${collapsed ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      />
    </aside>
  )
}
