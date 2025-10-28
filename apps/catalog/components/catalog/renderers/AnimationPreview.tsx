"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function AnimationPreview({ cat, item }: { cat: Category; item: CatalogItem }) {
  // could add controls (speed, loop) in this wrapper later
  const sub = cat.name.split("-")[1] ?? "animations";
  const Dyn = useMemo(
    () => dynamic(() => import(`@/components/previews/${sub}/${item.componentName}`)),
    [sub, item.componentName]
  );
  // @ts-ignore
  return <Dyn />;
}
