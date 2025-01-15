"use client"

import Image from "next/image"
import { useState } from "react"

import { motion } from "framer-motion"
import { Link } from "next-view-transitions"
import { BsTwitter } from "react-icons/bs"
import { SiGithub, SiQiita, SiX, SiZenn } from "react-icons/si"

import icon from "../../public/icon-512x512.webp"

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Home() {
  const [flip, setFlip] = useState(false)

  const flipX = () => {
    setTimeout(() => setFlip(true), 500)
    setTimeout(() => setFlip(false), 1500)
  }

  return (
    <div className="mx-auto grid h-full max-w-3xl place-items-center">
      <motion.div
        className="grid w-full grid-cols-2 gap-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.3,
              delayChildren: 0.3,
              staggerChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="col-span-2" variants={itemVariant}>
          <Image
            src={icon}
            alt=""
            className="mx-auto max-w-[256px] [view-transition-name:icon]"
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
        <motion.div className="col-span-2" variants={itemVariant}>
          <h1 className="mb-4 text-center text-5xl [view-transition-name:name-title]">
            kage1020
          </h1>
          <h3 className="text-center text-2xl">🚧Under construction🚧</h3>
        </motion.div>
        <motion.div
          className="from-stone-800 to-stone-900 border-stone-700 relative grid h-[150px] place-items-center rounded-lg border bg-gradient-to-b p-4 text-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl"
          variants={itemVariant}
          whileHover={{ y: -4 }}
        >
          <Link href="/gallery" className="absolute inset-0" />
          Gallery
        </motion.div>
        <motion.div
          className="from-stone-800 to-stone-900 border-stone-700 relative grid h-[150px] place-items-center rounded-lg border bg-gradient-to-b p-4 text-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl"
          variants={itemVariant}
          whileHover={{ y: -4 }}
        >
          <Link href="/apps" className="absolute inset-0" />
          Apps
        </motion.div>
        <motion.div
          className="from-stone-800 to-stone-900 border-stone-700 relative grid h-[150px] place-items-center rounded border bg-gradient-to-b p-4 text-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl"
          variants={itemVariant}
          whileHover={{ y: -4 }}
        >
          <Link
            href="https://github.com/kage1020"
            target="_blank"
            className="absolute inset-0"
          />
          <SiGithub size={48} />
        </motion.div>
        <motion.div
          className="from-stone-800 to-stone-900 border-stone-700 group relative grid h-[150px] place-items-center rounded border bg-gradient-to-b p-4 text-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl"
          variants={itemVariant}
          whileHover={{ y: -4 }}
        >
          <Link
            href="https://qiita.com/kage1020"
            target="_blank"
            className="absolute inset-0"
          />
          <SiQiita
            size={64}
            className="group-hover:text-qiita transition-colors duration-300"
          />
        </motion.div>
        <motion.div
          className="from-stone-800 to-stone-900 border-stone-700 group relative grid h-[150px] place-items-center rounded border bg-gradient-to-b p-4 text-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl"
          variants={itemVariant}
          whileHover={{ y: -4 }}
        >
          <Link
            href="https://zenn.dev/kage1020"
            target="_blank"
            className="absolute inset-0"
          />
          <SiZenn
            size={48}
            className="group-hover:text-zenn transition-colors duration-300"
          />
        </motion.div>
        <motion.div
          className="border-stone-700 from-stone-800 to-stone-900 relative grid h-[150px] place-items-center rounded border bg-gradient-to-b p-4 text-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl"
          variants={itemVariant}
          whileHover={{ y: -4 }}
          onHoverEnd={flipX}
        >
          <Link
            href="https://x.com/kage1020"
            target="_blank"
            className="absolute inset-0 z-10"
          />
          <motion.div className="relative h-full w-full">
            <motion.div
              className="absolute left-1/2 top-1/2 [backface-visibility:hidden]"
              initial={{ rotateY: 0, x: "-50%", y: "-50%" }}
              animate={{ rotateY: flip ? 180 : 0, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.5 }}
            >
              <SiX size={48} />
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-1/2 [backface-visibility:hidden]"
              initial={{ rotateY: 180, x: "-50%", y: "-50%" }}
              animate={{ rotateY: flip ? 0 : 180, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.5 }}
            >
              <BsTwitter size={48} className="text-[#1d9bf0]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
