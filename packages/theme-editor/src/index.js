import './register.js';

// Exportar utilidades del detector de variables para uso programático
export {
  detectVariableType,
  analyzeVariable
} from './client/variable-type-detector.js';

export {
  generateVariablePreview
} from './app/variable-preview-generator.js';

// Exportar utilidades de búsqueda CSS
export {
  findGlobalsCss,
  hasGlobalsCss,
  findGlobalsCssSafe
} from './utils/css-finder.js';

// Exportar utilidades de valores computados
export {
  getComputedCSSVariable,
  getComputedCSSVariables,
  getComputedValueForPreview
} from './client/computed-style-utils.js';