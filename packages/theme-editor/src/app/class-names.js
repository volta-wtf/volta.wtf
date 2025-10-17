/**
 * Utilidades para generación de nombres de clases CSS
 * Sistema de helpers para crear clases con prefijo te- y modificadores
 */

// Prefijo consistente para todas las clases del theme-editor
const CLASS_PREFIX = 'te-';

/**
 * Genera una clase CSS básica con prefijo
 * @param {string} className - Nombre de la clase sin prefijo
 * @returns {string} Clase con prefijo 'te-'
 */
export const cls = (className) => `${CLASS_PREFIX}${className}`;

/**
 * Genera una clase CSS con modificadores condicionales
 * @param {string} baseClass - Clase base sin prefijo
 * @param {Object} modifiers - Objeto con modificadores booleanos
 * @returns {string} String con clases concatenadas
 */
export const cn = (baseClass, modifiers = {}) => {
  let className = `${CLASS_PREFIX}${baseClass}`;

  // Agregar modificadores activos
  Object.entries(modifiers).forEach(([modifier, isActive]) => {
    if (isActive) {
      className += ` ${CLASS_PREFIX}${baseClass}--${modifier}`;
    }
  });

  return className;
};

// ===================================
// HELPERS ESPECÍFICOS
// ===================================

/**
 * Helper para clases de tabs con estado activo
 * @param {boolean} isActive - Si el tab está activo
 * @returns {string} Clase CSS para tab
 */
export const tabClass = (isActive = false) => {
  return cn('tab', { active: isActive });
};

/**
 * Helper para clases de variables con estado modificado
 * @param {boolean} isModified - Si la variable fue modificada
 * @returns {string} Clase CSS para variable
 */
export const variableClass = (isModified = false) => {
  return cn('variable', { modified: isModified });
};

/**
 * Helper para clases de botón de guardar con estados
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {boolean} saving - Si está en proceso de guardado
 * @returns {string} Clase CSS para botón de guardar
 */
export const saveButtonClass = (disabled = false, saving = false) => {
  if (disabled || saving) {
    return cn('saveButton', { saving });
  }
  return cls('saveButton');
};

/**
 * Helper para clases de header de sección
 * @param {boolean} isCollapsed - Si la sección está colapsada (para futuro uso)
 * @returns {string} Clase CSS para header de sección
 */
export const sectionHeaderClass = (isCollapsed = false) => {
  return cls('sectionHeader');
};

/**
 * Helper para clases de icono de colapso
 * @param {boolean} isCollapsed - Si está colapsado
 * @returns {string} Clase CSS para icono de colapso
 */
export const collapseIconClass = (isCollapsed = false) => {
  return cn('collapseIcon', { collapsed: isCollapsed });
};

// ===================================
// UTILIDADES ADICIONALES
// ===================================

/**
 * Combina múltiples clases CSS
 * @param {...string} classes - Lista de clases a combinar
 * @returns {string} Clases combinadas separadas por espacio
 */
export const clsx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Genera clases condicionales de forma más expresiva
 * @param {Object} conditions - Objeto con clases como keys y condiciones como valores
 * @returns {string} Clases que cumplen las condiciones
 */
export const conditional = (conditions) => {
  return Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};

// ===================================
// CONSTANTES ÚTILES
// ===================================

export const THEME_EDITOR_CLASSES = {
  PANEL: cls('panel'),
  HEADER: cls('header'),
  TAB_BAR: cls('tabBar'),
  TAB: cls('tab'),
  TAB_ACTIVE: tabClass(true),
  CONTENT: cls('content'),
  VARIABLE: cls('variable'),
  VARIABLE_MODIFIED: variableClass(true),
  SAVE_BUTTON: cls('saveButton'),
  SAVE_BUTTON_SAVING: saveButtonClass(false, true),
  CLOSE_BUTTON: cls('closeButton'),
  INPUT: cls('input'),
  LABEL: cls('label'),
};

/**
 * Obtiene el prefijo usado para las clases
 * @returns {string} Prefijo de clases
 */
export const getClassPrefix = () => CLASS_PREFIX;