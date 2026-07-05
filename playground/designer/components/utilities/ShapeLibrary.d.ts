/**
 * ShapeLibrary — generic shape presets as an insert grid.
 */
export interface ShapePreset { id: string; name: string; path: string; }

export interface ShapeLibraryProps extends React.HTMLAttributes<HTMLElement> {
  /** Feed data/shapes.json `shapes`. */
  shapes: ShapePreset[];
  onInsert?: (shape: ShapePreset) => void;
  /** @default 'Shapes' */
  title?: React.ReactNode;
}
