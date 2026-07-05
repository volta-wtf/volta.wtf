/**
 * Filmstrip — numbered slide-thumbnail rail (slides archetype, left panel).
 */
export interface FilmstripSlide { id: string; name?: string; [key: string]: unknown; }

export interface FilmstripProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: FilmstripSlide[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Draws the 16:9 thumb content (scaled-down slide). */
  renderThumb?: (slide: FilmstripSlide, index: number) => React.ReactNode;
}
