"use client";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

import DocPreview from "./renderers/DocPreview";
import ComponentPreview from "./renderers/ComponentPreview";
import AnimationPreview from "./renderers/AnimationPreview";
import TextPreview from "./renderers/TextPreview";
import FramesPreview from "./renderers/FramesPreview";
import FormPreview from "./renderers/FormPreview";
import GradientPreview from "./renderers/GradientPreview";
import ShapePreview from "./renderers/ShapePreview";
import ShadowPreview from "./renderers/ShadowPreview";
import ImagePreview from "./renderers/ImagePreview";
import DecorationPreview from "./renderers/DecorationPreview";
import ColorPreview from "./renderers/ColorPreview";
import FontPreview from "./renderers/FontPreview";

export function resolveRenderer(cat: Category) {
  const key = `${cat.type}:${cat.view}` as const;
  switch (key) {
    case "markdown:doc": return DocPreview;
    case "component:component": return ComponentPreview;
    case "component:animation": return AnimationPreview;
    case "css-classes:text": return TextPreview;
    case "css-classes:frames": return FramesPreview;
    case "css-classes:form": return FormPreview;
    case "css-classes:decoration": return DecorationPreview;
    case "presets:gradient": return GradientPreview;
    case "presets:shape": return ShapePreview;
    case "presets:shadow": return ShadowPreview;
    case "presets:image": return ImagePreview;
    case "variables:color": return ColorPreview;
    case "variables:font": return FontPreview;
    // fallbacks
    default: return TextPreview;
  }
}

export default function PreviewHost({ cat, item }: { cat: Category; item: CatalogItem }) {
  const Renderer = resolveRenderer(cat);
  return <Renderer cat={cat} item={item} />;
}
