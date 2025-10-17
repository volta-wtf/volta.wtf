"use client"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/media/icon"
import { Button } from "@/components/ui/button"

interface MenuTogglerProps {
  className?: string
}

export const MenuToggler = ({ className }: MenuTogglerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("group", className)}
    >
      <Icon.Menu className="text-current" />
    </Button>
  )
}