import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'highlight' | 'primary' | 'outline' | 'success' | 'warning' | 'error' | 'info' | 'streak' | 'milestone' | 'focus' | 'critical'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-neutral-900 border border-white/10',
  highlight: 'bg-[#fdffb6] text-black border-0',
  primary: 'bg-[#A896F2] text-black border-0',
  outline: 'bg-transparent text-neutral-500 border border-white/15',
  success: 'bg-success/25 text-success border border-success/40',
  warning: 'bg-warning/30 text-black border-0',
  error: 'bg-error/25 text-error border border-error/40',
  info: 'bg-accent/25 text-accent border border-accent/40',
  streak: 'bg-[#ff7f50] text-black border-0',
  milestone: 'bg-primary text-primary-foreground border-0',
  focus: 'bg-[var(--color-focus-area)] text-black border-0',
  critical: 'bg-error/30 text-error border border-error/50',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'default', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
        transition-colors duration-150 ease-out
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    />
  )
}
