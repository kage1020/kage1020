import LogoLink from "@/components/LogoLink"
import Link from "next/link"
import { unstable_ViewTransition as ViewTransition } from "react"
import { FaArrowRight, FaCode, FaGithub, FaPen, FaRocket } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-5xl w-full">
        <div className="text-center mb-20">
          <LogoLink size="large" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link
            href="/gallery"
            className="group bg-[#111111] border border-gray-800 hover:border-blue-500/50 rounded-xl p-12 transition-all duration-300 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
                <FaCode className="text-blue-400 text-2xl" />
              </div>
              <ViewTransition name="gallery-header">
                <h2 className="text-xl font-bold mb-2">Gallery</h2>
              </ViewTransition>
              <div className="flex items-center text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                <span className="text-sm">View Projects</span>
                <FaArrowRight className="ml-2 text-xs" />
              </div>
            </div>
          </Link>

          <Link
            href="/apps"
            className="group bg-[#111111] border border-gray-800 hover:border-green-500/50 rounded-xl p-12 transition-all duration-300 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors duration-300">
                <FaRocket className="text-green-400 text-2xl" />
              </div>
              <ViewTransition name="apps-header">
                <h2 className="text-xl font-bold mb-2">Apps</h2>
              </ViewTransition>
              <div className="flex items-center text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                <span className="text-sm">Try Live Apps</span>
                <FaArrowRight className="ml-2 text-xs" />
              </div>
            </div>
          </Link>

          <Link
            href="/blogs"
            className="group bg-[#111111] border border-gray-800 hover:border-purple-500/50 rounded-xl p-12 transition-all duration-300 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors duration-300">
                <FaPen className="text-purple-400 text-2xl" />
              </div>
              <ViewTransition name="blogs-header">
                <h2 className="text-xl font-bold mb-2">Blogs</h2>
              </ViewTransition>
              <div className="flex items-center text-gray-400 group-hover:text-purple-400 transition-colors duration-300">
                <span className="text-sm">Read Articles</span>
                <FaArrowRight className="ml-2 text-xs" />
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/kage1020"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-gray-800 group-hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-300">
              <FaGithub size={20} />
            </div>
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href="https://twitter.com/kage1020"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-gray-800 group-hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-300">
              <FaXTwitter size={20} />
            </div>
            <span className="text-sm font-medium">X</span>
          </a>
        </div>
      </main>
    </div>
  )
}
