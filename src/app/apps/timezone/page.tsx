import PageLayout from "@/components/page-layout"
import { timezones } from "@/utils/timezone"
import { Metadata } from "next"
import { Suspense } from "react"
import { FaArrowLeft } from "react-icons/fa"
import Timezone from "./timezone"

export const runtime = "edge"

interface PageProps {
  searchParams: Promise<{ from?: string; to?: string; format24?: string }>
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams
  const from = params.from || "Asia/Tokyo"
  const to = params.to || "America/New_York"
  const format24 = params.format24 || "true"

  const fromTimezone =
    timezones.find((tz) => tz.timezone === from) || timezones[0]
  const toTimezone = timezones.find((tz) => tz.timezone === to) || timezones[1]

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.CF_PAGES_URL || 'https://kage1020.com'
  const ogImageUrl = `${baseUrl}/api/og/timezone?from=${encodeURIComponent(
    from
  )}&to=${encodeURIComponent(to)}&format24=${format24}`

  const titleWithFlags = `${fromTimezone.flag} ${fromTimezone.name} ⇄ ${toTimezone.flag} ${toTimezone.name} - World Timezone`
  const descriptionWithFlags = `Compare time between ${fromTimezone.flag} ${fromTimezone.name} and ${toTimezone.flag} ${toTimezone.name}`

  return {
    title: titleWithFlags,
    description: descriptionWithFlags,
    openGraph: {
      title: titleWithFlags,
      description: descriptionWithFlags,
      type: "website",
      url: new URL(
        `/apps/timezone?from=${encodeURIComponent(
          from
        )}&to=${encodeURIComponent(to)}`,
        process.env.NEXT_PUBLIC_BASE_URL ?? process.env.CF_PAGES_URL ?? ""
      ),
      siteName: "kage1020",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${fromTimezone.name} and ${toTimezone.name} timezone comparison`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleWithFlags,
      description: descriptionWithFlags,
      images: [ogImageUrl],
    },
  }
}

export default function TimezonePage() {
  const breadcrumbs = [
    {
      href: "/apps",
      label: "Apps",
      icon: <FaArrowLeft size={16} />,
      transitionName: "apps-header",
    },
  ]

  return (
    <PageLayout breadcrumbs={breadcrumbs} maxWidth="6xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">World Timezone</h1>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-6">
          <Suspense
            fallback={<div className="flex justify-center p-8">Loading...</div>}
          >
            <Timezone />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  )
}
