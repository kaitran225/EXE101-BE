import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar } from './DashboardSidebar'
import { MainBoard } from './MainBoard'

interface GuideLayoutProps {
  children?: ReactNode
}

/**
 * Dashboard layout: 3 separate elements.
 * - Sidebar (left, full height)
 * - Header (separate, top of content area)
 * - Main board (scrollable content in its own panel)
 */
export function GuideLayout({ children }: GuideLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-neutral-800">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 m-2 gap-2">
        <DashboardHeader />
        <div className="flex min-h-0 flex-1 flex-col rounded-2xl overflow-hidden bg-white shadow-sm border-2 border-neutral-200 transition-shadow duration-200 hover:shadow">
          <MainBoard>{children ?? <Outlet />}</MainBoard>
        </div>
      </div>
    </div>
  )
}
