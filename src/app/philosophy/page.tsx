import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { engineerPrinciples, uxConstraints } from "@/data/philosophy"
import { PhilosophyDemo } from "./demo"

export const metadata: Metadata = {
	title: "philosophy",
	description: "6 engineering principles — 3 UX constraints and 3 engineer principles.",
}

export default function PhilosophyPage() {
	return (
		<PageLayout>
			<div className="space-y-16">
				<header className="space-y-4">
					<h1 className="font-mono text-lg text-text-muted">$ cat philosophy</h1>
					<p className="max-w-2xl text-text-secondary">
						Everything I build is guided by 6 principles. Three protect the user. Three guide the
						engineer. They're not aspirational — they're the bar.
					</p>
				</header>

				{/* UX Constraints */}
				<section className="space-y-8">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						UX Constraints
					</h2>
					<div className="space-y-12">
						{uxConstraints.map((principle) => (
							<article key={principle.id} id={principle.id} className="scroll-mt-20 space-y-4">
								<div className="flex items-baseline gap-3">
									<span className="font-mono text-sm text-accent-bright">#{principle.number}</span>
									<h3 className="text-lg font-medium">{principle.title}</h3>
								</div>
								<p className="text-sm text-text-muted">{principle.titleJa}</p>
								<p className="max-w-2xl text-text-secondary">{principle.description}</p>

								{/* Checkpoints */}
								<ul className="space-y-1 font-mono text-sm text-text-secondary">
									{principle.checkpoints.map((cp) => (
										<li key={cp} className="flex gap-2">
											<span className="text-success">✓</span>
											{cp}
										</li>
									))}
								</ul>

								{/* Interactive demo */}
								{principle.demo && <PhilosophyDemo principle={principle} />}
							</article>
						))}
					</div>
				</section>

				{/* Engineer Principles */}
				<section className="space-y-8">
					<h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
						Engineer Principles
					</h2>
					<div className="space-y-12">
						{engineerPrinciples.map((principle) => (
							<article key={principle.id} id={principle.id} className="scroll-mt-20 space-y-4">
								<div className="flex items-baseline gap-3">
									<span className="font-mono text-sm text-accent-bright">#{principle.number}</span>
									<h3 className="text-lg font-medium">{principle.title}</h3>
								</div>
								<p className="text-sm text-text-muted">{principle.titleJa}</p>
								<p className="max-w-2xl text-text-secondary">{principle.description}</p>

								<ul className="space-y-1 font-mono text-sm text-text-secondary">
									{principle.checkpoints.map((cp) => (
										<li key={cp} className="flex gap-2">
											<span className="text-success">✓</span>
											{cp}
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</section>

				{/* Footer note */}
				<footer className="border-t border-surface-2 pt-8 font-mono text-sm text-text-muted">
					<p>
						These principles are machine-readable at{" "}
						<a href="/api/philosophy" className="text-accent-bright hover:text-accent">
							/api/philosophy
						</a>
						. AI agents can use them to review code against these standards.
					</p>
				</footer>
			</div>
		</PageLayout>
	)
}
