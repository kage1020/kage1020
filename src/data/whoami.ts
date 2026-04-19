export const pkg = {
  name: "kage1020",
  version: "v2.0.0",
  description:
    "Engineer architecting fun. Passionate about crafting delightful user experiences and elegant code. This is my personal playground to experiment, learn, and share my journey in software development.",
  keywords: [
    "TypeScript",
    "React",
    "Next.js",
    "Cloudflare Workers",
    "Tailwind CSS",
    "Hono",
    "Drizzle ORM",
    "Vite",
  ],
  repository: "https://github.com/kage1020",
  author: "kage1020",
} as const

export type TimelineEntry = {
  hash: string
  date: string
  message: string
  tag?: string
}

export const timeline: TimelineEntry[] = [
  {
    hash: "0770672bc505f89a8d80f0c9f04fd89ce413909a",
    date: "2020-04",
    message: "feat: started programming, fell into the rabbit hole",
    tag: "origin",
  },
  {
    hash: "093528fa08f97b1ef73032fe4e620a9ae08cdfe2",
    date: "2020-12",
    message: "feat: first web app with GAS — it was ugly, but it worked",
  },
  {
    hash: "89a332f03a41d9ade49289a261817257b3e5ae4f",
    date: "2021-10",
    message:
      "feat: built first Next.js app - an User-First community dashboard",
    tag: "v1.0.0",
  },
  {
    hash: "5b14a14c2991a456199116a3e81a264a40971eff",
    date: "2022-06",
    message: "feat: started web development as a career",
    tag: "career",
  },
  {
    hash: "6e5ccf3b0185d5b64a8d3f448c0a789820ea8312",
    date: "2022-10",
    message: "feat: discovered the joy of building tools and games",
  },
  {
    hash: "50768999bb3875af429d9f19bd9779780329e441",
    date: "2023-12",
    message:
      "chore: learned web stack end-to-end, built a personal website to experiment and share",
    tag: "v1.1.0",
  },
  {
    hash: "23b8420e9f67f4794306b931fa9136ef765831ba",
    date: "2025-04",
    message:
      'feat: created "FontLens", a simple web application for comparing and previewing fonts.',
  },
  {
    hash: "22ff12e3f41984ff8264fcc3763d87f0a86b181b",
    date: "2025-06",
    message:
      'feat: created "React Component Color", a VSCode extension that provides visual color coding for React components based on whether they are Server Components or Client Components in modern React applications.',
  },
  {
    hash: "3613cfce4044577bc1594d9d35b69eb1335feb00",
    date: "2026-01",
    message:
      "refactor: Update my philosophy to be more concise and focused on core principles",
    tag: "philosophy",
  },
]

export const socials = [
  {
    key: "github",
    label: "GitHub",
    url: "https://github.com/kage1020",
    handle: "kage1020",
  },
  { key: "x", label: "X", url: "https://x.com/kage1020", handle: "@kage1020" },
] as const
