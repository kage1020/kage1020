"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState, ViewTransition } from "react"
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
			<div className="mx-auto flex max-w-4xl items-center gap-2 px-6 py-3">
				<ViewTransition name="site-name" share="vt-morph">
					<Link
						href="/"
						className="font-mono text-sm text-accent-bright hover:text-accent"
						transitionTypes={["navigate"]}
					>
						kage1020
					</Link>
				</ViewTransition>
				<span className="font-mono text-sm text-text-muted">:</span>
				<span className="font-mono text-sm text-text-secondary">{pathname}</span>
				<span className="font-mono text-sm text-text-muted">$</span>

				{isOpen ? (
					<div className="flex-1">
						<CommandInput autoFocus onNavigate={close} />
					</div>
				) : (
					<button
						type="button"
						onClick={() => setIsOpen(true)}
						className="flex-1 text-left font-mono text-sm text-text-muted hover:text-text-secondary"
						aria-label="Open command palette (press /)"
					>
						<span className="animate-pulse">_</span>
						<span className="ml-4 text-xs opacity-50">press / to navigate</span>
					</button>
				)}
			</div>
		</header>
	)
}
