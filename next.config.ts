import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	reactCompiler: true,
	experimental: {
		viewTransition: true,
	},
}

export default nextConfig

if (process.env.VERCEL !== "1") {
	import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) =>
		initOpenNextCloudflareForDev(),
	)
}
