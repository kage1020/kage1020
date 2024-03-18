import Image from "next/image"
import Link from "next/link"

import { SiGithub, SiQiita, SiX, SiZenn } from "react-icons/si"

import Card from "@/components/card"
import Transition from "@/components/transition"

import avatar from "../../public/icon-512x512.png"

export default function Home() {
  return (
    <Transition className="mx-auto grid h-full max-w-2xl grid-cols-1 gap-6 overflow-auto text-white md:grid-cols-2">
      <div className="grid justify-center p-8 md:col-span-2 md:py-20">
        <div className="hidden place-items-center md:grid">
          <Image src={avatar} alt="" width={128} height={128} />
        </div>
        <div className="grid place-items-center md:hidden">
          <Image src={avatar} alt="" width={96} height={96} />
        </div>
        <p className="p-4 text-center text-3xl font-bold md:text-5xl">
          kage1020
        </p>
      </div>
      <Card className="h-28 bg-gradient-to-b from-stone-700 to-stone-800 md:col-span-2 md:h-36">
        <div className="grid h-full w-full place-items-center text-2xl md:text-4xl">
          Apps
        </div>
        <Link href="/apps" className="absolute inset-0">
          <span className="sr-only">apps</span>
        </Link>
      </Card>
      <Card className="bg-gradient-to-b from-stone-700 to-stone-800 p-8">
        <div className="hidden h-full w-full place-items-center text-2xl md:grid">
          <SiGithub size={64} />
        </div>
        <div className="grid h-full w-full place-items-center text-2xl md:hidden">
          <SiGithub size={40} />
        </div>
        <Link
          href="https://github.com/kage1020"
          className="absolute inset-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">GitHub</span>
        </Link>
      </Card>
      <Card className="bg-gradient-to-b from-stone-700 to-stone-800 p-8 hover:text-qiita">
        <div className="hidden h-full w-full place-items-center text-2xl md:grid">
          <SiQiita size={64} />
        </div>
        <div className="grid h-full w-full place-items-center text-2xl md:hidden">
          <SiQiita size={40} />
        </div>
        <Link
          href="https://qiita.com/kage1020"
          className="absolute inset-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Qiita</span>
        </Link>
      </Card>
      <Card className="bg-gradient-to-b from-stone-700 to-stone-800 p-8 hover:text-zenn">
        <div className="hidden h-full w-full place-items-center text-2xl md:grid">
          <SiZenn size={64} />
        </div>
        <div className="grid h-full w-full place-items-center text-2xl md:hidden">
          <SiZenn size={40} />
        </div>
        <Link
          href="https://zenn.dev/kage1020"
          className="absolute inset-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Zenn</span>
        </Link>
      </Card>
      <Card className="bg-gradient-to-b from-stone-700 to-stone-800 p-8">
        <div className="hidden h-full w-full place-items-center text-2xl md:grid">
          <SiX size={64} />
        </div>
        <div className="grid h-full w-full place-items-center text-2xl md:hidden">
          <SiX size={40} />
        </div>
        <Link
          href="https://twitter.com/kage1020"
          className="absolute inset-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">X</span>
        </Link>
      </Card>
    </Transition>
  )
}
