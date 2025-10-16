// tailwind-plugin-remove-alpha-fallback.js
const plugin = require('tailwindcss/plugin');

// Este plugin reemplaza --alpha(...) por color-mix(...) sin fallback ni @supports
const noFallbackAlphaPlugin = plugin(function () {
    // Este plugin no necesita manipular utilidades, actúa vía PostCSS (ver abajo)
}, {
    // Nombre del plugin para debugging
    name: 'tailwind-no-fallback-alpha',
});

// PostCSS plugin para reemplazar --alpha(...) por color-mix(...) directo
noFallbackAlphaPlugin.postcss = true;
noFallbackAlphaPlugin.__postcssPlugin = function () {
    return {
        postcssPlugin: 'postcss-no-fallback-alpha',
        Declaration(decl) {
            if (decl.value.includes('--alpha(')) {
                const match = decl.value.match(/--alpha\(([^,]+),\s*([^)]+)\)/);
                if (match) {
                    const color = match[1].trim();
                    const alpha = match[2].trim();
                    decl.value = `color-mix(in oklab, ${color} ${alpha}, transparent)`;
                }
            }
            console.log(decl.value);
            console.log(decl.parent.selector);
            console.log("----------------REMOVED----------------");
        },
    };
};

module.exports = noFallbackAlphaPlugin;
