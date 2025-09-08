/** @type {import('next').NextConfig} */
const baseConfig = {
  // Configuración base para todos los proyectos Next.js
  experimental: {
    // Optimizaciones comunes
    optimizePackageImports: ['@repo/ui'],
  },

  // Configuración de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Transpilación de paquetes del workspace
  transpilePackages: ['@repo/ui'],
};

module.exports = baseConfig;
