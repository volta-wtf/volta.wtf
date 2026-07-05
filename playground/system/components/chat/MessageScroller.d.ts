import * as React from "react";
/**
 * MessageScroller — scroll region for a message list; pins to bottom on new content
 * unless the user has scrolled up.
 */
export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {}
export function MessageScroller(props: MessageScrollerProps): JSX.Element;
