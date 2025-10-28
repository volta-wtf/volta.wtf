export type CatalogType =
  | "markdown"
  | "component"
  | "css-classes"
  | "variables"
  | "presets";

export type CatalogView =
  | "doc"
  | "component"
  | "animation"
  | "text"
  | "frames"
  | "form"
  | "gradient"
  | "shape"
  | "shadow"
  | "image"
  | "decoration"
  | "color"
  | "font";

export type CatalogItem = {
  title: string;
  slug: string;
  tags?: string[];
  mdPath?: string;        // markdown
  componentName?: string; // components/animations
  cssClass?: string;      // css-classes
  variableName?: string;  // variables
  presetName?: string;    // presets
  sourceFile?: string;    // origin file (optional)
  variant?: string;       // subtype (e.g., "palette","elevation","underline")
  renderProps?: Record<string, unknown>;
};

export type Category = {
  name: string;
  label: string;
  type: CatalogType;
  view: CatalogView;
  items: CatalogItem[];
  tags?: string[];
};