"use client"

import * as React from "react"
import { ConfigProvider } from "@/utils/config"
import { ThemeProvider } from "@/utils/theme"
import { ActiveThemeProvider } from "@/components/theme"

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
        </ActiveThemeProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}
