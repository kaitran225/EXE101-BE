import type { HTMLAttributes, ReactNode } from 'react'

type AlertVariant = 'success' | 'warning' | 'error' | 'info'

const variantClasses: Record<AlertVariant, string> = {
  success: 'border-success/50 bg-gradient-to-r from-success/15 to-success/5 text-neutral-900 dark:text-neutral-900 shadow-[var(--shadow-2)]',
  warning: 'border-warning/50 bg-gradient-to-r from-warning/15 to-warning/5 text-neutral-900 dark:text-neutral-900 shadow-[var(--shadow-2)]',
  error: 'border-error/50 bg-gradient-to-r from-error/15 to-error/5 text-neutral-900 dark:text-neutral-900 shadow-[var(--shadow-2)]',
  info: 'border-blue/50 bg-gradient-to-r from-blue/15 to-blue/5 text-neutral-900 dark:text-neutral-900 shadow-[var(--shadow-2)]',
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  icon?: ReactNode
}

export function Alert({ variant = 'info', title, icon, children, className = '', ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border p-3 ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      <div className="flex items-start gap-2">
        {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
        <div className="min-w-0">
          {title && <p className="text-sm font-semibold mb-0.5">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}
