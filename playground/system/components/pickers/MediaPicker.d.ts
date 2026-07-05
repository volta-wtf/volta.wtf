import * as React from "react";
import { GridPickerProps } from "./GridPicker";
import { PanelPickerProps } from "./PanelPicker";

/** A concrete picker built on GridPicker — forwards GridPicker props. */
export type PickerProps = Partial<GridPickerProps>;

/** EmojiPicker — categorized, searchable grid of the emoji registry. */
export function EmojiPicker(props: PickerProps): JSX.Element;
/** PictoPicker — categorized, searchable grid of the Lucide base library.
 *  Header color swatch opens a ColorPicker that tints every picto. */
export interface PictoPickerProps extends Partial<GridPickerProps> {
  /** Controlled tint color applied to all pictos. */
  color?: string;
  /** Initial tint when uncontrolled. Default "currentColor". */
  defaultColor?: string;
  /** Fires with the picked tint color. */
  onColorChange?: (color: string) => void;
  /** Where the color control renders: "top" (own header row, default) or "none" (host renders it). */
  colorControl?: "top" | "none";
}
export function PictoPicker(props: PictoPickerProps): JSX.Element;
/** PictoColorButton — swatch trigger + ColorPicker popover (used standalone or in a panel header). */
export function PictoColorButton(props: { color?: string; onColorChange?: (color: string) => void; align?: "start" | "center" | "end" }): JSX.Element;
/** IconPicker — searchable grid of the design-system's named UI icons. */
export function IconPicker(props: PickerProps): JSX.Element;
/** StickerPicker — placeholder grid (awaiting a sticker source). */
export function StickerPicker(props: PickerProps): JSX.Element;
/** GifPicker — placeholder grid (awaiting a GIF source). */
export function GifPicker(props: PickerProps): JSX.Element;

/** MediaPicker — PanelPicker exposing Emoji · Pictos · Icons · Stickers · GIFs. */
export interface MediaPickerProps extends Partial<PanelPickerProps> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Limit & order which pickers show. Omit to show all except "icon". */
  sources?: Array<"emoji" | "picto" | "icon" | "sticker" | "gif">;
}
export function MediaPicker(props: MediaPickerProps): JSX.Element;
