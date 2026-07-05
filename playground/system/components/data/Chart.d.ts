import * as React from "react";
/**
 * Chart — config-driven chart container (bar/line) mirroring shadcn's Chart API.
 */
export interface ChartConfig { [key: string]: { label?: string; color?: string }; }
export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> { config: ChartConfig; }
export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ label: string } & Record<string, number | string>>;
  type?: "bar" | "line";
  height?: number;
}
export function ChartContainer(props: ChartContainerProps): JSX.Element;
export function ChartLegend(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function Chart(props: ChartProps): JSX.Element;
