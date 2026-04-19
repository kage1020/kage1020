"use client"

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/cn"

interface CopyButtonProps {
  className?: string
}

/**
 * CopyBlockButton — embedded in every Block header as a first-class decoration.
 * Copies the block body's innerText, or an explicit source if provided via a
 * hidden `.tui-block-copy-source` element inside the block.
 */
export function CopyBlockButton({ className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const copy = useCallback(async () => {
    const block = ref.current?.closest(".tui-block")
    if (!block) return

    const source = block.querySelector(".tui-block-copy-source")
    const body = block.querySelector<HTMLElement>(".tui-block-body")
    const text = source?.textContent ?? body?.innerText
    if (!text) return

    await navigator.clipboard.writeText(text.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      className={cn(
        "tui-block-copy inline-flex w-4 shrink-0 items-center justify-center font-mono text-text-muted transition-all hover:text-accent-bright",
        "opacity-100 [@media(hover:hover)]:opacity-0",
        className,
      )}
      aria-label="Copy block content"
    >
      {copied ? "✓" : "⧉"}
    </button>
  )
}
