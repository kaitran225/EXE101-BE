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
    <div className={`inline-flex p-1 rounded-full border border-white/10 bg-[#141414] ${className}`.trim()} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          role="tab"
          aria-selected={value === option.value}
          className={`${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} rounded-full font-semibold transition-colors duration-150 ${value === option.value ? 'bg-primary text-primary-foreground' : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/5'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
