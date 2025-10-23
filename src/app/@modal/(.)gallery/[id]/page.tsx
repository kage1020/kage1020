import { Suspense } from "react"
import GalleryModalContent from "./content"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function GalleryModal({ params }: PageProps) {
  return (
    <Suspense>
      <GalleryModalContent params={params} />
    </Suspense>
  )
}
