import * as React from "react";
/**
 * Avatar — user image with initials fallback, faithful to shadcn/ui + Radix.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {}
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export function Avatar(props: AvatarProps): JSX.Element;
export function AvatarImage(props: AvatarImageProps): JSX.Element | null;
export function AvatarFallback(props: AvatarProps): JSX.Element;
