"use client"

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

export function CommandInput({
	autoFocus = false,
	onNavigate,
}: {
	autoFocus?: boolean
	onNavigate?: () => void
}) {
	const [input, setInput] = useState("")
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const [focused, setFocused] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const filtered = input
		? suggestions.filter((s) => s.startsWith(input.toLowerCase()))
		: suggestions

	const showSuggestions = focused && filtered.length > 0

	const navigate = useCallback(
		(command: string) => {
			const target = commands[command.toLowerCase()]
			if (target) {
				onNavigate?.()
				window.location.href = target
			}
		},
		[onNavigate],
	)

	useEffect(() => {
		if (autoFocus) {
			inputRef.current?.focus()
		}
	}, [autoFocus])

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

	return (
		<div className="relative">
			<input
				ref={inputRef}
				type="text"
				value={input}
				onChange={(e) => {
					setInput(e.target.value)
					setSelectedIndex(-1)
				}}
				onKeyDown={handleKeyDown}
				onFocus={() => setFocused(true)}
				onBlur={() => setTimeout(() => setFocused(false), 150)}
				className="w-full bg-transparent font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
				placeholder="type a command..."
				aria-label="Command input"
				aria-autocomplete="list"
				role="combobox"
				aria-expanded={showSuggestions}
			/>
			{showSuggestions && (
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
	)
}
