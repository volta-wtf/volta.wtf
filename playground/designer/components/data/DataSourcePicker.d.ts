/**
 * DataSourcePicker — collection + field chooser for binding.
 */
import type { Collection } from './CollectionTable';

export interface DataBinding { collection?: string; field?: string; }

export interface DataSourcePickerProps {
  collections: Collection[];
  value?: DataBinding;
  onChange?: (value: DataBinding) => void;
  /** Only offer fields of this type (e.g. "image" for an image layer). */
  fieldType?: string;
  className?: string;
  style?: React.CSSProperties;
}
