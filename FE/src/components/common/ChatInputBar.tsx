import { useRef } from 'react'
import { Button, Input } from '../ui'
import { AttachIcon } from '../icons'

const DEFAULT_ACCEPT_FILES = '.pdf,.doc,.docx,.txt,.md,image/*'

export interface ChatInputBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSend: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  acceptFiles?: string
  placeholder?: string
  attachmentCount?: number
  attachmentsSlot?: React.ReactNode
  secondaryActions?: React.ReactNode
  ariaLabelMessage?: string
  ariaLabelAttach?: string
}

export function ChatInputBar({
  value,
  onChange,
  onSend,
  onFileChange,
  acceptFiles = DEFAULT_ACCEPT_FILES,
  placeholder = 'Type your question...',
  attachmentCount = 0,
  attachmentsSlot,
  secondaryActions,
  ariaLabelMessage = 'Message',
  ariaLabelAttach = 'Attach file',
}: ChatInputBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="shrink-0 space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptFiles}
        className="hidden"
        onChange={handleFileChange}
        aria-label={ariaLabelAttach}
      />
      {attachmentsSlot}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="shrink-0 w-10 h-10 rounded-lg bg-neutral-900 dark:bg-[var(--color-surface)] text-white flex items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          aria-label={ariaLabelAttach}
        >
          <AttachIcon className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <Input
            placeholder={placeholder}
            className="w-full h-10 min-h-0 py-0 rounded-lg border-2 border-neutral-200 dark:border-[var(--color-charcoal)] text-sm"
            value={value}
            onChange={onChange}
            aria-label={ariaLabelMessage}
          />
        </div>
        <Button variant="primary" size="sm" className="h-10 rounded-lg shrink-0 px-4" onClick={onSend}>
          Send
        </Button>
      </div>
      {!attachmentsSlot && attachmentCount > 0 && (
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1.5">{attachmentCount} file(s) attached</p>
      )}
      {secondaryActions && (
        <div className="flex flex-wrap items-center gap-2 mt-2">{secondaryActions}</div>
      )}
    </div>
  )
}
