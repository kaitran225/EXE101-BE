import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground border border-primary hover:bg-primary-hover focus-visible:outline-primary',
  secondary: 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-900 dark:border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus-visible:outline-primary',
  ghost: 'bg-transparent text-neutral-900 dark:text-neutral-100 border border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 focus-visible:outline-primary',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[2.25rem]',
  md: 'px-4 py-2 text-sm min-h-[2.5rem]',
  lg: 'px-6 py-3 text-base min-h-[2.75rem]',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isFullWidth = className.includes('w-full')
  return (
    <button
      type="button"
      className={`
        ${isFullWidth ? 'flex w-full' : 'inline-flex'} items-center justify-center gap-2 font-medium rounded-lg
        transition-colors
        disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      disabled={disabled}
      {...props}
    />
  )
}
