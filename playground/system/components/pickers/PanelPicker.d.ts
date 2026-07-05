import * as React from "react";

export interface PanelPickerEntry { id: string; label: string; icon?: string; node: React.ReactNode; /** Node rendered right-aligned in the header while this picker is active. */ action?: React.ReactNode; }

/** PanelPicker — master-header shell that hosts and switches between several pickers. */
export interface PanelPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  pickers: PanelPickerEntry[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Show a close (✕) button at the right of the header. */
  onClose?: () => void;
  /** Shown in the body when the active picker has no content. */
  placeholder?: React.ReactNode;
}
export function PanelPicker(props: PanelPickerProps): JSX.Element;
