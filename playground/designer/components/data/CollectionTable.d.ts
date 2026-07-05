/**
 * CollectionTable — records × typed fields grid (sticky header).
 */
export interface CollectionField {
  key: string;
  label: string;
  type: 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'select' | 'date' | 'color' | 'url';
  unit?: string;
  options?: string[];
}

export interface Collection {
  id: string;
  name: string;
  icon?: string;
  fields: CollectionField[];
  records: Array<Record<string, unknown> & { id: string }>;
}

export interface CollectionTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  collection: Collection;
  /** Cap rendered rows (previews). */
  maxRecords?: number;
  onRecordClick?: (record: Record<string, unknown>) => void;
}
