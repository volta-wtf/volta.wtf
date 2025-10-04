"use client"

import * as React from "react"
import { ThemeProvider } from "@/utils/theme"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  )
}
