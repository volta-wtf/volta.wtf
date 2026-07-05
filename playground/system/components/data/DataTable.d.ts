import * as React from "react";
/**
 * DataTable — sortable/filterable/selectable table with pagination, faithful to shadcn/ui (TanStack pattern).
 */
export interface DataTableColumn {
  key: string;
  header: React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  cell?: (row: any) => React.ReactNode;
}
export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[];
  data: any[];
  pageSize?: number;
  filterKey?: string;
  filterPlaceholder?: string;
  selectable?: boolean;
}
export function DataTable(props: DataTableProps): JSX.Element;
