import Image from "next/image"
import { ViewTransition } from "react"
import icon from "../../public/icon-512x512.webp"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className, width = 200, height = 200 }: LogoProps) {
  return (
    <ViewTransition name="logo">
      <Image
        className={className}
        src={icon}
        alt="kage1020 icon"
        width={width}
        height={height}
        priority
      />
    </ViewTransition>
  )
}
