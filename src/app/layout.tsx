import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata, Viewport } from "next"
import { ViewTransition } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "kage1020",
    template: "%s | kage1020",
  },
  description: "A website of kage1020",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? process.env.CF_PAGES_URL ?? "",
  ),
  alternates: {
    canonical: new URL(
      process.env.NEXT_PUBLIC_BASE_URL ?? process.env.CF_PAGES_URL ?? "",
    ),
  },
}

export const viewport: Viewport = {
  themeColor: "#2d70b3",
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased bg-[#0a0a0a] text-white">
        <ViewTransition>
          {children}
          {modal}
          {process.env.NODE_ENV === "production" && (
            <GoogleTagManager
              gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? ""}
            />
          )}
        </ViewTransition>
      </body>
    </html>
  )
}
