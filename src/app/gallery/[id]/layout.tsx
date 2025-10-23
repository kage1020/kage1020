import { Suspense } from "react"

export default function GalleryLayout({
  children,
}: LayoutProps<"/gallery/[id]">) {
  return <Suspense>{children}</Suspense>
}
