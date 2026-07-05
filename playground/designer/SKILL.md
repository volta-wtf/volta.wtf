---
name: designer-design
description: Use this skill to generate well-branded interfaces and assets for Designer (components for building design tools — infinite canvas, layers, typed fields, data collections), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key entry points:
- `readme.md` — architecture, token layers, CONTENT FUNDAMENTALS (voice), VISUAL FOUNDATIONS, ICONOGRAPHY, full component inventory.
- `styles.css` — the single CSS entry (tokens + all component classes, `dsr-` prefix). Dark theme via `.dark` / `[data-theme="dark"]`; optional 4-tier token demo via `[data-tiers]`.
- `components/` — 13 groups (icons, ui, fields, designer, tokens, data, library, utilities, devices, prototype, commands, actions, collab); each component ships `.jsx` + `.d.ts` + `.prompt.md`.
- `data/*.json` — ALL content/config as data: typed tokens (W3C), collections, gradients, shapes, SVG filters, keybindings, layout archetypes, devices, interactions, web blocks, icon roles.
- `ui_kits/editor/` — the assembled multi-archetype editor; `ui_kits/playground/` — live catalog.

Rules that keep output on-brand: chrome is warm-gray and dense (13px Geist, 28px controls); the ONLY chromatic accents are `--selection` (canvas UI), `--brand` (editorial), `--destructive` (danger); every number is Geist Mono tabular; icons only via the role registry (Lucide, `components/icons`); sentence case, terse imperatives, no emoji.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
