import React from 'react';
import { useThemeEditor } from '../client/useThemeEditor.js';
import { VariablesPanel } from './VariablesPanel.jsx';
import { ColorPanel } from './ColorPanel.jsx';
import { DebugPanel } from './DebugPanel.jsx';
import { injectDynamicStyles, setClassNames } from '../client/dynamic-styles.js';
import { AppFrame, AppHeader, AppContent, AppTabs, LoadingScreen } from './components.jsx';

// Inyectar estilos CSS globales para la selección de texto
const injectTextSelectionStyles = () => {
  if (document.getElementById('theme-editor-text-selection-styles')) return;

  const style = document.createElement('style');
  style.id = 'theme-editor-text-selection-styles';
  style.textContent = `
    #theme-editor-panel input::selection {
      background-color: #3b82f6 !important;
      color: white !important;
    }
    #theme-editor-panel input::-moz-selection {
      background-color: #3b82f6 !important;
      color: white !important;
    }
    #theme-editor-panel input::-webkit-selection {
      background-color: #3b82f6 !important;
      color: white !important;
    }
  `;
  document.head.appendChild(style);
};

// ========================
// COMPONENTE PRINCIPAL
// ========================

export function ThemeEditorApp({ onClose }) {
  // Hook con toda la lógica de negocio
  const {
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
    cssVars,        // Valores originales para inputs
    computedVars,   // Valores computados para previews
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
    saveColors
  } = useThemeEditor();

  // Configurar sistema de clases ANTES del primer render
  React.useLayoutEffect(() => {
    setClassNames(); // Debe ejecutarse PRIMERO
    injectDynamicStyles();
    injectTextSelectionStyles();
  }, []);

  // Pantalla de carga
  if (loading) {
    return <LoadingScreen onClose={onClose} />;
  }

  // Panel principal - Solo construcción de interfaz
  return (
    <AppFrame>
      <AppHeader onClose={onClose}>
        <AppTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          disabled={false}
        />
      </AppHeader>
      <AppContent>
        {activeTab === 'variables' && (
          <VariablesPanel
            cssVars={cssVars}
            computedVars={computedVars}
            varSources={varSources}
            originalVars={originalVars}
            modifiedVars={modifiedVariables}
            saving={savingVariables}
            onSave={saveVariables}
            onResetAll={resetAllThemeVars}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            dropdownFilter={dropdownFilter}
            setDropdownFilter={setDropdownFilter}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isSpecificRulesCollapsed={isSpecificRulesCollapsed}
            setIsSpecificRulesCollapsed={setIsSpecificRulesCollapsed}
            updateCSSVar={updateThemeVar}
            resetVar={resetThemeVar}
          />
        )}

        {activeTab === 'colors' && (
          <ColorPanel
            cssVars={cssVars}
            originalVars={originalVars}
            modifiedVars={modifiedColors}
            saving={savingColors}
            onSave={saveColors}
            onResetAll={resetAllColorVars}
            updateCSSVar={updateColorVar}
            resetVar={resetColorVar}
          />
        )}

        {activeTab === 'debug' && (
          <DebugPanel
            cssVars={cssVars}
            varSources={varSources}
            originalVars={originalVars}
            debugInfo={debugInfo}
          />
        )}
      </AppContent>
    </AppFrame>
  );
}