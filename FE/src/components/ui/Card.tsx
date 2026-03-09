import type { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional section heading inside the card */
  heading?: string
}

export function Card({ heading, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-neutral-800 border border-neutral-900/20 dark:border-neutral-600 rounded-[var(--radius-card)]
        shadow-[var(--shadow-card)]
        p-6 md:p-8
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {heading && (
        <h3 className="pb-2 mb-4 border-b border-neutral-200 dark:border-neutral-600 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {heading}
        </h3>
      )}
      {children}
    </div>
  )
}
