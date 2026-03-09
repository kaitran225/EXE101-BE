import type { HTMLAttributes } from 'react'

type ShadowLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional section heading inside the card */
  heading?: string
  /** Shadow variant 1-10. Default uses --shadow-card. */
  shadow?: ShadowLevel
}

export function Card({ heading, shadow, className = '', style, children, ...props }: CardProps) {
  const shadowStyle = shadow ? { boxShadow: `var(--shadow-${shadow})` } : undefined
  return (
    <div
      className={`
        bg-white dark:bg-neutral-800 border border-[var(--color-charcoal)] rounded-[var(--radius-card)]
        ${!shadow ? 'shadow-[var(--shadow-card)]' : ''}
        p-6 md:p-8
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ ...style, ...shadowStyle }}
      {...props}
    >
      {heading && (
        <h3 className="pb-2 mb-4 border-b border-[var(--color-charcoal)] text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {heading}
        </h3>
      )}
      {children}
    </div>
  )
}
