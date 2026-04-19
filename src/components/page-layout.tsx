import { ViewTransition } from "react"
import { cn } from "@/lib/cn"
import { ShellPrompt } from "./shell-prompt"

export function PageLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <ShellPrompt />
      <ViewTransition enter="vt-slide-up">
        <main className={cn("mx-auto max-w-3xl px-6 py-12", className)}>
          {children}
        </main>
      </ViewTransition>
    </>
  )
}
