"use client"

import { useState } from "react"
import type { Principle } from "@/data/philosophy"

export function PhilosophyDemo({ principle }: { principle: Principle }) {
	const demo = principle.demo
	if (!demo) return null

	return <DemoSwitch demo={demo} principleId={principle.id} />
}

function DemoSwitch({
	demo,
	principleId,
}: {
	demo: NonNullable<Principle["demo"]>
	principleId: string
}) {
	const [showGood, setShowGood] = useState(true)

	return (
		<div className="space-y-3">
			<div className="flex gap-2 font-mono text-xs">
				<button
					type="button"
					onClick={() => setShowGood(false)}
					className={`rounded px-3 py-1 transition-colors ${
						!showGood
							? "bg-error/20 text-error"
							: "bg-surface-2 text-text-muted hover:text-text-secondary"
					}`}
				>
					✗ bad
				</button>
				<button
					type="button"
					onClick={() => setShowGood(true)}
					className={`rounded px-3 py-1 transition-colors ${
						showGood
							? "bg-success/20 text-success"
							: "bg-surface-2 text-text-muted hover:text-text-secondary"
					}`}
				>
					✓ good
				</button>
			</div>

			<div className="rounded-lg border border-surface-2 bg-surface-1 p-4">
				{showGood ? (
					<GoodDemo demo={demo} principleId={principleId} />
				) : (
					<BadDemo demo={demo} principleId={principleId} />
				)}
			</div>
		</div>
	)
}

function BadDemo({
	demo,
	principleId,
}: {
	demo: NonNullable<Principle["demo"]>
	principleId: string
}) {
	if (principleId === "no-betray-intent") {
		return <SearchDemo broken />
	}
	if (principleId === "no-interrupt") {
		return <ConfirmDemo modal />
	}
	if (principleId === "no-force-constraints") {
		return <ErrorDemo raw />
	}
	return (
		<div className="space-y-1">
			<p className="font-mono text-sm text-error">{demo.bad.label}</p>
			<p className="text-sm text-text-secondary">{demo.bad.description}</p>
		</div>
	)
}

function GoodDemo({
	demo,
	principleId,
}: {
	demo: NonNullable<Principle["demo"]>
	principleId: string
}) {
	if (principleId === "no-betray-intent") {
		return <SearchDemo />
	}
	if (principleId === "no-interrupt") {
		return <ConfirmDemo />
	}
	if (principleId === "no-force-constraints") {
		return <ErrorDemo />
	}
	return (
		<div className="space-y-1">
			<p className="font-mono text-sm text-success">{demo.good.label}</p>
			<p className="text-sm text-text-secondary">{demo.good.description}</p>
		</div>
	)
}

// Demo: Search that works vs broken search
function SearchDemo({ broken = false }: { broken?: boolean }) {
	const [query, setQuery] = useState("")

	const items = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Workers"]
	const results = broken
		? query
			? items.filter((_, i) => i % 2 === 0) // intentionally wrong results
			: []
		: query
			? items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
			: []

	return (
		<div className="space-y-3">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search technologies..."
				className="w-full rounded border border-surface-3 bg-surface-0 px-3 py-2 font-mono text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent"
			/>
			{query && (
				<div className="space-y-1">
					{results.length > 0 ? (
						results.map((r) => (
							<div key={r} className="px-2 py-1 font-mono text-sm text-text-secondary">
								{r}
							</div>
						))
					) : (
						<p className="px-2 py-1 font-mono text-sm text-text-muted">No results</p>
					)}
					{broken && (
						<p className="mt-2 font-mono text-xs text-error">
							↑ These results don't match your query. Intent betrayed.
						</p>
					)}
				</div>
			)}
		</div>
	)
}

// Demo: Modal confirmation vs inline undo
function ConfirmDemo({ modal = false }: { modal?: boolean }) {
	const [items, setItems] = useState(["Item A", "Item B", "Item C"])
	const [showModal, setShowModal] = useState(false)
	const [pendingDelete, setPendingDelete] = useState<string | null>(null)
	const [undoItem, setUndoItem] = useState<{ name: string; index: number } | null>(null)

	if (modal) {
		return (
			<div className="space-y-3">
				<div className="space-y-1">
					{items.map((item) => (
						<div
							key={item}
							className="flex items-center justify-between rounded bg-surface-0 px-3 py-2 font-mono text-sm"
						>
							<span className="text-text-secondary">{item}</span>
							<button
								type="button"
								onClick={() => {
									setPendingDelete(item)
									setShowModal(true)
								}}
								className="text-error hover:text-error/70"
							>
								delete
							</button>
						</div>
					))}
				</div>
				{showModal && (
					<div className="rounded border border-error/30 bg-error/10 p-4">
						<p className="mb-3 font-mono text-sm text-text-primary">
							Are you sure you want to delete "{pendingDelete}"?
						</p>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => {
									setItems((prev) => prev.filter((i) => i !== pendingDelete))
									setShowModal(false)
								}}
								className="rounded bg-error px-3 py-1 font-mono text-sm text-white"
							>
								Yes, delete
							</button>
							<button
								type="button"
								onClick={() => setShowModal(false)}
								className="rounded bg-surface-2 px-3 py-1 font-mono text-sm text-text-secondary"
							>
								Cancel
							</button>
						</div>
						<p className="mt-2 font-mono text-xs text-error">
							↑ This modal blocks the user from doing anything else.
						</p>
					</div>
				)}
			</div>
		)
	}

	return (
		<div className="space-y-3">
			<div className="space-y-1">
				{items.map((item, index) => (
					<div
						key={item}
						className="flex items-center justify-between rounded bg-surface-0 px-3 py-2 font-mono text-sm"
					>
						<span className="text-text-secondary">{item}</span>
						<button
							type="button"
							onClick={() => {
								setUndoItem({ name: item, index })
								setItems((prev) => prev.filter((i) => i !== item))
								setTimeout(() => setUndoItem(null), 5000)
							}}
							className="text-error hover:text-error/70"
						>
							delete
						</button>
					</div>
				))}
			</div>
			{undoItem && (
				<div className="flex items-center gap-3 rounded bg-surface-2 px-3 py-2 font-mono text-sm">
					<span className="text-text-secondary">Deleted "{undoItem.name}"</span>
					<button
						type="button"
						onClick={() => {
							setItems((prev) => {
								const next = [...prev]
								next.splice(undoItem.index, 0, undoItem.name)
								return next
							})
							setUndoItem(null)
						}}
						className="text-accent-bright hover:text-accent"
					>
						undo
					</button>
				</div>
			)}
		</div>
	)
}

// Demo: Raw error vs graceful handling
function ErrorDemo({ raw = false }: { raw?: boolean }) {
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<string | null>(null)

	const simulate = () => {
		setLoading(true)
		setResult(null)
		setTimeout(() => {
			setLoading(false)
			setResult(
				raw
					? "Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email (code: 500)"
					: "This email is already registered. Would you like to sign in instead?",
			)
		}, 800)
	}

	return (
		<div className="space-y-3">
			<button
				type="button"
				onClick={simulate}
				className="rounded bg-surface-2 px-3 py-2 font-mono text-sm text-text-secondary hover:bg-surface-3"
			>
				{loading ? "Processing..." : "Submit form (simulated error)"}
			</button>
			{result && (
				<div
					className={`rounded px-3 py-2 font-mono text-sm ${
						raw ? "bg-error/10 text-error" : "bg-surface-2 text-text-secondary"
					}`}
				>
					{result}
					{raw && (
						<p className="mt-2 text-xs">
							↑ This exposes database internals to the user. Constraint violated.
						</p>
					)}
				</div>
			)}
		</div>
	)
}
