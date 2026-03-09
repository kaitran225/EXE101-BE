export interface ProgressProps {
  value: number
  max?: number
  /** Optional label above the bar (e.g. "LEVEL 14", "2,450 / 3,000 XP") */
  label?: React.ReactNode
  /** Optional label below or beside */
  caption?: React.ReactNode
  className?: string
}

export function Progress({ value, max = 100, label, caption, className = '' }: ProgressProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center gap-2 text-xs font-bold text-neutral-900 uppercase tracking-wide">
          {label}
        </div>
      )}
      <div
        className="h-2 w-full bg-white border border-border rounded overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption && <div className="text-sm text-neutral-500">{caption}</div>}
    </div>
  )
}
