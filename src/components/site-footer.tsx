import { Tag } from "@/components/tui/primitives"
import { pkg, socials } from "@/data/whoami"

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-6 py-8 font-mono text-text-muted">
      <Tag>{pkg.version}</Tag>
      <span>kage1020.com</span>
      {socials.map((s) => (
        <span key={s.key} className="contents">
          <span>·</span>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-bright"
          >
            {s.label}
          </a>
        </span>
      ))}
      <span>·</span>
      <a href="/llms.txt" className="hover:text-accent-bright">
        llms.txt
      </a>
    </footer>
  )
}
