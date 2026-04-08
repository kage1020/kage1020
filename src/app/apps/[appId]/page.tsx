import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { apps } from "@/data/apps"
import { appComponents } from "@/lib/apps-registry"

export function generateStaticParams() {
	return apps.map((app) => ({ appId: app.id }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ appId: string }>
}): Promise<Metadata> {
	const { appId } = await params
	const app = apps.find((a) => a.id === appId)
	if (!app) return {}
	return {
		title: app.title,
		description: app.description,
	}
}

export default async function AppPage({ params }: { params: Promise<{ appId: string }> }) {
	const { appId } = await params
	const app = apps.find((a) => a.id === appId)
	if (!app) notFound()

	const AppComponent = appComponents[appId]
	if (!AppComponent) notFound()

	return (
		<div className="min-h-dvh">
			<header className="border-b border-surface-2 bg-surface-0">
				<div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
					<Link href="/apps" className="font-mono text-sm text-accent-bright hover:text-accent">
						← apps
					</Link>
					<span className="font-mono text-sm text-text-muted">/</span>
					<h1 className="font-mono text-sm">{app.title}</h1>
				</div>
			</header>
			<main className="mx-auto max-w-4xl px-6 py-8">
				<AppComponent />
			</main>
		</div>
	)
}
