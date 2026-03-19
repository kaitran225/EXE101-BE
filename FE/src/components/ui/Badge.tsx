import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'highlight' | 'primary' | 'outline' | 'success' | 'warning' | 'error' | 'info' | 'streak' | 'milestone' | 'focus' | 'critical'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gradient-to-r from-primary/15 via-white to-accent-muted/10 dark:from-primary/20 dark:via-[var(--color-surface)] dark:to-accent-muted/10 text-neutral-900 dark:text-neutral-900 border border-primary/20',
  highlight: 'bg-accent-muted text-highlight border border-highlight/30',
  primary: 'bg-accent-muted text-primary border border-primary/30',
  outline: 'bg-gradient-to-b from-white to-neutral-50 dark:from-[var(--color-surface)] dark:to-neutral-800/10 text-neutral-900 dark:text-neutral-900 border border-[var(--color-charcoal)]',
  success: 'bg-success/15 text-success border border-success/40',
  warning: 'bg-warning/15 text-warning border border-warning/40',
  error: 'bg-error/15 text-error border border-error/40',
  info: 'bg-blue/15 text-blue border border-blue/40',
  streak: 'bg-highlight/20 text-highlight border border-highlight/40',
  milestone: 'bg-primary/15 text-primary border border-primary/40',
  focus: 'bg-success/15 text-success border border-success/40',
  critical: 'bg-gradient-to-r from-error/25 to-warning/20 text-error border border-error/50 shadow-[var(--shadow-2)]',
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
