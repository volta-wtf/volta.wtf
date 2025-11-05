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
  // Text style metadata
  usesData?: boolean;     // uses data-text attribute
  cssVariants?: string[]; // available CSS variants (.class.variant)
  previewText?: string;   // text to show in preview
  description?: string;   // description of the style
  category?: string;      // category name
  background?: string;    // background color for preview
  bestFor?: string[];     // best use cases
  reference?: string[];   // reference links
};

export type Category = {
  name: string;
  label: string;
  type: CatalogType;
  view: CatalogView;
  items: CatalogItem[];
  tags?: string[];
};