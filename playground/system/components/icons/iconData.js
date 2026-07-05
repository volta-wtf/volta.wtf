/* ============================================================
   ICON DATA — the UI / product icon dictionary.

   This layer no longer stores raw glyph paths. Instead each UI name
   REFERENCES a canonical Lucide name in the base library (pictosData.js).
   e.g. the UI icon `close` uses picto `x`; `delete` uses picto `trash-2`.

   `componentIcons` (c-* playground glyphs) are bespoke and stay inline.
   The merged `icons` registry the <Icon> component reads resolves every
   UI name (and every raw picto name) to its glyph.
   ============================================================ */

import { pictos } from "./pictosData.js";

/* ---------- UI ICONS — semantic name → picto (Lucide) name ---------- */
export const uiIcons = {
  /* Actions / editing */
  close: "x",
  add: "plus",
  remove: "minus",
  edit: "pencil",
  delete: "trash-2",
  refresh: "refresh-cw",
  sort: "arrow-up-down",
  expand: "maximize",
  collapse: "minimize",
  "more-horizontal": "ellipsis",
  "more-vertical": "ellipsis-vertical",
  loader: "loader-circle",
  /* Directional */
  back: "arrow-left",
  forward: "arrow-right",
  /* Status / alerts */
  "alert-circle": "circle-alert",
  "alert-triangle": "triangle-alert",
  "check-circle": "circle-check",
  "x-circle": "circle-x",
  "help-circle": "circle-help",
  /* Navigation */
  home: "house",
  radio: "circle",
  /* Media */
  stop: "square",
  volume: "volume-2",
  mute: "volume-x",
  microphone: "mic",
  gallery: "images",
  /* Analytics */
  "trend-up": "trending-up",
  "trend-down": "trending-down",
  "chart-bar": "chart-column",
  revenue: "dollar-sign",
  /* Communication */
  chat: "message-circle",
  message: "message-square",
  notification: "bell",
  /* People / business (product domain) */
  customer: "user",
  crm: "users",
  company: "building-2",
  payment: "credit-card",
  invoice: "file-text",
  project: "folder",
  task: "square-check-big",
  workspace: "layout-dashboard",
  patient: "heart",
  doctor: "stethoscope",
  /* Location */
  pin: "map-pin",
  /* Security */
  unlock: "lock-open",
  /* Layout */
  "sidebar-left": "panel-left",
  "sidebar-right": "panel-right",
  "panel-collapse": "panel-left-close",
  "panel-expand": "panel-left-open",
  columns: "columns-2",
  "line-vertical": "separator-vertical",
};

/* ---------- COMPONENT ICONS — one glyph per playground component.
   Bespoke (not in Lucide); keys prefixed "c-" to avoid clashing. ---------- */
export const componentIcons = {
  "c-button": '<rect x="3" y="8" width="18" height="8" rx="4"/>',
  "c-badge": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  "c-chip": '<rect x="2" y="8" width="20" height="8" rx="4"/><circle cx="7" cy="12" r="1.5"/><circle cx="17.5" cy="12" r="2.2"/><path d="m16.6 11.1 1.8 1.8M18.4 11.1l-1.8 1.8"/>',
  "c-input": '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 11v2"/>',
  "c-textarea": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10"/><path d="M7 13h6"/>',
  "c-select": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="m13 10 2 2 2-2"/>',
  "c-combobox": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 12h4"/><path d="m13 10 2 2 2-2"/>',
  "c-checkbox": '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>',
  "c-radio-group": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>',
  "c-switch": '<rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="16" cy="12" r="3" fill="currentColor" stroke="none"/>',
  "c-toggle": '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 15V9h3.5a1.75 1.75 0 0 1 0 3.5H9m0 0h4a1.75 1.75 0 0 1 0 3.5H9"/>',
  "c-button-group": '<rect x="2" y="8" width="9" height="8" rx="2"/><rect x="13" y="8" width="9" height="8" rx="2"/>',
  "c-fab": '<circle cx="12" cy="12" r="9"/><path d="M12 8v8"/><path d="M8 12h8"/>',
  "c-theme-switcher": '<rect x="2" y="8" width="20" height="8" rx="4"/><circle cx="7" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="17" cy="12" r="1.4"/>',
  "c-icon-button": '<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="8" cy="12" r="1.6"/><path d="M12 12h5"/>',
  "c-close-button": '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  "c-dismiss-button": '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  "c-floating-menu": '<circle cx="12" cy="17" r="4"/><path d="M12 15.5v3"/><path d="M10.5 17h3"/><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="10" r="1.4"/>',
  "c-overlay": '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1" opacity="0.4"/>',
  "c-input-group": '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M15 8v8"/>',
  "c-field": '<path d="M4 6h9"/><rect x="3" y="10" width="18" height="8" rx="2"/>',
  "c-native-select": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 12h3"/><path d="m14 10 2 2 2-2"/>',
  "c-input-otp": '<rect x="2.5" y="8" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="8" rx="1"/><rect x="17.5" y="8" width="4" height="8" rx="1"/>',
  "c-card": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
  "c-separator": '<path d="M3 12h18"/>',
  "c-aspect-ratio": '<rect x="2" y="6" width="20" height="12" rx="2"/>',
  "c-scroll-area": '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="16.5" y="7" width="2.5" height="6" rx="1.25" fill="currentColor" stroke="none"/>',
  "c-resizable": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>',
  "c-avatar": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M6.5 19.5a6 6 0 0 1 11 0"/>',
  "c-skeleton": '<rect x="3" y="6" width="10" height="3" rx="1.5"/><rect x="3" y="11.5" width="18" height="3" rx="1.5"/><rect x="3" y="17" width="14" height="3" rx="1.5"/>',
  "c-progress": '<rect x="2" y="10" width="20" height="4" rx="2"/><rect x="2" y="10" width="11" height="4" rx="2" fill="currentColor" stroke="none"/>',
  "c-slider": '<path d="M3 12h18"/><circle cx="10" cy="12" r="3"/>',
  "c-tabs": '<rect x="3" y="8" width="18" height="11" rx="2"/><path d="M8 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  "c-accordion": '<rect x="3" y="4" width="18" height="6" rx="1.5"/><path d="M4 14h16"/><path d="M4 18h16"/>',
  "c-collapsible": '<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M6 13h12"/><path d="M6 17h12"/>',
  "c-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  "c-tooltip": '<path d="M12 4c-5 0-9 3.4-9 7.5 0 2 1 3.9 2.6 5.2L5 21l4.2-1.3c.9.2 1.8.3 2.8.3 5 0 9-3.4 9-7.5S17 4 12 4Z"/>',
  "c-truncate": '<path d="M4 7h16"/><path d="M4 12h10"/><path d="M17 12h.01"/><path d="M20 12h.01"/><path d="M4 17h16"/>',
  "c-sonner": '<path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.4 6-2.7 7.3"/>',
  "c-dialog": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/>',
  "c-alert-dialog": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/><path d="M12 12.5v2.5"/><path d="M12 18h.01"/>',
  "c-sheet": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',
  "c-drawer": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15h18"/>',
  "c-popover": '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="m9 8 3-4 3 4"/>',
  "c-dropdown-menu": '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M6 12h12"/><path d="M6 16h8"/>',
  "c-hover-card": '<rect x="3" y="7" width="13" height="11" rx="2"/><path d="M8 7V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1"/>',
  "c-context-menu": '<path d="M5 4h8l6 6v10H5z"/><path d="M8 13h6"/><path d="M8 16h4"/>',
  "c-table": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M3 15h18"/><path d="M9 4v16"/><path d="M15 4v16"/>',
  "c-data-table": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 4v16"/><path d="M13 14h5"/>',
  "c-calendar": '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/>',
  "c-date-picker": '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  "c-carousel": '<rect x="7" y="6" width="10" height="12" rx="2"/><path d="M4 8v8"/><path d="M20 8v8"/>',
  "c-chart": '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6" rx="0.5"/><rect x="13" y="8" width="3" height="10" rx="0.5"/>',
  "c-breadcrumb": '<circle cx="5" cy="12" r="1.4"/><path d="m10 8 4 4-4 4"/><circle cx="19" cy="12" r="1.4"/>',
  "c-pagination": '<rect x="2.5" y="9" width="4.5" height="6" rx="1"/><rect x="9.75" y="9" width="4.5" height="6" rx="1"/><rect x="17" y="9" width="4.5" height="6" rx="1"/>',
  "c-menubar": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M7 6.5h2"/><path d="M12 6.5h2"/>',
  "c-navigation-menu": '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M7 13v4"/><path d="M12 13v4"/><path d="M17 13v4"/>',
  "c-sidebar": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
  "c-board": '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="9.5" y="4" width="5" height="10" rx="1"/><rect x="16" y="4" width="5" height="13" rx="1"/>',
  "c-aside": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',
  "c-draggable": '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
  "c-scroll-fade": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8"/><path d="M8 13h8"/>',
  "c-browser": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r="0.6"/><circle cx="8.8" cy="6.5" r="0.6"/>',
  "c-phone": '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 5.5h2"/><path d="M10.5 18.5h3"/>',
  "c-scroll-blur": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8" opacity="0.4"/><path d="M8 12h8"/><path d="M8 16h8" opacity="0.4"/>',
  "c-shimmer": '<path d="M4 12h6"/><path d="M14 12h6" opacity="0.4"/><path d="m12 4 1.2 2.8L16 8l-2.8 1.2L12 12l-1.2-2.8L8 8l2.8-1.2Z"/>',
  "c-media-picker": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6" cy="6.5" r="0.7"/><circle cx="8.5" cy="6.5" r="0.7"/><circle cx="8" cy="14" r="1.4"/><circle cx="16" cy="14" r="1.4"/><path d="M6.5 17.5h11"/>',
  "c-grid-picker": '<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  "c-panel-picker": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><rect x="5.5" y="6" width="4" height="1.6" rx="0.8" fill="currentColor" stroke="none"/>',
  "c-color-picker": '<circle cx="7" cy="7" r="2.3"/><circle cx="12.5" cy="7" r="2.3"/><circle cx="18" cy="7" r="2.3"/><circle cx="7" cy="12.5" r="2.3"/><circle cx="12.5" cy="12.5" r="2.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12.5" r="2.3"/>',
  "c-window": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="9" cy="6.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="11.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>',
  "c-reaction": '<path d="M20 15.5a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><circle cx="9.5" cy="10" r="0.8" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10" r="0.8" fill="currentColor" stroke="none"/><path d="M9.5 12.5s1 1.2 2.5 1.2 2.5-1.2 2.5-1.2"/>',
  "c-entity": '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="12" r="2.4"/><path d="M13 10h5"/><path d="M13 14h3"/>',
  "c-command": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m8 9 2.5 2.5L8 14"/><path d="M13 15h3"/>',
  "c-spinner": '<path d="M12 3a9 9 0 1 0 9 9"/>',
  "c-loading-dots": '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  "c-status-dot": '<circle cx="12" cy="12" r="5"/>',
  "c-text": '<path d="M4 7V5h16v2"/><path d="M9 20h6"/><path d="M12 5v15"/>',
  "c-choicebox": '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M13 12h5"/>',
  "c-description": '<path d="M4 7h6"/><path d="M4 11h10"/><path d="M4 16h4"/><path d="M12 16h8" opacity="0.4"/>',
  "c-error": '<circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  "c-gauge": '<path d="M12 21a9 9 0 1 1 9-9" opacity="0.35"/><path d="M12 12l5-3"/>',
  "c-project-banner": '<rect x="3" y="6" width="18" height="5" rx="1.5"/><path d="M5 15h14" opacity="0.4"/><path d="M5 18h9" opacity="0.4"/>',
  "c-snippet": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7 10 2 2-2 2"/><path d="M12 14h4"/>',
  "c-multiswitch": '<rect x="2" y="8" width="20" height="8" rx="4"/><rect x="3.5" y="9.5" width="8" height="5" rx="2.5" fill="currentColor" stroke="none"/>',
  "c-kbd": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01"/><path d="M11 10h.01"/><path d="M15 10h.01"/><path d="M7 14h10"/>',
  "c-empty": '<rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke-dasharray="3 3"/><path d="M9.5 12h5"/>',
  "c-item": '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M13 10.5h5"/><path d="M13 13.5h3"/>',
  "c-marker": '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>',
  "c-attachment": '<path d="m20.5 11.5-8.7 8.7a5 5 0 0 1-7.07-7.07l8.7-8.7a3 3 0 0 1 4.24 4.24l-8.5 8.5a1 1 0 0 1-1.4-1.42l7.77-7.77"/>',
  "c-message": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  "c-message-scroller": '<path d="M13 8a3 3 0 0 1-3 3H6l-4 3V5a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3z"/><path d="M17 9h1a3 3 0 0 1 3 3v9l-4-3h-4a3 3 0 0 1-3-3"/>',
};

/* UI names resolved to their picto glyphs. */
const resolvedUi = Object.fromEntries(
  Object.entries(uiIcons).map(([name, picto]) => [name, pictos[picto]])
);

/* Re-export the base library for convenience. */
export { pictos };

/* Merged registry the <Icon> component reads — every raw picto name,
   every semantic UI name, and the bespoke component glyphs. */
export const icons = { ...pictos, ...resolvedUi, ...componentIcons };
