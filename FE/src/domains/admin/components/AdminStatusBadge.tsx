interface AdminStatusBadgeProps {
  status: string
}

const MAP: Record<string, string> = {
  Active: 'bg-success/20 text-success border border-success/40',
  Idle: 'bg-warning/20 text-neutral-800 border border-warning/35',
  Banned: 'bg-error/20 text-error border border-error/40',
  Temporary: 'bg-[var(--color-focus-area)]/20 text-neutral-900 border border-[var(--color-focus-area)]/40',
  Permanent: 'bg-error/20 text-error border border-error/40',
  Basic: 'bg-[var(--color-charcoal)] text-neutral-800 border border-[var(--color-border)]',
  Pro: 'bg-accent/20 text-accent border border-accent/40',
  Premium: 'bg-primary/20 text-neutral-900 border border-primary/35',
}

export function AdminStatusBadge({ status }: AdminStatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${MAP[status] ?? 'bg-[var(--color-charcoal)] text-neutral-800 border border-[var(--color-border)]'}`}>
      {status}
    </span>
  )
}

