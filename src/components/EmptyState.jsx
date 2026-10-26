import { SearchX } from 'lucide-react'

export default function EmptyState({ title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone bg-white/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink-muted">
        <SearchX className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      {text && <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
