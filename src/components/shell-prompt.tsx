"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState, ViewTransition } from "react"
import { Cursor } from "@/components/tui/primitives"
import { CommandInput } from "./command-input"

export function ShellPrompt() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && !isOpen && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape" && isOpen) {
        close()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, close])

  if (pathname === "/") return null

  return (
    <header className="sticky top-0 z-50 border-b border-surface-2 bg-surface-0/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-3">
        <ViewTransition name="site-name" share="vt-morph">
          <Link
            href="/"
            className="shrink-0 font-mono text-accent-bright hover:text-accent"
            transitionTypes={["navigate"]}
          >
            kage1020
          </Link>
        </ViewTransition>
        <span className="hidden font-mono text-text-muted sm:inline">@</span>
        <span className="hidden font-mono text-text-muted sm:inline">web</span>
        <span className="font-mono text-text-muted">:</span>
        <span className="min-w-0 truncate font-mono text-text-secondary">
          {pathname}
        </span>
        <span className="shrink-0 font-mono text-accent-bright">$</span>

        {isOpen && (
          <div className="flex-1">
            <CommandInput autoFocus onNavigate={close} />
          </div>
        )}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex-1 text-left font-mono text-text-muted"
            aria-label="Open command palette (press /)"
          >
            <Cursor />
            <span className="hidden text-text-muted/70 group-hover:text-text-muted sm:inline">
              press / to focus
            </span>
          </button>
        )}
      </div>
    </header>
  )
}
