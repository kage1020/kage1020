"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense, use } from "react"
import { apps } from "@/data/apps"
import { appComponents } from "@/lib/apps-registry"

export default function AppPage({ params }: { params: Promise<{ appId: string }> }) {
	const { appId } = use(params)
	const app = apps.find((a) => a.id === appId)
	if (!app) notFound()

	const AppComponent = appComponents[appId]
	if (!AppComponent) notFound()

	return (
		<div className="min-h-dvh">
			{/* App header */}
			<header className="border-b border-surface-2 bg-surface-0">
				<div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
					<Link href="/apps" className="font-mono text-sm text-accent-bright hover:text-accent">
						← apps
					</Link>
					<span className="font-mono text-sm text-text-muted">/</span>
					<h1 className="font-mono text-sm">{app.title}</h1>
				</div>
			</header>

			{/* App content */}
			<main className="mx-auto max-w-4xl px-6 py-8">
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-16">
							<span className="font-mono text-sm text-text-muted animate-pulse">Loading...</span>
						</div>
					}
				>
					<AppComponent />
				</Suspense>
			</main>
		</div>
	)
}
