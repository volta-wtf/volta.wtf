# Documentation Site Template

A beautiful, modern documentation site template built with **Next.js** and **Fumadocs**.

## Features

- 📝 Write content in MDX (Markdown + JSX)
- 🎨 Beautiful and responsive design
- 🔍 Full-text search functionality
- 🌙 Dark mode support
- 📱 Mobile-friendly interface
- ⚡ Fast and optimized performance
- 🎯 SEO optimized
- 📦 Easy content organization

## Quick Start

1. **Install dependencies:**

```bash
pnpm install
```

2. **Create environment file:**

Create a `.env.local` file in the root:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Start development server:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (app)/docs/        # Documentation pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── interface/         # UI components (callouts, code blocks, etc.)
│   ├── partials/          # Preview and documentation components
│   └── regions/           # Layout components (header, footer, sidebar, etc.)
├── content/               # MDX documentation files
│   ├── (root)/           # Root pages
│   ├── getting-started/  # Getting started guides
│   └── guides/           # User guides
├── lib/                   # Utilities and configuration
├── hooks/                 # Custom React hooks
├── styles/                # Global styles and themes
└── public/                # Static assets
```

## Writing Content

### Creating a New Page

1. Create an MDX file in the appropriate directory under `content/`:

```mdx
---
title: My New Page
description: Description for SEO
---

# My New Page

Your content here...
```

2. Add the page to the section's `meta.json`:

```json
{
  "title": "Section Name",
  "pages": [
    "existing-page",
    "my-new-page"
  ]
}
```

### Using Components

You can use special components in your MDX files:

```mdx
<Callout type="info">
  This is an informational callout.
</Callout>
```

## Configuration

### Site Configuration

Edit `source.config.ts` to configure Fumadocs settings.

### Metadata

Update site metadata in `app/layout.tsx`:

```tsx
export const metadata = {
  title: 'Your Docs',
  description: 'Your documentation description',
}
```

### Styling

- `styles/theme.css` - Theme colors and CSS variables
- `styles/globals.css` - Global styles
- `styles/components.css` - Component-specific styles

### Navigation

Navigation is controlled by `meta.json` files in each content directory:

```json
{
  "title": "Section Title",
  "pages": [
    "page-slug",
    {
      "title": "External Link",
      "url": "https://example.com"
    }
  ]
}
```

## Available Components

### Interface Components

- **Callout** - Highlight important information
- **CodeBlockCommand** - Display commands with package manager selector
- **CodeTabs** - Tabbed code examples
- **CopyButton** - Copy-to-clipboard functionality

### Layout Components

- **SiteHeader** - Sticky header with navigation
- **SiteFooter** - Footer with dynamic height
- **DocsSidebar** - Documentation sidebar navigation
- **DocsTableOfContents** - Table of contents
- **DocsBreadcrumb** - Breadcrumb navigation

## Building for Production

```bash
pnpm build
```

This generates an optimized production build in the `.next` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Google Cloud
- Docker containers

See the [Deployment Guide](/docs/guides/deployment) in the documentation for detailed instructions.

## Technology Stack

- **[Next.js](https://nextjs.org)** - React framework
- **[Fumadocs](https://fumadocs.vercel.app)** - Documentation framework
- **[MDX](https://mdxjs.com)** - Markdown with JSX
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **TypeScript** - Type safety

## Learn More

- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)

## License

This template is open source and available for use in your projects.
