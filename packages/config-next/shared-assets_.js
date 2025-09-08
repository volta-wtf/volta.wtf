/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurar para servir assets compartidos
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '../../shared/:path*'
      }
    ]
  }
}

export default nextConfig;