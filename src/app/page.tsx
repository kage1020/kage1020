import Link from "next/link"
import { ViewTransition } from "react"
import { CommandInput } from "@/components/command-input"
import { Block, BlockStream } from "@/components/tui/block"
import { Caret } from "@/components/tui/primitives"

const routes = [
  { command: "whoami", path: "/whoami", description: "who is kage1020?" },
  {
    command: "cat philosophy",
    path: "/philosophy",
    description: "6 principles",
  },
  { command: "ls apps", path: "/apps", description: "utility apps" },
] as const

const now = new Date().toISOString().replace("T", " ").slice(0, 19)

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
      <header className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono">
        <ViewTransition name="site-name" share="vt-morph">
          <h1 className="inline-block font-mono text-accent-bright">
            kage1020
          </h1>
        </ViewTransition>
        <span className="text-text-muted">@ kage1020.com</span>
        <span className="hidden text-text-muted sm:inline">·</span>
        <span className="text-text-muted">{now} UTC</span>
      </header>

      <BlockStream>
        <Block
          command="login --user kage1020"
          duration="0ms"
          timestamp="welcome"
        >
          <p className="text-text-secondary">
            Last login: <span className="text-text-primary">just now</span>{" "}
            <span className="text-text-muted">from a curious browser</span>
          </p>
          <p className="mt-2 text-text-secondary">
            Software Engineer —{" "}
            <span className="text-text-primary">
              builds things for the web.
            </span>{" "}
            <span className="text-text-muted">
              Breaks things too, but less often now.
            </span>
          </p>
        </Block>

        <Block
          command="ls"
          duration={`${routes.length} entries`}
          timestamp="navigate by clicking or typing below"
        >
          <nav>
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="group grid grid-cols-[max-content_1fr] items-baseline gap-4 rounded-sm px-1 py-0.5 hover:bg-surface-1"
                    transitionTypes={["navigate"]}
                  >
                    <span className="text-accent-bright">{route.command}</span>
                    <span className="text-text-muted">
                      <span className="opacity-60 group-hover:opacity-100">
                        # {route.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Block>

        <Block command="hint" status="info" duration="press / or type" flush>
          <p className="text-text-secondary">
            Type a command below.{" "}
            <span className="text-text-muted">
              Tab to autocomplete · Enter to navigate · / to focus
            </span>
          </p>
        </Block>
      </BlockStream>

      {/* Interactive REPL */}
      <div className="mt-10 flex items-center gap-3 font-mono">
        <Caret />
        <div className="flex-1">
          <CommandInput autoFocus />
        </div>
      </div>
    </main>
  )
}
