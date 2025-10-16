const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
        {
            // Coincide con clases como bg-color/disabled
            'bg': (value) => {
                // Ej: value = 'primary-500/disabled'
                const [colorName, modifier] = value.split('/');
                const color = theme('colors')[colorName.split('-')[0]]?.[colorName.split('-')[1]];

                if (!color || !modifier) return {};

                return {
                    backgroundColor: `color-mix(in oklab, ${color} var(--opacity-${modifier}), transparent)`
                };
            },
        },
        { values: {}, type: 'any' } // Le permite procesar valores arbitrarios
    );
});
