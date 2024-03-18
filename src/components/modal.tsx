"use client"

import { useRouter } from "next/navigation"
import type { ElementRef } from "react"
import { useEffect, useRef } from "react"

import { createPortal } from "react-dom"

import { cn } from "@/libs/util"

import type { ChildrenProps } from "@/types"

export default function Modal({ children }: ChildrenProps) {
  const modalRef = useRef<ElementRef<"dialog">>(null)
  const overlayRef = useRef<ElementRef<"div">>(null)
  const router = useRouter()

  useEffect(() => {
    if (!modalRef.current?.open) {
      if (modalRef.current && overlayRef.current) {
        modalRef.current?.showModal()
        modalRef.current.className = cn(
          modalRef.current?.className,
          "opacity-100",
        )
        overlayRef.current.className = cn(
          overlayRef.current?.className,
          "opacity-100",
        )
      }
    }
  }, [])

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (modalRef.current && overlayRef.current) {
      modalRef.current.className = cn(modalRef.current?.className, "opacity-0")
      overlayRef.current.className = cn(
        overlayRef.current?.className,
        "opacity-0",
      )
      setTimeout(() => {
        router.back()
        modalRef.current?.close()
      }, 400)
    }
  }

  return createPortal(
    <div
      className="absolute inset-0 z-20 bg-black/70 opacity-0 transition duration-500 ease-in-out"
      onClick={onClose}
      ref={overlayRef}
    >
      <dialog
        className="relative h-[85%] w-[85%] overflow-x-hidden rounded-lg border-2 bg-stone-800 opacity-0 transition duration-500 ease-in-out"
        ref={modalRef}
      >
        <div
          className="flex h-full flex-col justify-between border-stone-50 text-stone-50"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <div className="pb-8">
            <button
              className="mx-auto block rounded border-2 border-stone-100 px-8 py-3 text-lg transition hover:bg-stone-100/20"
              onClick={onClose}
            >
              close
            </button>
          </div>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  )
}
