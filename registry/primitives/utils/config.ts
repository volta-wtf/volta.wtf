import * as React from "react"

// Shared types for the config provider
export type Direction = 'ltr' | 'rtl'

export interface ScrollBodyOption {
  /** Whether to disable scrolling on the body when a modal/dialog is open */
  disabled?: boolean
  /** Whether to add padding to prevent layout shift when scrollbar disappears */
  padding?: boolean
  /** Custom padding value */
  paddingValue?: string
}

// Config provider context value
export interface ConfigProviderContextValue {
  /** The global reading direction of your application */
  dir: Direction
  /** The global locale of your application */
  locale: string
  /** The global scroll body behavior of your application */
  scrollBody: boolean | ScrollBodyOption
  /** The global nonce value of your application */
  nonce?: string
  /** The global useId injection as a workaround for preventing hydration issue */
  useId?: () => string
}

// Config provider props
export interface ConfigProviderProps {
  /** The global reading direction of your application. This will be inherited by all primitives. */
  dir?: Direction
  /** The global locale of your application. This will be inherited by all primitives. */
  locale?: string
  /** The global scroll body behavior of your application. This will be inherited by the related primitives. */
  scrollBody?: boolean | ScrollBodyOption
  /** The global nonce value of your application. This will be inherited by the related primitives. */
  nonce?: string
  /** The global useId injection as a workaround for preventing hydration issue. */
  useId?: () => string
  /** The children to render */
  children: React.ReactNode
}

// Create the context
const ConfigProviderContext = React.createContext<ConfigProviderContextValue | undefined>(undefined)

// Config provider component
export function ConfigProvider({
  dir = 'ltr',
  locale = 'en',
  scrollBody = true,
  nonce,
  useId,
  children,
}: ConfigProviderProps) {
  const contextValue: ConfigProviderContextValue = {
    dir,
    locale,
    scrollBody,
    nonce,
    useId,
  }

  return React.createElement(
    ConfigProviderContext.Provider,
    { value: contextValue },
    children
  )
}

// Hook to consume the config context
export function useConfig(): ConfigProviderContextValue {
  const context = React.useContext(ConfigProviderContext)

  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }

  return context
}

// Hook to get a specific config value
export function useConfigValue<K extends keyof ConfigProviderContextValue>(
  key: K
): ConfigProviderContextValue[K] {
  const config = useConfig()
  return config[key]
}
