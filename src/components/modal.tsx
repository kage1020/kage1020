"use client"

import { useRouter } from "next/navigation"
import type { ElementRef } from "react"
import { Fragment, useEffect, useRef } from "react"

import { createPortal } from "react-dom"

import type { ChildrenProps } from "@/types"

export default function Modal({ children }: ChildrenProps) {
  const modalRef = useRef<ElementRef<"dialog">>(null)
  const router = useRouter()

  useEffect(() => {
    if (!modalRef.current?.open) {
      document.body.style.overflow = "hidden"
      modalRef.current?.showModal()
    }
  }, [])

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    document.body.style.overflow = "auto"
    modalRef.current?.close()
    router.back()
  }

  return createPortal(
    <Fragment>
      <div className="absolute inset-0 z-20 bg-black/70">
        <dialog
          className="relative h-[70%] w-[80%] rounded-lg border-2 border-stone-50 bg-stone-800 p-4 text-stone-50"
          ref={modalRef}
        >
          {children}
          <div>
            <button
              className="mx-auto block rounded bg-stone-500 px-8 py-4 text-lg hover:bg-stone-600"
              onClick={onClose}
            >
              close
            </button>
          </div>
        </dialog>
      </div>
    </Fragment>,
    document.getElementById("modal-root")!,
  )
}
