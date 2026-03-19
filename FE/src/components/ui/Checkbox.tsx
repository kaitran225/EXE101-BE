import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkboxId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`
  return (
    <label htmlFor={checkboxId} className={`inline-flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-900 ${className}`.trim()}>
      <input
        id={checkboxId}
        type="checkbox"
        className="w-4 h-4 rounded border-[var(--color-charcoal)] bg-white dark:bg-[var(--color-surface)] text-primary focus:ring-primary focus:ring-offset-0"
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  )
}
