# Editor UI kit

The whole design-tool suite assembled from the system's components — one shell, six layout archetypes (see `data/layouts.json`):

- **Design** — canvas + layers + inspector (Design / Prototype / Data tabs), align/fill/opacity/rotate actions, live move/resize, collab cursors + comment pin, status bar.
- **Board** — whiteboard: coarse grid, floating bottom toolbar, stickies.
- **Slides** — filmstrip, 16:9 slide on a desk, slide inspector, Present.
- **Sites** — web builder: breakpoint switcher (menubar), blocks panel (`data/blocks.json`), scrolling page at viewport width, CMS binding pane.
- **Buzz** — batch assets: one card per record of the Products collection, brand-kit accent swap, collection table, Export all.
- **Make** — prompt → preview: chat thread, phone DeviceFrame preview, code tab.

Global: **⌘K** command palette (from `data/keybindings.json`), presence avatars, doc chip per mode.

Files: `index.html` (loader) · `data.js` (demo data + JSON loader w/ fallbacks) · `shell.jsx` (EditorShell) · `screen-design.jsx` · `screen-board-slides.jsx` · `screen-sites.jsx` · `screen-buzz-make.jsx` · `app.jsx` (mode router).

Serve the project root (`npx serve .`) so the screens can fetch `data/*.json`; offline they fall back to inline demo data.
