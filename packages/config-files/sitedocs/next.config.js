import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["../../registry/**/*"],
  },
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  transpilePackages: [
    '@registry/styles',
    '@registry/primitives',
    '@registry/components',
    '@registry/patterns'
  ],
  output: 'standalone'
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
