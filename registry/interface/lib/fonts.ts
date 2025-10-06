import localFont from "next/font/local";

// Font configuration using fonts from the parent repository
export const fontSans = localFont({
  src: "../../../registry/assets/shared/fonts/GeistVF.woff",
  variable: "--font-sans",
});

export const fontMono = localFont({
  src: "../../../registry/assets/shared/fonts/GeistMonoVF.woff",
  variable: "--font-mono",
});

// Export font variables for easy use in layouts
export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
