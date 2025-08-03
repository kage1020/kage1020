import appsData from "@/data/apps.json"
import galleryData from "@/data/gallery.json"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kage1020.com"

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ] satisfies MetadataRoute.Sitemap

  const galleryPages = galleryData.map((project) => ({
    url: `${baseUrl}/gallery/${project.id}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly",
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap

  const appPages = appsData.map((app) => ({
    url: `${baseUrl}${app.url}`,
    lastModified: new Date(app.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.9,
  })) satisfies MetadataRoute.Sitemap

  return [...staticPages, ...galleryPages, ...appPages]
}
