import Image from "next/image"
import Link from "next/link"
import { ViewTransition } from "react"
import { FaExternalLinkAlt, FaGithub, FaNewspaper } from "react-icons/fa"
import PageLayout from "@/components/page-layout"
import galleryData from "@/data/gallery.json"
import type { Gallery } from "@/types"
import { getTechColor, getTechIcon } from "@/utils/techColors"

const projects = galleryData as Gallery[]

interface ProjectCardProps {
  project: Gallery
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[#111111] rounded-lg overflow-hidden hover:bg-[#1a1a1a] transition-all duration-200 h-full grid grid-rows-[auto_auto_1fr_auto_auto] gap-3">
      <Link
        href={`/gallery/${project.id}`}
        className="row-start-1 row-end-6 col-start-1 grid grid-rows-subgrid p-6 gap-4"
      >
        <div className="relative aspect-video -m-6 mb-2 row-start-1">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <h3 className="font-bold text-lg row-start-2">{project.title}</h3>

        <p className="text-gray-400 text-sm line-clamp-2 row-start-3">
          {project.description}
        </p>
      </Link>

      <div className="flex flex-wrap gap-2 row-start-4 col-start-1 px-6 pointer-events-none">
        {project.technologies.map((tech) => {
          const Icon = getTechIcon(tech)
          return (
            <span
              key={tech}
              className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getTechColor(
                tech,
              )}`}
            >
              {Icon && <Icon size={12} />}
              {tech}
            </span>
          )
        })}
      </div>

      <div className="flex items-center justify-between row-start-5 col-start-1 px-6 pb-6 pointer-events-none">
        <span className="text-gray-500 text-sm">{project.date}</span>
        <div className="flex gap-2 pointer-events-auto relative z-10">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={16} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaExternalLinkAlt size={16} />
            </a>
          )}
          {project.articles && project.articles.length > 0 && (
            <a
              href={project.articles[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#2d70b3] transition-colors"
              title={project.articles[0].title}
            >
              <FaNewspaper size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <PageLayout>
      <ViewTransition>
        <h2 className="text-4xl font-bold mb-8">Gallery</h2>
      </ViewTransition>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageLayout>
  )
}
