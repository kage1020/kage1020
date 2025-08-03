"use client"

import Image from "next/image"
import Link from "next/link"
import { unstable_ViewTransition as ViewTransition } from "react"

interface LogoLinkProps {
  size?: "small" | "large"
  className?: string
}

export default function LogoLink({
  size = "small",
  className = "",
}: LogoLinkProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    large: "w-[200px] h-[200px]",
  }

  const textClasses = {
    small: "text-sm font-medium",
    large: "text-6xl font-bold",
  }

  const imageSizes = {
    small: "24px",
    large: "200px",
  }

  return (
    <Link
      href="/"
      className={`${
        size === "large"
          ? "flex flex-col items-center gap-6"
          : "inline-flex items-center gap-2"
      } text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <div
        className={`relative transition-transform hover:scale-110 ${
          size === "small" ? sizeClasses.small : ""
        }`}
      >
        <ViewTransition name="logo-icon">
          <Image
            src="/icon-512x512.webp"
            alt="kage1020 icon"
            width={size === "large" ? 200 : undefined}
            height={size === "large" ? 200 : undefined}
            fill={size === "small"}
            className={size === "large" ? "" : "object-contain"}
            sizes={imageSizes[size]}
            priority={size === "large"}
          />
        </ViewTransition>
      </div>
      <ViewTransition name="logo-text">
        <h1 className={textClasses[size]}>kage1020</h1>
      </ViewTransition>
    </Link>
  )
}
