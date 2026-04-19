import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { KV, Tag } from "@/components/tui/primitives"
import {
  checklist,
  endpoints,
  engineerPrinciples,
  philosophyMarkdown,
  philosophyMeta,
  principles,
  systemPrompt,
  uxConstraints,
} from "@/data/philosophy"

export const metadata: Metadata = {
  title: "philosophy",
  description:
    "kage1020's 6 engineering principles — specification, system prompts, and review checklist. Machine-readable, human-applicable.",
}

const cliSnippet = `# Quick reference for an AI agent
curl https://kage1020.com/llms-full.txt
curl https://kage1020.com/llms.txt`

export default function PhilosophyPage() {
  return (
    <PageLayout>
      <BlockStream>
        {/* --- Spec section --- */}

        <Block
          command="cat philosophy.spec.md"
          duration={`${principles.length} principles`}
          timestamp="canonical specification"
          copyText={philosophyMarkdown}
        >
          <div className="space-y-6">
            <p className="text-text-muted">
              <span className="text-text-secondary">version</span>:{" "}
              {philosophyMeta.version}
              {" | "}
              <span className="text-text-secondary">authority</span>:{" "}
              {philosophyMeta.authority}
              {" | "}
              <span className="text-text-secondary">updated</span>:{" "}
              {philosophyMeta.updated}
            </p>

            {[
              { label: "UX Constraints", items: uxConstraints },
              { label: "Engineer Principles", items: engineerPrinciples },
            ].map((group) => (
              <section key={group.label} className="space-y-6">
                <h2 className="font-mono text-sm uppercase tracking-widest text-text-muted">
                  ## {group.label}
                </h2>
                {group.items.map((p) => (
                  <article
                    key={p.id}
                    id={p.id}
                    className="scroll-mt-20 space-y-2 border-l border-surface-2 pl-4"
                  >
                    <header className="flex flex-wrap items-baseline gap-3">
                      <span className="text-text-muted">###</span>
                      <span className="font-mono text-accent-bright">
                        #{p.number}
                      </span>
                      <h3 className="font-medium text-text-primary">
                        {p.title}
                      </h3>
                      <Tag
                        tone={
                          p.category === "ux-constraint" ? "accent" : "default"
                        }
                      >
                        {p.category === "ux-constraint" ? "ux" : "eng"}
                      </Tag>
                      <code className="font-mono text-text-muted">{p.id}</code>
                    </header>
                    <p className="font-mono text-text-muted">{p.titleJa}</p>
                    <p className="text-text-secondary">{p.description}</p>
                    <p className="text-text-muted">{p.descriptionJa}</p>
                    <ul className="mt-2 space-y-1 font-mono">
                      {p.checkpoints.map((cp) => (
                        <li key={cp} className="flex gap-2 text-text-secondary">
                          <span className="text-success">-</span>
                          {cp}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            ))}
          </div>
        </Block>

        {/* --- Prompts section (merged from /prompts) --- */}

        <Block
          command="cat system-prompt.txt"
          duration={`${systemPrompt.split("\n").length} lines`}
          timestamp="paste into your agent"
          copyText={systemPrompt}
        >
          <pre className="whitespace-pre-wrap wrap-break-word font-mono leading-relaxed text-text-secondary">
            {systemPrompt}
          </pre>
        </Block>

        <Block
          command="cat review-checklist.txt"
          duration={`${checklist.length} items`}
          timestamp="for code review"
        >
          <ul className="space-y-1 font-mono">
            {checklist.map((item) => (
              <li
                key={`${item.principle}-${item.text}`}
                className="flex gap-3 text-text-secondary"
              >
                <span className="shrink-0 whitespace-nowrap text-text-muted">
                  [ ]
                </span>
                <span className="shrink-0 text-accent-bright">
                  #{item.principle}
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </Block>

        {/* --- Discovery section --- */}

        <Block
          command="man philosophy"
          duration={`${endpoints.length} sources`}
          timestamp="discovery"
        >
          <KV
            rows={endpoints.map((e) => ({
              key: e.path,
              value: (
                <a
                  href={e.path}
                  className="text-accent-bright hover:text-accent"
                >
                  {e.description}
                </a>
              ),
            }))}
          />
        </Block>

        <Block
          command="echo $PHILOSOPHY_LICENSE"
          duration={philosophyMeta.license}
          timestamp="reuse encouraged"
          flush
        >
          <pre className="whitespace-pre-wrap break-all font-mono leading-relaxed text-text-secondary">
            {cliSnippet}
          </pre>
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
