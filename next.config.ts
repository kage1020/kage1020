import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  // cacheComponents is not yet supported by @opennextjs/cloudflare
  // cacheComponents: true,
  experimental: {
    viewTransition: true,
    typedEnv: true,
    taint: true,
    // useCache: true,
  },
}

export default nextConfig

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

initOpenNextCloudflareForDev()
