import React, { useState } from 'react';
import { styles } from './panel-styles.js';
import { PropertyItem, SaveFooter, SectionHeader, ThemeSelector } from './PropertyComponents.jsx';
import { isColorVariable } from '../utils/color-variable-utils.js';

/**
 * VariablesPanel - Panel para variables generales del tema
 *
 * Responsabilidades:
 * - Variables de espaciado, tipografía, bordes, etc.
 * - Variables :root y reglas específicas
 *
 * EXCLUYE variables de colores que se manejan en ColorPanel.
 */
export function VariablesPanel({
  cssVars,
  computedVars, // Valores computados para previews
  varSources,
  originalVars,
  modifiedVars,
  saving,
  onSave,
  onResetAll,
  dropdownOpen,
  setDropdownOpen,
  dropdownFilter,
  setDropdownFilter,
  hoveredItem: parentHoveredItem,
  setHoveredItem: setParentHoveredItem,
  isSpecificRulesCollapsed,
  setIsSpecificRulesCollapsed,
  updateCSSVar,
  resetVar
}) {
  const [localHoveredItem, setLocalHoveredItem] = useState(null);

  // Usar hover local para este panel específico
  const hoveredItem = localHoveredItem;
  const setHoveredItem = setLocalHoveredItem;

  const modifiedCount = Object.keys(modifiedVars).length;

  // Variables principales filtradas
  const mainVariables = Object.entries(cssVars)
    .filter(([varName]) =>
      (!varSources[varName] || varSources[varName].type !== 'selector-specific') &&
      !isColorVariable(varName) // Excluir variables de colores
    );

  // Variables de reglas específicas filtradas
  const specificVariables = Object.entries(cssVars)
    .filter(([varName]) =>
      varSources[varName] && varSources[varName].type === 'selector-specific' &&
      !isColorVariable(varName) // Excluir variables de colores
    );

  return (
    <div>
      {/* Selector de Temas */}
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <ThemeSelector />
      </div>

      <div data-slot="property-list" style={styles.propertyList}>
        {mainVariables.length === 0 && (
          <p style={{ padding: '16px', fontSize: '12px', color: '#6b7280', lineHeight: 1.5 }}>
            No hay variables de tema cargadas. Comprueba que el servidor del theme-editor esté activo
            (puerto {typeof window !== 'undefined' ? window.__THEME_EDITOR_PORT__ || '—' : '—'})
            y que el script <code style={{ fontSize: '11px' }}>dev</code> de esta app esté en ejecución.
          </p>
        )}
        {/* Variables principales (:root y otros) - EXCLUYENDO variables de colores */}
        {mainVariables.map(([varName, value]) => (
          <PropertyItem
            key={varName}
            varName={varName}
            value={value}
            isModified={modifiedVars.hasOwnProperty(varName)}
            onUpdate={updateCSSVar}
            onReset={resetVar}
            placeholder="Escribir valor CSS"
            showDropdown={true}
            hoveredItem={hoveredItem}
            onHover={setHoveredItem}
            computedVars={computedVars}
            dropdownProps={{
              isOpen: dropdownOpen === varName,
              onToggle: (varName) => {
                const isOpening = dropdownOpen !== varName;
                setDropdownOpen(isOpening ? varName : null);
                if (!isOpening) {
                  setParentHoveredItem(null);
                }
              },
              cssVars,
              filter: dropdownFilter[varName] || '',
              onFilterChange: (e) => setDropdownFilter({
                ...dropdownFilter,
                [varName]: e.target.value
              }),
              onClose: () => {
                setTimeout(() => {
                  setDropdownOpen(null);
                  setParentHoveredItem(null);
                }, 200);
              },
              hoveredItem: parentHoveredItem,
              onHover: setParentHoveredItem,
              originalValue: originalVars[varName]
            }}
          />
        ))}
      </div>
      {/* Sección colapsable para variables de reglas específicas - EXCLUYENDO variables de colores */}
      {specificVariables.length > 0 && (
        <>
          <SectionHeader
            title="Variables de Reglas Específicas"
            count={specificVariables.length}
            isCollapsed={isSpecificRulesCollapsed}
            onToggle={() => setIsSpecificRulesCollapsed(!isSpecificRulesCollapsed)}
          />

          {!isSpecificRulesCollapsed && (
            <div style={{ paddingBlock: '16px' }}>
              {specificVariables.map(([varName, value]) => (
                <PropertyItem
                  key={varName}
                  varName={varName}
                  value={value}
                  isModified={modifiedVars.hasOwnProperty(varName)}
                  onUpdate={updateCSSVar}
                  onReset={resetVar}
                  placeholder="Escribir valor CSS"
                  showDropdown={true}
                  hoveredItem={hoveredItem}
                  onHover={setHoveredItem}
                  computedVars={computedVars}
                  dropdownProps={{
                    isOpen: dropdownOpen === varName,
                    onToggle: (varName) => {
                      const isOpening = dropdownOpen !== varName;
                      setDropdownOpen(isOpening ? varName : null);
                      if (!isOpening) {
                        setParentHoveredItem(null);
                      }
                    },
                    cssVars,
                    filter: dropdownFilter[varName] || '',
                    onFilterChange: (e) => setDropdownFilter({
                      ...dropdownFilter,
                      [varName]: e.target.value
                    }),
                    onClose: () => {
                      setTimeout(() => {
                        setDropdownOpen(null);
                        setParentHoveredItem(null);
                      }, 200);
                    },
                    hoveredItem: parentHoveredItem,
                    onHover: setParentHoveredItem,
                    originalValue: originalVars[varName]
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Footer elegante para guardar */}
      <SaveFooter
        onSave={onSave}
        saving={saving}
        modifiedCount={modifiedCount}
        onResetAll={onResetAll}
        buttonText="Guardar"
        savingText="Guardando..."
        resetAllText="Descartar"
      />
    </div>
  );
}