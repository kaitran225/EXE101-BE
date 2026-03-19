import type { HTMLAttributes } from 'react'

type ShadowLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type CardVariant = 'default' | 'interactive' | 'featured'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional section heading inside the card */
  heading?: string
  /** Shadow variant 1-10. Default uses --shadow-card. */
  shadow?: ShadowLevel
  variant?: CardVariant
}

export function Card({ heading, shadow, variant = 'default', className = '', style, children, ...props }: CardProps) {
  const shadowStyle = shadow ? { boxShadow: `var(--shadow-${shadow})` } : undefined
  const variantClasses: Record<CardVariant, string> = {
    default: '',
    interactive: 'hover:-translate-y-0.5 hover:shadow-[var(--shadow-6)]',
    featured: 'ring-1 ring-primary/25 bg-gradient-to-br from-accent-muted/45 via-white to-white dark:from-primary/15 dark:via-[var(--color-surface)] dark:to-[var(--color-surface)]',
  }
  return (
    <div
      className={`
        bg-gradient-to-b from-white to-neutral-50 dark:from-[var(--color-surface)] dark:to-neutral-800/30
        border border-[var(--color-charcoal)] rounded-[var(--radius-card)]
        ${!shadow ? 'shadow-[var(--shadow-card)]' : ''}
        p-6 md:p-8
        transition-all duration-200 ease-out hover:shadow-[var(--shadow-4)]
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ ...style, ...shadowStyle }}
      {...props}
    >
      {heading && (
        <h3 className="pb-2 mb-4 border-b border-[var(--color-charcoal)] text-lg font-bold text-neutral-900 dark:text-neutral-900">
          {heading}
        </h3>
      )}
      {children}
    </div>
  )
}
