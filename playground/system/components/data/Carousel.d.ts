import * as React from "react";
/**
 * Carousel — horizontal slides with prev/next, faithful to shadcn/ui (Embla).
 */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Carousel(props: CarouselProps): JSX.Element;
export function CarouselContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CarouselItem(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CarouselPrevious(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export function CarouselNext(props: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
