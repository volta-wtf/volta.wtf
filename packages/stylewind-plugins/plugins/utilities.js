const variables = require('./variables');

const utilities = ({ addUtilities }) => {

    const backgroundClass = variables.background.reduce((classes, name) => {
        classes[`.bg-${name}`] = {
            'background-color': `var(--color-${name})`,
        };
        return classes;
    }, {});

    const textClass = variables.text.reduce((classes, name) => {
        classes[`.text-${name}`] = {
            'color': `var(--color-text-${name})`,
        };
        return classes;
    }, {});

    const iconClass = variables.icon.reduce((classes, name) => {
        classes[`.icon-${name}`] = {
            'color': `var(--color-icon-${name})`,
        };
        return classes;
    }, {});

    const borderClass = variables.border.reduce((classes, name) => {
        classes[name === 'DEFAULT' ? '.border' : `.border-${name}`] = {
            'border-color': `var(--color-${name === 'DEFAULT' ? 'border' : 'border-' + name})`,
        };
        return classes;
    }, {});

    const divideClass = variables.divider.reduce((classes, name) => {
        classes[name === 'DEFAULT' ? '.divide' : `.divide-${name}`] = {
            ':where(& > :not(:last-child))': {
                'border-color': `var(--color-${name === 'DEFAULT' ? 'divide' : name})`,
            }
        };
        return classes;
    }, {});

    const ringClass = variables.ring.reduce((classes, name) => {
        classes[name === 'DEFAULT' ? '.ring' : `.ring-${name}`] = {
            '--tw-ring-color': `var(--color-${name === 'DEFAULT' ? 'ring' : name})`,
        };
        return classes;
    }, {});

    const uiRingClass = variables.primitives.reduce((classes, name) => {
        classes[`.ring-${name}`] = {
            '--tw-ring-color': `var(--color-border-${name})`,
            '--tw-ring-width': `var(--border-width-${name})`,
            '--tw-ring-shadow': `var(--tw-ring-inset, ) 0 0 0 calc(var(--border-width-${name})+var(--tw-ring-offset-width)) var(--tw-ring-color,currentColor)`,
            'box-shadow': `var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
        };
        return classes;
    }, {});
    const uiBackgrounds = variables.primitives.reduce((classes, name) => {
        classes[`.bg-${name}`] = {
            'background-color': `var(--color-surface-${name})`,
        };
        return classes;
    }, {});

    const ringInsetClass = variables.ring.reduce((classes, name) => {
        classes[name === 'DEFAULT' ? '.ring-inset' : `.ring-inset-${name}`] = {
            '--tw-ring-color': `var(--color-${name === 'DEFAULT' ? 'ring' : name})`,
        };
        return classes;
    }, {});

    const layerClass = variables.layers.reduce((classes, name) => {
        classes[`.layer-${name}`] = {
            'z-index': `var(--layer-${name})`,
        };
        return classes;
    }, {});

    const shadowClass = variables.shadow.reduce((classes, name) => {
        classes[name === 'DEFAULT' ? '.shadow' : `.shadow-${name}`] = {
            '--tw-shadow-color': `var(--color-${name === 'DEFAULT' ? 'shadow' : 'shadow-' + name})`,
        };
        return classes;
    }, {});

    //addUtilities(backgroundClass);
    addUtilities(textClass);
    addUtilities(iconClass);
    //addUtilities(borderClass);
    //addUtilities(divideClass);
    //addUtilities(ringClass);
    addUtilities(uiRingClass);
    addUtilities(uiBackgrounds);
    //addUtilities(ringInsetClass);
    addUtilities(shadowClass);
    addUtilities(layerClass);

};

module.exports = utilities;
