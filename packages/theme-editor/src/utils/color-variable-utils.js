/** Prefijos de variables de color semánticas (shadcn / tokens de tema) */
export const SEMANTIC_COLOR_PREFIXES = [
  '--background',
  '--foreground',
  '--primary',
  '--secondary',
  '--muted',
  '--accent',
  '--destructive',
  '--border',
  '--ring',
  '--card',
  '--popover',
  '--sidebar',
  '--chart',
  '--surface',
  '--code',
  '--selection',
  '--input',
];

export function isTailwindColorVariable(varName) {
  return (
    varName.startsWith('--color-') ||
    varName.startsWith('--tone-') ||
    varName.startsWith('--tint-')
  );
}

export function isSemanticColorVariable(varName) {
  return SEMANTIC_COLOR_PREFIXES.some(
    (prefix) => varName === prefix || varName.startsWith(`${prefix}-`)
  );
}

export function isColorVariable(varName) {
  return isTailwindColorVariable(varName) || isSemanticColorVariable(varName);
}
