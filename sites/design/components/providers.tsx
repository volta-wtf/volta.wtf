"use client"

import * as React from "react"
import { ConfigProvider } from "@/utils/config"
import { ThemeProvider } from "@/utils/theme"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </ThemeProvider>
    </ConfigProvider>
  )
}
