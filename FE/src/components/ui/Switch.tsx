export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Switch({ checked, onChange, label, disabled = false }: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-900">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full p-1 transition-all duration-200 ${checked ? 'bg-gradient-to-r from-primary to-accent shadow-[var(--shadow-3)]' : 'bg-neutral-300 dark:bg-neutral-300'} disabled:opacity-50`}
      >
        <span className={`block w-4 h-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
      {label && <span>{label}</span>}
    </label>
  )
}
