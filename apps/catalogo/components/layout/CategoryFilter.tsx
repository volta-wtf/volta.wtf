"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categories: string[]
  selectedTag?: string
  onTagChange?: (tag: string) => void
  tags?: string[]
  onClearFilters?: () => void
  resultsCount?: number
  totalCount?: number
}

export const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  categories,
  selectedTag,
  onTagChange,
  tags = [],
  onClearFilters,
  resultsCount,
  totalCount
}: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      {/* Categorías */}
      <div>
        <h3 className="text-sm font-medium mb-3">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="hidden">
          <h3 className="text-sm font-medium mb-3">Tags</h3>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onTagChange?.(selectedTag === tag ? "" : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Resultados y limpiar filtros */}
      <div className="hidden text-sm text-muted-foreground space-y-2">
        {resultsCount !== undefined && totalCount !== undefined && (
          <div>
            Mostrando {resultsCount} de {totalCount} elementos
          </div>
        )}
        {onClearFilters && (selectedCategory || selectedTag) && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="w-full"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}