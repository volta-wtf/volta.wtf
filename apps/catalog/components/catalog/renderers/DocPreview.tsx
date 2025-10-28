"use client";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";

export default function DocPreview({ item }: { cat: Category; item: CatalogItem }) {
  const [md, setMd] = useState<string>("");
  useEffect(() => {
    (async () => {
      if (!item.mdPath) return;
      const res = await fetch(`/${item.mdPath}`);
      setMd(await res.text());
    })();
  }, [item.mdPath]);
  return <div className="prose dark:prose-invert max-w-none"><ReactMarkdown>{md}</ReactMarkdown></div>;
}
