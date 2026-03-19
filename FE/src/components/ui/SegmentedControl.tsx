type SegmentedOption = {
  value: string
  label: string
}

export interface SegmentedControlProps {
  value: string
  options: SegmentedOption[]
  onChange: (value: string) => void
  className?: string
  compact?: boolean
}

export function SegmentedControl({ value, options, onChange, className = '', compact = false }: SegmentedControlProps) {
  return (
    <div className={`inline-flex p-1 rounded-lg border border-[var(--color-charcoal)] bg-neutral-100 dark:bg-[var(--color-surface)] shadow-[var(--shadow-2)] ${className}`.trim()} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          role="tab"
          aria-selected={value === option.value}
          className={`${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} rounded-md font-medium transition-all duration-150 ${value === option.value ? 'bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/25 dark:to-accent/25 text-neutral-900 dark:text-neutral-900 border border-primary/30 shadow-[var(--shadow-3)]' : 'text-neutral-600 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-900 hover:bg-white/70 dark:hover:bg-neutral-200/50'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
