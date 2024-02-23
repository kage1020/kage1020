import { extendTailwindMerge } from "tailwind-merge"

import type { ClassNameValue } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: [
        "zenn",
        "qiita",
        "typescript",
        "line",
        "tailwind",
        "nuxt",
        "svelte",
        "vue",
        "astro",
        "solid",
        "gatsby",
        "qwik",
        "gas",
        "redux",
        "leaflet",
        "cpp",
        "draw",
        "iconify",
        "javascript",
        "supabase",
        "prisma",
        "python",
        "echarts",
        "css",
        "latex",
        "mdx",
        "chartjs",
      ],
    },
    classGroups: {
      "border-style": ["border-ridge"],
    },
  },
})

export const cn = (...args: ClassNameValue[]) => {
  return twMerge(...args)
}
