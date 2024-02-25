import Image from "next/image"

import { LuExternalLink } from "react-icons/lu"
import { SiGithub } from "react-icons/si"

import Chip from "@/components/chip"
import Modal from "@/components/modal"
import { apps } from "@/utils"

export const runtime = "edge"

export default function AppPage({
  params: { appName },
}: {
  params: { appName: string }
}) {
  return (
    <Modal>
      {appName === "StockDataSupplier" && (
        <div className="space-y-8 p-8">
          <p className="text-center text-5xl">StockDataSupplier</p>
          <p>{apps[0].description}</p>
          <div className="flex flex-wrap gap-2">
            {apps[0].tag.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <div className="flex space-x-4">
            <a
              className="flex items-center space-x-2 underline"
              href={apps[0].url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LuExternalLink className="inline" />
              <span>{apps[0].url}</span>
            </a>
            <a
              className="flex items-center space-x-2 underline"
              href={apps[0].github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <SiGithub className="inline" />
              <span>{apps[0].url}</span>
            </a>
            <span>Created At: {apps[0].createdAt}</span>
            <span>
              Status: <Chip className="inline">{apps[0].status}</Chip>
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {apps[0].images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}
