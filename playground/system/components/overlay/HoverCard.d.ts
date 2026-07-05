import * as React from "react";
/** HoverCard — hover-triggered preview card, faithful to shadcn/ui + Radix. */
export interface HoverCardProps { openDelay?: number; closeDelay?: number; children?: React.ReactNode; }
export interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> { align?: "start" | "center" | "end"; }
export function HoverCard(props: HoverCardProps): JSX.Element;
export function HoverCardTrigger(props: React.HTMLAttributes<HTMLSpanElement> & { asChild?: boolean }): JSX.Element;
export function HoverCardContent(props: HoverCardContentProps): JSX.Element;
