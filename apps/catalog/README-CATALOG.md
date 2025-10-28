# Catalog Scaffold (Next + Tailwind + shadcn)

Add the script to youur `package.json`:

```json
{
  "scripts": {
    "gen:catalog": "tsx apps/web/scripts/generate-catalog.ts",
    "dev": "pnpm gen:catalog && turbo dev",
    "build": "pnpm gen:catalog && turbo build"
  },
  "devDependencies": {
    "globby": "^14.0.0",
    "postcss": "^8.4.0",
    "postcss-selector-parser": "^6.0.0",
    "gray-matter": "^4.0.3",
    "tsx": "^4.0.0",
    "react-markdown": "^9.0.0"
  }
}
```

Then run:
```bash
pnpm i
pnpm gen:catalog
pnpm -w dev
```

You can edit `catalog.config.ts` to add/remove categories and their sources.
