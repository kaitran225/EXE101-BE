import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'default' | 'ghost' | 'primary' | 'tonal'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  default: 'bg-gradient-to-b from-white to-neutral-50 dark:from-[var(--color-surface)] dark:to-neutral-800/10 border border-[var(--color-charcoal)] text-neutral-700 dark:text-neutral-600 hover:shadow-[var(--shadow-3)] hover:bg-neutral-50 dark:hover:bg-neutral-700',
  ghost: 'bg-transparent border border-transparent text-neutral-600 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-900',
  primary: 'bg-gradient-to-r from-primary via-accent to-blue border border-primary/40 text-primary-foreground hover:shadow-[var(--shadow-6)] hover:opacity-95',
  tonal: 'bg-accent-muted border border-primary/25 text-primary hover:bg-primary/10 hover:shadow-[var(--shadow-3)]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  variant?: Variant
  size?: Size
}

export function IconButton({ icon, label, variant = 'default', size = 'md', className = '', ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary hover:scale-[1.03] active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {icon}
    </button>
  )
}
