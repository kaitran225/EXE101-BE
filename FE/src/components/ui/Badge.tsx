import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'highlight' | 'primary' | 'outline' | 'success' | 'warning' | 'error' | 'info'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-900 border border-[var(--color-charcoal)]',
  highlight: 'bg-accent-muted text-highlight border border-highlight/30',
  primary: 'bg-accent-muted text-primary border border-primary/30',
  outline: 'bg-white dark:bg-[var(--color-surface)] text-neutral-900 dark:text-neutral-900 border border-[var(--color-charcoal)]',
  success: 'bg-success/15 text-success border border-success/40',
  warning: 'bg-warning/15 text-warning border border-warning/40',
  error: 'bg-error/15 text-error border border-error/40',
  info: 'bg-blue/15 text-blue border border-blue/40',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'default', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide
        transition-colors duration-150 ease-out
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    />
  )
}
