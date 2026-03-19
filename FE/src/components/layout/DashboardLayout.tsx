import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar } from './DashboardSidebar'
import { MainBoard } from './MainBoard'

interface DashboardLayoutProps {
  children?: ReactNode
}

/**
 * Main app layout: sidebar, header, and content area.
 * - Sidebar (left, full height)
 * - Header (top of content area)
 * - Main board (scrollable content)
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-neutral-900 dark:to-black">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 m-2 gap-2">
        <DashboardHeader />
        <div className="flex min-h-0 flex-1 flex-col rounded-2xl overflow-hidden bg-white dark:bg-[var(--color-surface)] shadow-lg border-2 border-neutral-200 dark:border-neutral-700 transition-shadow duration-200 hover:shadow-[var(--shadow-5)]">
          <MainBoard>{children ?? <Outlet />}</MainBoard>
        </div>
      </div>
    </div>
  )
}
