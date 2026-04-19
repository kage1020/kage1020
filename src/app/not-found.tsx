"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Block, BlockStream } from "@/components/tui/block"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <BlockStream>
        <Block
          command={`cat ${pathname}`}
          status="error"
          duration="404"
          timestamp="not found"
        >
          <p className="text-text-secondary">
            <span className="text-error">
              cat: {pathname}: No such file or directory
            </span>
          </p>
        </Block>

        <Block command="cd ~" duration="1ms" flush>
          <Link
            href="/"
            className="text-accent-bright hover:text-accent"
            transitionTypes={["navigate"]}
          >
            → home
          </Link>
        </Block>
      </BlockStream>
    </main>
  )
}
