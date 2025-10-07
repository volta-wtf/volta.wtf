
const components = ({ addComponents }) => {

    const uiElements = [
        'image', 'picture', 'thumbnail', 'avatar',
        'control', 'input', 'option', 'button', 'handler',
        'card', 'block', 'dropdown', 'popover', 'modal', 'alert',
        'toolbar', 'tooltip', 'header', 'footer', 'sidebar', 'content'
    ];

    const uiClasses = uiElements.reduce((classes, name) => {
        classes[`.test-${name}`] = {
            'background-color': `var(--color-${name}, transparent)`,
            'border-radius': `var(--shape-${name}, none)`,
            'box-shadow': `var(--shadow-${name}, none)`,
        };
        return classes;
    }, {});

    addComponents(uiClasses);

};

module.exports = components;
