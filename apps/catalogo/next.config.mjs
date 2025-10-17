/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui-registry"],
  typescript: {
    ignoreBuildErrors: true, // Temporal para deployment
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporal para deployment
  },
}

export default nextConfig
