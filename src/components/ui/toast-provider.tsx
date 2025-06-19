'use client'

import * as React from 'react'
import { Toaster, toast as sonner } from 'sonner'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors position="top-center" />
      {children}
    </>
  )
}

export const toast = sonner
