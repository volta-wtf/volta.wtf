import http from 'http';
import express from 'express';
import cors from 'cors';
import { resolve, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { findThemeCss } from './utils/css-theme-finder.js';
import { getVariablesFromFileSystem } from './utils/css-parser.js';
import { getThemeEditorProjectRoot } from './utils/project-root.js';
import { NETWORK, API_ENDPOINTS, CSS, DEV } from './config/constants.js';

const PROJECT_ROOT = getThemeEditorProjectRoot();

// ---- Theme Editor UI Server ----
const app = express();
const PORT = process.env.THEME_EDITOR_PORT || 4444; // Puerto configurable via env

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir bundle completo del theme editor
app.get('/theme-editor.js', (_req, res) => {
  res.sendFile(resolve(__dirname, '../dist/theme-editor.js'));
});

// Endpoint de estado para verificar que el servidor está activo
app.get(API_ENDPOINTS.STATUS, (_req, res) => {
  let cssFilePath = null;
  try {
    cssFilePath = findThemeCss(PROJECT_ROOT);
  } catch {
    // sin globals.css en esta instancia
  }
  res.json({
    status: 'active',
    message: 'Theme Editor server running',
    port: PORT,
    projectRoot: PROJECT_ROOT,
    cssFilePath,
  });
});

// Página de información simple
app.get('/', (_req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Theme Editor - Servidor Activo</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          line-height: 1.6;
          color: #333;
        }
        .status {
          background: #d4edda;
          color: #155724;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        .info {
          background: #e3f2fd;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        code {
          background: #f1f1f1;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          font-family: 'Monaco', 'Consolas', monospace;
        }
      </style>
    </head>
    <body>
      <h1>🎨 Theme Editor</h1>

      <div class="status">
        ✅ <strong>Servidor activo en puerto ${PORT}</strong><br>
        El Theme Editor está funcionando correctamente.
      </div>

      <div class="info">
        <h3>📋 Información</h3>
        <p>El Theme Editor se carga automáticamente en las páginas de desarrollo.</p>
        <p><strong>Endpoints:</strong></p>
        <ul>
          <li><code>GET /theme-editor.js</code> - Bundle del Theme Editor</li>
          <li><code>GET /status</code> - Estado del servidor</li>
        </ul>
      </div>

      <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 0.9rem;">
        <p>💡 El Theme Editor solo funciona en modo desarrollo.</p>
      </div>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Endpoint de debug para diagnosticar problemas
app.get(API_ENDPOINTS.DEBUG_CSS, (req, res) => {
  try {
    const cssFilePath = findThemeCss(PROJECT_ROOT);
    const cssContent = readFileSync(cssFilePath, 'utf8');

    // Buscar variables CSS
    const variableMatches = cssContent.match(/--[\w-]+\s*:\s*[^;]+/g) || [];

    res.json({
      success: true,
      cssFilePath,
      cssFileSize: cssContent.length,
      totalVariables: variableMatches.length,
      variables: variableMatches.slice(0, 10), // Primeras 10 para no sobrecargar
      preview: cssContent.substring(0, 500) + '...'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint de debug para diagnosticar stylesheets del DOM
app.get(API_ENDPOINTS.DEBUG_STYLESHEETS, (req, res) => {
  try {
    // Como este endpoint se ejecuta en el servidor, devolverá información del archivo
    const cssFilePath = findThemeCss(PROJECT_ROOT);
    const cssContent = readFileSync(cssFilePath, 'utf8');

    // Buscar variables CSS con regex más detallado
    const rootVarsMatch = cssContent.match(/:root\s*{([^}]+)}/g);
    const darkVarsMatch = cssContent.match(/\.dark\s*{([^}]+)}/g);

    let rootVariables = [];
    let darkVariables = [];

    if (rootVarsMatch) {
      rootVarsMatch.forEach(block => {
        const vars = block.match(/--[\w-]+\s*:\s*[^;]+/g) || [];
        rootVariables = rootVariables.concat(vars);
      });
    }

    if (darkVarsMatch) {
      darkVarsMatch.forEach(block => {
        const vars = block.match(/--[\w-]+\s*:\s*[^;]+/g) || [];
        darkVariables = darkVariables.concat(vars);
      });
    }

    res.json({
      success: true,
      cssFilePath,
      cssFileSize: cssContent.length,
      hasRootBlock: !!rootVarsMatch,
      hasDarkBlock: !!darkVarsMatch,
      rootVariables: rootVariables.length,
      darkVariables: darkVariables.length,
      sampleRootVars: rootVariables.slice(0, 5),
      sampleDarkVars: darkVariables.slice(0, 5),
      preview: cssContent.substring(0, 800) + '...'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint para guardar variables CSS
app.post(API_ENDPOINTS.SAVE_CSS, (req, res) => {
  try {
    const { variables, activeTheme } = req.body;
    console.log(`${DEV.LOG_PREFIXES.SAVE} Guardando variables CSS:`, variables);
    console.log(`${DEV.LOG_PREFIXES.THEME} Tema activo:`, activeTheme);

    if (!variables || Object.keys(variables).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionaron variables para guardar'
      });
    }

    // Buscar el archivo globals.css dinámicamente
    const cssFilePath = findThemeCss(PROJECT_ROOT);
    console.log('🔍 Archivo CSS encontrado:', cssFilePath);

    // Leer el archivo CSS actual
    let cssContent = readFileSync(cssFilePath, 'utf8');
    console.log('📄 Archivo CSS leído, tamaño:', cssContent.length, 'caracteres');

    let updatedCount = 0;

    // Determinar el selector base según el tema activo
    const targetSelector = activeTheme === 'dark' ? CSS.SELECTORS.DARK : CSS.SELECTORS.ROOT;
    console.log(`${DEV.LOG_PREFIXES.SEARCH} Selector objetivo:`, targetSelector);

    // Procesar cada variable con lógica inteligente de creación/actualización
    Object.entries(variables).forEach(([varName, newValue]) => {
      console.log(`\n🔄 Procesando variable: ${varName} = ${newValue}`);
      console.log(`🎯 Tema activo: ${activeTheme}, Selector objetivo: ${targetSelector}`);

      // Escapar caracteres especiales para regex
      const escapedVarName = varName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

      // Buscar todas las ocurrencias de esta variable en el CSS
      const varRegex = new RegExp(`(\\s*${escapedVarName}\\s*:\\s*)[^;\\n]+`, 'g');
      let match;
      const matches = [];

      while ((match = varRegex.exec(cssContent)) !== null) {
      // Nota: RegExp.exec devuelve la posición de la coincidencia en `match.index`,
      // mientras que `match.start` solo está disponible cuando se usan índices (`/d`).
      // Usar `match.index` garantiza que calculemos correctamente el texto previo
      // y, por ende, identifiquemos el selector más cercano. Esto evita que se
      // añadan variables duplicadas porque el sistema creía que la variable no
      // existía en el selector objetivo.
      const beforeVariable = cssContent.substring(0, match.index);
      const rootMatch = beforeVariable.lastIndexOf(':root');
      const darkMatch = beforeVariable.lastIndexOf('.dark');
      const lightMatch = beforeVariable.lastIndexOf('.light');

      let closestSelector = null;
      let closestPosition = -1;

      // Encontrar el selector más cercano hacia atrás
      if (rootMatch !== -1 && rootMatch > closestPosition) {
        closestSelector = ':root';
        closestPosition = rootMatch;
      }
      if (darkMatch !== -1 && darkMatch > closestPosition) {
        closestSelector = '.dark';
        closestPosition = darkMatch;
      }
      if (lightMatch !== -1 && lightMatch > closestPosition) {
        closestSelector = '.light';
        closestPosition = lightMatch;
      }

      // Si no se encontró ningún selector, asumir :root por defecto
      if (closestSelector === null) {
        closestSelector = ':root';
      }

      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        fullMatch: match[0],
        prefix: match[1],
        selector: closestSelector,
        position: closestPosition
      });
    }

      console.log(`📍 Encontradas ${matches.length} ocurrencias de ${varName}`);
      matches.forEach((match, i) => {
        console.log(`  📌 Ocurrencia ${i + 1}: selector=${match.selector}, posición=${match.start}`);
      });

      // Buscar si la variable ya existe en el selector objetivo
      const existsInTargetSelector = matches.some(match => match.selector === targetSelector);
      console.log(`🔍 ¿Variable ${varName} existe en ${targetSelector}? ${existsInTargetSelector}`);

      if (existsInTargetSelector) {
        console.log(`✅ Variable ${varName} existe en ${targetSelector}, actualizando...`);

        // Filtrar solo las coincidencias del selector objetivo y ordenar por posición (desde el final)
        const targetMatches = matches.filter(match => match.selector === targetSelector)
                                    .sort((a, b) => b.start - a.start); // Orden descendente para evitar problemas de índices

        // Actualizar cada coincidencia desde el final hacia el principio
        targetMatches.forEach(match => {
          const beforeMatch = cssContent.substring(0, match.start);
          const afterMatch = cssContent.substring(match.end);
          const newVariableDeclaration = match.prefix + newValue;

          cssContent = beforeMatch + newVariableDeclaration + afterMatch;
          updatedCount++;
          console.log(`✅ Variable actualizada: ${varName} = ${newValue} en ${targetSelector} (posición ${match.start})`);
        });
      } else {
        console.log(`🆕 Variable ${varName} NO existe en ${targetSelector}, creando...`);

        // Buscar o crear el bloque del selector objetivo
        const escapedSelector = targetSelector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const selectorRegex = new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, 'g');
        console.log(`🔎 Buscando selector con regex: ${selectorRegex.source}`);
        const selectorMatch = selectorRegex.exec(cssContent);
        console.log(`📦 ¿Selector ${targetSelector} encontrado?`, !!selectorMatch);

        if (selectorMatch) {
          // El selector existe, agregar la variable al final del bloque
          console.log(`📦 Selector ${targetSelector} existe, agregando variable...`);

          const fullMatch = selectorMatch[0]; // Todo el bloque completo
          const blockContent = selectorMatch[1]; // Solo el contenido entre {}
          const beforeBlock = cssContent.substring(0, selectorMatch.index);
          const afterBlock = cssContent.substring(selectorMatch.index + fullMatch.length);

          // Elimina solo líneas completamente en blanco, pero mantiene la primera línea
          // (o deja la primer variable al lado del selector)
          const trimmedBlockContent = blockContent
            .split('\n')
            .filter((line, idx) => idx === 0 || line.trim().length > 0 || line.match(/^\s*[\{\}]/))
            .join('\n');

          // --- Mantener el mismo orden que en :root ----------------------
          let newBlockContent;

          // Solo intentamos alinear el orden cuando el selector objetivo NO es :root
          if (targetSelector !== ':root') {
            try {
              console.log(`🔄 Intentando mantener orden de :root para variable ${varName} en ${targetSelector}`);

              // 1) Extraer orden de variables en :root
              const rootSelectorRegex = /:root\s*\{([^}]*)\}/s;
              const rootSelectorMatch = rootSelectorRegex.exec(cssContent);

              if (rootSelectorMatch) {
                // Obtener todos los nombres de variable en el mismo orden
                const rootVars = Array.from(rootSelectorMatch[1].matchAll(/--[\w-]+(?=\s*:)/g)).map(m => m[0]);
                console.log(`📋 Variables en :root orden:`, rootVars);

                const indexInRoot = rootVars.indexOf(varName);
                console.log(`📍 Índice de ${varName} en :root:`, indexInRoot);

                if (indexInRoot !== -1) {
                  // Obtener variables que ya existen en el bloque target (usando trimmedBlockContent)
                  const existingVarsInTarget = Array.from(trimmedBlockContent.matchAll(/--[\w-]+(?=\s*:)/g)).map(m => m[0]);
                  console.log(`📋 Variables existentes en ${targetSelector}:`, existingVarsInTarget);

                  // Buscar la siguiente variable que ya exista en el bloque target
                  let referenceVar = null;
                  for (let i = indexInRoot + 1; i < rootVars.length; i++) {
                    const candidate = rootVars[i];
                    if (existingVarsInTarget.includes(candidate)) {
                      referenceVar = candidate;
                      console.log(`🎯 Variable de referencia encontrada: ${referenceVar}`);
                      break;
                    }
                  }

                  if (referenceVar) {
                    // Insertar justo ANTES de referenceVar para mantener orden
                    const escapedRef = referenceVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const refRegex = new RegExp(`(\\n\\s*)(${escapedRef}\\s*:)`);
                    const replacement = `\n  ${varName}: ${newValue};$1$2`;
                    newBlockContent = trimmedBlockContent.replace(refRegex, replacement);
                    console.log(`✅ Variable ${varName} insertada antes de ${referenceVar}`);
                  } else {
                    console.log(`📌 No se encontró variable de referencia, insertando al final`);
                  }
                } else {
                  console.log(`⚠️ Variable ${varName} no encontrada en :root`);
                }
              } else {
                console.log(`⚠️ No se encontró bloque :root`);
              }
            } catch (orderErr) {
              console.warn('⚠️ Error manteniendo orden de variables:', orderErr.message);
            }
          }

          // Si no se pudo insertar respetando el orden, agregar al final (fallback)
          if (!newBlockContent || newBlockContent === trimmedBlockContent) {
            const newVariable = `\n  ${varName}: ${newValue};`;
            newBlockContent = trimmedBlockContent + newVariable;
          }

          const newBlock = `${targetSelector} {${newBlockContent}\n}`;

          cssContent = beforeBlock + newBlock + afterBlock;
          updatedCount++;

          console.log(`✅ Variable creada: ${varName} = ${newValue} en ${targetSelector}`);
        } else {
          // El selector no existe, crearlo al final del archivo
          console.log(`🏗️ Selector ${targetSelector} no existe, creando bloque completo...`);

          const newBlock = `\n\n${targetSelector} {\n  ${varName}: ${newValue};\n}`;
          cssContent += newBlock;
          updatedCount++;

          console.log(`✅ Bloque y variable creados: ${varName} = ${newValue} en ${targetSelector}`);
        }
      }
    });

    // Escribir el archivo actualizado solo si hubo cambios
    if (updatedCount > 0) {
      writeFileSync(cssFilePath, cssContent, 'utf8');
      console.log(`✅ Archivo CSS guardado exitosamente. ${updatedCount} variables actualizadas en ${targetSelector}.`);
    } else {
      console.log('⚠️ No se realizaron cambios en el archivo CSS');
    }

    res.json({
      success: true,
      message: `Variables CSS guardadas exitosamente en ${targetSelector}. ${updatedCount} de ${Object.keys(variables).length} variables actualizadas.`,
      updatedCount: updatedCount,
      totalRequested: Object.keys(variables).length,
      targetSelector: targetSelector
    });

  } catch (error) {
    console.error('❌ Error al guardar variables CSS:', error);
    console.error('Stack trace:', error.stack);

    res.status(500).json({
      success: false,
      message: 'Error al guardar variables CSS',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Endpoint para obtener variables CSS del sistema de archivos
app.get(API_ENDPOINTS.GET_VARIABLES || '/api/variables', (req, res) => {
  try {
    console.log('🔍 Obteniendo variables CSS del sistema de archivos...');

    const result = getVariablesFromFileSystem();

    if (result.error) {
      return res.status(500).json({
        success: false,
        error: result.error,
        variables: {},
        sources: {}
      });
    }

    console.log(`✅ Enviando ${Object.keys(result.variables).length} variables al cliente`);

    res.json({
      success: true,
      variables: result.variables,
      sources: result.sources,
      filePath: result.filePath,
      totalVariables: Object.keys(result.variables).length
    });
  } catch (error) {
    console.error('❌ Error obteniendo variables:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      variables: {},
      sources: {}
    });
  }
});

// Función para inicializar el servidor
function startServer() {
  try {
    app.listen(PORT, () => {
      let cssFile = '(no encontrado)';
      try {
        cssFile = findThemeCss(PROJECT_ROOT);
      } catch {
        // se reportará al guardar o en /api/variables
      }
      console.log(`${DEV.LOG_PREFIXES.THEME} Theme Editor server activo en http://localhost:${PORT}`);
      console.log(`${DEV.LOG_PREFIXES.THEME} Bundle disponible en: http://localhost:${PORT}/theme-editor.js`);
      console.log(`${DEV.LOG_PREFIXES.FILE} App: ${PROJECT_ROOT}`);
      console.log(`${DEV.LOG_PREFIXES.FILE} CSS: ${cssFile}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    throw error;
  }
}

// Inicializar el servidor
startServer();
