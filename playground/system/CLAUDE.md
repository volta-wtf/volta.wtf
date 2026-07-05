# UI Design System — project rules

## Cards vs. Playground (component documentation vs. sandbox)

Keep these two surfaces in their distinct roles — do **not** invert them:

- **`@dsCard` component cards** (`components/**/*.card.html`) are the **canonical documentation** of each component. They intentionally show **all variants and states**. These are what travels when another project **inherits** this design system (the consuming project's component picker renders the cards, not the playground), so they must stay complete and self-describing.

- **The playground** (`ui_kits/playground/`) is a **consumption sandbox** — a per-project, locally-editable `ui_kit`. It shows one representative example per component in a navigable grid and is meant for exploring/composing. It does **not** travel with the inherited system.

When coverage needs to grow, **enrich the playground demos** (add more variants there) rather than stripping the cards. The base cards remain the reusable source of truth; per-project variation lives in that project's own playground.
