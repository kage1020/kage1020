import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP } from "next/font/google"

import { GoogleTagManager } from "@next/third-parties/google"

import { cn } from "@/libs/util"

import "@/styles/globals.css"
import type { ChildrenProps } from "@/types"

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "kage1020",
    template: "%s | kage1020",
  },
  description: "A portfolio site of kage1020",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
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
  icons: {
    icon: ["/favicon.ico", "/icon.svg"],
    apple: ["/apple-touch-icon.png"],
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

type RootLayoutProps = ChildrenProps & {
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ja" className="dark">
      <body className={cn(NotoSansJP.className, "relative bg-stone-900")}>
        {process.env.NODE_ENV === "production" && (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? ""}
          />
        )}
        <div className="relative z-10 p-12">{children}</div>
        {modal}
        <div id="modal-root" className="absolute inset-0"></div>
      </body>
    </html>
  )
}
