import * as React from "react";

export type WindowSize = "sm" | "md" | "lg";

/**
 * Window — generalized window frame (topbar + optional toolbar/tabbar + viewport).
 * Compose with WindowTopbar / WindowToolbar / WindowTabbar / WindowContent.
 */
export interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scales the topbar/toolbar heights. Default "md". */
  size?: WindowSize;
  /** Window-control style: macOS traffic lights (left) or Windows buttons (right). Default "macos". Inherited by WindowTopbar. */
  platform?: "macos" | "windows";
  /** "muted" greys the macOS traffic lights. Default "default". */
  variant?: "default" | "muted";
}
export function Window(props: WindowProps): JSX.Element;

export interface WindowTopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override the inherited platform for this bar's controls. */
  platform?: "macos" | "windows";
  /** Close control handler (macOS red light / Windows ✕). */
  onClose?: () => void;
  /** Minimize control handler (macOS amber light / Windows ─). */
  onMinimize?: () => void;
  /** Maximize control handler (macOS green light / Windows ☐). */
  onMaximize?: () => void;
}
export function WindowTopbar(props: WindowTopbarProps): JSX.Element;

export interface WindowToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function WindowToolbar(props: WindowToolbarProps): JSX.Element;

export interface WindowContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export function WindowContent(props: WindowContentProps): JSX.Element;

export interface WindowTab {
  id?: string;
  title?: string;
  icon?: React.ReactNode;
  active?: boolean;
  closable?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}
export interface WindowTabbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab visual style. Default "tab". */
  variant?: "pill" | "tab" | "block";
  /** Per-tab close button position. Defaults to "left" for the block variant, "right" otherwise. */
  closePosition?: "left" | "right";
  tabs?: WindowTab[];
  /** Append a trailing "+" new-tab button. */
  onNewTab?: () => void;
}
export function WindowTabbar(props: WindowTabbarProps): JSX.Element;
