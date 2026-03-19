import { Link } from 'react-router-dom'
import { ThemeSwitch } from '../ThemeSwitch'

/**
 * Minimal auth header in the 40% content area: logo + actions only.
 */
export function AuthHeaderBar() {
  return (
    <header
      className="flex-shrink-0 flex items-center justify-between gap-2 px-4 py-2.5 bg-white/95 dark:bg-[var(--color-surface)]/95 backdrop-blur-xl border-2 border-neutral-200 dark:border-[var(--color-charcoal)] rounded-2xl shadow-sm"
      role="banner"
    >
      <Link to="/welcome" className="flex items-center gap-2 shrink-0">
        <span className="text-lg font-bold text-gradient-brand">∞</span>
        <span className="text-sm font-semibold text-accent">together</span>
      </Link>
      <div className="flex items-center gap-2.5">
        <ThemeSwitch />
        <Link to="/sign-up" className="text-sm font-medium text-neutral-600 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-900">
          Sign up
        </Link>
        <Link
          to="/welcome"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
        >
          Log in
        </Link>
      </div>
    </header>
  )
}
