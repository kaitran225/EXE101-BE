import { Link } from 'react-router-dom'

/**
 * Minimal auth header in the 40% content area: logo + actions only.
 */
export function AuthHeaderBar() {
  return (
    <header
      className="flex-shrink-0 flex items-center justify-between gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl border border-neutral-200/80 rounded-2xl shadow-sm"
      role="banner"
    >
      <Link to="/welcome" className="flex items-center gap-2 shrink-0">
        <span className="text-lg font-bold bg-gradient-to-r from-violet-500 to-sky-400 bg-clip-text text-transparent">∞</span>
        <span className="text-sm font-semibold text-sky-500">together</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/sign-up" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
          Sign up
        </Link>
        <Link
          to="/welcome"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium bg-sky-400 text-white hover:bg-sky-500"
        >
          Log in
        </Link>
      </div>
    </header>
  )
}
