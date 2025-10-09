import type { Metadata } from "next"

import { TooltipProvider } from "@/registry/components/ui/tooltip"

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
      <body className="antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
