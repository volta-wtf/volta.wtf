/**
 * PageList — document pages list.
 */
export interface PageListProps extends React.HTMLAttributes<HTMLDivElement> {
  pages: Array<{ id: string; name: string }>;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}
