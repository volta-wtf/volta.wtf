"use client"

import { useEffect } from "react"

const THEME_EDITOR_PORT =
  process.env.NEXT_PUBLIC_THEME_EDITOR_PORT ?? "4451"

declare global {
  interface Window {
    __THEME_EDITOR_PORT__?: string
  }
}

export function ThemeEditorLoader() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    window.__THEME_EDITOR_PORT__ = THEME_EDITOR_PORT

    const src = `http://localhost:${THEME_EDITOR_PORT}/theme-editor.js`
    if (document.querySelector(`script[src="${src}"]`)) return

    const script = document.createElement("script")
    script.src = src
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
