const baseConfig = require('@repo/config-next/base');
const withSharedAssets = require('@repo/config-next/shared-assets');

/** @type {import('next').NextConfig} */
const nextConfig = withSharedAssets({
  ...baseConfig,
  // Configuración específica para catalog
});

export default nextConfig;