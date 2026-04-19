import type { Metadata, Viewport } from "next"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "kage1020",
    template: "%s — kage1020",
  },
  description:
    "Builds things for the web. Breaks things too, but less often now.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      process.env.CF_PAGES_URL ??
      "https://kage1020.com",
  ),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "kage1020",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
}

export const viewport: Viewport = {
  themeColor: "#2d70b3",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body className="flex min-h-dvh flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
