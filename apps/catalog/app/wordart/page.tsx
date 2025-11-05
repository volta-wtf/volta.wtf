"use client";

import { WordArtGenerator } from "@/components/catalog/renderers/WordArtGenerator";

export default function WordArtPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">WordArt Generator</h1>
        <p className="text-muted-foreground">
          Crea efectos de texto con sombras multicolores personalizables
        </p>
      </div>
      <WordArtGenerator />
    </div>
  );
}
