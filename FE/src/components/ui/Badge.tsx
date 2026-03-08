import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'highlight' | 'primary' | 'outline'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-900 border border-neutral-200',
  highlight: 'bg-orange-100 text-orange-600 border border-orange-200',
  primary: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
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
