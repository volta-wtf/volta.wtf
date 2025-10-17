"use client"

import * as React from "react"
import { ConfigProvider } from "@/utils/config"
import { ThemeProvider } from "@/utils/theme"
import { ActiveThemeProvider } from "@/components/theme"
import { Toaster } from "@/components/ui/toast"

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
        <ActiveThemeProvider initialTheme="blue">
          {children}
          <Toaster position="top-center" />
        </ActiveThemeProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}
