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
    technologies: ["React", "TypeScript", "random.kage1020.com"],
    category: "Developer Tool",
  },
]
