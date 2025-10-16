const postcss = require("postcss");

module.exports = (opts = {}) => {
    return {
        postcssPlugin: 'stylewindcss-schemes',
        Once(root) {
        root.walkAtRules("scheme", (rule) => {
            let schemeName = rule.params.trim().replace(/[\s]+/g, "-").replace(/-+/g, "-");

            // Selector base sin @media
            let selector = `.${schemeName}, [data-theme='${schemeName}']`;

            // Crear la regla normal
            const newRule = postcss.rule({ selector });

            // Mover las declaraciones dentro de la nueva regla
            rule.nodes.forEach((node) => {
                newRule.append(node.clone());
            });

            // Insertar la regla directamente en el root
            rule.before(newRule);

            // Si el esquema comienza con "dark", aplicar dentro de @media pero en :root
            if (schemeName.startsWith("dark")) {
                const mediaRule = postcss.atRule({ name: "media", params: "(prefers-color-scheme: dark)" });
                const rootRule = postcss.rule({ selector: ":root" });

                rule.nodes.forEach((node) => {
                    rootRule.append(node.clone());
                });

                mediaRule.append(rootRule);
                rule.before(mediaRule);
            }

            // Eliminar la regla @scheme original
            rule.remove();
        });
        }
    };
};

module.exports.postcss = true;