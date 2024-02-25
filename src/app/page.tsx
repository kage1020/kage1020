import type { StaticImageData } from "next/image"
import Link from "next/link"

import Chip from "@/components/chip"

import StockDataSupplierQR from "../../public/images/stock-data-supplier/QR.png"
import StockDataSupplierAutocomplete from "../../public/images/stock-data-supplier/autocomplete.png"
import StockDataSupplierResult from "../../public/images/stock-data-supplier/result.png"
import StockDataSupplierRetrieval from "../../public/images/stock-data-supplier/retrieval.png"
import StockDataSupplierRetrieving from "../../public/images/stock-data-supplier/retrieving.png"
import StockDataSupplierTalk from "../../public/images/stock-data-supplier/talk.png"

type AppProperty = {
  name: string
  description: string
  href: string
  url: string
  github: string
  tag: string[]
  createdAt: string
  status: "Stable" | "In Development" | "Draft" | "Archived"
  images: StaticImageData[]
}

export const apps: AppProperty[] = [
  {
    name: "StockDataSupplier",
    description: "株探から株価データを取得するLINEアプリ",
    href: "/apps/StockDataSupplier",
    url: "https://lin.ee/TKrHW1q",
    github: "https://github.com/kage1020/StockDataSupplier",
    tag: ["LINE", "Google Apps Script", "株", "スクレイピング"],
    createdAt: "2022/01/07",
    status: "Stable",
    images: [
      StockDataSupplierTalk,
      StockDataSupplierRetrieval,
      StockDataSupplierAutocomplete,
      StockDataSupplierRetrieving,
      StockDataSupplierResult,
      StockDataSupplierQR,
    ],
  },
  {
    name: "GroupScheduler",
    description: "グループで予定を共有するLINEアプリ",
    href: "/apps/GroupScheduler",
    url: "",
    github: "https://github.com/kage1020/GroupScheduler",
    tag: ["LINE", "Google Apps Script", "カレンダー", "Next.js"],
    createdAt: "2022/03/18",
    status: "Draft",
    images: [],
  },
  {
    name: "TrafficLtd.",
    description: "交通系経営ストラテジーシミュレーションゲーム",
    href: "/apps/TrafficLtd",
    url: "https://traffic-ltd.vercel.app/",
    github: "https://github.com/kage1020/TrafficLtd",
    tag: ["Next.js", "TypeScript", "Redux", "leaflet", "SWR", "TailwindCSS"],
    createdAt: "2022/09/24",
    status: "In Development",
    images: [],
  },
  {
    name: "Minesweeper++",
    description: "運要素強めのマインスイーパー",
    href: "/apps/MinesweeperPlusPlus",
    url: "https://minesweeper-plus-plus.vercel.app/",
    github: "https://github.com/kage1020/MinesweeperPlusPlus",
    tag: ["Next.js", "TypeScript", "TailwindCSS"],
    createdAt: "2022/11/19",
    status: "Stable",
    images: [],
  },
  {
    name: "Shooting Game with Math",
    description: "スコア計算に少し複雑な算数を使ったシューティングゲーム",
    href: "/apps/ShootingGameWithMath",
    url: "",
    github: "https://github.com/kage1020/Shooting-Game-With-Math",
    tag: ["C++", "DxLib"],
    createdAt: "2022/12/19",
    status: "Archived",
    images: [],
  },
  {
    name: "STACK",
    description:
      "Skill Training And Coding Knowledge. ゲームをしながらプログラミングを学ぶ",
    href: "/apps/STACK",
    url: "",
    github: "https://github.com/kage1020/STACK",
    tag: ["Next.js", "TypeScript", "TailwindCSS"],
    createdAt: "2023/09/18",
    status: "Draft",
    images: [],
  },
  {
    name: "AAAS",
    description: "Annotation App for Action Segmentation.",
    href: "/apps/AAAS",
    url: "",
    github: "https://github.com/kage1020/AAAS",
    tag: [],
    createdAt: "2023/09/03",
    status: "Draft",
    images: [],
  },
  {
    name: "IconCollection",
    description:
      "アイコンライブラリをdraw.ioで使えるようxml library形式に変換する",
    href: "/apps/IconCollection",
    url: "",
    github: "https://github.com/kage1020/IconCollection",
    tag: ["draw.io", "react-icons", "iconify", "JavaScript"],
    createdAt: "2023/06/04",
    status: "Stable",
    images: [],
  },
  {
    name: "TUSApp",
    description: "unofficial utility app for TUS",
    href: "/apps/TUSApp",
    url: "https://tus-app.vercel.app/",
    github: "https://github.com/kage1020/TUSApp",
    tag: [
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Unity",
      "NextAuth.js",
      "Supabase",
      "Prisma",
      "Python",
      "ultralytics/yolov8",
      "3dPose GAN",
    ],
    createdAt: "2023/05/24",
    status: "Archived",
    images: [],
  },
  {
    name: "OEISCSchema",
    description: "口腔診査情報標準コード仕様のためのjson schema",
    href: "/apps/OEISCSchema",
    url: "",
    github: "https://github.com/kage1020/OEISCSchema",
    tag: ["json schema", "口腔診査"],
    createdAt: "2023/12/12",
    status: "In Development",
    images: [],
  },
  {
    name: "marp-theme",
    description: "Marpのためのカスタムテーマ",
    href: "/apps/marp-theme",
    url: "",
    github: "https://github.com/kage1020/marp-theme",
    tag: ["Marp", "CSS", "TailwindCSS"],
    createdAt: "2023/09/25",
    status: "Stable",
    images: [],
  },
  {
    name: "Cross Calculator",
    description: "フレームワーク横断電卓",
    href: "/apps/CrossCalculator",
    url: "https://cross-calculator.vercel.app",
    github: "https://github.com/kage1020/CrossCalculator",
    tag: [
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Nuxt",
      "Vue",
      "Remix",
      "Svelte",
      "Astro",
      "Solid",
      "Gatsby",
      "Qwik",
    ],
    createdAt: "2023/12/06",
    status: "In Development",
    images: [],
  },
  {
    name: "MathTeXBook",
    description: "TeXで書かれた数学の問題をMDXで表示する問題集",
    href: "/apps/MathTeXBook",
    url: "https://math-tex-book.vercel.app/",
    github: "https://github.com/kage1020/MathTeXBook",
    tag: ["LaTeX", "MDX", "Starlight", "TailwindCSS", "Astro"],
    createdAt: "2024/02/03",
    status: "Stable",
    images: [],
  },
  {
    name: "KABUTAN-Visualizer",
    description: "株探の決算データを可視化するアプリ",
    href: "/apps/KABUTAN-Visualizer",
    url: "",
    github: "https://github.com/kage1020/KABUTAN-Visualizer",
    tag: ["JavaScript", "拡張機能", "ECharts", "Chart.js"],
    createdAt: "2024/02/08",
    status: "Stable",
    images: [],
  },
]

export default function Home() {
  return (
    <main className="mx-auto grid h-full max-w-4xl grid-cols-1 gap-6 overflow-auto p-4 text-white md:grid-cols-2">
      {apps.map((app) => {
        if (app.status === "Draft") return null
        return (
          <div
            key={app.name}
            className="relative row-span-5 grid grid-rows-subgrid rounded-lg border border-stone-200 bg-stone-700 p-4 shadow-lg shadow-stone-600"
          >
            <p className="!mt-0 text-center text-2xl font-bold">{app.name}</p>
            <p>{app.description}</p>
            <div className="flex flex-wrap gap-2">
              {app.tag.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            <span className="absolute bottom-4 left-4">
              Created At: {app.createdAt}
            </span>
            <Link className="absolute inset-0 z-0" href={app.href}></Link>
            <Chip className="absolute bottom-4 right-4">{app.status}</Chip>
          </div>
        )
      })}
    </main>
  )
}
