import * as React from "react"
import { useCallback, useState } from "react"

type ToastActionElement = React.ReactNode

type Toast = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
  }
}
