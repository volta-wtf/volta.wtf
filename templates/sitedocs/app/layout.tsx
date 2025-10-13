import type { Metadata } from "next"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { TooltipProvider } from "@/registry/components/ui/tooltip"

import "@/styles/globals.css"


export const metadata: Metadata = {
  title: {
    default: "Sitedocs | TEMPLATE",
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
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
