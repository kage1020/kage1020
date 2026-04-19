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

// Initialise OpenNext's Cloudflare bindings shim for local `next dev` so code
// using `getCloudflareContext()` works in development. Skipped on Vercel CI
// because wrangler isn't available there.
if (process.env.VERCEL !== "1") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) =>
    initOpenNextCloudflareForDev(),
  )
}
