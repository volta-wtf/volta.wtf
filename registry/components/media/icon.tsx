"use client"

import * as React from "react"
import { Icon as IconPrimitive, type IconName } from "@/primitives/icon"
import { cva, type VariantProps } from "@/lib/variants"
import { cn } from "@/lib/utils"

const iconVariants = cva("shrink-0 transition-colors", {
  variants: {
    size: {
      xs: "size-3", // 12px
      sm: "size-4", // 16px
      md: "size-5", // 20px
      lg: "size-6", // 24px
      xl: "size-8", // 32px
      "2xl": "size-10", // 40px
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
})

function Icon({
  name,
  className,
  size,
  color,
  clickable,
  ...props
}: React.ComponentProps<typeof IconPrimitive.Root> &
  VariantProps<typeof iconVariants> & {
    clickable?: boolean
  }) {
  return (
    <IconPrimitive.Root
      name={name}
      data-slot="icon"
      className={cn(
        iconVariants({ size, color }),
        clickable && "cursor-pointer hover:opacity-80",
        className
      )}
      {...props}
    />
  )
}

function IconContainer({
  className,
  ...props
}: React.ComponentProps<typeof IconPrimitive.Container>) {
  return (
    <IconPrimitive.Container
      data-slot="icon-container"
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        className
      )}
      {...props}
    />
  )
}

export { Icon, IconContainer, iconVariants }
export type { IconName }
