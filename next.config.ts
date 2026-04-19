import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    typedEnv: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com", pathname: "/**" },
    ],
  },
}

export default nextConfig

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "development") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) =>
    initOpenNextCloudflareForDev(),
  )
}
