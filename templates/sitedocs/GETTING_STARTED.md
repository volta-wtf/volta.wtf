# Getting Started with Documentation Template

Welcome! This guide will help you set up and customize your documentation site.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
pnpm dev
```

Your documentation site will be available at `http://localhost:3000`

## 📝 Customizing Your Site

### Update Site Metadata

Edit `app/layout.tsx` to customize your site's title and description:

```tsx
export const metadata = {
  title: 'Your Documentation Site',
  description: 'Your description here',
}
```

### Customize Home Page

Edit `app/page.tsx` to customize the home page content.

### Add Your Content

1. Navigate to the `content/` directory
2. Edit or create MDX files with your documentation
3. Update `meta.json` files to configure navigation

Example MDX file structure:

```mdx
---
title: Your Page Title
description: Page description for SEO
---

# Your Page Title

Your content goes here...

## Features

- Feature 1
- Feature 2
- Feature 3
```

## 📂 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (app)/docs/        # Documentation routes
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── components/
│   ├── interface/         # UI components (callouts, code blocks)
│   ├── partials/          # Documentation-specific components
│   └── regions/           # Layout components (header, footer, sidebar)
├── content/               # Your MDX documentation files ⭐
│   ├── (root)/           # Root pages
│   ├── getting-started/  # Getting started guides
│   └── guides/           # User guides
├── lib/                   # Utilities and helpers
├── styles/                # Global styles and themes
└── public/                # Static assets
```

## 🎨 Styling

### Theme Colors

Edit `styles/theme.css` to customize your color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more theme variables */
}
```

### Dark Mode

Dark mode is automatically supported. The theme switcher is available in the header.

## 📚 Writing Documentation

### Adding a New Section

1. Create a new folder in `content/`
2. Add your MDX files
3. Create a `meta.json` file:

```json
{
  "title": "Section Title",
  "pages": [
    "page-1",
    "page-2"
  ]
}
```

4. Update the root `content/meta.json` to include your section

### Using Components

#### Callouts

```mdx
<Callout type="info">
  This is an info callout
</Callout>

<Callout type="warning">
  This is a warning
</Callout>
```

#### Code Blocks

Use fenced code blocks with language identifiers:

````mdx
```typescript
function hello(name: string) {
  return `Hello, ${name}!`
}
```
````

Commands automatically get package manager tabs:

````mdx
```bash
npm install package-name
```
````

This will show tabs for npm, yarn, pnpm, and bun.

## 🔧 Configuration

### Fumadocs Config

Edit `source.config.ts` to configure:
- Rehype plugins
- Code highlighting
- Search settings

### Navigation

Navigation is controlled by `meta.json` files in each content directory.

Example with external links:

```json
{
  "title": "Resources",
  "pages": [
    "local-page",
    {
      "title": "External Link",
      "url": "https://example.com"
    }
  ]
}
```

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Other Platforms

This template works on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Google Cloud
- Railway
- Render

## 📖 Next Steps

- Read the full [Documentation](/docs)
- Explore the [Components Guide](/docs/guides/components)
- Learn about [Deployment Options](/docs/guides/deployment)

## 💡 Tips

1. **Start Simple** - Begin with a few pages and expand
2. **Use Callouts** - Highlight important information
3. **Add Examples** - Include code examples for better understanding
4. **Keep It Updated** - Regularly update your documentation
5. **Test Links** - Verify all internal and external links work

## 🆘 Need Help?

- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)

Happy documenting! 🎉
