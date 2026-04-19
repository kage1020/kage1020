import type { Metadata } from "next"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { Tag } from "@/components/tui/primitives"
import { apps } from "@/data/apps"

export const metadata: Metadata = {
  title: "apps",
  description: "Utility apps built by kage1020. Simple tools that just work.",
}

const statusTone: Record<string, "success" | "warn" | "default"> = {
  active: "success",
  beta: "warn",
  archived: "default",
}

export default function AppsPage() {
  return (
    <PageLayout>
      <BlockStream>
        <Block
          command="ls -la apps/"
          duration={`${apps.length} entries`}
          timestamp="utility apps"
        >
          <p className="max-w-2xl text-text-secondary">
            Small utility apps. Not big enough for their own domain, useful
            enough to share.
          </p>
        </Block>

        <Block
          command="cat apps/index.json"
          duration={`${apps.length} entries`}
        >
          <ul className="space-y-4">
            {apps.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/apps/${app.id}`}
                  className="group block"
                  transitionTypes={["navigate"]}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-text-muted group-hover:text-accent-bright">
                      →
                    </span>
                    <span className="text-text-primary group-hover:text-accent-bright">
                      {app.title}
                    </span>
                    <Tag tone={statusTone[app.status] ?? "default"}>
                      {app.status}
                    </Tag>
                    <span className="text-text-muted">{app.category}</span>
                  </div>
                  <p className="ml-6 mt-1 text-text-secondary">
                    {app.description}
                  </p>
                  <div className="ml-6 mt-2 flex flex-wrap gap-2">
                    {app.technologies.map((tech) => (
                      <span key={tech} className="font-mono text-text-muted">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
