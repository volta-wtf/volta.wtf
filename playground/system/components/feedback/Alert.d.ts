import * as React from "react";
/**
 * Alert — contextual callout, faithful to shadcn/ui.
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}
export function Alert(props: AlertProps): JSX.Element;
export function AlertTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function AlertDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function AlertAction(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
