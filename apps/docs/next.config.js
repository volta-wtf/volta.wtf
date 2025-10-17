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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" }
    ],
  },
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  transpilePackages: ['@registry/primitives', '@registry/components', '@registry/patterns', '@registry/config'],
  output: 'standalone'
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
