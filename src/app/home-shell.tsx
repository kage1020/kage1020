"use client"

import { CommandInput } from "@/components/command-input"

export function HomeShell() {
	return (
		<div className="flex items-center gap-2 font-mono text-sm text-text-muted">
			<span className="shrink-0">$</span>
			<CommandInput />
		</div>
	)
}
