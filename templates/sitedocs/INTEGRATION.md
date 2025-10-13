# Documentation Template - Integration Guide

This template uses **Fumadocs** to create a beautiful, functional documentation site.

## 📦 Key Dependencies

The template includes:
- `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui` - Documentation framework
- `next-themes` - Theme management (dark mode)
- `rehype-pretty-code`, `shiki` - Syntax highlighting
- `tailwind-merge`, `clsx`, `zod` - Utilities

## 📁 Project Structure

### Configuration Files
- `source.config.ts` - Fumadocs configuration
- `next.config.js` - Next.js config with fumadocs-mdx
- `mdx-components.tsx` - Custom MDX components
- `tsconfig.json` - TypeScript paths

### Library (`lib/`)
- `source.ts` - Loads documentation from fumadocs
- `highlight-code.ts` - Syntax highlighting configuration
- `utils.ts` - Utilities (cn, absoluteUrl)
- `docs.ts` - Documentation utilities
- `flags.ts` - Feature flags
- `events.ts` - Analytics tracking

### Hooks (`hooks/`)
- `use-copy-to-clipboard.ts` - Copy functionality
- `use-config.ts` - Global configuration
- `use-media-query.tsx` - Responsive utilities

### Components

#### Layout Components (`components/regions/`)
- `site-header.tsx` - Sticky header with navigation
- `site-footer.tsx` - Footer with dynamic height
- `docs-sidebar.tsx` - Documentation sidebar
- `docs-toc.tsx` - Table of contents
- `docs-copy-page.tsx` - Copy page functionality
- `docs-breadcrumb.tsx` - Breadcrumb navigation

#### UI Components (`components/interface/`)
- `callout.tsx` - Information callouts
- `copy-button.tsx` - Copy to clipboard button
- `code-block-command.tsx` - Command blocks with package manager selector
- `code-collapsible-wrapper.tsx` - Collapsible code blocks
- `code-tabs.tsx` - Tabbed code examples
- `icons.tsx` - Programming language icons

### App Structure
- `app/layout.tsx` - Root layout
- `app/(app)/layout.tsx` - App layout
- `app/(app)/docs/layout.tsx` - Docs layout with sidebar
- `app/(app)/docs/[[...slug]]/page.tsx` - Dynamic documentation pages

## 🎯 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Create `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
pnpm dev
```

The `postinstall: fumadocs-mdx` script will automatically generate `.source/` with types.

## 📝 Writing Documentation

### MDX Components

#### Callouts
```mdx
<Callout type="info">
  Important information here
</Callout>

<Callout type="warning">
  Warning message here
</Callout>
```

#### Code Blocks with Tabs
Commands are automatically transformed to show all package managers:

```bash
npm install package-name
```

Becomes tabs with npm/yarn/pnpm/bun options.

### Organizing Content

Content is organized in `content/` with the following structure:

```
content/
├── meta.json              # Root navigation config
├── (root)/               # Root pages
│   ├── meta.json
│   └── index.mdx
├── getting-started/      # Getting started section
│   ├── meta.json
│   ├── index.mdx
│   └── ...
└── guides/               # Guides section
    ├── meta.json
    ├── index.mdx
    └── ...
```

Each section has a `meta.json` file that defines navigation:

```json
{
  "title": "Section Name",
  "pages": [
    "page-1",
    "page-2",
    {
      "title": "External Link",
      "url": "https://example.com"
    }
  ]
}
```

## 🔧 Technical Details

### CSS Variables

The layout uses CSS variables for consistent spacing:

```css
/* styles/theme.css */
:root {
  --spacing: 0.25rem;
  --header-height: calc(var(--spacing) * 14); /* 56px */
  --footer-height: calc(var(--spacing) * 14); /* 56px base, 96px on XL */
}
```

Components use these variables:
- `SiteHeader`: `h-(--header-height)` with `sticky top-0`
- `SiteFooter`: `h-(--footer-height)`

### Font Variables

```typescript
--font-sans: Geist
--font-mono: Geist Mono
```

## 🎨 Customization

### Theming

Modify colors and theme in:
- `styles/theme.css` - CSS variables and theme colors
- `styles/globals.css` - Global styles
- `source.config.ts` - Fumadocs theme configuration

### Navigation

Edit `meta.json` files in content directories to control navigation structure.

### Components

Add custom components in `components/` and register them in `mdx-components.tsx`:

```tsx
import { MyComponent } from './components/my-component'

export function useMDXComponents() {
  return {
    MyComponent,
    // ... other components
  }
}
```

## 📚 Content Files

MDX files should include frontmatter:

```mdx
---
title: Page Title
description: Page description for SEO
---

# Page Title

Your content here...
```

## 🚀 Building for Production

```bash
pnpm build
```

This creates an optimized production build in `.next/`.

## 📖 Learn More

- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
