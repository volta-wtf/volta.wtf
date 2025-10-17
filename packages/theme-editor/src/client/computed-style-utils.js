/**
 * Computed Style Utils - Utilidades para obtener valores CSS computados
 * Separado de la detección de variables para mejor arquitectura
 *
 * Uso principal: Obtener valores finales para previews y themes
 */

/**
 * Obtiene el valor computado de una variable CSS
 * @param {string} varName - Nombre de la variable (ej: '--primary-color')
 * @param {Element} element - Elemento del que obtener el estilo (por defecto: documentElement)
 * @returns {string} - Valor computado final
 */
export function getComputedCSSVariable(varName, element = document.documentElement) {
  const computedStyle = getComputedStyle(element);
  return computedStyle.getPropertyValue(varName).trim();
}

/**
 * Obtiene múltiples variables CSS computadas de una vez
 * @param {string[]} varNames - Array de nombres de variables
 * @param {Element} element - Elemento del que obtener el estilo (por defecto: documentElement)
 * @returns {Object} - Objeto con { varName: valor }
 */
export function getComputedCSSVariables(varNames, element = document.documentElement) {
  const computedStyle = getComputedStyle(element);
  const results = {};

  varNames.forEach(varName => {
    results[varName] = computedStyle.getPropertyValue(varName).trim();
  });

  return results;
}

/**
 * Obtiene el valor computado para preview (con fallback)
 * @param {string} varName - Nombre de la variable
 * @param {string} originalValue - Valor original del CSS como fallback
 * @param {Element} element - Elemento del que obtener el estilo
 * @returns {string} - Valor computado o fallback
 */
export function getComputedValueForPreview(varName, originalValue, element = document.documentElement) {
  const computedValue = getComputedCSSVariable(varName, element);
  return computedValue || originalValue;
}

/**
 * Verifica si un valor computado es diferente al original
 * (útil para detectar si una variable ha sido sobrescrita)
 * @param {string} varName - Nombre de la variable
 * @param {string} originalValue - Valor original del CSS
 * @param {Element} element - Elemento del que obtener el estilo
 * @returns {boolean} - true si el valor computado es diferente
 */
export function isComputedValueModified(varName, originalValue, element = document.documentElement) {
  const computedValue = getComputedCSSVariable(varName, element);
  return computedValue !== originalValue;
}

/**
 * Obtiene información completa de una variable para preview
 * @param {string} varName - Nombre de la variable
 * @param {string} originalValue - Valor original del CSS
 * @param {Element} element - Elemento del que obtener el estilo
 * @returns {Object} - { original, computed, isModified }
 */
export function getVariablePreviewInfo(varName, originalValue, element = document.documentElement) {
  const computedValue = getComputedCSSVariable(varName, element);

  return {
    original: originalValue,
    computed: computedValue,
    final: computedValue || originalValue, // Valor para mostrar en preview
    isModified: computedValue !== originalValue
  };
}

/**
 * Actualiza el valor computado para un conjunto de variables
 * (útil para re-calcular previews después de cambios de tema)
 * @param {Object} variables - Objeto con { varName: originalValue }
 * @param {Element} element - Elemento del que obtener el estilo
 * @returns {Object} - Objeto con valores actualizados para preview
 */
export function updateComputedValuesForPreview(variables, element = document.documentElement) {
  const computedStyle = getComputedStyle(element);
  const updatedVariables = {};

  Object.entries(variables).forEach(([varName, originalValue]) => {
    const computedValue = computedStyle.getPropertyValue(varName).trim();
    updatedVariables[varName] = computedValue || originalValue;
  });

  return updatedVariables;
}

/**
 * Detecta cambios de tema y actualiza valores computados
 * @param {Object} variables - Variables originales
 * @param {function} onUpdate - Callback para actualizar variables
 * @param {Element} element - Elemento a observar
 * @returns {MutationObserver} - Observer para limpiar después
 */
export function createThemeObserver(variables, onUpdate, element = document.documentElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === element) {

        console.log('🎨 Cambio de tema detectado, actualizando valores computados...');

        // Pequeño delay para asegurar que los estilos se han aplicado
        setTimeout(() => {
          const updatedValues = updateComputedValuesForPreview(variables, element);
          onUpdate(updatedValues);
        }, 100);
      }
    });
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: ['class']
  });

  return observer;
}

/**
 * Obtiene todas las variables CSS disponibles usando getComputedStyle
 * (solo para casos específicos donde se necesite esta funcionalidad)
 * @param {Element} element - Elemento del que obtener el estilo
 * @returns {Object} - Todas las variables CSS con sus valores computados
 */
export function getAllComputedCSSVariables(element = document.documentElement) {
  const computedStyle = getComputedStyle(element);
  const variables = {};

  for (let i = 0; i < computedStyle.length; i++) {
    const prop = computedStyle[i];
    if (prop.startsWith('--')) {
      const value = computedStyle.getPropertyValue(prop).trim();
      variables[prop] = value;
    }
  }

  return variables;
}

/**
 * Utilidad para debug: compara valores originales vs computados
 * @param {Object} originalVariables - Variables originales del CSS
 * @param {Element} element - Elemento del que obtener el estilo
 */
export function debugComputedValues(originalVariables, element = document.documentElement) {
  console.group('🔍 Debug: Valores originales vs computados');

  Object.entries(originalVariables).forEach(([varName, originalValue]) => {
    const computedValue = getComputedCSSVariable(varName, element);
    const isDifferent = computedValue !== originalValue;

    console.log(`${isDifferent ? '🔄' : '✅'} ${varName}:`);
    console.log(`  Original: "${originalValue}"`);
    console.log(`  Computado: "${computedValue}"`);

    if (isDifferent) {
      console.log(`  📝 Variable modificada por cascada CSS`);
    }
  });

  console.groupEnd();
}

/**
 * Obtiene tanto valores originales como computados de variables al mismo tiempo
 * ESTRATEGIA DUAL: Mantener inputs y previews perfectamente sincronizados
 * @param {Object} originalVariables - Variables originales del CSS
 * @param {Element} element - Elemento del que obtener el estilo
 * @returns {Object} - { original: {}, computed: {} }
 */
export function getDualValuesForThemeChange(originalVariables, element = document.documentElement) {
  const computedStyle = getComputedStyle(element);
  const originalValues = {};
  const computedValues = {};

  Object.entries(originalVariables).forEach(([varName, originalValue]) => {
    // Valor original (para input)
    originalValues[varName] = originalValue;

    // Valor computado (para preview)
    const computedValue = computedStyle.getPropertyValue(varName).trim();
    computedValues[varName] = computedValue || originalValue;
  });

  return {
    original: originalValues,
    computed: computedValues
  };
}

/**
 * Observer optimizado para cambios de tema con valores duales
 * @param {Object} originalVariables - Variables originales
 * @param {function} onUpdate - Callback que recibe { original, computed }
 * @param {Element} element - Elemento a observar
 * @returns {MutationObserver} - Observer para limpiar después
 */
export function createDualThemeObserver(originalVariables, onUpdate, element = document.documentElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === element) {

        console.log('🎨 Cambio de tema detectado, actualizando valores duales...');

        // Pequeño delay para asegurar que los estilos se han aplicado
        setTimeout(() => {
          const dualValues = getDualValuesForThemeChange(originalVariables, element);
          onUpdate(dualValues);
        }, 50); // Delay reducido pero suficiente para sincronización
      }
    });
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: ['class']
  });

  return observer;
}