import * as React from "react";
/**
 * Resizable — draggable split panels, faithful to shadcn/ui (react-resizable-panels).
 */
export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}
export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> { defaultSize?: number; }
export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> { withHandle?: boolean; }
export function ResizablePanelGroup(props: ResizablePanelGroupProps): JSX.Element;
export function ResizablePanel(props: ResizablePanelProps): JSX.Element;
export function ResizableHandle(props: ResizableHandleProps): JSX.Element;
