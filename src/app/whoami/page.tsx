import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { dependencies, pkg, timeline } from "@/data/whoami"

export const metadata: Metadata = {
	title: "whoami",
	description: "Who is kage1020? A software engineer who builds things for the web.",
}

export default function WhoamiPage() {
	return (
		<PageLayout>
			<div className="space-y-12">
				{/* package.json style intro */}
				<section>
					<h1 className="mb-6 font-mono text-lg text-text-muted">$ cat package.json</h1>
					<div className="rounded-lg border border-surface-2 bg-surface-1 p-6 font-mono text-sm">
						<pre className="overflow-x-auto whitespace-pre text-text-secondary">
							<span className="text-text-muted">{"{"}</span>
							{"\n"}
							{"  "}
							<span className="text-accent-bright">"name"</span>:{" "}
							<span className="text-success">"{pkg.name}"</span>,{"\n"}
							{"  "}
							<span className="text-accent-bright">"version"</span>:{" "}
							<span className="text-success">"{pkg.version}"</span>,{"\n"}
							{"  "}
							<span className="text-accent-bright">"description"</span>:{" "}
							<span className="text-success">"{pkg.description}"</span>,{"\n"}
							{"  "}
							<span className="text-accent-bright">"keywords"</span>: [
							{pkg.keywords.map((kw, i) => (
								<span key={kw}>
									{"\n    "}
									<span className="text-success">"{kw}"</span>
									{i < pkg.keywords.length - 1 ? "," : ""}
								</span>
							))}
							{"\n  "}],{"\n"}
							{"  "}
							<span className="text-accent-bright">"license"</span>:{" "}
							<span className="text-success">"{pkg.license}"</span>
							{"\n"}
							<span className="text-text-muted">{"}"}</span>
						</pre>
					</div>
				</section>

				{/* git log style timeline */}
				<section>
					<h2 className="mb-6 font-mono text-lg text-text-muted">$ git log --oneline --reverse</h2>
					<div className="space-y-0.5 font-mono text-sm">
						{timeline.map((entry) => (
							<div
								key={entry.hash}
								className="group flex gap-3 rounded px-2 py-1.5 hover:bg-surface-1"
							>
								<span className="shrink-0 text-warning">{entry.hash}</span>
								<span className="shrink-0 text-text-muted">{entry.date}</span>
								<span className="text-text-secondary">{entry.message}</span>
								{entry.tag && (
									<span className="shrink-0 rounded-full border border-accent/30 px-2 text-xs text-accent-bright">
										{entry.tag}
									</span>
								)}
							</div>
						))}
					</div>
				</section>

				{/* dependencies as personality traits */}
				<section>
					<h2 className="mb-6 font-mono text-lg text-text-muted">$ cat dependencies</h2>
					<div className="rounded-lg border border-surface-2 bg-surface-1 p-6 font-mono text-sm">
						<pre className="whitespace-pre text-text-secondary">
							<span className="text-text-muted">{"{"}</span>
							{Object.entries(dependencies).map(([key, value], i, arr) => (
								<span key={key}>
									{"\n  "}
									<span className="text-accent-bright">"{key}"</span>:{" "}
									<span className="text-success">"{value}"</span>
									{i < arr.length - 1 ? "," : ""}
								</span>
							))}
							{"\n"}
							<span className="text-text-muted">{"}"}</span>
						</pre>
					</div>
				</section>
			</div>
		</PageLayout>
	)
}
