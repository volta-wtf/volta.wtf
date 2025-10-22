import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Incluir solo archivos necesarios del registry
  outputFileTracingIncludes: {
    "/*": [
      "../../registry/components/**/*.tsx",
      "../../registry/patterns/**/*.tsx",
      "../../registry/primitives/**/*.{ts,tsx}",
      "../../registry/config/**/*.{ts,tsx}",
    ],
  },
  // Excluir node_modules innecesarios
  outputFileTracingExcludes: {
    "/*": [
      "node_modules/@swc/core-linux-x64-gnu",
      "node_modules/@swc/core-linux-x64-musl",
      "node_modules/@esbuild/darwin-arm64",
      "node_modules/@esbuild/linux-x64",
      "node_modules/webpack",
      "node_modules/terser",
      "../../**/node_modules",
      "../../apps/*/node_modules",
      "../../packages/*/node_modules",
      "../../registry/*/node_modules",
      "../../sites/*/node_modules",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" }
    ],
  },
  experimental: {
    optimizePackageImports: [
      'react',
      'react-dom',
      'lucide-react',
      '@tabler/icons-react',
      'fumadocs-ui',
      'fumadocs-core'
    ],
  },
  transpilePackages: [
    '@registry/styles',
    '@registry/primitives',
    '@registry/components',
    '@registry/patterns',
    '@registry/interface',
    '@registry/config'
  ],
  output: 'standalone',
  rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
