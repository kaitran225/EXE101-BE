import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 focus-visible:outline-primary',
  secondary: 'bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-100 focus-visible:outline-primary',
  ghost: 'bg-transparent text-neutral-900 border border-transparent hover:bg-neutral-100 focus-visible:outline-primary',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
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
