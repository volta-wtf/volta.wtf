import * as React from "react";
/**
 * Item — flexible list-row primitive (media / content / actions), faithful to shadcn/ui.
 */
export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "default" | "outline" | "muted"; size?: "default" | "sm" | "xs"; asChild?: boolean; }
export interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "default" | "icon" | "image" | "avatar"; }
export function Item(props: ItemProps): JSX.Element;
export function ItemHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemMedia(props: ItemMediaProps): JSX.Element;
export function ItemContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemActions(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function ItemSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
