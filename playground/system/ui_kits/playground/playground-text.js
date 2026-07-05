/* ============================================================
   Playground chrome copy — every STATIC playground UI string that is
   not demo content and not a URL. Loaded as window.PG_TEXT and editable
   at runtime via Settings → Text (persisted to localStorage "pg-text").
   Edit the defaults here to change the shipped copy.
   ============================================================ */
window.PG_TEXT = {
  defaults: {
    brandTitle: "Design System",
    brandSubtitle: "shadcn/ui · playground",
    searchPlaceholder: "Search components…",
    navOverview: "Overview",
    navTypography: "Typography",
    navComponents: "Components",
    componentsLabel: "Components",
    emptyText: "No components found.",
    previewLabel: "Preview",
    demoUrl: "vercel.com",
  },
  // [key, label] pairs for the editor UI, in display order.
  fields: [
    ["brandTitle", "Brand title"],
    ["brandSubtitle", "Brand subtitle"],
    ["searchPlaceholder", "Search placeholder"],
    ["navOverview", "Nav — Overview"],
    ["navTypography", "Nav — Typography"],
    ["navComponents", "Nav — Components"],
    ["componentsLabel", "Components section label"],
    ["emptyText", "Empty-results text"],
    ["previewLabel", "Preview label"],
    ["demoUrl", "Demo URL (Browser & Phone)"],
  ],
  // Live value bridge for demos rendered outside the Playground component;
  // the app assigns `_live` on every render so get() reflects unsaved edits.
  _live: null,
  get(key) { const live = this._live || {}; return key in live ? live[key] : this.defaults[key]; },
};
