import React from 'react';
import { useColorPanel } from '../client/useColorPanel.js';
import { PropertyItem, SaveFooter, ColorSectionTabs, EmptyState } from './PropertyComponents.jsx';

/**
 * ColorPanel - Panel especializado para variables de colores (UI puro)
 *
 * Responsabilidades:
 * - Color Wheel: Variables tipo Tailwind (--color-red-*, --color-blue-*, etc.)
 * - Color Palette: Variables semánticas (--color-contrast-*, --tone-primary-*, etc.)
 *
 * Separado del VariablesPanel que maneja variables generales del tema.
 */
export function ColorPanel({
  cssVars,
  originalVars,
  modifiedVars,
  saving,
  onSave,
  onResetAll,
  updateCSSVar,
  resetVar
}) {
  // Hook con toda la lógica de negocio
  const {
    activeSection,
    setActiveSection,
    hoveredItem,
    setHoveredItem,
    colorVars,
    sectionTabs,
    modifiedCount,
    colorLabelTransform
  } = useColorPanel(cssVars, modifiedVars);

  return (
    <div data-slot="color-panel">
      {/* Header con tabs de sección */}
      <ColorSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={sectionTabs}
      />

      {/* Contenido de Color Wheel */}
      {activeSection === 'wheel' && (
        <div style={{ marginTop: '-1px' }}>
          {Object.entries(colorVars.wheelColors).map(([colorName, variables]) => (
            <div
              key={colorName}
              style={{
                paddingBlock: '8px',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
              }}>
              <h3 style={{
                fontSize: '11px',
                lineHeight: '16px',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.4)',
                padding: '8px 16px',
                textTransform: 'capitalize'
              }}>
                {colorName} ({variables.length})
              </h3>
              {variables.map(({ varName, value }) => (
                <PropertyItem
                  key={varName}
                  varName={varName}
                  value={value}
                  isModified={modifiedVars.hasOwnProperty(varName)}
                  onUpdate={updateCSSVar}
                  onReset={resetVar}
                  placeholder="Valor de color"
                  labelTransform={colorLabelTransform}
                  hoveredItem={hoveredItem}
                  onHover={setHoveredItem}
                  showPreview={true}
                  showTypeIndicator={false} // Los colores ya se muestran claramente
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Contenido de Color Palette */}
      {activeSection === 'palette' && (
        <div>
          {Object.entries(colorVars.paletteColors).map(([category, variables]) => (
            <div key={category} style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                textTransform: 'capitalize'
              }}>
                {category} ({variables.length})
              </h3>
              <div style={{ paddingLeft: '8px' }}>
                {variables.map(({ varName, value }) => (
                  <PropertyItem
                    key={varName}
                    varName={varName}
                    value={value}
                    isModified={modifiedVars.hasOwnProperty(varName)}
                    onUpdate={updateCSSVar}
                    onReset={resetVar}
                    placeholder="Valor de color"
                    labelTransform={colorLabelTransform}
                    hoveredItem={hoveredItem}
                    onHover={setHoveredItem}
                    showPreview={true}
                    showTypeIndicator={false} // Los colores ya se muestran claramente
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje si no hay variables */}
      {((activeSection === 'wheel' && Object.keys(colorVars.wheelColors).length === 0) ||
        (activeSection === 'palette' && Object.keys(colorVars.paletteColors).length === 0)) && (
        <EmptyState
          message={`No se encontraron variables de ${activeSection === 'wheel' ? 'Color Wheel' : 'Color Palette'}`}
        />
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