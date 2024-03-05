"use client"

import { forwardRef } from "react"

import { motion } from "framer-motion"

import type { Props } from "@/types"

const Transition = forwardRef<HTMLDivElement, Props>(function Transition(
  { className, children }: Props,
  ref,
) {
  return (
    <motion.main
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.main>
  )
})

export default Transition

export const TransitionDiv = forwardRef<HTMLDivElement, Props>(
  function TransitionDiv({ className, children }: Props, ref) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    )
  },
)
