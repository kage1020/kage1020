import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"

export const metadata: Metadata = {
	title: "colophon",
	description:
		"How kage1020.com was built — tech stack, design decisions, and principles in action.",
}

const stack = [
	{ name: "Next.js 16", role: "Framework", url: "https://nextjs.org" },
	{ name: "React 19", role: "UI Library", url: "https://react.dev" },
	{ name: "TypeScript", role: "Language", url: "https://typescriptlang.org" },
	{ name: "Tailwind CSS v4", role: "Styling", url: "https://tailwindcss.com" },
	{ name: "Cloudflare Workers", role: "Runtime", url: "https://workers.cloudflare.com" },
	{ name: "OpenNext", role: "Adapter", url: "https://opennext.js.org" },
	{ name: "Biome", role: "Linter & Formatter", url: "https://biomejs.dev" },
	{ name: "bun", role: "Package Manager", url: "https://bun.sh" },
]

const decisions = [
	{
		decision: "No UI component library",
		principle: "#4 足らぬなら作ってしまえ",
		reasoning:
			"Every component on this site is hand-built. Not because libraries are bad, but because a personal site should be personally crafted.",
	},
	{
		decision: "Shell-style navigation",
		principle: "#5 当たり前を疑う",
		reasoning:
			"A traditional navbar is the default. A command palette that doubles as navigation reflects how I actually think about structure.",
	},
	{
		decision: "Zero modals on the entire site",
		principle: "#2 操作を邪魔しない",
		reasoning:
			"Not a single modal, dialog, or popup. Status changes happen inline. The command palette pushes content down instead of overlaying.",
	},
	{
		decision: "llms.txt + philosophy API",
		principle: "#6 ユーザー ≠ 開発者",
		reasoning:
			"The 'users' of this site include AI agents. Making the site machine-readable is treating them as first-class visitors.",
	},
	{
		decision: "Interactive philosophy demos",
		principle: "#1 意図を裏切らない",
		reasoning:
			"Stating principles is cheap. Demonstrating them with interactive examples proves they're not just words.",
	},
]

export default function ColophonPage() {
	return (
		<PageLayout>
			<div className="space-y-16">
				<header className="space-y-4">
					<h1 className="font-mono text-lg text-text-muted">$ cat colophon</h1>
					<p className="max-w-2xl text-text-secondary">
						This site is itself an expression of the 6 principles. Here's how it was built and why
						each decision was made.
					</p>
				</header>

				{/* Tech Stack */}
				<section className="space-y-6">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Tech Stack
					</h2>
					<div className="rounded-lg border border-surface-2 bg-surface-1">
						{stack.map((item, i) => (
							<div
								key={item.name}
								className={`flex items-center justify-between px-5 py-3 ${
									i !== stack.length - 1 ? "border-b border-surface-2" : ""
								}`}
							>
								<div className="flex items-baseline gap-3">
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										className="font-mono text-sm text-accent-bright hover:text-accent"
									>
										{item.name}
									</a>
									<span className="text-xs text-text-muted">{item.role}</span>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Design Decisions */}
				<section className="space-y-6">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Design Decisions × Principles
					</h2>
					<div className="space-y-6">
						{decisions.map((item) => (
							<div
								key={item.decision}
								className="rounded-lg border border-surface-2 bg-surface-1 p-5"
							>
								<div className="mb-2 flex items-baseline justify-between gap-4">
									<h3 className="font-medium">{item.decision}</h3>
									<span className="shrink-0 rounded-full border border-accent/30 px-2 py-0.5 font-mono text-xs text-accent-bright">
										{item.principle}
									</span>
								</div>
								<p className="text-sm text-text-secondary">{item.reasoning}</p>
							</div>
						))}
					</div>
				</section>

				{/* Source */}
				<section className="space-y-4">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Source Code
					</h2>
					<p className="text-sm text-text-secondary">
						This site is open source.{" "}
						<a
							href="https://github.com/kage1020/kage1020"
							target="_blank"
							rel="noopener noreferrer"
							className="text-accent-bright hover:text-accent"
						>
							View on GitHub →
						</a>
					</p>
				</section>
			</div>
		</PageLayout>
	)
}
