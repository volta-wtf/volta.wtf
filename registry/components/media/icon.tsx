"use client"

import * as React from "react"
import { cva, type VariantProps } from "@/lib/variants"
import { cn } from "@/lib/utils"

import {
  Icon as IconPrimitive,
  installIcons,
  type IconName
} from "@/primitives/icon"

const iconVariants = cva(
  "inline-block align-middle shrink-0 transition-colors " +
  "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      size: {
        xs: "size-3",  // 12px
        sm: "size-4",  // 16px
        md: "size-5",  // 20px
        lg: "size-6",  // 24px
        xl: "size-8",  // 32px
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
      clickable: {
        true: "cursor-pointer hover:opacity-80",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  }
)

function Icon({
  className,
  size,
  color,
  clickable,
  ...props
}: React.ComponentProps<typeof IconPrimitive.Root> &
  VariantProps<typeof iconVariants>) {
  return (
    <IconPrimitive.Root
      {...props}
      className={cn(iconVariants({ size, color, clickable }), className)}
    />
  );
}

Icon.displayName = "Icon";

// Opt-in: instala <Icon.Search />, <Icon.Close />, etc.
const IconComponents = installIcons(Icon as any)

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

export { IconComponents as Icon, IconContainer, iconVariants }
export type { IconName }
