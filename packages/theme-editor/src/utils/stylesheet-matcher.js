/**
 * Stylesheet Matcher - Conecta css-finder (servidor) con detección DOM (navegador)
 * Identifica los stylesheets editables en document.styleSheets
 */

/**
 * Identifica el stylesheet de globals.css en document.styleSheets
 * @param {string} globalsCssPath - Ruta del globals.css (opcional, del css-finder)
 * @returns {Object|null} - { styleSheet, sourceInfo } o null si no se encuentra
 */
export function findGlobalsCssStylesheet(globalsCssPath = null) {
  console.log('🔍 Buscando stylesheet de globals.css en document.styleSheets...');

  for (let i = 0; i < document.styleSheets.length; i++) {
    const styleSheet = document.styleSheets[i];

    if (!styleSheet.href) continue; // Saltar inline styles

    const url = new URL(styleSheet.href);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();

    console.log(`📄 Evaluando stylesheet: ${pathname}`);

    // Verificar si es globals.css
    const isGlobalsCss =
      filename === 'globals.css' ||
      pathname.endsWith('/app/globals.css') ||
      pathname.endsWith('/src/app/globals.css') ||
      pathname.endsWith('/styles/globals.css') ||
      pathname.endsWith('/src/styles/globals.css');

    if (isGlobalsCss) {
      console.log(`✅ Encontrado globals.css stylesheet: ${pathname}`);
      return {
        styleSheet,
        sourceInfo: {
          file: filename,
          path: pathname,
          href: styleSheet.href,
          index: i
        }
      };
    }
  }

  console.warn('❌ No se encontró globals.css en document.styleSheets');
  return null;
}

/**
 * Identifica todos los stylesheets editables (globals.css + registry)
 * @returns {Array} - Array de { styleSheet, sourceInfo }
 */
export function findEditableStylesheets() {
  console.log('🔍 Buscando TODOS los stylesheets editables...');

  const editableSheets = [];

  for (let i = 0; i < document.styleSheets.length; i++) {
    const styleSheet = document.styleSheets[i];

    let sourceInfo;
    if (styleSheet.href) {
      const url = new URL(styleSheet.href);
      const pathname = url.pathname;
      const filename = pathname.split('/').pop();

      sourceInfo = {
        file: filename,
        path: pathname,
        href: styleSheet.href,
        index: i,
        type: 'external'
      };
    } else {
      sourceInfo = {
        file: `<style> tag #${i + 1}`,
        path: null,
        href: null,
        index: i,
        type: 'inline'
      };
    }

    // Verificar si es editable
    const isEditable = isEditableStylesheet(sourceInfo);

    if (isEditable) {
      console.log(`✅ Stylesheet editable: ${sourceInfo.file}`);
      editableSheets.push({
        styleSheet,
        sourceInfo
      });
    } else {
      console.log(`⏭️ Saltando stylesheet no editable: ${sourceInfo.file}`);
    }
  }

  console.log(`📊 Encontrados ${editableSheets.length} stylesheets editables`);
  return editableSheets;
}

/**
 * Determina si un stylesheet es editable
 * @param {Object} sourceInfo - Información del stylesheet
 * @returns {boolean} - true si es editable
 */
function isEditableStylesheet(sourceInfo) {
  if (!sourceInfo) return false;

  const identifier = sourceInfo.path || sourceInfo.file || '';
  const lowerIdentifier = identifier.toLowerCase();

  // Archivos editables
  const isEditableFile =
    lowerIdentifier.includes('globals.css') ||
    lowerIdentifier.includes('registry') ||
    sourceInfo.type === 'inline'; // Style tags inline

  // Excluir archivos de paquetes externos
  const isExternalPackage =
    lowerIdentifier.includes('stylewind') ||
    lowerIdentifier.includes('tailwind') ||
    lowerIdentifier.includes('node_modules') ||
    lowerIdentifier.includes('package') ||
    lowerIdentifier.includes('vendor');

  return isEditableFile && !isExternalPackage;
}

/**
 * Extrae variables CSS de un stylesheet específico
 * @param {CSSStyleSheet} styleSheet - Stylesheet a procesar
 * @param {Object} sourceInfo - Información del stylesheet
 * @returns {Object} - { variables: {}, sources: {} }
 */
export function extractVariablesFromStylesheet(styleSheet, sourceInfo) {
  console.log(`🔍 Extrayendo variables de: ${sourceInfo.file}`);

  const variables = {};
  const variableSources = {};

  try {
    for (let j = 0; j < (styleSheet.cssRules || []).length; j++) {
      const rule = styleSheet.cssRules[j];

      if (rule.type === CSSRule.STYLE_RULE) {
        const cssText = rule.style.cssText;
        const varMatches = cssText.match(/--[\w-]+:\s*[^;]+/g);

        if (varMatches) {
          console.log(`📌 Encontradas ${varMatches.length} variables en ${rule.selectorText}`);

          varMatches.forEach(match => {
            const [prop, value] = match.split(':').map(s => s.trim());
            const cleanValue = value.replace(/;$/, '');

            // Solo agregar si no existe (prioridad: :root > otros)
            if (!variables[prop] || rule.selectorText === ':root') {
              variables[prop] = cleanValue;
              variableSources[prop] = {
                ...sourceInfo,
                rule: rule.selectorText,
                ruleIndex: j,
                type: rule.selectorText === ':root' ? 'root' : 'selector-specific'
              };

              console.log(`  ✅ ${prop} = "${cleanValue}" (${rule.selectorText})`);
            }
          });
        }
      }
    }
  } catch (e) {
    console.error(`❌ Error extrayendo variables de ${sourceInfo.file}:`, e.message);
  }

  return { variables, sources: variableSources };
}

/**
 * Función principal: Detecta variables solo de stylesheets editables
 * @returns {Object} - { variables: {}, sources: {} }
 */
export function detectVariablesFromEditableStylesheets() {
  console.log('🎯 Detectando variables SOLO de stylesheets editables...');

  const allVariables = {};
  const allSources = {};

  // 1. Buscar en stylesheets editables
  const editableSheets = findEditableStylesheets();

  editableSheets.forEach(({ styleSheet, sourceInfo }) => {
    const { variables, sources } = extractVariablesFromStylesheet(styleSheet, sourceInfo);

    // Merge variables (mantener prioridades)
    Object.entries(variables).forEach(([varName, value]) => {
      if (!allVariables[varName] || sources[varName].type === 'root') {
        allVariables[varName] = value;
        allSources[varName] = sources[varName];
      }
    });
  });

  // 2. Buscar en elementos inline (theme-editor overrides)
  const inlineElements = document.querySelectorAll('[style*="--"]');
  inlineElements.forEach((element, index) => {
    const inlineStyle = element.getAttribute('style');
    const varMatches = inlineStyle.match(/--[\w-]+:\s*[^;]+/g);

    if (varMatches) {
      varMatches.forEach(match => {
        const [prop, value] = match.split(':').map(s => s.trim());
        const cleanValue = value.replace(/;$/, '');

        // Inline siempre tiene prioridad máxima
        allVariables[prop] = cleanValue;
        allSources[prop] = {
          file: 'Estilo inline',
          type: 'inline',
          element: element.tagName.toLowerCase(),
          index
        };

        console.log(`📌 Variable inline: ${prop} = "${cleanValue}"`);
      });
    }
  });

  console.log(`📊 Total variables editables encontradas: ${Object.keys(allVariables).length}`);

  return {
    variables: allVariables,
    sources: allSources
  };
}