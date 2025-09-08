const path = require('path');

/**
 * Configuración para usar assets compartidos desde /shared en la raíz del monorepo
 * @param {import('next').NextConfig} nextConfig
 * @returns {import('next').NextConfig}
 */
function withSharedAssets(nextConfig = {}) {
  return {
    ...nextConfig,

    async rewrites() {
      const existingRewrites = await nextConfig.rewrites?.() || [];

      return [
        ...existingRewrites,
        // Mapear /logos/* → shared/logos/*
        {
          source: '/logos/:path*',
          destination: `${path.resolve(process.cwd(), '../../shared/logos')}/:path*`
        },
        // Mapear /icons/* → shared/icons/*
        {
          source: '/icons/:path*',
          destination: `${path.resolve(process.cwd(), '../../shared/icons')}/:path*`
        }
      ];
    },

    // Configurar webpack para servir archivos estáticos
    webpack: (config, options) => {
      // Ejecutar configuración webpack existente si existe
      if (nextConfig.webpack) {
        config = nextConfig.webpack(config, options);
      }

      return config;
    }
  };
}

module.exports = withSharedAssets;