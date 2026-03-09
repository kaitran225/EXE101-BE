import { CloseIcon } from '../icons'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  /** Panel max-width class, e.g. 'max-w-md', 'max-w-2xl'. Default 'max-w-md'. */
  size?: string
  children: React.ReactNode
}

export function Modal({ open, onClose, title, size = 'max-w-md', children }: ModalProps) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`bg-white dark:bg-[var(--color-surface)] rounded-xl border-2 border-[var(--color-charcoal)] w-full shadow-xl overflow-hidden animate-scale-in ${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[var(--color-charcoal)]">
          {title && (
            <h2 id="modal-title" className="text-sm font-bold text-neutral-900 dark:text-neutral-900 uppercase tracking-wide">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-900 ml-auto transition-colors duration-150 active:scale-95"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
