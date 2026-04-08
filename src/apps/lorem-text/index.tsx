"use client"

import { useCallback, useState } from "react"

const words = [
	"lorem",
	"ipsum",
	"dolor",
	"sit",
	"amet",
	"consectetur",
	"adipiscing",
	"elit",
	"sed",
	"do",
	"eiusmod",
	"tempor",
	"incididunt",
	"ut",
	"labore",
	"et",
	"dolore",
	"magna",
	"aliqua",
	"enim",
	"ad",
	"minim",
	"veniam",
	"quis",
	"nostrud",
	"exercitation",
	"ullamco",
	"laboris",
	"nisi",
	"aliquip",
	"ex",
	"ea",
	"commodo",
	"consequat",
	"duis",
	"aute",
	"irure",
	"in",
	"reprehenderit",
	"voluptate",
	"velit",
	"esse",
	"cillum",
	"fugiat",
	"nulla",
	"pariatur",
	"excepteur",
	"sint",
	"occaecat",
	"cupidatat",
	"non",
	"proident",
	"sunt",
	"culpa",
	"qui",
	"officia",
	"deserunt",
	"mollit",
	"anim",
	"id",
	"est",
	"laborum",
]

function generateSentence(minWords: number, maxWords: number): string {
	const count = minWords + Math.floor(Math.random() * (maxWords - minWords + 1))
	const sentence = Array.from(
		{ length: count },
		() => words[Math.floor(Math.random() * words.length)],
	).join(" ")
	return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`
}

function generateParagraph(): string {
	const sentenceCount = 3 + Math.floor(Math.random() * 5)
	return Array.from({ length: sentenceCount }, () => generateSentence(5, 15)).join(" ")
}

function generateText(paragraphs: number): string {
	return Array.from({ length: paragraphs }, generateParagraph).join("\n\n")
}

export default function LoremTextApp() {
	const [count, setCount] = useState(3)
	const [text, setText] = useState(() => generateText(3))
	const [copied, setCopied] = useState(false)

	const regenerate = useCallback(() => {
		setText(generateText(count))
		setCopied(false)
	}, [count])

	const copy = useCallback(async () => {
		await navigator.clipboard.writeText(text)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}, [text])

	return (
		<div className="space-y-6">
			{/* Controls */}
			<div className="flex flex-wrap items-center gap-4">
				<label className="flex items-center gap-2 font-mono text-sm text-text-secondary">
					<span>Paragraphs:</span>
					<input
						type="range"
						min={1}
						max={10}
						value={count}
						onChange={(e) => {
							const newCount = Number(e.target.value)
							setCount(newCount)
							setText(generateText(newCount))
							setCopied(false)
						}}
						className="w-32 accent-accent"
					/>
					<span className="w-6 text-center text-accent-bright">{count}</span>
				</label>

				<button
					type="button"
					onClick={regenerate}
					className="rounded bg-surface-2 px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors hover:bg-surface-3"
				>
					↻ regenerate
				</button>

				<button
					type="button"
					onClick={copy}
					className="rounded bg-surface-2 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-surface-3"
				>
					{copied ? (
						<span className="text-success">✓ copied</span>
					) : (
						<span className="text-text-secondary">⎘ copy</span>
					)}
				</button>
			</div>

			{/* Output */}
			<div className="rounded-lg border border-surface-2 bg-surface-1 p-6">
				<div className="space-y-4 text-sm leading-relaxed text-text-secondary">
					{text.split("\n\n").map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>
			</div>

			{/* Stats */}
			<div className="flex gap-6 font-mono text-xs text-text-muted">
				<span>{text.split(/\s+/).length} words</span>
				<span>{text.length} characters</span>
				<span>{count} paragraphs</span>
			</div>
		</div>
	)
}
