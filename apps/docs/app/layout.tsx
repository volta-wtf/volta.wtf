import type { Metadata } from "next"

import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Documentation | VOLTA",
    template: "%s | VOLTA Docs",
  },
  description: "Component documentation for VOLTA design system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "text-foreground group/body theme-blue overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
