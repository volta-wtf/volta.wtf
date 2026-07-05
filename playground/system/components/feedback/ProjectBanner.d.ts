import * as React from "react";
/** ProjectBanner — full-width announcement bar (Geist). */
export interface ProjectBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "neutral" | "info" | "warning" | "error";
  icon?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
}
export function ProjectBanner(props: ProjectBannerProps): JSX.Element;
