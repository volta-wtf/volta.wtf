import * as React from "react";
/**
 * Tabs — switch between panels, faithful to shadcn/ui + Radix.
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "default" | "line" | "geist"; }
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string; }
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> { value: string; }
export function Tabs(props: TabsProps): JSX.Element;
export function TabsList(props: TabsListProps): JSX.Element;
export function TabsTrigger(props: TabsTriggerProps): JSX.Element;
export function TabsContent(props: TabsContentProps): JSX.Element;
