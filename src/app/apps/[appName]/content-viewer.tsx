import Image from "next/image"

import { LuExternalLink } from "react-icons/lu"
import { MdEvent } from "react-icons/md"
import { SiGithub } from "react-icons/si"

import Chip from "@/components/chip"

import type { AppProperty } from "@/utils"

export default function ContentViewer({ app }: { app: AppProperty }) {
  return (
    <div className="space-y-8 break-all p-4 text-white md:p-8">
      <p className="text-center text-5xl">{app.name}</p>
      <p>{app.long}</p>
      <div className="flex flex-wrap gap-2">
        {app.tag.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {app.url && (
          <a
            className="flex items-center space-x-2 underline"
            href={app.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <LuExternalLink size={20} />
            <span>{app.url}</span>
          </a>
        )}
        <a
          className="flex items-center space-x-2 underline"
          href={app.github}
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiGithub size={20} />
          <span>{app.github}</span>
        </a>
        <span className="flex items-center space-x-2">
          <MdEvent size={20} />
          <span>Created At: {app.createdAt}</span>
        </span>
        <span>
          Status: <Chip className="inline">{app.status}</Chip>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
        {app.images.map((image, index) => (
          <div key={index} className="row-span-2 grid grid-rows-subgrid gap-2">
            <Image
              src={image.src}
              alt={image.alt}
              style={{ width: "100%", height: "auto" }}
            />
            <p className="text-center">{image.alt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
