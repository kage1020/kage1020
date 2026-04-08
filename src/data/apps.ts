import type { App } from "@/types"

export const apps: App[] = [
	{
		id: "timezone",
		title: "World Timezone",
		description: "Compare time across cities worldwide. Visual timeline with local offset.",
		status: "active",
		technologies: ["React", "TypeScript"],
		category: "Utility",
	},
	{
		id: "lorem-text",
		title: "Lorem Text Generator",
		description: "Generate placeholder text in various styles and lengths.",
		status: "active",
		technologies: ["React", "TypeScript"],
		category: "Developer Tool",
	},
]
