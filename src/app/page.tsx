import Link from "next/link"

import Chip from "@/components/chip"
import { apps } from "@/utils"

export default function Home() {
  return (
    <main className="mx-auto grid h-full max-w-4xl grid-cols-1 gap-6 overflow-auto p-4 text-white md:grid-cols-2">
      {apps.map((app) => {
        return (
          <div
            key={app.name}
            className="relative row-span-5 grid grid-rows-subgrid rounded-lg bg-stone-800 p-4 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="!mt-0 text-center text-2xl font-bold">{app.name}</p>
            <p>{app.description}</p>
            <div className="flex flex-wrap gap-2">
              {app.tag.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            <span className="absolute bottom-4 left-4">
              Created At: {app.createdAt}
            </span>
            <Link
              className="absolute inset-0 z-0"
              href={app.href}
              scroll={false}
            ></Link>
            <Chip className="absolute bottom-4 right-4">{app.status}</Chip>
          </div>
        )
      })}
    </main>
  )
}
