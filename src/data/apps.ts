type App = {
  id: string
  title: string
  description: string
  status: "active" | "beta" | "archived"
  technologies: string[]
  category: string
}

export const apps: App[] = [
  {
    id: "land",
    title: "Land",
    description: "Land is a next-generation knowledge management tool where AI automatically organizes your files. Visualize relationships on a canvas, and what you need naturally finds you.",
    status: "active",
    technologies: ["React", "TypeScript", "Hono", "Cloudflare", "AI", "RAG"],
    category: "File System",
  },
  {
    id: "fontlens",
    title: "Font Lens",
    description:
      "Compare Google Fonts, custom CDN fonts, and system fonts side-by-side across body, headings, UI, and code contexts.",
    status: "active",
    technologies: ["React", "TypeScript", "Cloudflare", "Web Fonts"],
    category: "Developer Tool",
  },
  {
    id: "timezone",
    title: "World Timezone",
    description:
      "Compare time across cities worldwide. Visual timeline with local offset.",
    status: "active",
    technologies: ["React", "TypeScript"],
    category: "Utility",
  },
  {
    id: "lorem-text",
    title: "Random Text Generator",
    description:
      "UI for random.kage1020.com — generate identifiers (CUID, UUID, ULID), random strings, Japanese text, and Lorem Ipsum.",
    status: "active",
    technologies: ["React", "TypeScript", "Cloudflare", "Hono"],
    category: "Developer Tool",
  },
]
