"use client"

import { forwardRef } from "react"

import { motion } from "framer-motion"

import type { Props } from "@/types"

const Transition = forwardRef<HTMLDialogElement, Props>(function Transition(
  { className, children }: Props,
  ref,
) {
  return (
    <motion.dialog
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.dialog>
  )
})

export default Transition
