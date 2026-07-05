import * as React from "react";
/** Toaster + toast() — Sonner-style notifications, faithful to shadcn/ui. */
export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  type?: "default" | "success" | "error" | "warning" | "info" | "loading";
  action?: { label: string; onClick?: () => void };
}
export interface ToastFn {
  (opts: string | ToastOptions): number;
  success(title: string | ToastOptions, opts?: ToastOptions): number;
  error(title: string | ToastOptions, opts?: ToastOptions): number;
  warning(title: string | ToastOptions, opts?: ToastOptions): number;
  info(title: string | ToastOptions, opts?: ToastOptions): number;
  loading(title: string | ToastOptions, opts?: ToastOptions): number;
  message(title: string | ToastOptions, opts?: ToastOptions): number;
}
export const toast: ToastFn;
export function Toaster(props: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }): JSX.Element;
