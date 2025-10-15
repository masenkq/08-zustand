"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

interface ModalProps {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          router.back()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [router])

  return (
    <dialog 
      ref={dialogRef} 
      className="modal"
      onClose={() => router.back()}
      style={{
        border: "none",
        borderRadius: "8px",
        padding: "0",
        background: "transparent",
        maxWidth: "90vw",
        maxHeight: "90vh"
      }}
    >
      <div style={{
        position: "relative",
        background: "white",
        borderRadius: "8px",
        padding: "2rem",
        minWidth: "400px"
      }}>
        <button 
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer"
          }}
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  )
}
