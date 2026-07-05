import * as React from "react";
/**
 * AlertDialog — modal confirmation requiring an explicit response, faithful to shadcn/ui + Radix.
 */
export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> { size?: "default" | "sm"; }
export function AlertDialog(props: AlertDialogProps): JSX.Element;
export function AlertDialogTrigger(props: AlertDialogTriggerProps): JSX.Element;
export function AlertDialogContent(props: AlertDialogContentProps): JSX.Element;
export function AlertDialogMedia(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function AlertDialogHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function AlertDialogFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function AlertDialogTitle(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function AlertDialogDescription(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function AlertDialogAction(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "primary" | "destructive" | "outline" | "secondary" | "ghost" }): JSX.Element;
export function AlertDialogCancel(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): JSX.Element;
