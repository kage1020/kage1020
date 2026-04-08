import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { principles } from "@/data/philosophy"

export const metadata: Metadata = {
	title: "prompts",
	description:
		"AI agent instructions and system prompt templates for applying kage1020's engineering philosophy.",
}

const systemPrompt = `You are reviewing code for a project that follows kage1020's 6 engineering principles.

UX Constraints (non-negotiable):
1. Never betray user intent — UI must match intuitive expectations, full accessibility
2. Never interrupt user operations — no modals, no toasts, no disabled buttons; use undo
3. Never expose technical constraints — no raw errors, no DB limits in UI

Engineer Principles:
4. Build custom solutions when libraries fall short
5. Question conventions — evaluate, don't cargo-cult
6. Prioritize user intuition over developer intuition

When reviewing changes, categorize findings as:
- Violations: must fix
- Concerns: worth discussing
- Halfway: right direction but incomplete execution
- Good: exemplary implementation of principles

Pay special attention to "Halfway" — implementations that show awareness of a principle
but don't follow through completely. This is the most common and insidious failure mode.`

const checklist = [
	"Links/buttons behave as their appearance suggests",
	"Keyboard shortcuts follow platform conventions",
	"No modal dialogs (use inline interactions + undo)",
	"No toast/snackbar notifications",
	"No disabled buttons or inputs",
	"Error messages are human-readable",
	"No database/API internals exposed to users",
	"Loading states don't block user interaction",
	"Semantic HTML and WAI-ARIA correctly used",
	"Implementation isn't cargo-culted",
	"Library limitations are challenged, not accepted",
]

export default function PromptsPage() {
	return (
		<PageLayout>
			<div className="space-y-16">
				<header className="space-y-4">
					<h1 className="font-mono text-lg text-text-muted">$ cat prompts</h1>
					<p className="max-w-2xl text-text-secondary">
						This page exists for AI agents. Copy these prompts to apply my engineering philosophy to
						your project. Think of it as summoning a fragment of my engineering judgment into your
						codebase.
					</p>
				</header>

				{/* Machine-readable links */}
				<section className="space-y-4">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Machine-Readable Endpoints
					</h2>
					<div className="space-y-2 font-mono text-sm">
						<a href="/llms.txt" className="block text-accent-bright hover:text-accent">
							/llms.txt — AI agent discovery file
						</a>
						<a href="/llms-full.txt" className="block text-accent-bright hover:text-accent">
							/llms-full.txt — Full specification
						</a>
						<a href="/api/philosophy" className="block text-accent-bright hover:text-accent">
							/api/philosophy — JSON API
						</a>
					</div>
				</section>

				{/* System prompt */}
				<section className="space-y-4">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						System Prompt Template
					</h2>
					<p className="text-sm text-text-secondary">
						Add this to your AI agent's system prompt to apply these principles during code review:
					</p>
					<div className="rounded-lg border border-surface-2 bg-surface-1 p-6">
						<pre className="whitespace-pre-wrap font-mono text-sm text-text-secondary">
							{systemPrompt}
						</pre>
					</div>
				</section>

				{/* Checklist */}
				<section className="space-y-4">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Code Review Checklist
					</h2>
					<ul className="space-y-2 font-mono text-sm">
						{checklist.map((item) => (
							<li key={item} className="flex gap-3 text-text-secondary">
								<span className="text-text-muted">[ ]</span>
								{item}
							</li>
						))}
					</ul>
				</section>

				{/* Quick reference */}
				<section className="space-y-4">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Quick Reference
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{principles.map((p) => (
							<div key={p.id} className="rounded-lg border border-surface-2 bg-surface-1 p-4">
								<div className="mb-2 flex items-baseline gap-2">
									<span className="font-mono text-xs text-accent-bright">#{p.number}</span>
									<span className="text-xs uppercase tracking-wider text-text-muted">
										{p.category === "ux-constraint" ? "UX" : "ENG"}
									</span>
								</div>
								<p className="text-sm font-medium">{p.title}</p>
								<p className="mt-1 text-xs text-text-muted">{p.titleJa}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</PageLayout>
	)
}
