import Link from "next/link"

import Card from "@/components/card"
import Chip from "@/components/chip"
import Transition from "@/components/transition"
import { apps } from "@/utils"

export const metadata = {
  title: "Apps",
  description: "A list of all my apps",
}

export default function Apps() {
  return (
    <Transition className="mx-auto grid h-full max-w-4xl grid-cols-1 gap-6 overflow-auto p-4 text-white md:grid-cols-2">
      {apps.map((app) => {
        return (
          <Card grid key={app.name}>
            <p className="!mt-0 text-center text-2xl font-bold">{app.name}</p>
            <p>{app.short}</p>
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
            >
              <span className="sr-only">{app.name}</span>
            </Link>
            <Chip className="absolute bottom-4 right-4">{app.status}</Chip>
          </Card>
        )
      })}
    </Transition>
  )
}
