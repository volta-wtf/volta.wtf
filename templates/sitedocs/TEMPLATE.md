# Documentation Template - Setup Instructions

This is a clean documentation template ready for your project. Follow these steps to get started.

## ✅ What's Included

### Structure
- ✅ Clean, modern documentation layout
- ✅ Example MDX content with best practices
- ✅ Responsive sidebar navigation
- ✅ Table of contents
- ✅ Search functionality
- ✅ Dark mode support
- ✅ Syntax highlighting
- ✅ Copy-to-clipboard for code blocks

### Example Content
The template includes sample documentation in these sections:
- **Home** - Introduction and overview
- **Getting Started** - Installation and configuration guides
- **Guides** - Writing content, components, and deployment

## 🚀 First Steps

### 1. Clean Up (Optional)

If you want to start completely fresh, you can remove the example content:

```bash
# Remove all example MDX files
rm -rf content/*

# Create your own structure
mkdir -p content/docs
```

### 2. Configure Your Site

Edit the following files to customize your documentation:

#### `app/layout.tsx`
```tsx
export const metadata = {
  title: 'Your Project Docs',
  description: 'Documentation for Your Project',
}
```

#### `package.json`
```json
{
  "name": "@your-org/docs",
  "description": "Your project documentation"
}
```

#### `app/page.tsx`
Customize the home page content.

### 3. Environment Setup

Create `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production, update this to your actual domain.

### 4. Install & Run

```bash
pnpm install
pnpm dev
```

## 📝 Creating Your Documentation

### Directory Structure

Organize your content in the `content/` directory:

```
content/
├── meta.json          # Root navigation
├── docs/
│   ├── meta.json     # Section navigation
│   ├── intro.mdx     # Your pages
│   └── ...
└── api/
    ├── meta.json
    └── ...
```

### Page Template

Create new pages with this frontmatter:

```mdx
---
title: Page Title
description: SEO description
---

# Page Title

Your content here...
```

### Navigation Configuration

Each section needs a `meta.json`:

```json
{
  "title": "Section Name",
  "pages": [
    "page-1",
    "page-2"
  ]
}
```

The root `content/meta.json` lists all sections:

```json
{
  "root": true,
  "pages": [
    "docs",
    "api",
    "guides"
  ]
}
```

## 🎨 Customization

### Colors & Theme

Edit `styles/theme.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... customize colors */
}
```

### Typography

Fonts are configured in `app/layout.tsx`. The template uses Geist Sans and Geist Mono by default.

### Components

Create custom MDX components:

1. Add component to `components/`
2. Export from `mdx-components.tsx`
3. Use in your MDX files

## 📦 Dependencies

### Core
- Next.js 15.5+
- React 19+
- Fumadocs (core, mdx, ui)

### Styling
- Tailwind CSS
- StylewindCSS (custom CSS framework)

### Utilities
- Shiki (syntax highlighting)
- Rehype Pretty Code
- Jotai (state management)

## 🏗️ Monorepo Setup

This template is designed to work in a monorepo. It references workspace packages:

```json
"dependencies": {
  "@registry/primitives": "workspace:*",
  "@registry/components": "workspace:*",
  "@registry/assets": "workspace:*",
  "@registry/interface": "workspace:*"
}
```

If you're not using a monorepo, you'll need to:
1. Remove these dependencies
2. Copy any needed components directly into your project
3. Update imports

## 🚢 Deployment Checklist

Before deploying:

- [ ] Update `NEXT_PUBLIC_APP_URL` in environment variables
- [ ] Customize site metadata in `app/layout.tsx`
- [ ] Remove or customize example content
- [ ] Test all navigation links
- [ ] Verify dark mode works correctly
- [ ] Check mobile responsiveness
- [ ] Test search functionality
- [ ] Review and update README.md

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your repository on [vercel.com](https://vercel.com).

## 📚 Available Scripts

```bash
pnpm dev          # Start development server (port 4020)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm check-types  # Check TypeScript types
```

## 🔍 Key Files Explained

- `source.config.ts` - Fumadocs configuration, MDX options, syntax highlighting
- `mdx-components.tsx` - Custom components available in MDX files
- `lib/source.ts` - Documentation content source configuration
- `lib/highlight-code.ts` - Code syntax highlighting setup
- `components/regions/` - Layout components (header, footer, sidebar, etc.)
- `components/interface/` - UI components (callouts, code blocks, etc.)

## 💡 Tips

1. **Start with the examples** - Review the sample content to understand best practices
2. **Use callouts** - Highlight important information with `<Callout>` components
3. **Code examples** - Include plenty of code examples with proper syntax highlighting
4. **Internal links** - Use `/docs/path` for internal navigation
5. **Meta.json order** - Pages appear in the order listed in meta.json

## 🆘 Troubleshooting

### Build errors after install
```bash
# Make sure fumadocs generated the source files
pnpm postinstall
```

### Styles not loading
```bash
# Rebuild CSS
rm -rf .next
pnpm dev
```

### Navigation not showing
- Check that `meta.json` files exist in each content directory
- Verify page slugs match file names (without .mdx extension)
- Ensure the root `meta.json` includes all sections

## 📖 Learn More

- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Ready to build amazing documentation!** 🚀

Start by reading `GETTING_STARTED.md` for a quick start guide.
