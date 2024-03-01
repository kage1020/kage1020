import type { StaticImageData } from "next/image"

import KabutanVisualizerHalfResult from "../../public/images/kabutan-visualizer/half-result.jpeg"
import KabutanVisualizerKabuka from "../../public/images/kabutan-visualizer/kabuka.jpeg"
import KabutanVisualizerQuarterResult from "../../public/images/kabutan-visualizer/quarter-result.jpeg"
import KabutanVisualizerYearGrowth from "../../public/images/kabutan-visualizer/year-growth.jpeg"
import KabutanVisualizerYearProfit from "../../public/images/kabutan-visualizer/year-profit.jpeg"
import KabutanVisualizerYearResult from "../../public/images/kabutan-visualizer/year-result.jpeg"
import MathTexBookAnswer from "../../public/images/math-tex-book/answer.jpeg"
import MathTexBookImageZoom from "../../public/images/math-tex-book/image-zoom.jpeg"
import MathTexBookQuestion from "../../public/images/math-tex-book/question.jpeg"
import MathTexBookTop from "../../public/images/math-tex-book/top.jpeg"
import MinesweeperPlusPlusDescription from "../../public/images/minesweeper-plus-plus/description.jpeg"
import MinesweeperPlusPlusLose from "../../public/images/minesweeper-plus-plus/lose.jpeg"
import MinesweeperPlusPlusPlaying from "../../public/images/minesweeper-plus-plus/playing.jpeg"
import MinesweeperPlusPlusSelect from "../../public/images/minesweeper-plus-plus/select.jpeg"
import MinesweeperPlusPlusStart from "../../public/images/minesweeper-plus-plus/start.jpeg"
import MinesweeperPlusPlusWin from "../../public/images/minesweeper-plus-plus/win.jpeg"
import ShootingGameWithMathDescription from "../../public/images/shooting-game-with-math/description.png"
import ShootingGameWithMathPlaying from "../../public/images/shooting-game-with-math/playing.png"
import ShootingGameWithMathPlaying2 from "../../public/images/shooting-game-with-math/playing2.png"
import ShootingGameWithMathResult from "../../public/images/shooting-game-with-math/result.png"
import ShootingGameWithMathSelect from "../../public/images/shooting-game-with-math/select.png"
import SHootingGameWithMathStart from "../../public/images/shooting-game-with-math/start.png"
import StockDataSupplierQR from "../../public/images/stock-data-supplier/QR.png"
import StockDataSupplierAutocomplete from "../../public/images/stock-data-supplier/autocomplete.png"
import StockDataSupplierResult from "../../public/images/stock-data-supplier/result.png"
import StockDataSupplierRetrieval from "../../public/images/stock-data-supplier/retrieval.png"
import StockDataSupplierRetrieving from "../../public/images/stock-data-supplier/retrieving.png"
import StockDataSupplierTalk from "../../public/images/stock-data-supplier/talk.png"

export type AppName =
  | "Shooting Game with Math"
  | "StockDataSupplier"
  | "GroupScheduler"
  | "Traffic Ltd."
  | "Minesweeper++"
  | "STACK"
  | "AAAS"
  | "IconCollection"
  | "TUSApp"
  | "OEISCSchema"
  | "marp-theme"
  | "Cross Calculator"
  | "MathTeXBook"
  | "KABUTAN-Visualizer"

export type AppProperty = {
  name: AppName
  description: string
  href: string
  url: string
  github: string
  tag: string[]
  createdAt: string
  status: "Stable" | "In Development" | "Draft" | "Archived"
  images: {
    src: StaticImageData
    alt: string
  }[]
}

export const apps: AppProperty[] = [
  {
    name: "StockDataSupplier",
    description: "株探から株価データを取得するLINEアプリ",
    href: "/apps/StockDataSupplier",
    url: "https://lin.ee/TKrHW1q",
    github: "https://github.com/kage1020/StockDataSupplier",
    tag: ["LINE", "Google Apps Script", "株", "スクレイピング"],
    createdAt: "2021/01/07",
    status: "Stable",
    images: [
      { src: StockDataSupplierTalk, alt: "トーク画面" },
      { src: StockDataSupplierRetrieval, alt: "銘柄検索画面" },
      { src: StockDataSupplierAutocomplete, alt: "銘柄名の自動補完" },
      { src: StockDataSupplierRetrieving, alt: "銘柄情報取得中" },
      { src: StockDataSupplierResult, alt: "銘柄情報の表示" },
      { src: StockDataSupplierQR, alt: "友達登録してね" },
    ],
  },
  {
    name: "KABUTAN-Visualizer",
    description: "株探の決算データを可視化するアプリ",
    href: "/apps/KABUTAN-Visualizer",
    url: "",
    github: "https://github.com/kage1020/KABUTAN-Visualizer",
    tag: ["JavaScript", "拡張機能", "ECharts", "Chart.js"],
    createdAt: "2021/02/08",
    status: "Stable",
    images: [
      { src: KabutanVisualizerYearResult, alt: "【通期】業績推移" },
      { src: KabutanVisualizerYearGrowth, alt: "【通期】成長性" },
      { src: KabutanVisualizerYearProfit, alt: "【通期】収益性" },
      { src: KabutanVisualizerHalfResult, alt: "上期/下期業績" },
      { src: KabutanVisualizerQuarterResult, alt: "【四半期】業績推移" },
      { src: KabutanVisualizerKabuka, alt: "時系列株価" },
    ],
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
    images: [
      { src: MinesweeperPlusPlusStart, alt: "スタート画面" },
      { src: MinesweeperPlusPlusDescription, alt: "ルール説明画面" },
      { src: MinesweeperPlusPlusSelect, alt: "難易度選択画面" },
      { src: MinesweeperPlusPlusPlaying, alt: "プレイ中" },
      { src: MinesweeperPlusPlusLose, alt: "ゲームオーバー" },
      { src: MinesweeperPlusPlusWin, alt: "クリア" },
    ],
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
    name: "MathTeXBook",
    description: "TeXで書かれた数学の問題をMDXで表示する問題集",
    href: "/apps/MathTeXBook",
    url: "https://math-tex-book.vercel.app/",
    github: "https://github.com/kage1020/MathTeXBook",
    tag: ["LaTeX", "MDX", "Starlight", "TailwindCSS", "Astro"],
    createdAt: "2024/02/03",
    status: "Stable",
    images: [
      { src: MathTexBookTop, alt: "トップページ" },
      { src: MathTexBookQuestion, alt: "問題ページ" },
      { src: MathTexBookAnswer, alt: "解答ページ" },
      { src: MathTexBookImageZoom, alt: "画像拡大" },
    ],
  },
  {
    name: "Shooting Game with Math",
    description: "スコア計算に少し複雑な算数を使ったシューティングゲーム",
    href: "/apps/ShootingGameWithMath",
    url: "",
    github: "https://github.com/kage1020/Shooting-Game-With-Math",
    tag: ["C++", "DxLib"],
    createdAt: "2020/11/19",
    status: "Archived",
    images: [
      { src: SHootingGameWithMathStart, alt: "スタート画面" },
      { src: ShootingGameWithMathSelect, alt: "選択画面" },
      { src: ShootingGameWithMathDescription, alt: "ルール説明画面" },
      { src: ShootingGameWithMathPlaying, alt: "プレイ中" },
      { src: ShootingGameWithMathPlaying2, alt: "プレイ中" },
      { src: ShootingGameWithMathResult, alt: "結果画面" },
    ],
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
    name: "GroupScheduler",
    description: "グループで予定を共有するLINEアプリ",
    href: "/apps/GroupScheduler",
    url: "",
    github: "https://github.com/kage1020/GroupScheduler",
    tag: ["LINE", "Google Apps Script", "カレンダー", "Next.js"],
    createdAt: "2022/03/18",
    status: "In Development",
    images: [],
  },
  {
    name: "Traffic Ltd.",
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
]
