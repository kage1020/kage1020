"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import { use, useState } from "react"
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaNewspaper,
  FaSearchPlus,
  FaTimes,
} from "react-icons/fa"
import PageLayout, { type Breadcrumb } from "@/components/page-layout"
import galleryData from "@/data/gallery.json"
import type { Gallery } from "@/types"
import { cn } from "@/utils"
import { getTechColor, getTechIcon } from "@/utils/techColors"

export const runtime = "edge"

const projects = galleryData as Gallery[]

interface PageProps {
  params: Promise<{ id: string }>
}

const breadcrumbs: Breadcrumb[] = [
  {
    href: "/gallery",
    label: "Gallery",
    icon: <FaArrowLeft size={16} />,
  },
]

export default function GalleryDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs} maxWidth="6xl">
      <div className="space-y-12">
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
            "grid gap-12",
            project.screenshots.length > 1
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1",
          )}
        >
          {project.screenshots.length > 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">More Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.slice(1).map((screenshot, index) => (
                  <div
                    key={screenshot}
                    role="dialog"
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(screenshot)}
                  >
                    <Image
                      src={screenshot}
                      alt={`${project.title} スクリーンショット ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 rounded-full p-2">
                        <FaSearchPlus className="w-6 h-6 text-white" />
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
              project.screenshots.length <= 1 && "max-w-3xl mx-auto",
            )}
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => {
                  const Icon = getTechIcon(tech)
                  return (
                    <span
                      key={tech}
                      className={`px-3 py-2 text-sm rounded-full flex items-center gap-2 ${getTechColor(
                        tech,
                      )}`}
                    >
                      {Icon && <Icon size={14} />}
                      {tech}
                    </span>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Project Info</h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <span className="text-white font-medium">Date:</span>{" "}
                  {project.date}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="flex gap-4">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d70b3] hover:bg-[#3d80c3] transition-colors rounded-lg"
                  >
                    <FaExternalLinkAlt size={16} />
                    Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#333333] hover:bg-[#444444] transition-colors rounded-lg"
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {project.articles && project.articles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {project.articles.map((article) => (
                    <a
                      key={article.url}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 bg-[#111111] hover:bg-[#1a1a1a] rounded-lg transition-colors group"
                    >
                      <FaNewspaper
                        className="text-gray-400 mt-1 flex-shrink-0"
                        size={16}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-[#2d70b3] transition-colors">
                          {article.title}
                        </h3>
                        {article.type && (
                          <span className="text-xs text-gray-500 mt-1">
                            {article.type === "blog"
                              ? "Blog Post"
                              : article.type === "tech"
                                ? "Tech Article"
                                : "External Article"}
                          </span>
                        )}
                      </div>
                      <FaExternalLinkAlt
                        className="text-gray-400 group-hover:text-gray-300 mt-1 flex-shrink-0"
                        size={14}
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
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
    </PageLayout>
  )
}
