import type { Metadata } from "@/utils/meta";
import { fontVariables } from "@/lib/fonts";

import { Providers } from "@/components/providers"
import { Application } from "@/components/application"

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Styles | VOLTA",
  description: "Catalog for styles, components and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <Providers>
          <Application>
            {children}
          </Application>
        </Providers>
      </body>
    </html>
  );
}
