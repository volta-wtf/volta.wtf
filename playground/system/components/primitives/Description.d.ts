import * as React from "react";
/** Description — a label/value pair (Geist). */
export interface DescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  /** Optional info-glyph hint beside the title, revealed as a tooltip. */
  hint?: React.ReactNode;
  /** Place title and value side by side. */
  inline?: boolean;
}
export function Description(props: DescriptionProps): JSX.Element;
