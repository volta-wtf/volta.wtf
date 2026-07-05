import type { Metadata } from "@/utils/meta";
import { fontVariables } from "@/lib/fonts";

import { Providers } from "@/components/providers"
import { Application } from "@/components/application"
import { ThemeEditorLoader } from "@/components/theme-editor-loader"

import "./globals.css";

export const metadata: Metadata = {
  title: "Demos | VOLTA",
  description: "Catalog for styles, components and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="demo style-baseline" suppressHydrationWarning>
      <body className={fontVariables}>
        <Providers>
          <Application>
            {children}
          </Application>
        </Providers>
        {process.env.NODE_ENV === "development" && <ThemeEditorLoader />}
      </body>
    </html>
  );
}
