/**
 * LayerTree — recursive layers list (32px rows).
 */
export interface LayerNode {
  id: string;
  name: string;
  /** frame | group | component | text | image | shape | rectangle | ellipse */
  type?: string;
  hidden?: boolean;
  locked?: boolean;
  /** Bound collection field — renders a selection-blue badge (e.g. "title"). */
  binding?: string;
  children?: LayerNode[];
}

export interface LayerTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  layers: LayerNode[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onToggleHidden?: (id: string) => void;
  onToggleLocked?: (id: string) => void;
  /** Expand these ids initially; default = all parents expanded. */
  defaultExpandedIds?: string[];
}
