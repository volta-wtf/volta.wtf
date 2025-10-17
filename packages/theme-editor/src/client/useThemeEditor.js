import { useState } from 'react';
import { useVariableDetection } from './useVariableDetection.js';
import { NETWORK, API_ENDPOINTS, UI, CSS, DEV } from '../config/constants.js';

export function useThemeEditor() {
  // Estados de UI
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownFilter, setDropdownFilter] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeTab, setActiveTab] = useState('variables');
  const [isSpecificRulesCollapsed, setIsSpecificRulesCollapsed] = useState(true);

  // Estados de cambios modificados (centralizados)
  const [modifiedVariables, setModifiedVariables] = useState({});
  const [modifiedColors, setModifiedColors] = useState({});
  const [savingVariables, setSavingVariables] = useState(false);
  const [savingColors, setSavingColors] = useState(false);

  // Hook de detección de variables
  const {
    cssVars,        // Valores originales para inputs (tema actual)
    computedVars,   // Valores computados para previews (tema actual)
    allThemeVars,   // Todos los valores por tema
    allComputedVars, // Todos los computados por tema
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar
  } = useVariableDetection();

  // ========================
  // UTILIDADES
  // ========================

  // Función para determinar si una variable es de colores
  const isColorVariable = (varName) => {
    return varName.startsWith('--color-') || varName.startsWith('--tone-') || varName.startsWith('--tint-');
  };

  // Función para obtener el tema actual
  const getCurrentTheme = () => {
    const htmlElement = document.documentElement;
    const hasLightClass = htmlElement.classList.contains('light');
    const hasDarkClass = htmlElement.classList.contains('dark');

    if (hasLightClass) {
      return 'light';
    } else if (hasDarkClass) {
      return 'dark';
    } else {
      // Si no hay clase específica, usar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
  };

  // Función para mostrar notificaciones
  const showNotification = (message, bgColor) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${bgColor};
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      max-width: 400px;
      word-wrap: break-word;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, UI.NOTIFICATION_DURATION);
  };

  // ========================
  // FUNCIONES PARA VARIABLES DEL TEMA
  // ========================

  const updateThemeVar = (varName, value) => {
    updateCSSVar(varName, value);

    const originalValue = originalVars[varName];
    if (value !== originalValue) {
      setModifiedVariables(prev => ({ ...prev, [varName]: value }));
    } else {
      setModifiedVariables(prev => {
        const newModified = { ...prev };
        delete newModified[varName];
        return newModified;
      });
    }
  };

  const resetThemeVar = (varName) => {
    resetVar(varName);
    setModifiedVariables(prev => {
      const newModified = { ...prev };
      delete newModified[varName];
      return newModified;
    });
  };

  const resetAllThemeVars = () => {
    Object.keys(modifiedVariables).forEach(varName => {
      resetVar(varName);
    });
    setModifiedVariables({});
  };

  // ========================
  // FUNCIONES PARA VARIABLES DE COLORES
  // ========================

  const updateColorVar = (varName, value) => {
    updateCSSVar(varName, value);

    const originalValue = originalVars[varName];
    if (value !== originalValue) {
      setModifiedColors(prev => ({ ...prev, [varName]: value }));
    } else {
      setModifiedColors(prev => {
        const newModified = { ...prev };
        delete newModified[varName];
        return newModified;
      });
    }
  };

  const resetColorVar = (varName) => {
    resetVar(varName);
    setModifiedColors(prev => {
      const newModified = { ...prev };
      delete newModified[varName];
      return newModified;
    });
  };

  const resetAllColorVars = () => {
    Object.keys(modifiedColors).forEach(varName => {
      resetVar(varName);
    });
    setModifiedColors({});
  };

  // ========================
  // FUNCIONES DE GUARDADO
  // ========================

  const saveVariables = async () => {
    setSavingVariables(true);
    try {
      const activeTheme = getCurrentTheme();
      console.log(`${DEV.LOG_PREFIXES.THEME} Guardando variables en tema:`, activeTheme);

      // Detectar puerto dinámicamente desde el script que nos cargó
      const scripts = document.querySelectorAll(`script[src*="${CSS.FILE_NAMES.THEME_EDITOR_SCRIPT}"]`);
      const themeEditorScript = scripts[scripts.length - 1]; // Último script cargado
      const scriptSrc = themeEditorScript?.src || NETWORK.DEFAULT_SCRIPT_URL;
      const scriptUrl = new URL(scriptSrc);
      const port = scriptUrl.port || NETWORK.DEFAULT_PORT.toString();
      const apiUrl = `${NETWORK.DEFAULT_PROTOCOL}://${NETWORK.DEFAULT_HOST}:${port}${API_ENDPOINTS.SAVE_CSS}`;

      console.log(`${DEV.LOG_PREFIXES.PORT} Usando puerto dinámico:`, port);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variables: modifiedVariables,
          activeTheme: activeTheme
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOriginalVars(prev => ({ ...prev, ...modifiedVariables }));
        setModifiedVariables({});
        showNotification(`${DEV.LOG_PREFIXES.SUCCESS} Variables guardadas en ${result.targetSelector}`, UI.COLORS.SUCCESS);
      } else {
        throw new Error(`Error ${response.status}`);
      }
    } catch (error) {
      showNotification(`${DEV.LOG_PREFIXES.ERROR} Error: ${error.message}`, UI.COLORS.ERROR);
    } finally {
      setSavingVariables(false);
    }
  };

  const saveColors = async () => {
    setSavingColors(true);
    try {
      const activeTheme = getCurrentTheme();
      console.log(`${DEV.LOG_PREFIXES.THEME} Guardando colores en tema:`, activeTheme);

      // Detectar puerto dinámicamente desde el script que nos cargó
      const scripts = document.querySelectorAll(`script[src*="${CSS.FILE_NAMES.THEME_EDITOR_SCRIPT}"]`);
      const themeEditorScript = scripts[scripts.length - 1]; // Último script cargado
      const scriptSrc = themeEditorScript?.src || NETWORK.DEFAULT_SCRIPT_URL;
      const scriptUrl = new URL(scriptSrc);
      const port = scriptUrl.port || NETWORK.DEFAULT_PORT.toString();
      const apiUrl = `${NETWORK.DEFAULT_PROTOCOL}://${NETWORK.DEFAULT_HOST}:${port}${API_ENDPOINTS.SAVE_CSS}`;

      console.log(`${DEV.LOG_PREFIXES.PORT} Usando puerto dinámico:`, port);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variables: modifiedColors,
          activeTheme: activeTheme
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOriginalVars(prev => ({ ...prev, ...modifiedColors }));
        setModifiedColors({});
        showNotification(`${DEV.LOG_PREFIXES.SUCCESS} Colores guardados en ${result.targetSelector}`, UI.COLORS.SUCCESS);
      } else {
        throw new Error(`Error ${response.status}`);
      }
    } catch (error) {
      showNotification(`${DEV.LOG_PREFIXES.ERROR} Error: ${error.message}`, UI.COLORS.ERROR);
    } finally {
      setSavingColors(false);
    }
  };

  // ========================
  // RETURN DEL HOOK
  // ========================

  return {
    // Estados de UI
    dropdownOpen,
    setDropdownOpen,
    dropdownFilter,
    setDropdownFilter,
    hoveredItem,
    setHoveredItem,
    activeTab,
    setActiveTab,
    isSpecificRulesCollapsed,
    setIsSpecificRulesCollapsed,

    // Estados de datos
    cssVars,        // Valores originales para inputs (tema actual)
    computedVars,   // Valores computados para previews (tema actual)
    allThemeVars,   // Todos los valores por tema
    allComputedVars, // Todos los computados por tema
    originalVars,
    varSources,
    debugInfo,
    loading,
    modifiedVariables,
    modifiedColors,
    savingVariables,
    savingColors,

    // Funciones para variables del tema
    updateThemeVar,
    resetThemeVar,
    resetAllThemeVars,
    saveVariables,

    // Funciones para variables de colores
    updateColorVar,
    resetColorVar,
    resetAllColorVars,
    saveColors,

    // Utilidades
    isColorVariable,
    getCurrentTheme,
    showNotification
  };
}