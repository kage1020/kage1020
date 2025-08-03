"use client"

import galleryData from "@/data/gallery.json"
import type { Gallery } from "@/types"
import { cn } from "@/utils"
import { getTechColor, getTechIcon } from "@/utils/techColors"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { use, useCallback, useEffect, useState } from "react"
import {
  FaExternalLinkAlt,
  FaGithub,
  FaNewspaper,
  FaTimes,
} from "react-icons/fa"

export const runtime = "edge"

const projects = galleryData as Gallery[]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function GalleryModal({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const project = projects.find((p) => p.id === id)

  const handleClose = useCallback(() => {
    setIsClosing(true)

    setTimeout(() => router.back(), 200)
  }, [router])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [handleClose])

  if (!project) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out",
        isVisible && !isClosing ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "bg-[#111111] rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative transition-all duration-200 ease-out",
          isVisible && !isClosing
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors bg-black/50 rounded-full p-2"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8 space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={project.screenshots[0]}
              alt={`${project.title} メインスクリーンショット`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          <div
            className={cn(
              "grid gap-8",
              project.screenshots.length > 1
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {project.screenshots.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">More Screenshots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.screenshots.slice(1).map((screenshot, index) => (
                    <div
                      key={index + 1}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(screenshot)}
                    >
                      <Image
                        src={screenshot}
                        alt={`${project.title} スクリーンショット ${index + 2}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 rounded-full p-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className={cn(
                "space-y-6",
                project.screenshots.length <= 1 && "max-w-2xl mx-auto"
              )}
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => {
                    const Icon = getTechIcon(tech)
                    return (
                      <span
                        key={tech}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full flex items-center gap-1.5",
                          getTechColor(tech)
                        )}
                      >
                        {Icon && <Icon size={12} />}
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-2">
                  <span className="text-white font-medium">Date:</span>{" "}
                  {project.date}
                </p>
              </div>

              <div className="flex gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d70b3] hover:bg-[#3d80c3] transition-colors rounded-lg text-sm"
                  >
                    <FaExternalLinkAlt size={14} />
                    Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#333333] hover:bg-[#444444] transition-colors rounded-lg text-sm"
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                )}
              </div>

              {/* 関連記事 */}
              {project.articles && project.articles.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Related Articles</h3>
                  <div className="space-y-2">
                    {project.articles.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 p-2 bg-[#1a1a1a] hover:bg-[#222222] rounded-lg transition-colors group text-sm"
                      >
                        <FaNewspaper
                          className="text-gray-400 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        <div className="flex-1">
                          <span className="font-medium group-hover:text-[#2d70b3] transition-colors">
                            {article.title}
                          </span>
                          {article.type && (
                            <span className="text-xs text-gray-500 ml-2">
                              (
                              {article.type === "blog"
                                ? "Blog"
                                : article.type === "tech"
                                ? "Tech"
                                : "External"}
                              )
                            </span>
                          )}
                        </div>
                        <FaExternalLinkAlt
                          className="text-gray-400 group-hover:text-gray-300 mt-0.5 flex-shrink-0"
                          size={12}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
          >
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                aria-label="Close image"
              >
                <FaTimes size={20} />
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="拡大表示"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
