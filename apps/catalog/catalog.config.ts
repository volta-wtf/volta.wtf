import type { CatalogType, CatalogView } from "./lib/catalog.runtime";

export type CategoryConfig = {
  name: string;
  label: string;
  type: CatalogType;
  view: CatalogView;
  markdownGlob?: string;
  componentsGlobs?: string[];
  classesGlobs?: string[];
  variablesFiles?: string[];
  presetsGlobs?: string[];
  tags?: string[];
};

export const CATEGORIES_CONFIG: CategoryConfig[] = [
  // Docs (markdown)
  // { name: "docs-guides", label: "Guides",      type: "markdown", view: "doc", markdownGlob: "content/docs/guides/**/*.md" },
  // { name: "docs-theme",  label: "Theme",       type: "markdown", view: "doc", markdownGlob: "content/docs/theme/**/*.md" },
  // { name: "docs-ui",     label: "Components",  type: "markdown", view: "doc", markdownGlob: "content/docs/ui/**/*.md" },
  // { name: "docs-app",    label: "Scaffold",    type: "markdown", view: "doc", markdownGlob: "content/docs/app/**/*.md" },

  // Components
  // { name: "components-layout", label: "Components · Layout", type: "component", view: "component", componentsGlobs: ["components/previews/layout/*.tsx"] },
  // { name: "components-text",   label: "Components · Text",   type: "component", view: "component", componentsGlobs: ["components/previews/text/*.tsx"] },
  // { name: "components-forms",  label: "Components · Forms",  type: "component", view: "component", componentsGlobs: ["components/previews/forms/*.tsx"] },

  // Animations (if you want a dedicated canvas; otherwise merge with component)
  // { name: "animations-text",        label: "Typography",   type: "component", view: "animation", componentsGlobs: ["components/previews/animations/text/*.tsx"] },
  // { name: "animations-collections", label: "Collections",  type: "component", view: "animation", componentsGlobs: ["components/previews/animations/collections/*.tsx"] },
  // { name: "animations-ui-motion",   label: "Interface",    type: "component", view: "animation", componentsGlobs: ["components/previews/animations/ui-motion/*.tsx"] },

  // Materials (css-classes)
  // { name: "materials-content",  label: "Content",  type: "css-classes", view: "text",    classesGlobs: ["styles/materials/content/**/*.css"] },
  // { name: "materials-surfaces", label: "Surfaces", type: "css-classes", view: "frames",  classesGlobs: ["styles/materials/surfaces/**/*.css"] },
  // { name: "materials-forms",    label: "Forms",    type: "css-classes", view: "form",    classesGlobs: ["styles/materials/forms/**/*.css"] },

  // Styles (css-classes)
  { name: "styles-text",        label: "Text",        type: "css-classes", view: "text",       classesGlobs: ["styles/classes/text/**/*.css"] },
  { name: "styles-text-wip",    label: "Text (WIP)",  type: "css-classes", view: "text",       classesGlobs: ["styles/classes/text-wip/**/*.css"] },
  { name: "styles-links",       label: "Links",       type: "css-classes", view: "text",       classesGlobs: ["styles/classes/links/**/*.css"] },
  { name: "styles-highlights",  label: "Highlights",  type: "css-classes", view: "text",       classesGlobs: ["styles/classes/highlights/**/*.css"] },
  { name: "styles-frames",      label: "Frames",      type: "css-classes", view: "frames",     classesGlobs: ["styles/classes/frames/**/*.css"] },
  // { name: "styles-decorations", label: "Decorations", type: "css-classes", view: "decoration", classesGlobs: ["styles/classes/decorations/**/*.css"] },

  // Presets
  { name: "presets-shapes",    label: "Shapes",    type: "variables", view: "shape",    presetsGlobs: ["styles/presets/shapes.css"] },
  { name: "presets-borders",   label: "Borders",   type: "variables", view: "shape",    presetsGlobs: ["styles/presets/borders.css"] },
  { name: "presets-shadows",   label: "Shadows",   type: "variables", view: "shadow",   presetsGlobs: ["styles/presets/shadows.css"] },
  { name: "presets-gradients", label: "Gradients", type: "variables", view: "gradient", presetsGlobs: ["styles/presets/gradients.css"] },
  { name: "presets-images",    label: "Images",    type: "variables", view: "image",    presetsGlobs: ["styles/presets/images.css"] },

  // Variables (optional)
  { name: "variables-color", label: "Colors", type: "variables", view: "color", variablesFiles: ["styles/variables/colors.css"] },
  { name: "variables-font",  label: "Fonts",  type: "variables", view: "font",  variablesFiles: ["styles/variables/font.css"] },
];
