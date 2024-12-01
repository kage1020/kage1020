import type { Metadata, Viewport } from "next"

import { GoogleTagManager } from "@next/third-parties/google"
import { ViewTransitions } from "next-view-transitions"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "kage1020",
    template: "%s | kage1020",
  },
  description: "A portfolio site of kage1020",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? process.env.CF_PAGES_URL ?? "",
  ),
  alternates: {
    canonical: new URL(
      process.env.NEXT_PUBLIC_BASE_URL ?? process.env.CF_PAGES_URL ?? "",
    ),
  },
  openGraph: {
    title: "kage1020",
    description: "A portfolio site of kage1020",
    siteName: "kage1020",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "kage1020",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kage1020",
    description: "A portfolio site of kage1020",
    site: "@kage1020",
    creator: "@kage1020",
    images: ["/open-graph.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#2d70b3",
}

export default function RootLayout({
  modal,
  children,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="ja">
        <body className="from-stone-950 to-stone-900 text-white h-screen overflow-hidden bg-gradient-to-b p-8">
          {process.env.NODE_ENV === "production" && (
            <GoogleTagManager
              gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? ""}
            />
          )}
          {children}
          {modal}
          <div id="modal-root"></div>
        </body>
      </html>
    </ViewTransitions>
  )
}
