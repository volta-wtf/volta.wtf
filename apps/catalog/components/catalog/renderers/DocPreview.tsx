"use client";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import type { Category, CatalogItem } from "@/lib/catalog.runtime";
import { Skeleton } from "@/components/ui/skeleton";

export default function DocPreview({ item }: { cat: Category; item: CatalogItem }) {
  const [md, setMd] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!item.mdPath) return;
      setLoading(true);
      const res = await fetch(`/${item.mdPath}`);
      setMd(await res.text());
      setLoading(false);
    })();
  }, [item.mdPath]);

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}
