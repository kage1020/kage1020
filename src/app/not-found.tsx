import Link from "next/link"
import { ViewTransition } from "react"
import { Logo } from "@/components/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-6 text-gray-400 hover:text-white transition-colors"
        >
          <div className="relative transition-transform hover:scale-110">
            <Logo />
          </div>
          <ViewTransition name="name">
            <h1 className="text-6xl font-bold">kage1020</h1>
          </ViewTransition>
        </Link>

        <h2 className="text-6xl font-bold mt-8 mb-4">404</h2>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#1a1a1a] text-white rounded-lg hover:bg-neutral-900 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
