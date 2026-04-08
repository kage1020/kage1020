import type { Metadata } from "next"
import { AppCard } from "@/components/app-card"
import { PageLayout } from "@/components/page-layout"
import { apps } from "@/data/apps"

export const metadata: Metadata = {
	title: "apps",
	description: "Utility apps built by kage1020. Simple tools that just work.",
}

export default function AppsPage() {
	return (
		<PageLayout>
			<div className="space-y-8">
				<header className="space-y-4">
					<h1 className="font-mono text-lg text-text-muted">$ ls apps</h1>
					<p className="text-text-secondary">
						Small utility apps. Not big enough for their own domain, useful enough to share.
					</p>
				</header>

				<div className="grid gap-4 sm:grid-cols-2">
					{apps.map((app) => (
						<AppCard key={app.id} app={app} />
					))}
				</div>
			</div>
		</PageLayout>
	)
}
