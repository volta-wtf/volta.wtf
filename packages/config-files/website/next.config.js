/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;