import {
  SiApacheecharts,
  SiAstro,
  SiChartdotjs,
  SiCplusplus,
  SiCss3,
  SiDiagramsdotnet,
  SiGatsby,
  SiGoogleappsscript,
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

import QwikIcon from "@/components/qwik-icon"
import { cn } from "@/libs/util"

import type { Props } from "@/types"

export default function Chip({ className, children }: Props) {
  return (
    <span
      className={cn(
        "flex h-fit items-center gap-x-2 rounded-full border-2 border-black bg-stone-900 px-3 py-1",
        children === "JavaScript" && "border-javascript",
        children === "TypeScript" && "border-typescript",
        children === "LINE" && "border-line",
        children === "TailwindCSS" && "border-tailwind",
        children === "Nuxt" && "border-nuxt",
        children === "Svelte" && "border-svelte",
        children === "Vue" && "border-vue",
        children === "Astro" && "border-astro",
        children === "Solid" && "border-solid",
        children === "Gatsby" && "border-gatsby",
        children === "Qwik" && "border-qwik",
        children === "Google Apps Script" && "border-gas",
        children === "Redux" && "border-redux",
        children === "leaflet" && "border-leaflet",
        children === "C++" && "border-cpp",
        children === "draw.io" && "border-draw",
        children === "iconify" && "border-iconify",
        children === "Supabase" && "border-supabase",
        children === "Prisma" && "border-prisma",
        children === "Python" && "border-python",
        children === "ECharts" && "border-echarts",
        children === "CSS" && "border-css",
        children === "LaTeX" && "border-latex",
        children === "MDX" && "border-mdx",
        children === "Chart.js" && "border-chartjs",
        children === "Archived" && "border-red-500 bg-red-500 text-white",
        children === "In Development" &&
          "border-amber-600 bg-amber-600 text-white",
        children === "Stable" && "border-green-500 bg-green-500 text-white",
        className,
      )}
    >
      {children === "Next.js" && <SiNextdotjs />}
      {children === "JavaScript" && (
        <SiJavascript className="text-javascript" />
      )}
      {children === "TypeScript" && (
        <SiTypescript className="text-typescript" />
      )}
      {children === "LINE" && <SiLine className="text-line" />}
      {children === "TailwindCSS" && (
        <SiTailwindcss className="text-tailwind" />
      )}
      {children === "Nuxt" && <SiNuxtdotjs className="text-nuxt" />}
      {children === "Remix" && <SiRemix />}
      {children === "Svelte" && <SiSvelte className="text-svelte" />}
      {children === "Vue" && <SiVuedotjs className="text-vue" />}
      {children === "Astro" && <SiAstro className="text-astro" />}
      {children === "Solid" && <SiSolid className="text-solid" />}
      {children === "Gatsby" && <SiGatsby className="text-gatsby" />}
      {children === "Qwik" && <QwikIcon className="text-qwik" />}
      {children === "Google Apps Script" && (
        <SiGoogleappsscript className="text-gas" />
      )}
      {children === "Redux" && <SiRedux className="text-redux" />}
      {children === "leaflet" && <SiLeaflet className="text-leaflet" />}
      {children === "SWR" && <SiSwr />}
      {children === "C++" && <SiCplusplus className="text-cpp" />}
      {children === "draw.io" && <SiDiagramsdotnet className="text-draw" />}
      {children === "iconify" && <SiIconify className="text-iconify" />}
      {children === "Unity" && <SiUnity />}
      {children === "Supabase" && <SiSupabase className="text-supabase" />}
      {children === "Prisma" && <SiPrisma className="text-prisma" />}
      {children === "Python" && <SiPython className="text-python" />}
      {children === "ECharts" && <SiApacheecharts className="text-echarts" />}
      {children === "CSS" && <SiCss3 className="text-css" />}
      {children === "LaTeX" && <SiLatex className="text-latex" />}
      {children === "MDX" && <SiMdx className="text-mdx" />}
      {children === "Chart.js" && <SiChartdotjs className="text-chartjs" />}
      {children}
    </span>
  )
}
