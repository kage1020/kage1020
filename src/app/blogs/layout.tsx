import type { ReactNode } from "react"
import PageLayout from "@/components/page-layout"

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <PageLayout maxWidth="4xl">{children}</PageLayout>
}
