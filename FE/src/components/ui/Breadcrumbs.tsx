export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`inline-flex items-center gap-2 ${className}`}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span className="text-neutral-500" aria-hidden>
                <svg width="5" height="7" viewBox="0 0 5 7" fill="none" className="text-neutral-900">
                  <path
                    d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            )}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-sm font-normal text-neutral-900 dark:text-neutral-100 underline hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                {item.label}
              </a>
            ) : (
              <span className={`text-sm ${isLast ? 'font-bold' : 'font-normal'} text-neutral-900 dark:text-neutral-100`}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
