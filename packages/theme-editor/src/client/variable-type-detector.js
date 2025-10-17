/**
 * Variable Type Detector - Identifica el tipo de valor de una variable CSS
 * Enfocado únicamente en la detección, sin generación de previews
 */

import { VARIABLE_PATTERNS } from '../utils/variable-patterns.js';
import { generateVariablePreview } from '../app/variable-preview-generator.js';

/**
 * Detecta el tipo de variable CSS basándose en su nombre y valor
 * @param {string} varName - Nombre de la variable (ej: '--primary-color')
 * @param {string} value - Valor de la variable (ej: '#3b82f6')
 * @returns {string} - Tipo detectado ('color', 'spacing', 'typography', 'border', 'shadow', 'unknown')
 */
export function detectVariableType(varName, value) {
  const cleanName = varName.replace(/^--/, '').toLowerCase();
  const cleanValue = value.trim().toLowerCase();

  // Verificar cada tipo de variable
  for (const [type, patterns] of Object.entries(VARIABLE_PATTERNS)) {
    // Verificar patrones de nombre
    const nameMatch = patterns.namePatterns.some(pattern =>
      pattern.test(cleanName)
    );

    // Verificar patrones de valor
    const valueMatch = patterns.valuePatterns.some(pattern =>
      pattern.test(cleanValue)
    );

    // Si coincide el nombre O el valor, consideramos que es de este tipo
    // Damos prioridad al nombre sobre el valor
    if (nameMatch || valueMatch) {
      return type;
    }
  }

  return 'unknown';
}

/**
 * Función de utilidad para obtener información completa de una variable
 * @param {string} varName - Nombre de la variable
 * @param {string} value - Valor de la variable
 * @returns {Object} - Objeto con type, preview y metadata
 */
export function analyzeVariable(varName, value) {
  const type = detectVariableType(varName, value);
  const preview = generateVariablePreview(type, value, varName);

  return {
    name: varName,
    value: value,
    type: type,
    preview: preview,
    metadata: {
      detectedFrom: type !== 'unknown' ? 'patterns' : 'fallback',
      confidence: type !== 'unknown' ? 'high' : 'low'
    }
  };
}