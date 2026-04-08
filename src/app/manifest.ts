import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "kage1020",
		short_name: "kage1020",
		description: "Builds things for the web.",
		start_url: "/",
		display: "standalone",
		background_color: "#0a0a0a",
		theme_color: "#0a0a0a",
		icons: [
			{
				src: "/icons/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icons/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	}
}
