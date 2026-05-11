import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { Json } from "@/components/tui/json"
import { KV, Tag } from "@/components/tui/primitives"
import { pkg, socials, timeline } from "@/data/whoami"

export const metadata: Metadata = {
  title: "whoami",
  description:
    "Who is kage1020? A software engineer who builds things for the web.",
}

export default function WhoamiPage() {
  return (
    <PageLayout>
      <BlockStream>
        <Block
          command="whoami"
          duration="0ms"
          timestamp="kage1020 — software engineer"
        >
          <p className="text-text-secondary">
            Software engineer. Builds things for the web.{" "}
            <span className="text-text-muted">
              Breaks things too, but less often now.
            </span>
          </p>
        </Block>

        <Block
          command="cat package.json"
          duration="2ms"
          timestamp={`${pkg.name}@${pkg.version}`}
        >
          <Json
            value={{
              name: pkg.name,
              version: pkg.version,
              description: pkg.description,
              keywords: [...pkg.keywords],
              author: pkg.author,
            }}
          />
        </Block>

        <Block
          command="git log --oneline --reverse"
          duration={`${timeline.length} commits`}
          timestamp={`HEAD → main`}
          copyText={`${timeline.map((entry) => `${entry.hash.slice(0, 7)} ${entry.date} ${entry.message}`).join("\n")}`}
        >
          <ol className="space-y-1">
            {timeline.map((entry) => (
              <li
                key={entry.hash}
                className="grid grid-cols-[7ch_8ch_1fr_auto] items-baseline gap-3"
              >
                <div className="flex flex-col">
                  <span className="text-warning">{entry.hash.slice(0, 7)}</span>
                  {entry.tag ? <Tag tone="accent" className="block md:hidden min-w-fit">{entry.tag}</Tag> : <span className="block md:hidden min-w-fit" />}
                </div>
                <span className="text-text-muted">{entry.date}</span>
                <span className="text-text-secondary">{entry.message}</span>
                {entry.tag ? <Tag tone="accent" className="hidden md:inline">{entry.tag}</Tag> : <span className="hidden md:inline" />}
              </li>
            ))}
          </ol>
        </Block>

        <Block
          command="cat .socials"
          duration={`${socials.length} links`}
          timestamp="find me"
          copyText={`${socials.map((s) => `${s.label}: ${s.url}`).join("\n")}`}
        >
          <KV
            rows={socials.map((s) => ({
              key: s.label,
              value: (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-bright hover:text-accent"
                >
                  {s.handle}
                </a>
              ),
            }))}
          />
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
