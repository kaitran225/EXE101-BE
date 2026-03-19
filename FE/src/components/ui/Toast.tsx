import type { HTMLAttributes, ReactNode } from 'react'
import { IconButton } from './IconButton'
import { CloseIcon } from '../icons'

type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

const variantClasses: Record<ToastVariant, string> = {
  default: 'border-[var(--color-charcoal)] bg-white dark:bg-[var(--color-surface)] shadow-[var(--shadow-3)]',
  success: 'border-success/50 bg-gradient-to-r from-success/15 to-success/5 shadow-[var(--shadow-3)]',
  warning: 'border-warning/50 bg-gradient-to-r from-warning/15 to-warning/5 shadow-[var(--shadow-3)]',
  error: 'border-error/50 bg-gradient-to-r from-error/15 to-error/5 shadow-[var(--shadow-3)]',
  info: 'border-blue/50 bg-gradient-to-r from-blue/15 to-blue/5 shadow-[var(--shadow-3)]',
}

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant
  icon?: ReactNode
  action?: ReactNode
  onClose?: () => void
}

export function Toast({ variant = 'default', icon, action, onClose, className = '', children, ...props }: ToastProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${variantClasses[variant]} ${className}`.trim()} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="text-sm font-medium text-neutral-900 dark:text-neutral-900 flex-1">{children}</div>
      {action}
      {onClose && (
        <IconButton
          icon={<CloseIcon className="w-4 h-4" />}
          label="Close"
          size="sm"
          variant="ghost"
          onClick={onClose}
        />
      )}
    </div>
  )
}
