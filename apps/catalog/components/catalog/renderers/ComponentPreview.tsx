"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function ComponentPreview({ cat, item }: { cat: Category; item: CatalogItem }) {
  // assumes path: components/previews/<subfolder>/<ComponentName>.tsx
  const sub = cat.name.split("-")[1] ?? "misc";
  const Dyn = useMemo(
    () => dynamic(() => import(`@/components/previews/${sub}/${item.componentName}`)),
    [sub, item.componentName]
  );
  // @ts-ignore
  return <Dyn />;
}
