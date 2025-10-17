"use client"

import { Input } from "@/components/ui/input"
import { Icon } from "@/components/media/icon"

interface SearchInputProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
  isPreviewOpen: boolean
  className?: string
}

export const SearchInput = ({
  searchQuery,
  onSearchChange,
  placeholder = "Buscar...",
  isPreviewOpen,
  className = ""
}: SearchInputProps) => {
  return (
    <div className={`relative -ml-1 ${isPreviewOpen ? "hidden md:flex" : ""} ${className}`}>
      <Icon.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-10 h-10 bg-input-background dark:bg-input-background hover:not-focus:bg-accent _focus:w-[calc(100vw-1.5rem)] _focus:lg:w-100 shadow-none border-0 focus-visible:ring-2 focus-visible:ring-ring will-change-width transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon.Close className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}