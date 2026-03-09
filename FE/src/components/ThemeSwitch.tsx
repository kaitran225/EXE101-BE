import { useTheme } from '../contexts/ThemeContext'

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-white dark:bg-[var(--color-surface)] dark:border-neutral-600 text-neutral-700 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-neutral-900"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <span aria-hidden className="text-base leading-none">☀</span>
      ) : (
        <span aria-hidden className="text-base leading-none">☽</span>
      )}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
