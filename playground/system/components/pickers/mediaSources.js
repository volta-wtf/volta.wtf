/* ============================================================
   mediaSources — a tiny registry for external media providers
   (stickers / GIFs / images) used by MediaPicker's pickers.

   Register a source with an async loader:

     registerMediaSource("gif", async (query) => ([
       { value, label?, src }   // src → image URL rendered in the grid
     ]));

   A loader receives the current search query ("" = trending/default)
   and returns an array of items. Errors should be caught by the
   caller; loaders may throw. Runs in the browser at runtime, so real
   network calls work in a live prototype (not in the build sandbox).
   ============================================================ */

const sources = {};

/** Register (or replace) the loader for a media source id. */
export function registerMediaSource(id, loader) { sources[id] = loader; }
/** Get a registered loader, or undefined. */
export function getMediaSource(id) { return sources[id]; }
/** True if a source id has a registered loader. */
export function hasMediaSource(id) { return typeof sources[id] === "function"; }

/* ---- Built-in GIPHY connection (public demo key; graceful on failure) ---- */
const GIPHY_KEY = "dc6zaTOxFJmzC"; // GIPHY public beta key
async function giphy(kind, query) {
  const base = kind === "sticker" ? "stickers" : "gifs";
  const url = query && query.trim()
    ? `https://api.giphy.com/v1/${base}/search?api_key=${GIPHY_KEY}&limit=24&rating=g&q=${encodeURIComponent(query.trim())}`
    : `https://api.giphy.com/v1/${base}/trending?api_key=${GIPHY_KEY}&limit=24&rating=g`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("giphy " + res.status);
  const json = await res.json();
  return (json.data || []).map((g) => ({
    value: g.id,
    label: g.title || kind,
    src: (g.images && (g.images.fixed_width_small || g.images.fixed_width || {}).url) || "",
  }));
}

/* Local placeholder tiles — no network dependency, so the demo always renders.
   Each item's `src` is an inline SVG data URI: a colored tile with a glyph. */
const TILE_HUES = [8, 32, 145, 190, 220, 265, 320, 350];
function tile(kind, i, seed) {
  const h = TILE_HUES[(i + seed) % TILE_HUES.length];
  const glyph = kind === "sticker" ? ["★", "♥", "☺", "✿", "☀", "☾", "✎", "✈", "☂", "✦"][i % 10] : "GIF";
  const bg = `hsl(${h} 65% 55%)`;
  const fg = "#fff";
  const font = kind === "sticker" ? 44 : 20;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>` +
    `<rect width='96' height='96' rx='10' fill='${bg}'/>` +
    `<text x='48' y='48' font-family='system-ui,sans-serif' font-size='${font}' font-weight='700' ` +
    `fill='${fg}' text-anchor='middle' dominant-baseline='central'>${glyph}</text></svg>`;
  return { value: kind + "-" + i, label: kind + " " + (i + 1), src: "data:image/svg+xml;utf8," + encodeURIComponent(svg) };
}
function placeholderTiles(kind, query) {
  const seed = query ? query.length : 0;
  const n = kind === "sticker" ? 18 : 8;
  return Array.from({ length: n }, (_, i) => tile(kind, i, seed));
}

registerMediaSource("gif", (query) => placeholderTiles("gif", query));
registerMediaSource("sticker", (query) => placeholderTiles("sticker", query));
