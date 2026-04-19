import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { Tag } from "@/components/tui/primitives"
import { apps } from "@/data/apps"

export const appComponents: Record<string, React.ComponentType> = {
  timezone: dynamic(() => import("@/apps/timezone")),
  "lorem-text": dynamic(() => import("@/apps/lorem-text")),
}

export function generateStaticParams() {
  return apps.map((app) => ({ appId: app.id }))
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ appId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { appId } = await params
  const app = apps.find((a) => a.id === appId)
  if (!app) return {}

  // Timezone's OGP is driven by `?cities=...` via a Route Handler so share links
  // preserve the selected cities. Other apps use the static opengraph-image.tsx.
  if (appId === "timezone") {
    const sp = await searchParams
    const cities = typeof sp.cities === "string" ? sp.cities : undefined
    const ogUrl = cities
      ? `/api/og/timezone?cities=${encodeURIComponent(cities)}`
      : "/api/og/timezone"
    const ogImage = { url: ogUrl, width: 1200, height: 630, alt: app.title }
    return {
      title: app.title,
      description: app.description,
      openGraph: {
        title: app.title,
        description: app.description,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title: app.title,
        description: app.description,
        images: [ogImage],
      },
    }
  }

  return {
    title: app.title,
    description: app.description,
  }
}

const statusTone: Record<string, "success" | "warn" | "default"> = {
  active: "success",
  beta: "warn",
  archived: "default",
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ appId: string }>
}) {
  const { appId } = await params
  const app = apps.find((a) => a.id === appId)
  if (!app) notFound()

  const AppComponent = appComponents[appId]
  if (!AppComponent) notFound()

  return (
    <PageLayout>
      <BlockStream>
        <Block
          command={`cd apps/${app.id}`}
          duration="0ms"
          timestamp={app.category}
        >
          <div className="flex items-baseline gap-3">
            <Link
              href="/apps"
              className="font-mono text-text-muted hover:text-accent-bright"
              transitionTypes={["navigate"]}
            >
              ..
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary">{app.title}</span>
            <Tag tone={statusTone[app.status] ?? "default"}>{app.status}</Tag>
          </div>
          <p className="mt-2 text-text-secondary">{app.description}</p>
        </Block>

        <Block
          command={`./${app.id}`}
          duration="running"
          timestamp="output"
        >
          <Suspense fallback={null}>
            <AppComponent />
          </Suspense>
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
