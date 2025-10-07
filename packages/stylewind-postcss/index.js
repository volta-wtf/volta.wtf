// packages/postcss/index.js
const tailwindPostcss = require('@tailwindcss/postcss');

module.exports = (opts = {}) => {
  // Configurar opciones de TailwindCSS con nuestro plugin pre-incluido
  const tailwindOptions = {
    ...opts,
    plugins: [
      //require('@stylewindcss/plugins'), // Nuestro plugin siempre incluido
      ...(opts.plugins || []) // Plugins adicionales del usuario
    ]
  };

  // Retornar directamente el plugin de TailwindCSS con nuestras opciones
  return tailwindPostcss(tailwindOptions);
};

module.exports.postcss = true;
