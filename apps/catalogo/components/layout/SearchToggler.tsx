"use client"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/media/icon"
import { Button } from "@/components/ui/button"

interface SearchTogglerProps {
  className?: string
}

export const SearchToggler = ({ className }: SearchTogglerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("group", className)}
    >
      <Icon.Search className="text-current" />
    </Button>
  )
}