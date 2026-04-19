import { cn } from "@/lib/cn"

export function KV({
  rows,
  className,
}: {
  rows: { key: string; value: React.ReactNode; hint?: string }[]
  className?: string
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1",
        className,
      )}
    >
      {rows.map((row) => (
        <div key={row.key} className="contents">
          <dt className="text-text-muted">{row.key}</dt>
          <dd className="flex items-baseline gap-3 text-text-primary">
            <span className="min-w-0">{row.value}</span>
            {row.hint && <span className="text-text-muted">{row.hint}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

const tagTone: Record<string, string> = {
  default: "border-surface-3 text-text-muted",
  success: "border-success/40 text-success",
  warn: "border-warning/40 text-warning",
  error: "border-error/40 text-error",
  accent: "border-accent/40 text-accent-bright",
}

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof tagTone
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline border px-1.5 uppercase tracking-wider",
        tagTone[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Cursor({
  char = "|",
  className,
}: {
  char?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-block text-accent-bright animate-tui-cursor motion-reduce:animate-none motion-reduce:opacity-100",
        className,
      )}
      aria-hidden="true"
    >
      {char}
    </span>
  )
}

export function Caret({ className }: { className?: string }) {
  return (
    <span className={cn("text-accent-bright", className)} aria-hidden="true">
      ❯
    </span>
  )
}
