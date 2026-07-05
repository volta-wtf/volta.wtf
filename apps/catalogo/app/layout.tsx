import { Providers } from "@/components/providers"
import { ThemeEditorLoader } from "@/components/theme-editor-loader"

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
        {process.env.NODE_ENV === "development" && <ThemeEditorLoader />}
      </body>
    </html>
  )
}
