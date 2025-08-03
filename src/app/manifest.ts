import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "kage1020",
    short_name: "kage1020",
    description: "kage1020's website",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    lang: "ja",
  }
}
