import Image from "next/image"
import Link from "next/link"

import { SiGithub, SiQiita, SiX, SiZenn } from "react-icons/si"

import Card from "@/components/card"
import Transition from "@/components/transition"

import avatar from "../../public/icon-512x512.png"

export default function Home() {
  return (
    <Transition className="mx-auto grid h-full max-w-4xl grid-cols-1 gap-6 overflow-auto p-4 text-white md:grid-cols-2">
      <div className="col-span-2 grid justify-center py-20">
        <div className="grid place-items-center">
          <Image src={avatar} alt="" width={128} height={128} />
        </div>
        <p className="p-4 text-center text-5xl font-bold">kage1020</p>
      </div>
      <Card className="col-span-2 h-32 bg-gradient-to-b from-stone-700 to-stone-800">
        <div className="grid h-full w-full place-items-center text-3xl">
          Apps
        </div>
        <Link href="/apps" className="absolute inset-0">
          <span className="sr-only">apps</span>
        </Link>
      </Card>
      <Card className="bg-gradient-to-b from-stone-700 to-stone-800 p-8">
        <div className="grid h-full w-full place-items-center text-2xl">
          <SiGithub size={64} />
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
        <div className="grid h-full w-full place-items-center text-2xl">
          <SiQiita size={64} />
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
        <div className="grid h-full w-full place-items-center text-2xl">
          <SiZenn size={64} />
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
        <div className="grid h-full w-full place-items-center text-2xl">
          <SiX size={64} />
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
