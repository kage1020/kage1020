"use client"

import Image from "next/image"

import { motion } from "framer-motion"
import { Link } from "next-view-transitions"

import { Chip } from "@/components/chip"
import { apps } from "@/libs/assets"

import icon from "../../../public/icon-512x512.webp"

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Gallery() {
  return (
    <div className="mx-auto h-full max-w-5xl overflow-hidden">
      <Link href="/" className="flex items-center gap-8">
        <Image
          src={icon}
          alt=""
          className="[view-transition-name:icon]"
          width={48}
          height={48}
        />
        <h1 className="text-2xl [view-transition-name:name-title]">kage1020</h1>
      </Link>
      <motion.div
        className="my-4 grid h-full w-full grid-cols-2 gap-8 overflow-y-auto px-2 pb-16"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.3,
              delayChildren: 0.3,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {apps.map((app) => (
          <motion.div
            key={app.name}
            className="bg-stone-800 border-stone-700 relative row-span-5 grid h-[150px] grid-rows-subgrid rounded-lg border p-4 shadow-lg hover:-translate-y-1 hover:shadow-xl"
            variants={itemVariant}
            whileHover={{ y: -4 }}
          >
            <Link href={app.href} className="absolute inset-0" />
            <h2 className="text-3xl font-bold">{app.name}</h2>
            <p>{app.short}</p>
            {app.images[0] && (
              <Image
                src={app.images[0].src}
                alt={app.images[0].alt}
                className="h-64 object-contain"
              />
            )}
            <div className="flex flex-wrap gap-2">
              {app.tag.map((tag) => (
                <Chip key={tag.name} color={tag.color}>
                  {tag.name}
                </Chip>
              ))}
            </div>
            <span className="bottom-4 left-4 md:absolute">
              Created At: {app.createdAt}
            </span>
            <p className="flex">
              <Chip
                color={app.status.color}
                className="bottom-4 right-4 md:absolute"
              >
                {app.status.label}
              </Chip>
            </p>
            <Link className="absolute inset-0 z-0" href={app.href} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
