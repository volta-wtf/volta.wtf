"use client"

import * as React from "react"
import { TooltipProvider as Tooltips } from "../ui/tooltip"
import { Toaster } from "../ui/toaster"

// App component props extending ConfigProvider
export interface ShellProps {
  children: React.ReactNode
  /** Tooltip provider configuration */
  tooltip?: {
    delayDuration?: number
    skipDelayDuration?: number
    disableHoverableContent?: boolean
  }
  /** Toaster configuration */
  toaster?: {
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
    expand?: boolean
    className?: string
    duration?: number
  } | null
  /** Portal configuration */
  portal?: string | boolean | HTMLElement
}

export function Shell({
  children,
  tooltip = {},
  toaster = {},
  portal = 'body',
  ...configProps
}: ShellProps) {

  const {
    delayDuration = 700,
    skipDelayDuration = 300,
    disableHoverableContent = false,
  } = tooltip

  const {
    position = "bottom-right",
    expand = true,
    className: toasterClass,
    duration = 5000,
  } = toaster || {}

  return (
    <>
      <Tooltips
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        {children}
        {toaster && (
          <Toaster
            position={position}
            expand={expand}
            className={toasterClass}
            duration={duration}
          />
        )}
      </Tooltips>
    </>
  )
}
