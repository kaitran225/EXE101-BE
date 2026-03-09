import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'highlight' | 'primary' | 'outline'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-900 border border-neutral-200',
  highlight: 'bg-accent-muted text-highlight border border-highlight/30',
  primary: 'bg-accent-muted text-primary border border-primary/30',
  outline: 'bg-white text-neutral-900 border border-neutral-900',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'default', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    />
  )
}
