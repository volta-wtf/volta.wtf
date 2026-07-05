/**
 * CollectionList — selectable list of data collections.
 */
export interface CollectionMeta {
  id: string;
  name: string;
  /** Icon role. @default 'collection' */
  icon?: string;
  count?: number;
  records?: unknown[];
}

export interface CollectionListProps extends React.HTMLAttributes<HTMLDivElement> {
  collections: CollectionMeta[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}
