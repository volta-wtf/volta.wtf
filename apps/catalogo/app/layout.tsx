import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"

// /shadcn | Opción con globals locales y shadcn.css en worspace
import "./shadcn.css"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>

        {/* Theme Editor - Solo en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <script src="http://localhost:4445/theme-editor.js" async />
        )}
      </body>
    </html>
  )
}
