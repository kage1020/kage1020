import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"

import { cn } from "@/libs/util"

import "@/styles/globals.css"
import type { ChildrenProps } from "@/types"

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "kage1020",
  description: "A portfolio site of kage1020",
}

type RootLayoutProps = ChildrenProps & {
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ja" className="dark">
      <body className={cn(NotoSansJP.className, "relative bg-stone-900")}>
        <div className="relative z-10 p-12">{children}</div>
        {modal}
        <div id="modal-root" className="absolute inset-0"></div>
      </body>
    </html>
  )
}
