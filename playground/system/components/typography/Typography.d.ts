import * as React from "react";
/**
 * Typography — shadcn/ui typography elements. Each forwards className and the
 * intrinsic element's props; children are the content.
 */
type El<T extends HTMLElement> = React.HTMLAttributes<T> & { className?: string };

export function H1(props: El<HTMLHeadingElement>): JSX.Element;
export function H2(props: El<HTMLHeadingElement>): JSX.Element;
export function H3(props: El<HTMLHeadingElement>): JSX.Element;
export function H4(props: El<HTMLHeadingElement>): JSX.Element;
/** Body paragraph. */
export function P(props: El<HTMLParagraphElement>): JSX.Element;
export function Blockquote(props: El<HTMLQuoteElement>): JSX.Element;
/** Inline `<code>` with a subtle chip background. */
export function InlineCode(props: El<HTMLElement>): JSX.Element;
/** Larger, muted intro paragraph. */
export function Lead(props: El<HTMLParagraphElement>): JSX.Element;
/** Emphasised block of text. */
export function Large(props: El<HTMLDivElement>): JSX.Element;
/** Small, medium-weight text. */
export function Small(props: El<HTMLElement>): JSX.Element;
/** Muted helper text. */
export function Muted(props: El<HTMLParagraphElement>): JSX.Element;

export interface ListProps extends El<HTMLUListElement> {
  /** Render an ordered `<ol>` instead of a `<ul>`. */
  ordered?: boolean;
}
export function List(props: ListProps): JSX.Element;

/** Namespace grouping of every typography element. */
export declare const Typography: {
  H1: typeof H1; H2: typeof H2; H3: typeof H3; H4: typeof H4;
  P: typeof P; Blockquote: typeof Blockquote; InlineCode: typeof InlineCode;
  Lead: typeof Lead; Large: typeof Large; Small: typeof Small; Muted: typeof Muted; List: typeof List;
};
