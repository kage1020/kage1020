import type { Route } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { ViewTransition } from "react"
import { Logo } from "@/components/logo"
import { cn } from "@/utils"

export interface Breadcrumb {
  href: Route
  label: string
  icon?: ReactNode
}

interface PageLayoutProps {
  children: ReactNode
  breadcrumbs?: Breadcrumb[]
  maxWidth?: "4xl" | "6xl" | "7xl"
  className?: string
}

export default function PageLayout({
  children,
  breadcrumbs = [],
  maxWidth = "7xl",
  className = "",
}: PageLayoutProps) {
  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  }

  return (
    <div className={cn("min-h-screen p-8", className)}>
      <div className={cn("mx-auto", maxWidthClasses[maxWidth])}>
        <div className="flex items-center gap-6 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="relative transition-transform hover:scale-110 w-6 h-6">
              <Logo width={24} height={24} />
            </div>
            <ViewTransition name="name">
              <h1 className="text-sm font-medium">kage1020</h1>
            </ViewTransition>
          </Link>
          {breadcrumbs.map((breadcrumb) => (
            <div key={breadcrumb.href} className="flex items-center gap-6">
              <span className="text-gray-500">/</span>
              <Link
                href={breadcrumb.href}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                {breadcrumb.icon}
                <ViewTransition>{breadcrumb.label}</ViewTransition>
              </Link>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}
