import React from "react";
import { EmojiCategories } from "../icons/emojiData.js";
import { PictoCategories } from "../icons/pictosData.js";
import { icons as iconRegistry } from "../icons/iconData.js";
import { Emoji } from "../icons/Emoji.jsx";
import { Picto } from "../icons/Picto.jsx";
import { Icon } from "../icons/Icon.jsx";
import { GridPicker } from "./GridPicker.jsx";
import { PanelPicker } from "./PanelPicker.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "../overlay/Popover.jsx";
import { getMediaSource } from "./mediaSources.js";

/* Build category groups from the icon-system data. Memoized module-side (the
   data is static) so each picker mount is cheap. */
const emojiCatIcons = {
  "Smileys & Emotion": "smile", "People & Body": "users", "Animals & Nature": "leaf",
  "Food & Drink": "gift", "Travel & Places": "map-pin", "Activities": "award",
  "Objects": "package", "Symbols": "hash", "Flags": "flag",
};
const emojiGroups = Object.entries(EmojiCategories).map(([label, list]) => ({
  id: label, label, icon: emojiCatIcons[label],
  items: list.map((e) => ({ value: e.name, label: e.name, node: React.createElement(Emoji, { name: e.name, size: 22 }) })),
}));
const emojiRecents = ["grinning", "joy", "heart-eyes", "thumbs-up", "cry", "wave"].map((n) => ({ value: n, label: n, node: React.createElement(Emoji, { name: n, size: 22 }) }));
const emojiFavorites = ["heart-eyes", "thumbs-up", "joy", "wave"].map((n) => ({ value: n, label: n, node: React.createElement(Emoji, { name: n, size: 22 }) }));
const pictoGroups = Object.entries(PictoCategories).map(([label, glyphs]) => ({
  id: label, label,
  items: Object.keys(glyphs).map((n) => ({ value: n, label: n, node: React.createElement(Picto, { name: n, size: 18 }) })),
}));
const pictoRecents = ["arrow-up", "play", "file", "house", "star", "search"].map((n) => ({ value: n, label: n, node: React.createElement(Picto, { name: n, size: 18 }) }));
const pictoFavorites = ["star", "heart", "bookmark", "house"].map((n) => ({ value: n, label: n, node: React.createElement(Picto, { name: n, size: 18 }) }));
const iconItems = Object.keys(iconRegistry).filter((n) => !n.startsWith("c-")).sort().map((n) => ({
  value: n, label: n, node: React.createElement(Icon, { name: n, size: 18 }),
}));

/** EmojiPicker — GridPicker over the emoji registry, categorized + searchable. */
export function EmojiPicker(props) {
  return <GridPicker search searchPlaceholder="Search emoji…" recents={emojiRecents} favorites={emojiFavorites} groups={emojiGroups} {...props} />;
}
/** PictoColorButton — swatch trigger + ColorPicker popover. Shared by the
 *  standalone PictoPicker (top-row control) and MediaPicker (panel-header corner). */
export function PictoColorButton({ color = "currentColor", onColorChange, align = "end" }) {
  const [open, setOpen] = React.useState(false);
  const swatchColor = color === "currentColor" ? "var(--foreground)" : color;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="ds-picto-color-btn" aria-label="Picto color" title="Picto color">
          <span className="ds-picto-color-swatch" style={{ background: swatchColor }} />
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} style={{ padding: 10 }}>
        <ColorPicker value={color} onChange={(v) => { onColorChange && onColorChange(v); setOpen(false); }} />
      </PopoverContent>
    </Popover>
  );
}

/** PictoPicker — GridPicker over the Lucide base library (pictos), categorized.
 *  A color swatch tints every picto. `colorControl`: "top" (own header row,
 *  default) | "none" (host renders the control, e.g. MediaPicker's panel corner). */
export function PictoPicker({ color: colorProp, defaultColor = "currentColor", onColorChange, colorControl = "top", ...props }) {
  const controlled = colorProp !== undefined;
  const [innerColor, setInnerColor] = React.useState(defaultColor);
  const color = controlled ? colorProp : innerColor;

  // Rebuild picto nodes tinted with the chosen color (memoized on color).
  const tint = (names, size) => names.map((n) => ({ value: n, label: n, node: React.createElement(Picto, { name: n, size, style: { color } }) }));
  const groups = React.useMemo(() => Object.entries(PictoCategories).map(([label, glyphs]) => ({
    id: label, label, items: tint(Object.keys(glyphs), 18),
  })), [color]);
  const recents = React.useMemo(() => tint(["arrow-up", "play", "file", "house", "star", "search"], 18), [color]);
  const favorites = React.useMemo(() => tint(["star", "heart", "bookmark", "house"], 18), [color]);

  const setColor = (v) => { if (!controlled) setInnerColor(v); onColorChange && onColorChange(v); };
  const colorButton = colorControl === "top"
    ? <PictoColorButton color={color} onColorChange={setColor} />
    : null;

  return <GridPicker search searchPlaceholder="Search pictos…" headerTop={colorButton} recents={recents} favorites={favorites} groups={groups} {...props} />;
}
/** IconPicker — GridPicker over the design-system's named UI icons. */
export function IconPicker(props) {
  return <GridPicker search searchPlaceholder="Search icons…" categories="none" items={iconItems} {...props} />;
}

/* Stickers/GIFs load from a registered media source (see mediaSources.js).
   Search re-queries the source; results render as images. Falls back to a
   placeholder grid if the source is missing or the request fails. */
function MediaSourcePicker({ source, label, columns = 6, ...props }) {
  const loader = getMediaSource(source);
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState("loading"); // loading | ready | error
  React.useEffect(() => {
    if (!loader) { setState("error"); return; }
    let alive = true;
    setState("loading");
    const t = setTimeout(() => {
      Promise.resolve(loader(query)).then((res) => {
        if (!alive) return;
        setItems((res || []).map((r) => ({
          value: r.value, label: r.label,
          node: r.src ? React.createElement("img", { src: r.src, alt: r.label || "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 } }) : React.createElement("span", { className: "ds-gridpicker-ph" }),
        })));
        setState("ready");
      }).catch(() => { if (alive) setState("error"); });
    }, query ? 320 : 0);
    return () => { alive = false; clearTimeout(t); };
  }, [loader, query]);

  const placeholder = Array.from({ length: 15 }, (_, i) => ({ value: label + "-" + i, label: label + " " + (i + 1), node: <span className="ds-gridpicker-ph" /> }));
  return (
    <GridPicker
      searchPlaceholder={"Search " + label + "…"}
      onSearch={setQuery}
      categories="none"
      columns={columns}
      itemSize={56}
      items={state === "error" ? placeholder : items}
      emptyText={state === "loading" ? "Loading…" : "No results."}
      {...props}
    />
  );
}
/** StickerPicker — loads from the registered "sticker" media source. */
export function StickerPicker(props) { return <MediaSourcePicker source="sticker" label="sticker" {...props} />; }
/** GifPicker — loads from the registered "gif" media source. */
export function GifPicker(props) { return <MediaSourcePicker source="gif" label="gif" columns={2} {...props} />; }

/**
 * MediaPicker — a PanelPicker whose master header exposes the media pickers:
 * Emoji · Pictos · Icons · Stickers · GIFs.
 * `sources` — optional array of ids ("emoji" | "picto" | "icon" | "sticker" | "gif")
 * to limit and order which pickers are shown. Omit to show all.
 */
export function MediaPicker({ value, defaultValue = "emoji", onValueChange, sources, ...props }) {
  const [pictoColor, setPictoColor] = React.useState("currentColor");
  const all = [
    { id: "emoji", label: "Emoji", icon: "smile", node: <EmojiPicker /> },
    { id: "picto", label: "Pictos", icon: "star",
      node: <PictoPicker color={pictoColor} onColorChange={setPictoColor} colorControl="none" />,
      action: <PictoColorButton color={pictoColor} onColorChange={setPictoColor} /> },
    { id: "icon", label: "Icons", icon: "image", node: <IconPicker /> },
    { id: "sticker", label: "Stickers", icon: "square-star", node: <StickerPicker /> },
    { id: "gif", label: "GIFs", icon: "film", node: <GifPicker /> },
  ];
  const pickers = sources && sources.length
    ? sources.map((id) => all.find((p) => p.id === id)).filter(Boolean)
    : all.filter((p) => p.id !== "icon");
  const initial = pickers.some((p) => p.id === defaultValue) ? defaultValue : (pickers[0] && pickers[0].id);
  return <PanelPicker pickers={pickers} value={value} defaultValue={initial} onValueChange={onValueChange} {...props} />;
}
