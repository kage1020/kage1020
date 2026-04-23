import type { MetadataRoute } from "next"
import { apps } from "@/data/apps"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kage1020.com"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/whoami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/philosophy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/apps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/works`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/writing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ]

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${base}/apps/${app.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...appRoutes]
}
