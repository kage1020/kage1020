"use client"

import { useRouter } from "next/navigation"
import type { ElementRef } from "react"
import { useEffect, useRef } from "react"

import { createPortal } from "react-dom"

import { cn } from "@/libs/util"

export default function Modal({ children }: { children: React.ReactNode }) {
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
      className="bg-black/70 absolute inset-0 z-20 opacity-0 transition duration-500 ease-in-out"
      onClick={onClose}
      ref={overlayRef}
    >
      <dialog
        className="bg-stone-800 relative h-[85%] w-[85%] overflow-x-hidden rounded-lg border-2 opacity-0 transition duration-500 ease-in-out"
        ref={modalRef}
      >
        <div
          className="border-stone-50 text-stone-50 flex h-full flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <div className="pb-8">
            <button
              className="border-stone-100 hover:bg-stone-100/20 mx-auto block rounded border-2 px-8 py-3 text-lg transition"
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
