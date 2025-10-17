import type { Gradient, TextStyle, FrameStyle } from '@/types';

// Cache para evitar re-procesamiento innecesario
const injectedStyles = new Set<string>();
const styleHashes = new Map<string, string>();

// Función para generar hash del estilo (sin usar btoa para evitar errores con caracteres especiales)
function generateStyleHash(item: Gradient | TextStyle | FrameStyle): string {
  const styleString = JSON.stringify({
    id: item.id,
    ...(item as any) // Incluir todas las propiedades para el hash
  });

  // Simple hash function que funciona con cualquier carácter
  let hash = 0;
  for (let i = 0; i < styleString.length; i++) {
    const char = styleString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36).slice(0, 8);
}

/**
 * Inyecta CSS para Gradients
 */
export function injectGradientCSS(gradient: Gradient): string {
  const { id, gradient: gradientValue } = gradient;
  const className = `gradient-${id.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const styleElementId = `gradient-${id}`;

  // Verificar cache
  const newHash = generateStyleHash(gradient);
  const existingHash = styleHashes.get(`gradient-${id}`);

  if (existingHash === newHash && injectedStyles.has(`gradient-${id}`)) {
    return className;
  }

  // Remover estilo existente
  const existingStyle = document.getElementById(styleElementId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Generar CSS
  const cssText = `.${className} {
  background: ${gradientValue};
}`;

  // Inyectar CSS
  const styleElement = document.createElement('style');
  styleElement.id = styleElementId;
  styleElement.textContent = cssText;
  document.head.appendChild(styleElement);

  // Actualizar cache
  injectedStyles.add(`gradient-${id}`);
  styleHashes.set(`gradient-${id}`, newHash);

  return className;
}

/**
 * Inyecta CSS para TextStyles
 */
export function injectTextStyleCSS(textStyle: TextStyle): string {
  const { id, style, before, after } = textStyle;
  const className = `text-style-${id.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const styleElementId = `text-style-${id}`;

  // Verificar cache
  const newHash = generateStyleHash(textStyle);
  const existingHash = styleHashes.get(`text-style-${id}`);

  if (existingHash === newHash && injectedStyles.has(`text-style-${id}`)) {
    return className;
  }

  // Remover estilo existente
  const existingStyle = document.getElementById(styleElementId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Generar CSS base
  const cssProperties = Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${cssKey}: ${value};`;
    })
    .join('\n');

  let cssText = `.${className} {
${cssProperties}
}`;

  // Agregar pseudo-elementos si existen
  if (before) {
    const { content, ...beforeStyles } = before;
    const beforeProperties = Object.entries(beforeStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const beforeContentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
    cssText += `\n\n.${className}::before {
  content: ${beforeContentValue};
${beforeProperties}
}`;
  }

  if (after) {
    const { content, ...afterStyles } = after;
    const afterProperties = Object.entries(afterStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const afterContentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
    cssText += `\n\n.${className}::after {
  content: ${afterContentValue};
${afterProperties}
}`;
  }

  // Inyectar CSS
  const styleElement = document.createElement('style');
  styleElement.id = styleElementId;
  styleElement.textContent = cssText;
  document.head.appendChild(styleElement);

  // Actualizar cache
  injectedStyles.add(`text-style-${id}`);
  styleHashes.set(`text-style-${id}`, newHash);

  return className;
}

/**
 * Inyecta CSS para FrameStyles
 */
export function injectFrameStyleCSS(frameStyle: FrameStyle): string {
  const { id, style } = frameStyle;
  const className = `frame-style-${id.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const styleElementId = `frame-style-${id}`;

  // Verificar cache
  const newHash = generateStyleHash(frameStyle);
  const existingHash = styleHashes.get(`frame-style-${id}`);

  if (existingHash === newHash && injectedStyles.has(`frame-style-${id}`)) {
    return className;
  }

  // Remover estilo existente
  const existingStyle = document.getElementById(styleElementId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Generar CSS
  const cssProperties = Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${cssKey}: ${value};`;
    })
    .join('\n');

  const cssText = `.${className} {
${cssProperties}
}`;

  // Inyectar CSS
  const styleElement = document.createElement('style');
  styleElement.id = styleElementId;
  styleElement.textContent = cssText;
  document.head.appendChild(styleElement);

  // Actualizar cache
  injectedStyles.add(`frame-style-${id}`);
  styleHashes.set(`frame-style-${id}`, newHash);

  return className;
}

/**
 * Funciones batch para inyección inicial
 */
export function injectMultipleGradients(gradients: Gradient[]): void {
  gradients.forEach(gradient => injectGradientCSS(gradient));
}

export function injectMultipleTextStyles(textStyles: TextStyle[]): void {
  textStyles.forEach(textStyle => injectTextStyleCSS(textStyle));
}

export function injectMultipleFrameStyles(frameStyles: FrameStyle[]): void {
  frameStyles.forEach(frameStyle => injectFrameStyleCSS(frameStyle));
}

/**
 * Función para limpiar cache completo
 */
export function clearAllStyleCache(): void {
  injectedStyles.clear();
  styleHashes.clear();
}

/**
 * Función para verificar si un estilo ya está inyectado
 */
export function isStyleInjected(type: 'gradient' | 'text-style' | 'frame-style', id: string): boolean {
  return injectedStyles.has(`${type}-${id}`);
}