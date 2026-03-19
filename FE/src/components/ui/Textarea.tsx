import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2)}`
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={textareaId} className="label-study">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-3 bg-gradient-to-b from-white to-neutral-50 dark:from-[var(--color-surface)] dark:to-neutral-100/70 border border-[var(--color-charcoal)] rounded-[var(--radius-card)]
          text-neutral-900 dark:text-neutral-900 placeholder:text-neutral-500 dark:placeholder:text-neutral-500
          transition-colors duration-150 ease-out transition-shadow duration-150
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-[var(--shadow-3)]
          disabled:opacity-70 disabled:bg-neutral-100 dark:disabled:bg-[var(--color-surface)] dark:disabled:text-neutral-500 dark:disabled:placeholder:text-neutral-500
          min-h-[120px] resize-y
          ${error ? 'border-error ring-1 ring-error' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
