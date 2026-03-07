import type { ReactNode } from 'react'

interface MainBoardProps {
  children?: ReactNode
}

export function MainBoard({ children }: MainBoardProps) {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-auto overflow-x-hidden bg-neutral-50/95 p-4 scroll-smooth md:p-6 md:py-8" id="main-board">
      <div className="min-h-full flex-1 flex flex-col">
        {children}
      </div>
    </main>
  )
}
