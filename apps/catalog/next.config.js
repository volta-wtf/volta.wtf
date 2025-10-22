/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['react', 'react-dom', 'next'],
    },
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
    transpilePackages: [
        '@registry/styles',
        '@registry/primitives',
        '@registry/components',
        '@registry/interface',
    ],
    output: 'standalone'
}

export default nextConfig;