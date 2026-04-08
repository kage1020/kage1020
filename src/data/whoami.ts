export const pkg = {
	name: "kage1020",
	version: "v2.0.0",
	description: "Builds things for the web. Breaks things too, but less often now.",
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
	license: "MIT",
} as const

export type TimelineEntry = {
	hash: string
	date: string
	message: string
	tag?: string
}

export const timeline: TimelineEntry[] = [
	{
		hash: "a1b2c3d",
		date: "2020-04",
		message: "feat: started programming, fell into the rabbit hole",
	},
	{
		hash: "e4f5g6h",
		date: "2021-04",
		message: "feat: first web app with React — it was ugly, but it worked",
	},
	{
		hash: "i7j8k9l",
		date: "2022-04",
		message: "refactor: switched to TypeScript, never looked back",
	},
	{
		hash: "m0n1o2p",
		date: "2023-04",
		message: "feat: started building production apps with Next.js",
	},
	{
		hash: "q3r4s5t",
		date: "2024-04",
		message: "feat: deployed to the edge — Cloudflare Workers",
		tag: "edge-era",
	},
	{
		hash: "u6v7w8x",
		date: "2025-04",
		message: "docs: formalized engineering philosophy — 6 principles",
		tag: "philosophy",
	},
	{
		hash: "y9z0a1b",
		date: "2026-04",
		message: "refactor!: rebuilt kage1020.com from scratch",
		tag: "v2.0.0",
	},
]

export const dependencies: Record<string, string> = {
	curiosity: "unbounded",
	"attention-to-detail": "obsessive",
	"user-empathy": "core",
	"dark-mode": "always",
	coffee: "^3.0.0/day",
}
