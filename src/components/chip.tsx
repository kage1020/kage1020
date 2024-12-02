import {
  SiApacheecharts,
  SiAstro,
  SiChartdotjs,
  SiCplusplus,
  SiCss3,
  SiDiagramsdotnet,
  SiGatsby,
  SiGoogleappsscript,
  SiHono,
  SiIconify,
  SiJavascript,
  SiLatex,
  SiLeaflet,
  SiLine,
  SiMdx,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPrisma,
  SiPython,
  SiQwik,
  SiReact,
  SiRedux,
  SiRemix,
  SiSolid,
  SiSupabase,
  SiSvelte,
  SiSwr,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
  SiVuedotjs,
} from "react-icons/si"
import { tv } from "tailwind-variants"

const style = tv({
  base: "flex h-fit items-center gap-x-2 rounded-full border-2 border-black bg-stone-900 px-3 py-1",
  variants: {
    color: {
      javascript: "border-javascript",
      typescript: "border-typescript",
      line: "border-line",
      tailwind: "border-tailwind",
      react: "border-react",
      next: "border-next",
      nuxt: "border-nuxt",
      remix: "border-remix",
      svelte: "border-svelte",
      vue: "border-vue",
      astro: "border-astro",
      solid: "border-solid",
      gatsby: "border-gatsby",
      qwik: "border-qwik",
      hono: "border-hono",
      gas: "border-gas",
      redux: "border-redux",
      swr: "border-swr",
      leaflet: "border-leaflet",
      cpp: "border-cpp",
      draw: "border-draw",
      iconify: "border-iconify",
      supabase: "border-supabase",
      prisma: "border-prisma",
      python: "border-python",
      echarts: "border-echarts",
      css: "border-css",
      latex: "border-latex",
      mdx: "border-mdx",
      chartjs: "border-chartjs",
      unity: "border-unity",
      archived: "border-red-500 bg-red-500 text-white",
      development: "border-amber-600 bg-amber-600 text-white",
      stable: "border-green-500 bg-green-500 text-white",
      draft: "border-blue-500 bg-blue-500 text-white",
      others: "border-white",
    },
  },
})

export type ChipColor = keyof typeof style.variants.color

type ChipProps = {
  className?: string
  color: ChipColor | "others"
  children: React.ReactNode
}

export function Chip({ className, color, children }: ChipProps) {
  return (
    <span className={style({ className, color })}>
      {color === "javascript" && <SiJavascript />}
      {color === "typescript" && <SiTypescript />}
      {color === "line" && <SiLine />}
      {color === "tailwind" && <SiTailwindcss />}
      {color === "react" && <SiReact />}
      {color === "next" && <SiNextdotjs />}
      {color === "nuxt" && <SiNuxtdotjs />}
      {color === "remix" && <SiRemix />}
      {color === "svelte" && <SiSvelte />}
      {color === "vue" && <SiVuedotjs />}
      {color === "astro" && <SiAstro />}
      {color === "solid" && <SiSolid />}
      {color === "gatsby" && <SiGatsby />}
      {color === "qwik" && <SiQwik />}
      {color === "hono" && <SiHono />}
      {color === "gas" && <SiGoogleappsscript />}
      {color === "redux" && <SiRedux />}
      {color === "swr" && <SiSwr />}
      {color === "leaflet" && <SiLeaflet />}
      {color === "cpp" && <SiCplusplus />}
      {color === "draw" && <SiDiagramsdotnet />}
      {color === "iconify" && <SiIconify />}
      {color === "supabase" && <SiSupabase />}
      {color === "prisma" && <SiPrisma />}
      {color === "python" && <SiPython />}
      {color === "echarts" && <SiApacheecharts />}
      {color === "css" && <SiCss3 />}
      {color === "latex" && <SiLatex />}
      {color === "mdx" && <SiMdx />}
      {color === "chartjs" && <SiChartdotjs />}
      {color === "unity" && <SiUnity />}
      {children}
    </span>
  )
}
