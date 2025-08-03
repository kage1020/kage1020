import { cn } from "@/utils"
import Link from "next/link"
import { ReactNode, unstable_ViewTransition as ViewTransition } from "react"
import LogoLink from "./LogoLink"

interface Breadcrumb {
  href: string
  label: string
  icon?: ReactNode
  transitionName?: string
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
          <LogoLink />
          {breadcrumbs.map((breadcrumb) => (
            <div key={breadcrumb.href} className="flex items-center gap-6">
              <span className="text-gray-500">/</span>
              <Link
                href={breadcrumb.href}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                {breadcrumb.icon}
                <ViewTransition name={breadcrumb.transitionName}>
                  {breadcrumb.label}
                </ViewTransition>
              </Link>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}
