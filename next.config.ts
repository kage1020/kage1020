import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
    ]
  },
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
