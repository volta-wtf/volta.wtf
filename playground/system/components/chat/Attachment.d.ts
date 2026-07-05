import * as React from "react";
/**
 * Attachment — file/image attachment chip for composers and messages.
 */
export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Metadata text, e.g. file type and size ("PDF · 2.4 MB"). */
  size?: string;
  /** Image preview URL. Renders an <img> in place of the icon. */
  src?: string;
  /** Icon name shown when no `src` is given. */
  icon?: string;
  /** Upload lifecycle. `uploading`/`processing` shimmer the name; `error` is destructive. */
  state?: "idle" | "uploading" | "processing" | "error" | "done";
  /** Chip scale. */
  scale?: "default" | "sm" | "xs";
  /** Lay the media beside (horizontal) or above (vertical) the content. */
  orientation?: "horizontal" | "vertical";
  onRemove?: () => void;
}
export function Attachment(props: AttachmentProps): JSX.Element;

export interface AttachmentGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
/** AttachmentGroup — scrollable, snapping row of attachments with an edge fade. */
export function AttachmentGroup(props: AttachmentGroupProps): JSX.Element;
