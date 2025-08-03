import PageLayout from "@/components/page-layout"
import appsData from "@/data/apps.json"
import { App } from "@/types"
import { cn } from "@/utils"
import { getTechColor, getTechIcon } from "@/utils/techColors"
import Image from "next/image"
import Link from "next/link"
import { unstable_ViewTransition as ViewTransition } from "react"
import { FaNewspaper } from "react-icons/fa"

const apps = appsData as App[]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-600 text-white"
    case "maintenance":
      return "bg-yellow-600 text-white"
    case "development":
      return "bg-blue-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active":
      return "Active"
    case "maintenance":
      return "Maintenance"
    case "development":
      return "In Development"
    default:
      return "Unknown"
  }
}

const isExternalUrl = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://")
}

interface AppCardProps {
  app: App
}

function AppCard({ app }: AppCardProps) {
  const CardContent = (
    <div className="bg-[#111111] rounded-lg overflow-hidden hover:bg-[#1a1a1a] transition-colors h-full cursor-pointer grid grid-rows-[auto_1fr]">
      <div className="relative aspect-video">
        <Image
          src={app.screenshot}
          alt={`${app.title} screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 grid grid-rows-subgrid row-span-1">
        <div className="grid grid-rows-[auto_1fr_auto_auto] gap-3 h-full">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{app.title}</h3>
              {app.articles && app.articles.length > 0 && (
                <div
                  className="flex items-center gap-1 text-xs text-gray-400"
                  title={`${app.articles.length} article${
                    app.articles.length > 1 ? "s" : ""
                  }`}
                >
                  <FaNewspaper size={12} />
                  <span>{app.articles.length}</span>
                </div>
              )}
            </div>
            <span
              className={cn(
                "px-2 py-1 text-xs rounded-full",
                getStatusColor(app.status)
              )}
            >
              {getStatusLabel(app.status)}
            </span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2">
            {app.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {app.technologies.map((tech) => {
              const Icon = getTechIcon(tech)
              return (
                <span
                  key={tech}
                  className={cn(
                    "px-2 py-1 text-xs rounded-full flex items-center gap-1",
                    getTechColor(tech)
                  )}
                >
                  {Icon && <Icon size={10} />}
                  {tech}
                </span>
              )
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{app.category}</span>
            <span>{app.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  )

  if (isExternalUrl(app.url)) {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {CardContent}
      </a>
    )
  }

  return (
    <Link href={app.url} className="block">
      {CardContent}
    </Link>
  )
}

export default function AppsPage() {
  return (
    <PageLayout>
      <ViewTransition name="apps-header">
        <h2 className="text-4xl font-bold mb-8">Apps</h2>
      </ViewTransition>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </PageLayout>
  )
}
