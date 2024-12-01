import clsx from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import tailwindConfig from "../../tailwind.config"

import type { ClassValue } from "tailwind-variants"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: Object.keys(tailwindConfig.theme.extend.colors),
    },
    classGroups: {
      "border-style": ["border-ridge"],
    },
  },
})

export function cn(...classes: ClassValue[]) {
  return clsx(twMerge(classes))
}
