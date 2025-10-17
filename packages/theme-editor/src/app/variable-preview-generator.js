/**
 * Variable Preview Generator - Genera previews visuales para variables CSS
 * Separado de la detección de tipos para mejor organización
 */

/**
 * Genera un preview visual para una variable según su tipo
 * @param {string} type - Tipo de variable ('color', 'spacing', etc.)
 * @param {string} value - Valor de la variable
 * @param {string} varName - Nombre de la variable (opcional, para contexto adicional)
 * @returns {Object} - Objeto con propiedades para el preview { element, style, content }
 */
export function generateVariablePreview(type, value, varName = '') {
  const cleanValue = value.trim();

  switch (type) {
    case 'color':
      return generateColorPreview(cleanValue, varName);

    case 'spacing':
      return generateSpacingPreview(cleanValue, varName);

    case 'typography':
      return generateTypographyPreview(cleanValue, varName);

    case 'border':
      return generateBorderPreview(cleanValue, varName);

    case 'shadow':
      return generateShadowPreview(cleanValue, varName);

    default:
      return generateDefaultPreview(cleanValue, varName);
  }
}

/**
 * Genera preview para variables de color
 * @param {string} value - Valor del color
 * @param {string} varName - Nombre de la variable
 * @returns {Object} - Preview object
 */
function generateColorPreview(value, varName) {
  // Detectar si es una referencia a variable CSS
  const isVariableReference = /^var\(/.test(value.trim());

  // Forma: cuadrado para valores directos, redondo para referencias
  const borderRadius = isVariableReference ? '50%' : '4px';

    // Procesamiento especial para variables que comienzan con "tint-"
  let backgroundColor = value;
  if (varName) {
    // Limpiar el nombre de la variable (remover -- si existe)
    const cleanVarName = varName.replace(/^--/, '');

    if (cleanVarName.startsWith('tint-')) {
      // Verificar si el valor parece un valor HSL directo (números y porcentajes)
      const hslValuePattern = /^\d+(\.\d+)?\s+\d+%\s+\d+%/;
      if (hslValuePattern.test(value.trim())) {
        // Si el valor parece HSL directo, usar hsl(valor)
        backgroundColor = `hsl(${value.trim()})`;
      } else if (value.includes('var(')) {
        // Si ya es una referencia var(), usar tal como está
        backgroundColor = value;
      } else {
        // Para otros casos, usar hsl(var(--tint-VALOR))
        const tintValue = cleanVarName.substring(5); // Remover "tint-" del inicio
        backgroundColor = `hsl(var(--tint-${tintValue}))`;
      }
    }
  }

  return {
    element: 'div',
    style: {
      width: '20px',
      height: '20px',
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      flexShrink: 0
    },
    content: null,
    tooltip: backgroundColor !== value
      ? `Color procesado: ${backgroundColor} (original: ${value})`
      : isVariableReference
        ? `Referencia de color: ${backgroundColor}`
        : `Color: ${backgroundColor}`
  };
}

/**
 * Genera preview para variables de espaciado
 * @param {string} value - Valor del espaciado
 * @param {string} varName - Nombre de la variable
 * @returns {Object} - Preview object
 */
function generateSpacingPreview(value, varName) {
  // Extraer valor numérico para el preview
  const numericValue = parseFloat(value);
  const unit = value.replace(/[\d.-]/g, '').trim() || 'px';

  // Escalar el preview para que sea visible (máximo 40px)
  let previewSize = Math.min(numericValue, 40);
  if (unit === 'rem') previewSize *= 16; // Convertir rem a px aproximado
  if (unit === 'em') previewSize *= 16;  // Convertir em a px aproximado

  return {
    element: 'div',
    style: {
      width: '24px',
      height: '24px',
      position: 'relative',
      flexShrink: 0
    },
    content: {
      type: 'spacing-bar',
      width: `${Math.max(previewSize, 4)}px`,
      height: '4px',
      backgroundColor: '#3b82f6',
      borderRadius: '2px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    tooltip: `Espaciado: ${value}`
  };
}

/**
 * Genera preview para variables de tipografía
 * @param {string} value - Valor de tipografía
 * @param {string} varName - Nombre de la variable
 * @returns {Object} - Preview object
 */
function generateTypographyPreview(value, varName) {
  const isFontSize = /^\d+(\.\d+)?(px|em|rem|pt)$/i.test(value);
  const isFontWeight = /^(normal|bold|bolder|lighter|\d{3})$/i.test(value);
  const isFontFamily = /font-family|font$/i.test(varName);

  let previewText = 'Aa';
  let previewStyle = {
    fontSize: '14px',
    lineHeight: '1',
    color: '#374151',
    fontWeight: 'normal',
    fontFamily: 'inherit'
  };

  if (isFontSize) {
    const numericValue = parseFloat(value);
    const unit = value.replace(/[\d.-]/g, '').trim();

    // Escalar el tamaño para el preview
    let previewSize = numericValue;
    if (unit === 'rem') previewSize *= 16;
    if (unit === 'em') previewSize *= 16;
    previewSize = Math.min(Math.max(previewSize, 10), 20); // Entre 10px y 20px

    previewStyle.fontSize = `${previewSize}px`;
  } else if (isFontWeight) {
    previewStyle.fontWeight = value;
  } else if (isFontFamily) {
    previewStyle.fontFamily = value.replace(/['"]/g, ''); // Remover comillas
  }

  return {
    element: 'div',
    style: {
      width: '24px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    content: {
      type: 'typography-text',
      text: previewText,
      style: previewStyle
    },
    tooltip: `Tipografía: ${value}`
  };
}

/**
 * Genera preview para variables de borde
 * @param {string} value - Valor del borde
 * @param {string} varName - Nombre de la variable
 * @returns {Object} - Preview object
 */
function generateBorderPreview(value, varName) {
  const isRadius = /radius|rounded/i.test(varName);

  if (isRadius) {
    // Preview para border-radius
    const numericValue = parseFloat(value) || 4;
    const radiusSize = Math.min(numericValue, 12);

    return {
      element: 'div',
      style: {
        width: '20px',
        height: '20px',
        backgroundColor: '#e5e7eb',
        border: '2px solid #9ca3af',
        borderRadius: `${radiusSize}px`,
        flexShrink: 0
      },
      content: null,
      tooltip: `Border radius: ${value}`
    };
  } else {
    // Preview para border-width o border-style
    return {
      element: 'div',
      style: {
        width: '20px',
        height: '20px',
        backgroundColor: '#f3f4f6',
        border: `${value} #9ca3af`,
        flexShrink: 0
      },
      content: null,
      tooltip: `Border: ${value}`
    };
  }
}

/**
 * Genera preview para variables de sombra
 * @param {string} value - Valor de sombra
 * @param {string} varName - Nombre de la variable
 * @returns {Object} - Preview object
 */
function generateShadowPreview(value, varName) {
  return {
    element: 'div',
    style: {
      width: '20px',
      height: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      boxShadow: value === 'none' ? 'none' : value,
      border: '1px solid rgba(0, 0, 0, 0.05)',
      flexShrink: 0
    },
    content: null,
    tooltip: `Sombra: ${value}`
  };
}

/**
 * Genera preview por defecto para tipos no reconocidos
 * @param {string} value - Valor de la variable
 * @param {string} varName - Nombre de la variable
 * @returns {Object} - Preview object
 */
function generateDefaultPreview(value, varName) {
  // Preview genérico - muestra el valor como texto
  const displayValue = value.length > 12 ? value.substring(0, 12) + '...' : value;

  return {
    element: 'div',
    style: {
      width: 'auto',
      minWidth: '24px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      color: '#6b7280',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      padding: '0 6px',
      flexShrink: 0,
      fontFamily: 'monospace'
    },
    content: {
      type: 'text',
      text: displayValue
    },
    tooltip: `Valor: ${value}`
  };
}

/**
 * Obtiene información del tipo de preview que se puede generar
 * @param {string} type - Tipo de variable
 * @returns {Object} - Información sobre el tipo de preview
 */
export function getPreviewInfo(type) {
  const previewTypes = {
    color: {
      description: 'Muestra una muestra del color',
      features: ['Cuadrado para valores directos', 'Círculo para referencias var()']
    },
    spacing: {
      description: 'Muestra una barra proporcional al espaciado',
      features: ['Escala automática', 'Conversión de unidades']
    },
    typography: {
      description: 'Muestra texto "Aa" con el estilo aplicado',
      features: ['Tamaño de fuente', 'Peso de fuente', 'Familia de fuente']
    },
    border: {
      description: 'Muestra un elemento con el borde aplicado',
      features: ['Border radius', 'Border width', 'Border style']
    },
    shadow: {
      description: 'Muestra un elemento con la sombra aplicada',
      features: ['Box shadow', 'Text shadow']
    },
    default: {
      description: 'Muestra el valor como texto',
      features: ['Texto truncado', 'Fuente monospace']
    }
  };

  return previewTypes[type] || previewTypes.default;
}