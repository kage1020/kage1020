import { CopyBlockButton } from "@/components/copy-button"
import { cn } from "@/lib/cn"

type BlockStatus = "ok" | "error" | "warn" | "info"

type BlockProps = {
  command: string
  status?: BlockStatus
  duration?: string
  timestamp?: string
  source?: string
  children: React.ReactNode
  className?: string
  /**
   * If true, the body has tighter vertical padding. Use for very short outputs
   * (one-liners, single tags).
   */
  flush?: boolean
  /**
   * Explicit text to copy when the header copy button is clicked.
   * Falls back to the body's innerText if omitted.
   */
  copyText?: string
}

const statusPip: Record<BlockStatus, { char: string; color: string }> = {
  ok: { char: "●", color: "text-success" },
  error: { char: "●", color: "text-error" },
  warn: { char: "●", color: "text-warning" },
  info: { char: "●", color: "text-accent-bright" },
}

/**
 * Block — the unit of TUI output. Every block has a copy button (⧉) in the
 * header that copies the body content. Pass `copyText` to override what gets
 * copied (e.g. raw markdown instead of rendered text).
 */
export function Block({
  command,
  status = "ok",
  duration,
  timestamp,
  source,
  children,
  className,
  flush = false,
  copyText,
}: BlockProps) {
  const pip = statusPip[status]

  return (
    <section
      className={cn("tui-block group/tui-block relative font-mono", className)}
    >
      <span
        className="absolute left-0 w-px bg-surface-2 top-2.5 bottom-2.5 origin-top animate-tui-block-rail [animation-delay:60ms] motion-reduce:animate-none"
        aria-hidden="true"
      />

      {/* Hidden source for explicit copyText — read by CopyBlockButton */}
      {copyText && (
        <div hidden className="tui-block-copy-source" aria-hidden="true">
          {copyText}
        </div>
      )}

      <header className="relative flex h-5 items-center gap-3 pl-5 animate-tui-block-fade [animation-duration:360ms] [animation-delay:80ms] motion-reduce:animate-none">
        <span
          className="tui-block-tick absolute left-0 h-px w-3 bg-surface-2 origin-left top-2.5 animate-tui-block-tick motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="shrink-0 text-text-muted">$</span>
        <span className="min-w-0 truncate text-text-primary">{command}</span>
        <span
          className="h-px flex-1 self-center bg-surface-2 origin-left animate-tui-block-rule [animation-delay:140ms] motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className={cn("shrink-0", pip.color)} aria-hidden="true">
          {pip.char}
        </span>
        {duration && (
          <span className="hidden shrink-0 truncate text-text-muted sm:inline">
            {duration}
          </span>
        )}
        <CopyBlockButton className="group-hover/tui-block:opacity-100" />
      </header>

      <div
        className={cn(
          "tui-block-body py-4 pl-5 animate-tui-block-fade [animation-duration:420ms] [animation-delay:180ms] motion-reduce:animate-none",
          flush && "py-2",
        )}
      >
        {children}
      </div>

      <footer className="relative flex h-5 items-center gap-3 pl-5 text-text-muted animate-tui-block-fade [animation-delay:240ms] motion-reduce:animate-none">
        <span
          className="tui-block-tick absolute left-0 h-px w-3 bg-surface-2 origin-left bottom-2.5 animate-tui-block-tick motion-reduce:animate-none"
          aria-hidden="true"
        />
        {timestamp && <time>{timestamp}</time>}
        {timestamp && source && <span aria-hidden="true">·</span>}
        {source && <span>{source}</span>}
      </footer>
    </section>
  )
}

/**
 * BlockStream — vertical stack of Blocks with consistent spacing.
 */
export function BlockStream({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("space-y-10", className)}>{children}</div>
}
