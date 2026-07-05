/**
 * AssetGrid — auto-fill grid section for LibraryItems.
 */
export interface AssetGridProps extends React.HTMLAttributes<HTMLElement> {
  /** Section eyebrow, e.g. "Shapes", "Blocks". */
  title?: React.ReactNode;
  /** Item count shown right of the title. */
  count?: number;
  /** LibraryItem children. */
  children?: React.ReactNode;
}
