import type { StaticImageData } from "next/image"

import IconCollection from "../../public/images/icon-collection/list.png"
import KabutanVisualizerHalfResult from "../../public/images/kabutan-visualizer/half-result.jpeg"
import KabutanVisualizerKabuka from "../../public/images/kabutan-visualizer/kabuka.jpeg"
import KabutanVisualizerQuarterResult from "../../public/images/kabutan-visualizer/quarter-result.jpeg"
import KabutanVisualizerYearGrowth from "../../public/images/kabutan-visualizer/year-growth.jpeg"
import KabutanVisualizerYearProfit from "../../public/images/kabutan-visualizer/year-profit.jpeg"
import KabutanVisualizerYearResult from "../../public/images/kabutan-visualizer/year-result.jpeg"
import MarpThemeColor from "../../public/images/marp-theme/color.png"
import MarpThemeCover from "../../public/images/marp-theme/cover.png"
import MarpThemeDefault from "../../public/images/marp-theme/default.png"
import MarpThemeImageCenter from "../../public/images/marp-theme/image-center.png"
import MarpThemeTable from "../../public/images/marp-theme/table.png"
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
import ShootingGameWithMathStart from "../../public/images/shooting-game-with-math/start.png"
import StockDataSupplierQR from "../../public/images/stock-data-supplier/QR.png"
import StockDataSupplierAutocomplete from "../../public/images/stock-data-supplier/autocomplete.png"
import StockDataSupplierResult from "../../public/images/stock-data-supplier/result.png"
import StockDataSupplierRetrieval from "../../public/images/stock-data-supplier/retrieval.png"
import StockDataSupplierRetrieving from "../../public/images/stock-data-supplier/retrieving.png"
import StockDataSupplierTalk from "../../public/images/stock-data-supplier/talk.png"
import TUSAppDark from "../../public/images/tus-app/architecture-dark.drawio.svg"

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
  short: string
  long: string
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
    short: "株探から株価データを取得するLINEアプリ",
    long: "株銘柄の検索サイト「株探」から各銘柄に関する情報を取得し、基本情報、チャート情報、財務情報を集約・表示するLINEアプリです。銘柄名を入力すると、株探から最新情報を取得し、その銘柄の売買に必要な情報をピックアップして表示します。また、その情報をもとに、今その銘柄が買い時なのか、売り時なのかを判定します。",
    href: "/apps/StockDataSupplier",
    url: "https://lin.ee/TKrHW1q",
    github: "https://github.com/kage1020/StockDataSupplier",
    tag: ["LINE", "株", "Google Apps Script", "スクレイピング"],
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
    short: "株探の決算データを可視化するアプリ",
    long: "株探の決算データを可視化する拡張機能です。株探の決算データをグラフで可視化します。",
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
    short: "運要素強めのマインスイーパー",
    long: "運要素を強めにしたマインスイーパーです。通常のマインスイーパーとは異なり、周囲の爆弾の数を表す値が確率で減少します。",
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
    short: "アイコンライブラリをdraw.ioで使えるようxml library形式に変換する",
    long: "アイコンライブラリをdraw.ioで使えるようxml library形式に変換するアプリです。react-iconsとiconifyのアイコンをまとめたアイコンライブラリを作成しました。",
    href: "/apps/IconCollection",
    url: "",
    github: "https://github.com/kage1020/IconCollection",
    tag: ["draw.io", "react-icons", "iconify", "JavaScript"],
    createdAt: "2023/06/04",
    status: "Stable",
    images: [{ src: IconCollection, alt: "アイコンライブラリ" }],
  },
  {
    name: "marp-theme",
    short: "Marpのためのカスタムテーマ",
    long: "Marpのためのカスタムテーマです。Marpのデフォルトテーマに加えて、画像の中央寄せ、テーブルのスタイル、カラーコードの表示などを変更しました。",
    href: "/apps/marp-theme",
    url: "",
    github: "https://github.com/kage1020/marp-theme",
    tag: ["Marp", "CSS", "TailwindCSS"],
    createdAt: "2023/09/25",
    status: "Stable",
    images: [
      { src: MarpThemeCover, alt: "カバー" },
      { src: MarpThemeDefault, alt: "デフォルト" },
      { src: MarpThemeImageCenter, alt: "画像中央寄せ" },
      { src: MarpThemeTable, alt: "テーブル" },
      { src: MarpThemeColor, alt: "カラーコード" },
    ],
  },
  {
    name: "MathTeXBook",
    short: "TeXで書かれた数学の問題をMDXで表示する問題集",
    long: "TeXで書かれた数学の問題をMDXで表示する問題集です。LaTeXで書かれた問題をMDXで表示することで、数式を含む問題を簡単に表示できます。",
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
    short: "スコア計算に少し複雑な算数を使ったシューティングゲーム",
    long: "スコア計算に少し複雑な算数を使ったシューティングゲームです。敵を倒すとスコアが加算されますが、スコア計算には少し複雑な算数を使っています。",
    href: "/apps/ShootingGameWithMath",
    url: "",
    github: "https://github.com/kage1020/Shooting-Game-With-Math",
    tag: ["C++", "DxLib"],
    createdAt: "2020/11/19",
    status: "Archived",
    images: [
      { src: ShootingGameWithMathStart, alt: "スタート画面" },
      { src: ShootingGameWithMathSelect, alt: "選択画面" },
      { src: ShootingGameWithMathDescription, alt: "ルール説明画面" },
      { src: ShootingGameWithMathPlaying, alt: "プレイ中" },
      { src: ShootingGameWithMathPlaying2, alt: "プレイ中" },
      { src: ShootingGameWithMathResult, alt: "結果画面" },
    ],
  },
  {
    name: "TUSApp",
    short: "unofficial utility app for TUS",
    long: "This is an unofficial utility app for learning stacks created by Taniguchi Lab members in TUS.",
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
    images: [{ src: TUSAppDark, alt: "Dark" }],
  },
  {
    name: "GroupScheduler",
    short: "グループで予定を共有するLINEアプリ",
    long: "グループで予定を共有するLINEアプリです。グループで予定を共有することで、予定の共有や調整を簡単に行うことができます。",
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
    short: "交通系経営ストラテジーシミュレーションゲーム",
    long: "交通系経営ストラテジーシミュレーションゲームです。プレイヤーは交通会社の経営者となり、交通機関を運行し、経営を行います。",
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
    short: "口腔診査情報標準コード仕様のためのjson schema",
    long: "口腔診査情報標準コード仕様のためのjson schemaです。口腔診査情報標準コード仕様に準拠したjson schemaを作成しました。",
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
    short: "フレームワーク横断電卓",
    long: "フレームワーク横断電卓です。フレームワークを横断して電卓を作成しました。",
    href: "/apps/CrossCalculator",
    url: "https://cross-calculator.netlify.app",
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
    short:
      "Skill Training And Coding Knowledge. ゲームをしながらプログラミングを学ぶ",
    long: "Skill Training And Coding Knowledge. ゲームをしながらプログラミングを学ぶアプリです。",
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
    short: "Annotation App for Action Segmentation.",
    long: "Annotation App for Action Segmentation.",
    href: "/apps/AAAS",
    url: "",
    github: "https://github.com/kage1020/AAAS",
    tag: [],
    createdAt: "2023/09/03",
    status: "Draft",
    images: [],
  },
]
