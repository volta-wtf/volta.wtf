/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['react', 'react-dom'],
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