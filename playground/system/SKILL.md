---
name: shadcn-design
description: Use this skill to generate well-branded interfaces and assets built on shadcn/ui (new-york style, Tailwind v4 default theme), either for production or throwaway prototypes/mocks. Contains design tokens, typography, fonts, a Lucide-based icon system, and faithful shadcn/ui component recreations for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view: link `styles.css` (one import-only entry point that pulls in all tokens, fonts, and component styles), then either load the compiled `_ds_bundle.js` and mount `window.<Namespace>.<Component>` in a `<script type="text/babel">` block, or hand-write markup using the `ds-*` classes documented in `styles/`.

If working on production code, copy assets and read the rules here to become an expert in designing with shadcn/ui — token names, component APIs, states, and accessibility patterns all match the official shadcn/ui documentation, so `npx shadcn add <component>` and `lucide-react` drop straight in.

Key facts:
- Theme: oklch neutral base, `--radius: 0.625rem`, Geist + Geist Mono. Color is monochrome + one destructive red.
- Icons: Lucide, delivered via the `Icon` component in three semantic layers (Pictos / Icons / Context). Names match `lucide-react`.
- Components live in `components/<group>/` as `<Name>.jsx` with a sibling `<Name>.d.ts` and `<Name>.prompt.md` (read the prompt.md for usage + variants).
- Foundation specimen cards are in `guidelines/`; per-component showcase cards are the `*.card.html` files.

If the user invokes this skill without other guidance, ask them what they want to build or design, ask a few focused questions (product context, surfaces, variations, tweaks), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
