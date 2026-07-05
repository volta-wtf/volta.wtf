import * as React from "react";
/**
 * ButtonGroup — joins related buttons into one segmented control, faithful to shadcn/ui.
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> { orientation?: "horizontal" | "vertical"; }
export interface ButtonGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> { orientation?: "horizontal" | "vertical"; }
export function ButtonGroup(props: ButtonGroupProps): JSX.Element;
export function ButtonGroupSeparator(props: ButtonGroupSeparatorProps): JSX.Element;
export function ButtonGroupText(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
