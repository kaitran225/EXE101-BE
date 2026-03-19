import type { ReactNode } from 'react'
import { AuthSidebar } from './AuthSidebar'
import { AuthHeaderBar } from './AuthHeaderBar'

interface AuthLayoutProps {
  children: ReactNode
}

/**
 * Auth layout: 60% sidebar, 40% main. Single content zone (no nested card).
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen grid grid-cols-[6fr_4fr] overflow-hidden bg-neutral-900 dark:bg-black">
      <AuthSidebar />
      <div className="flex flex-col min-w-0 m-3 gap-3">
        <AuthHeaderBar />
        <div className="flex min-h-0 flex-1 flex-col rounded-2xl overflow-hidden bg-white/95 dark:bg-[var(--color-surface)] shadow-lg border-2 border-neutral-200 dark:border-[var(--color-charcoal)]">
          <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-100/70 dark:to-neutral-100/85 p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
