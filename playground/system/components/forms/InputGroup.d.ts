import * as React from "react";
/**
 * InputGroup — input with inline leading/trailing addons, faithful to shadcn/ui.
 */
export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> { align?: "inline-start" | "inline-end" | "block-start" | "block-end"; }
export interface InputGroupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "icon-xs" | "sm" | "icon-sm";
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}
export function InputGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function InputGroupInput(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element;
export function InputGroupTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element;
export function InputGroupAddon(props: InputGroupAddonProps): JSX.Element;
export function InputGroupText(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
export function InputGroupButton(props: InputGroupButtonProps): JSX.Element;
