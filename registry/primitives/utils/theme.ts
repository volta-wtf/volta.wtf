import * as React from "react"

import {
  useTheme,
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps
} from "next-themes"

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return React.createElement(NextThemesProvider, props, children)
}

export { useTheme }
