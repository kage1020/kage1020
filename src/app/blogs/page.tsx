import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { FaGithub, FaTools } from "react-icons/fa"

export default function BlogsPage() {
  return (
    <PageLayout maxWidth="4xl">
      <div className="text-center py-16">
        <div className="mb-8">
          <FaTools size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Under Construction</h1>
          <p className="text-gray-400 text-lg">
            This section is currently under development.
          </p>
        </div>

        <div className="bg-[#111111] rounded-lg p-8 max-w-md mx-auto">
          <p className="text-gray-300 mb-6">
            We&apos;re working hard to bring you amazing content. Stay tuned!
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
            <a
              href="https://github.com/kage1020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaGithub size={16} />
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
