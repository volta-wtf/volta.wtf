import { useState, useEffect, useCallback } from 'react';
import {
  getComputedValueForPreview,
  updateComputedValuesForPreview,
  createThemeObserver,
  getDualValuesForThemeChange
} from './computed-style-utils.js';
import { getThemeEditorServerUrl } from '../config/constants.js';



// Función para obtener variables del servidor (sistema de archivos)
async function fetchVariablesFromServer() {
  try {
    const apiUrl = `${getThemeEditorServerUrl()}/api/variables`;

    console.log(`🔍 Obteniendo variables desde: ${apiUrl}`);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Error desconocido del servidor');
    }

    console.log(`✅ Recibidas ${data.totalVariables} variables del servidor`);
    console.log(`📁 Archivo fuente: ${data.filePath}`);

    return {
      variables: data.variables,
      sources: data.sources,
      filePath: data.filePath
    };
  } catch (error) {
    console.error(
      `❌ Error obteniendo variables del servidor (${getThemeEditorServerUrl()}/api/variables):`,
      error.message
    );
    throw error;
  }
}

// Función para detectar el tema actual
function getCurrentTheme() {
  const htmlElement = document.documentElement;

  if (htmlElement.classList.contains('dark')) {
    return 'dark';
  } else if (htmlElement.classList.contains('light')) {
    return 'light';
  } else {
    // Por defecto, detectar según preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}

// Función para determinar si una variable es editable
function isEditableVariable(varName, sourceInfo) {
  // Todas las variables que vienen del servidor son editables
  // porque el css-parser ya filtró solo las del globals.css
  console.log(`☑️ Variable ${varName}: EDITABLE (desde sistema de archivos)`);
  return true;
}

export function useVariableDetection() {
  const [cssVars, setCssVars] = useState({}); // Valores originales para inputs (tema actual)
  const [computedVars, setComputedVars] = useState({}); // Valores computados para previews (tema actual)
  const [allThemeVars, setAllThemeVars] = useState({}); // Todos los valores por tema: { light: {}, dark: {} }
  const [allComputedVars, setAllComputedVars] = useState({}); // Todos los computados por tema
  const [originalVars, setOriginalVars] = useState({});
  const [varSources, setVarSources] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessingThemeChange, setIsProcessingThemeChange] = useState(false);

      // Función para detectar TODAS las variables de TODOS los temas de una vez
  const detectAllVariables = useCallback(async () => {
    const debugLog = [];
    console.log('🎯 Cargando TODAS las variables de TODOS los temas...');

    try {
      setLoading(true);

      // Obtener variables del servidor
      const { variables, sources, filePath } = await fetchVariablesFromServer();

      debugLog.push(`Variables cargadas desde: ${filePath}`);
      debugLog.push(`Variables encontradas: ${Object.keys(variables).length}`);

      // Organizar variables por tema
      const themeVars = {
        root: {},      // Variables :root (base)
        light: {},     // Variables específicas de tema light
        dark: {}       // Variables específicas de tema dark
      };

      // Procesar TODAS las variables por tipo
      Object.entries(variables).forEach(([varKey, originalValue]) => {
        const source = sources[varKey];
        if (!source) return;

        if (source.type === 'root') {
          themeVars.root[varKey] = originalValue;
        } else if (source.type === 'light-theme') {
          themeVars.light[source.baseName] = originalValue;
        } else if (source.type === 'dark-theme') {
          themeVars.dark[source.baseName] = originalValue;
        }
      });

      // Combinar variables finales para cada tema
      const finalThemeVars = {
        light: { ...themeVars.root, ...themeVars.light },
        dark: { ...themeVars.root, ...themeVars.dark }
      };

      console.log('📊 Variables por tema:', {
        light: Object.keys(finalThemeVars.light).length,
        dark: Object.keys(finalThemeVars.dark).length
      });

            // Calcular valores computados para cada tema
      const computedThemeVars = {
        light: {},
        dark: {}
      };

      // Simular cada tema y calcular valores computados SINCRÓNICAMENTE
      const htmlElement = document.documentElement;
      const originalClasses = htmlElement.className;

      for (const themeName of Object.keys(finalThemeVars)) {
        const themeVariables = finalThemeVars[themeName];

        // Limpiar clases de tema
        htmlElement.classList.remove('light', 'dark');

        // Aplicar el tema específico
        if (themeName !== 'root') {
          htmlElement.classList.add(themeName);
        }

        // Forzar recálculo de estilos
        htmlElement.offsetHeight; // Trigger reflow

        // Calcular valores computados inmediatamente
        const dualValues = getDualValuesForThemeChange(themeVariables);
        computedThemeVars[themeName] = dualValues.computed;

        console.log(`✅ Computados para ${themeName}:`, Object.keys(computedThemeVars[themeName]).length);
      }

      // Restaurar clases originales
      htmlElement.className = originalClasses;

      // Guardar todos los valores
      setAllThemeVars(finalThemeVars);
      setAllComputedVars(computedThemeVars);

      // Establecer valores para el tema actual
      const currentTheme = getCurrentTheme();
      const currentVars = finalThemeVars[currentTheme] || finalThemeVars.light;
      const currentComputed = computedThemeVars[currentTheme] || computedThemeVars.light;

      setCssVars(currentVars);
      setComputedVars(currentComputed);
      setOriginalVars(currentVars);

      setVarSources(sources);
      setDebugInfo(debugLog);
      setLoading(false);

      console.log(`✅ Todos los temas cargados. Tema activo: ${currentTheme}`);

      return currentVars;
    } catch (error) {
      console.error('❌ Error detectando variables:', error);
      debugLog.push(`Error: ${error.message}`);
      setDebugInfo(debugLog);
      setLoading(false);
      return {};
    }
  }, []);

            // ========================
  // FUNCIÓN SUPER RÁPIDA PARA CAMBIO DE TEMA - SOLO CAMBIA ENTRE VALORES PRE-CALCULADOS
  // ========================
  const handleThemeChange = useCallback(() => {
    console.log('🎯 handleThemeChange llamado');

    // Prevenir ejecuciones múltiples
    if (isProcessingThemeChange) {
      console.log('⚠️ Ya procesando cambio de tema, saltando...');
      return;
    }

    console.log('📊 Estado de allThemeVars:', Object.keys(allThemeVars));
    console.log('📊 Estado de allComputedVars:', Object.keys(allComputedVars));

    // Verificar si tenemos datos cargados
    if (Object.keys(allThemeVars).length === 0) {
      console.log('❌ No hay datos de temas cargados aún');
      return;
    }

    setIsProcessingThemeChange(true);

    const currentTheme = getCurrentTheme();
    console.log(`🔄 Cambio de tema detectado: ${currentTheme}`);

    // Obtener valores pre-calculados para el nuevo tema
    const newVars = allThemeVars[currentTheme] || allThemeVars.light || {};
    const newComputed = allComputedVars[currentTheme] || allComputedVars.light || {};

    console.log(`📋 Valores para tema ${currentTheme}:`, {
      newVars: Object.keys(newVars).slice(0, 3),
      newComputed: Object.keys(newComputed).slice(0, 3),
      totalVars: Object.keys(newVars).length,
      totalComputed: Object.keys(newComputed).length
    });

    // Verificar algunos valores específicos
    console.log('🔍 Ejemplos de valores:');
    console.log('  --background:', newVars['--background'], '→', newComputed['--background']);
    console.log('  --foreground:', newVars['--foreground'], '→', newComputed['--foreground']);

    // Actualizar estados INSTANTÁNEAMENTE
    setCssVars(newVars);
    setComputedVars(newComputed);
    setOriginalVars(newVars);

    console.log(`✅ Estados actualizados para tema ${currentTheme}`);

    setIsProcessingThemeChange(false);

  }, [allThemeVars, allComputedVars, isProcessingThemeChange]);

  // Effect inicial para detectar TODAS las variables de TODOS los temas
  useEffect(() => {
    detectAllVariables();
  }, [detectAllVariables]);



  // Observer super rápido para cambio de tema - Solo cambia entre valores pre-calculados
  useEffect(() => {
    console.log('🔧 Configurando observer. allThemeVars keys:', Object.keys(allThemeVars));

    // Solo crear observer si ya tenemos todos los valores cargados
    if (Object.keys(allThemeVars).length === 0) {
      console.log('⏳ Esperando datos de temas para crear observer...');
      return;
    }

    console.log('✅ Creando observer de cambio de tema');
    let timeout = null;

    const observer = createThemeObserver(
      originalVars,
      () => {
        console.log('🎯 Observer detectó cambio - ejecutando callback');
        // Debounce mínimo solo para evitar múltiples eventos
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          handleThemeChange();
        }, 10); // Delay súper pequeño - solo anti-spam
      }
    );

    return () => {
      console.log('🧹 Limpiando observer');
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [allThemeVars, originalVars, handleThemeChange]);

  const updateCSSVar = (varName, value) => {
    // Detectar el tema actual
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    const isLight = htmlElement.classList.contains('light');

    // Crear o encontrar el style element para el tema específico
    let styleId = 'theme-editor-override';
    if (isDark) styleId += '-dark';
    else if (isLight) styleId += '-light';
    else styleId += '-system';

    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Determinar el selector correcto según el tema
    let selector = ':root';
    if (isDark) selector = '.dark';
    else if (isLight) selector = '.light';

    // Obtener el CSS existente y actualizar/agregar la variable
    let existingCSS = styleElement.textContent || '';
    const varPattern = new RegExp(`${varName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*:[^;}]+`, 'g');

    if (existingCSS.includes(selector)) {
      // El selector ya existe, actualizar la variable
      const selectorPattern = new RegExp(`(${selector.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*{[^}]*)(${varName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*:[^;}]+)([^}]*})`, 'g');
      if (selectorPattern.test(existingCSS)) {
        // La variable ya existe, reemplazarla
        existingCSS = existingCSS.replace(varPattern, `${varName}: ${value}`);
      } else {
        // La variable no existe, agregarla al selector existente
        existingCSS = existingCSS.replace(
          new RegExp(`(${selector.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*{[^}]*)(})`, 'g'),
          `$1  ${varName}: ${value};\n$2`
        );
      }
    } else {
      // El selector no existe, crearlo
      existingCSS += `\n${selector} {\n  ${varName}: ${value};\n}\n`;
    }

    styleElement.textContent = existingCSS;
    setCssVars(prev => ({ ...prev, [varName]: value }));
  };

  const resetVar = (varName) => {
    // Detectar el tema actual
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    const isLight = htmlElement.classList.contains('light');

    // Encontrar el style element correcto
    let styleId = 'theme-editor-override';
    if (isDark) styleId += '-dark';
    else if (isLight) styleId += '-light';
    else styleId += '-system';

    const styleElement = document.getElementById(styleId);
    if (styleElement) {
      // Remover la variable del CSS override
      let existingCSS = styleElement.textContent || '';
      const varPattern = new RegExp(`\\s*${varName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*:[^;}]+;?`, 'g');
      existingCSS = existingCSS.replace(varPattern, '');

      // Si el selector queda vacío, removerlo también
      const emptySelectors = [':root', '.dark', '.light'];
      emptySelectors.forEach(selector => {
        const emptySelectorPattern = new RegExp(`${selector.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*{\\s*}`, 'g');
        existingCSS = existingCSS.replace(emptySelectorPattern, '');
      });

      styleElement.textContent = existingCSS.trim();

      // Si el style element está vacío, removerlo
      if (!existingCSS.trim()) {
        styleElement.remove();
      }
    }

    // Restaurar valor original
    setCssVars(prev => ({ ...prev, [varName]: originalVars[varName] }));
  };

  const resetAllVars = () => {
    // Remover todos los style elements de override
    ['theme-editor-override', 'theme-editor-override-dark', 'theme-editor-override-light', 'theme-editor-override-system'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });

    // Restaurar valores originales
    setCssVars({...originalVars});
  };

  return {
    cssVars,           // Valores originales para inputs (tema actual)
    computedVars,      // Valores computados para previews (tema actual)
    allThemeVars,      // Todos los valores por tema
    allComputedVars,   // Todos los computados por tema
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar,
    resetAllVars,
    detectAllVariables,
    isEditableVariable
  };
}