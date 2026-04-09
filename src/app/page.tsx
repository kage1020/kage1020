import Link from "next/link"
import { ViewTransition } from "react"
import { HomeShell } from "./home-shell"

const routes = [
	{ command: "whoami", path: "/whoami", description: "who is kage1020?" },
	{ command: "cat philosophy", path: "/philosophy", description: "6 principles" },
	{ command: "ls apps", path: "/apps", description: "utility apps" },
	{ command: "cat prompts", path: "/prompts", description: "for AI agents" },
	{ command: "cat colophon", path: "/colophon", description: "how this site was built" },
] as const

export default function Home() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center px-6">
			<div className="w-full max-w-lg space-y-8">
				{/* Logo / Name */}
				<div className="space-y-2">
					<ViewTransition name="site-name" share="vt-morph">
						<h1 className="inline-block font-mono text-sm text-accent-bright">kage1020</h1>
					</ViewTransition>
					<ViewTransition enter="vt-fade-in" exit="vt-fade-in">
						<p className="font-mono text-sm text-text-secondary">
							Software Engineer — builds things for the web.
						</p>
					</ViewTransition>
				</div>

				{/* Shell output: ls */}
				<ViewTransition enter="vt-slide-up">
					<div className="space-y-1 font-mono text-sm">
						<p className="text-text-muted">$ ls</p>
						<nav className="grid gap-1">
							{routes.map((route) => (
								<Link
									key={route.path}
									href={route.path}
									className="group flex items-baseline gap-3 rounded px-2 py-1 transition-colors hover:bg-surface-1"
									transitionTypes={["navigate"]}
								>
									<span className="text-accent-bright">{route.command}</span>
									<span className="text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
										# {route.description}
									</span>
								</Link>
							))}
						</nav>
					</div>
				</ViewTransition>

				{/* Interactive command input */}
				<ViewTransition enter="vt-fade-in">
					<HomeShell />
				</ViewTransition>
			</div>
		</main>
	)
}
