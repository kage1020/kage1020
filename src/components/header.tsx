"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import avatar from "../../public/icon-512x512.png"

export default function Header() {
  const pathname = usePathname()

  if (pathname === "/") return null

  if (pathname.startsWith("/apps/")) {
    return (
      <Link href="/apps" className="flex items-center gap-4 pb-8">
        <Image src={avatar} alt="" width={32} height={32} />
        <span className="border-b-2 border-b-transparent transition duration-300 hover:border-b-white">
          apps
        </span>
      </Link>
    )
  }

  return (
    <Link href="/" className="flex items-center gap-4 pb-8">
      <Image src={avatar} alt="" width={32} height={32} />
      <span className="border-b-2 border-b-transparent transition duration-300 hover:border-b-white">
        kage1020
      </span>
    </Link>
  )
}
