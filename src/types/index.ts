export type App = {
	id: string
	title: string
	description: string
	status: "active" | "beta" | "archived"
	technologies: string[]
	category: string
}
