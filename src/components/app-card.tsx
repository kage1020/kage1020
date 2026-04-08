import Link from "next/link"
import type { App } from "@/types"

export function AppCard({ app }: { app: App }) {
	return (
		<Link
			href={`/apps/${app.id}`}
			className="group block rounded-lg border border-surface-2 bg-surface-1 p-5 transition-colors hover:border-surface-3 hover:bg-surface-2"
			transitionTypes={["navigate"]}
		>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-medium group-hover:text-accent-bright">{app.title}</h3>
				<span
					className={`rounded-full px-2 py-0.5 font-mono text-xs ${
						app.status === "active"
							? "bg-success/10 text-success"
							: app.status === "beta"
								? "bg-warning/10 text-warning"
								: "bg-surface-2 text-text-muted"
					}`}
				>
					{app.status}
				</span>
			</div>
			<p className="mb-4 text-sm text-text-secondary">{app.description}</p>
			<div className="flex flex-wrap gap-2">
				{app.technologies.map((tech) => (
					<span
						key={tech}
						className="rounded bg-surface-2 px-2 py-0.5 font-mono text-xs text-text-muted"
					>
						{tech}
					</span>
				))}
			</div>
		</Link>
	)
}
