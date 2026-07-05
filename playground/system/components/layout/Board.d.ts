import * as React from "react";
/**
 * Board — horizontal, multi-column kanban layout. Each column represents a
 * stage or category within a flow (Backlog · To do · Doing · Done). Ideal for
 * kanban, scrum, sales pipelines, workflows and processes.
 */
export interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column treatment:
   * "columns" (flush lanes, default) · "floating" (detached elevated cards) ·
   * "inset" (columns recessed inside a muted container).
   */
  variant?: "columns" | "floating" | "inset";
  /**
   * Data-driven columns. Each: `{ id?, title, count?, actions?, items }`
   * where `items` are the column's cards (BoardCard nodes). Omit to compose
   * BoardColumn/BoardCard children directly.
   */
  columns?: Array<{
    id?: string | number;
    title?: React.ReactNode;
    count?: React.ReactNode;
    actions?: React.ReactNode;
    items?: React.ReactNode;
  }>;
  /** Enable drag-to-reorder of columns (default true). */
  reorderable?: boolean;
  /** Enable drag-and-drop of cards within and across columns (default true). */
  cardsDraggable?: boolean;
  /** Fallback drop feedback for both axes (default "line"). */
  dropIndicator?: "outline" | "line" | "ghost";
  /** Drop feedback for column reordering: "line" (insertion bar) · "ghost" (shaded slot sized to the column) · "outline" (highlight target). Defaults to `dropIndicator`. */
  columnDropIndicator?: "outline" | "line" | "ghost";
  /** Drop feedback for card moves: "line" · "ghost" · "outline". Defaults to `dropIndicator`. */
  cardDropIndicator?: "outline" | "line" | "ghost";
  /** Called with the new column-key order after a column is moved. */
  onReorder?: (order: string[]) => void;
  /** Called after a card is moved: `{ id, from, to, index }` (column keys + insert index). */
  onCardMove?: (move: { id: string; from: string; to: string; index: number }) => void;
}
export function Board(props: BoardProps): JSX.Element;

export interface BoardColumnProps extends React.HTMLAttributes<HTMLElement> {
  /** Column heading — the stage/category name. */
  title?: React.ReactNode;
  /** Count shown next to the title. */
  count?: React.ReactNode;
  /** Trailing header controls (e.g. an add or menu button). */
  actions?: React.ReactNode;
  /** Injected by a reorderable Board — drag props applied to the header handle. */
  dragHandleProps?: React.HTMLAttributes<HTMLElement> | null;
  /** Injected by Board — drop-zone props applied to the column body. */
  bodyProps?: React.HTMLAttributes<HTMLElement> | null;
}
export function BoardColumn(props: BoardColumnProps): JSX.Element;

export interface BoardCardProps extends React.HTMLAttributes<HTMLDivElement> {}
export function BoardCard(props: BoardCardProps): JSX.Element;
