import * as React from "react";
/** Snippet — copyable command/code line (Geist). */
export interface SnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** String copied to clipboard (defaults to children / joined commands). */
  text?: string;
  /** Prefix each line with a shell "$". */
  prompt?: boolean;
  /** Render multiple command lines. */
  commands?: string[];
  width?: number | string;
}
export function Snippet(props: SnippetProps): JSX.Element;
