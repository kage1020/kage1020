import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  // cacheComponents: true,
  experimental: {
    viewTransition: true,
    typedEnv: true,
    taint: true,
    // useCache: true,
  },
}

export default nextConfig

if (process.env.VERCEL !== "1") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) =>
    initOpenNextCloudflareForDev(),
  )
}
