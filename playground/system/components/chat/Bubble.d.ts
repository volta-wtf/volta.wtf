import * as React from "react";
/**
 * Bubble — chat message bubble.
 */
export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "assistant" | "user"; }
export function Bubble(props: BubbleProps): JSX.Element;
