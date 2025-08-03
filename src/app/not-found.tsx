import LogoLink from "@/components/LogoLink"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <LogoLink size="large" />

        <h1 className="text-6xl font-bold mt-8 mb-4">404</h1>
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
