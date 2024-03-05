import { Suspense } from "react"

import Header from "@/components/header"

import type { ChildrenProps } from "@/types"

export default function AppLayout({ children }: ChildrenProps) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      {children}
    </>
  )
}
