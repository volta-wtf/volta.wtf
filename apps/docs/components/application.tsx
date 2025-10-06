"use client"

import * as React from "react"
import { Shell } from "@/components/layout/shell"

export function Application({children}: {children: React.ReactNode}) {
  return (
    <Shell>
        {children}
    </Shell>
  )
}
