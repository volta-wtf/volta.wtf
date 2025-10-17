import { SearchInput } from './SearchInput';
import { CategoryFilter } from './CategoryFilter';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
  tags: string[];
  onClearFilters: () => void;
  resultsCount: number;
  totalCount: number;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedTag,
  onTagChange,
  tags,
  onClearFilters,
  resultsCount,
  totalCount
}: SearchAndFilterProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <SearchInput
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search..."
      />

      {/* Category Filters */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        selectedTag={selectedTag}
        onTagChange={onTagChange}
        tags={tags}
        onClearFilters={onClearFilters}
        resultsCount={resultsCount}
        totalCount={totalCount}
      />
    </div>
  );
}