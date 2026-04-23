import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { Tag } from "@/components/tui/primitives"
import { works } from "@/data/works"

export const metadata: Metadata = {
  title: "works",
  description:
    "Published products and tools by kage1020 across VS Code Marketplace and PyPI.",
}

const statusTone: Record<string, "success" | "warn" | "default"> = {
  published: "success",
  active: "warn",
}

const platformLabel: Record<string, string> = {
  "vscode-marketplace": "VS Marketplace",
  pypi: "PyPI",
}

export default function WorksPage() {
  return (
    <PageLayout>
      <BlockStream>
        <Block
          command="ls -la works/"
          duration={`${works.length} entries`}
          timestamp="published products"
        >
          <p className="max-w-2xl text-text-secondary">
            External products and packages published outside this website.
          </p>
        </Block>

        <Block
          command="cat works/index.json"
          duration={`${works.length} entries`}
        >
          <ul className="space-y-4">
            {works.map((work) => (
              <li key={work.id}>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-text-muted group-hover:text-accent-bright">
                      →
                    </span>
                    <span className="text-text-primary group-hover:text-accent-bright">
                      {work.title}
                    </span>
                    <Tag tone={statusTone[work.status] ?? "default"}>
                      {work.status}
                    </Tag>
                    <Tag tone="accent">
                      {platformLabel[work.platform] ?? work.platform}
                    </Tag>
                    <span className="text-text-muted">{work.kind}</span>
                  </div>
                  <p className="ml-6 mt-1 text-text-secondary">
                    {work.description}
                  </p>
                  <div className="ml-6 mt-2 flex flex-wrap gap-2">
                    {work.technologies.map((tech) => (
                      <span key={tech} className="font-mono text-text-muted">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
