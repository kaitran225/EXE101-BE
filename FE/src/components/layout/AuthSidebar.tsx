import { Link, useLocation } from 'react-router-dom'

/**
 * Auth-only sidebar (60% width). Clean promo + minimal nav.
 */
export function AuthSidebar() {
  const location = useLocation()

  return (
    <aside
      className="h-full flex flex-col bg-neutral-800 text-white min-w-0 overflow-auto"
      aria-label="Auth"
    >
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center min-h-0 flex-1">
        <Link
          to="/welcome"
          className="flex items-center gap-2 self-start mb-10"
          aria-label="together home"
        >
          <span className="text-2xl font-bold text-gradient-brand">∞</span>
          <span className="text-lg font-semibold text-vodka">together</span>
        </Link>
        <h1 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-4">
          Learn together. Progress together.
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mb-10">
          Together helps you stay motivated, study more effectively, and build real skills through social and personalized learning.
        </p>
        <nav className="flex items-center gap-4 pt-6 border-t border-neutral-600" aria-label="Auth">
          <Link
            to="/welcome"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/welcome' ? 'text-highlight' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Log in
          </Link>
          <Link
            to="/sign-up"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/sign-up' ? 'text-highlight' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign up
          </Link>
        </nav>
      </div>
    </aside>
  )
}
