import type { HTMLAttributes } from 'react'

export function Table({ className = '', ...props }: HTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full text-sm border-separate border-spacing-y-2 ${className}`.trim()} {...props} />
}

export function TableHead({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} {...props} />
}

export function TableBody({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />
}

export function TableRow({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`bg-white dark:bg-[var(--color-surface)] shadow-[var(--shadow-1)] ${className}`.trim()} {...props} />
}

export function TableHeaderCell({ className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <th className={`text-left text-xs uppercase tracking-wide text-primary ${className}`.trim()} {...props} />
}

export function TableCell({ className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={className} {...props} />
}
