import * as React from "react";
/** Error — inline error message (Geist). */
export interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}
export function Error(props: ErrorProps): JSX.Element;
