import plugin from "tailwindcss/plugin"

import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zenn: "#3EA8FF",
        qiita: "#55C500",
        typescript: "#3178C6",
        line: "#00C300",
        tailwind: "#06B6D4",
        next: "#000000",
        nuxt: "#00DC82",
        remix: "#000000",
        svelte: "#FF3E00",
        vue: "#4FC08D",
        astro: "#BC52EE",
        solid: "#2C4F7C",
        gatsby: "#663399",
        qwik: "#009DFD",
        gas: "#4285F4",
        redux: "#764ABC",
        swr: "#000000",
        leaflet: "#199900",
        cpp: "#00599C",
        draw: "#F08705",
        iconify: "#1769AA",
        javascript: "#F7DF1E",
        supabase: "#3FCF8E",
        prisma: "#2D3748",
        python: "#3776AB",
        echarts: "#AA344D",
        css: "#1572B6",
        latex: "#008080",
        mdx: "#1B1F24",
        chartjs: "#FF6384",
        unity: "#000000",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".border-ridge": {
          "border-style": "ridge",
        },
      })
    }),
  ],
} satisfies Config
