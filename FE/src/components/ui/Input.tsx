import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  appearance?: 'default' | 'filled' | 'quiet'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, appearance = 'default', id, className = '', ...props },
  ref
) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`
  const appearanceClasses: Record<NonNullable<InputProps['appearance']>, string> = {
    default: 'bg-white dark:bg-[var(--color-surface)] border border-[var(--color-charcoal)]',
    filled: 'bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-100/70 dark:to-[var(--color-surface)] border border-[var(--color-charcoal)]',
    quiet: 'bg-transparent border-b border-[var(--color-charcoal)] rounded-none px-1',
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="label-study">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-[var(--radius-card)]
          ${appearanceClasses[appearance]}
          text-neutral-900 dark:text-neutral-900 placeholder:text-neutral-500 dark:placeholder:text-neutral-500
          transition-colors duration-150 ease-out transition-shadow duration-150
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:opacity-70 disabled:bg-neutral-100 dark:disabled:bg-[var(--color-surface)] dark:disabled:text-neutral-500 dark:disabled:placeholder:text-neutral-500
          min-h-[2.5rem]
          ${error ? 'border-error ring-1 ring-error' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})
