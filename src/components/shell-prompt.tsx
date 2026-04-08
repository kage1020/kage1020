"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

const commands: Record<string, string> = {
	whoami: "/whoami",
	"cat philosophy": "/philosophy",
	philosophy: "/philosophy",
	"ls apps": "/apps",
	apps: "/apps",
	"cat prompts": "/prompts",
	prompts: "/prompts",
	"cat colophon": "/colophon",
	colophon: "/colophon",
	home: "/",
	cd: "/",
	"cd ~": "/",
}

const suggestions = ["whoami", "cat philosophy", "ls apps", "cat prompts", "cat colophon"]

export function ShellPrompt() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [input, setInput] = useState("")
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const inputRef = useRef<HTMLInputElement>(null)

	const filtered = input
		? suggestions.filter((s) => s.startsWith(input.toLowerCase()))
		: suggestions

	const close = useCallback(() => {
		setIsOpen(false)
		setInput("")
		setSelectedIndex(-1)
	}, [])

	const navigate = useCallback(
		(command: string) => {
			const target = commands[command.toLowerCase()]
			if (target) {
				close()
				window.location.href = target
			}
		},
		[close],
	)

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

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus()
		}
	}, [isOpen])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault()
			setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
		} else if (e.key === "ArrowUp") {
			e.preventDefault()
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
		} else if (e.key === "Enter") {
			e.preventDefault()
			const command = selectedIndex >= 0 ? filtered[selectedIndex] : input
			if (command) navigate(command)
		} else if (e.key === "Tab" && filtered.length > 0) {
			e.preventDefault()
			const target = selectedIndex >= 0 ? filtered[selectedIndex] : filtered[0]
			setInput(target)
			setSelectedIndex(0)
		}
	}

	if (pathname === "/") return null

	return (
		<header className="sticky top-0 z-50 border-b border-surface-2 bg-surface-0/90 backdrop-blur-sm">
			<div className="mx-auto flex max-w-4xl items-center gap-2 px-6 py-3">
				<Link href="/" className="font-mono text-sm text-accent-bright hover:text-accent">
					kage1020
				</Link>
				<span className="font-mono text-sm text-text-muted">:</span>
				<span className="font-mono text-sm text-text-secondary">{pathname}</span>
				<span className="font-mono text-sm text-text-muted">$</span>

				{isOpen ? (
					<div className="relative flex-1">
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => {
								setInput(e.target.value)
								setSelectedIndex(-1)
							}}
							onKeyDown={handleKeyDown}
							onBlur={() => setTimeout(close, 150)}
							className="w-full bg-transparent font-mono text-sm text-text-primary outline-none"
							placeholder="type a command..."
							aria-label="Command input"
							aria-autocomplete="list"
							role="combobox"
							aria-expanded={filtered.length > 0}
						/>
						{filtered.length > 0 && (
							<div
								role="listbox"
								className="absolute left-0 top-full mt-2 w-64 rounded-md border border-surface-2 bg-surface-1 py-1 shadow-lg"
							>
								{filtered.map((cmd, i) => (
									<div
										key={cmd}
										role="option"
										tabIndex={-1}
										aria-selected={i === selectedIndex}
										className={`cursor-pointer px-3 py-1.5 font-mono text-sm ${
											i === selectedIndex
												? "bg-surface-2 text-accent-bright"
												: "text-text-secondary hover:bg-surface-2"
										}`}
										onMouseDown={() => navigate(cmd)}
										onMouseEnter={() => setSelectedIndex(i)}
									>
										{cmd}
									</div>
								))}
							</div>
						)}
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
