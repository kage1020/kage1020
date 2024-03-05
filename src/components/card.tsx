import { tv } from "tailwind-variants"

import type { CardProps } from "@/types"

const style = tv({
  base: "relative rounded-lg bg-stone-800 p-4 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl",
  variants: {
    grid: {
      true: "row-span-5 grid grid-rows-subgrid",
    },
  },
})

export default function Card({ className, grid, children }: CardProps) {
  return <div className={style({ grid, className })}>{children}</div>
}
