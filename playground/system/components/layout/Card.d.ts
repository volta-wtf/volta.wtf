import * as React from "react";
/**
 * Card — surface container with header/content/footer, faithful to shadcn/ui.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: CardProps): JSX.Element;
export function CardTitle(props: CardProps): JSX.Element;
export function CardDescription(props: CardProps): JSX.Element;
export function CardContent(props: CardProps): JSX.Element;
export function CardFooter(props: CardProps): JSX.Element;
