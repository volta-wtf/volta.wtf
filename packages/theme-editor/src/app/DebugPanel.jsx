import React, { useState } from 'react';
import { styles } from './panel-styles.js';
import { VariableAnalysisPanel, VariableTypeIndicator } from './VariablePreview.jsx';
import { detectVariableType } from '../client/variable-type-detector.js';

export function DebugPanel({
  cssVars,
  varSources,
  originalVars,
  debugInfo
}) {
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [showAnalysisFor, setShowAnalysisFor] = useState(null);

  return (
    <div style={{ padding: '16px' }}>
      {/* Análisis de Variables Section */}
      <div className={styles.debugSection}>
        <h3 className={styles.debugSectionTitle}>
          🧪 Análisis de Variables
        </h3>
        <div className={styles.debugContent}>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '12px' }}>
            Selecciona una variable para ver su análisis detallado:
          </p>
          <select
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: 'white',
              marginBottom: '12px'
            }}
            value={selectedVariable || ''}
            onChange={(e) => {
              const varName = e.target.value;
              setSelectedVariable(varName);
              setShowAnalysisFor(varName);
            }}
          >
            <option value="">-- Seleccionar variable --</option>
            {Object.entries(cssVars)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([varName, value]) => (
                <option key={varName} value={varName}>
                  {varName} ({value.length > 30 ? value.substring(0, 30) + '...' : value})
                </option>
              ))}
          </select>

          {selectedVariable && (
            <div style={{ position: 'relative' }}>
              <VariableAnalysisPanel
                varName={selectedVariable}
                value={cssVars[selectedVariable]}
                isVisible={showAnalysisFor === selectedVariable}
              />
            </div>
          )}
        </div>
      </div>

      {/* Debug Info Section */}
      <div className={styles.debugSection}>
        <h3 className={styles.debugSectionTitle}>
          🔍 Información de Detección
        </h3>
        <div className={styles.debugContent}>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '12px' }}>
            {Object.keys(cssVars).length} variables CSS encontradas
          </p>
          {debugInfo.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
      </div>

      {/* Nueva sección para debug de variables de colores */}
      <div className={styles.debugSection}>
        <h3 className={styles.debugSectionTitle}>🎨 Variables de Colores Detectadas</h3>
        <div className={styles.debugContent}>
          {Object.entries(cssVars).filter(([varName]) =>
            varName.startsWith('--color-') || varName.startsWith('--tone-')
          ).length > 0 ? (
            Object.entries(cssVars)
              .filter(([varName]) => varName.startsWith('--color-') || varName.startsWith('--tone-'))
              .slice(0, 20) // Mostrar solo las primeras 20
              .map(([varName, value]) => (
                <div key={varName} style={{
                  marginBottom: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#4b5563'
                }}>
                  <strong style={{ color: '#1f2937' }}>{varName}:</strong> {value}
                </div>
              ))
          ) : (
            <div style={{ color: '#dc2626', fontSize: '12px' }}>
              ❌ No se encontraron variables de colores (--color-* o --tone-*)
            </div>
          )}
          {Object.entries(cssVars).filter(([varName]) =>
            varName.startsWith('--color-') || varName.startsWith('--tone-')
          ).length > 20 && (
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              ...y {Object.entries(cssVars).filter(([varName]) =>
                varName.startsWith('--color-') || varName.startsWith('--tone-')
              ).length - 20} más variables de colores
            </div>
          )}
        </div>
      </div>

      {/* Variables :root y principales */}
      <div className={styles.debugSection}>
        <h3 className={styles.debugSectionTitle}>
          🎨 Variables Principales (:root y otros)
        </h3>
        {Object.entries(cssVars)
          .filter(([varName]) =>
            !varSources[varName] ||
            varSources[varName].type !== 'selector-specific'
          )
          .map(([varName, value]) => (
            <div key={varName} className={styles.debugVariable}>
              <div className={styles.debugVariableName}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <VariableTypeIndicator
                    varName={varName}
                    value={value}
                    showLabel={false}
                  />
                  <span>{varName}</span>
                </div>
              </div>
              <div className={styles.debugVariableValue}>
                Valor: {value}
              </div>
              <div className={styles.debugVariableInfo}>
                Tipo detectado: <strong>{detectVariableType(varName, value)}</strong>
              </div>
              <div className={styles.debugVariableInfo}>
                Tipo CSS: {value.startsWith('var(') ? 'Referencia a variable' :
                       value.startsWith('#') ? 'Color hexadecimal' :
                       value.includes('px') ? 'Medida en píxeles' :
                       value.includes('rem') ? 'Medida relativa' :
                       value.includes('oklch') ? 'Color OKLCH' :
                       value === 'transparent' ? 'Transparente' :
                       value === 'currentColor' ? 'Color actual' :
                       'Valor directo'}
              </div>
              {varSources[varName] && (
                <div className={styles.debugVariableInfo}>
                  Archivo: {varSources[varName].file}
                </div>
              )}
              {varSources[varName] && (
                <div style={styles.debugVariableInfo}>
                  Regla: {varSources[varName].rule}
                  {varSources[varName].type !== 'inline' && ` (línea ${varSources[varName].ruleIndex + 1})`}
                </div>
              )}
              {varSources[varName] && varSources[varName].type && (
                <div style={{
                  ...styles.debugVariableInfo,
                  color: varSources[varName].type === 'inline' ? '#8b5cf6' :
                         varSources[varName].type === 'selector-specific' ? '#06b6d4' : '#6b7280'
                }}>
                  Tipo de origen: {
                    varSources[varName].type === 'inline' ? 'Estilo inline en elemento' :
                    varSources[varName].type === 'selector-specific' ? 'Regla CSS específica (no :root)' :
                    'Regla :root'
                  }
                </div>
              )}
              {!varSources[varName] && (
                <div style={{ ...styles.debugVariableInfo, color: '#f59e0b' }}>
                  Origen: Detectada por getComputedStyle - Posibles fuentes:
                  <br />• Variables heredadas de elementos padre
                  <br />• CSS generado por JavaScript/frameworks
                  <br />• Librerías externas (Tailwind, shadcn/ui, etc.)
                  <br />• CSS-in-JS o componentes con estilos dinámicos
                  <br />• Extensiones del navegador
                </div>
              )}

            </div>
          ))}
      </div>

      {/* Variables de Reglas Específicas */}
      {Object.entries(cssVars).filter(([varName]) =>
        varSources[varName] && varSources[varName].type === 'selector-specific'
      ).length > 0 && (
        <div className={styles.debugSection}>
          <h3 className={styles.debugSectionTitle}>
            ⚙️ Variables de Reglas Específicas (no :root)
          </h3>
          {Object.entries(cssVars)
            .filter(([varName]) =>
              varSources[varName] && varSources[varName].type === 'selector-specific'
            )
            .map(([varName, value]) => (
              <div key={varName} className={styles.debugVariable}>
                <div className={styles.debugVariableName}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <VariableTypeIndicator
                      varName={varName}
                      value={value}
                      showLabel={false}
                    />
                    <span>{varName}</span>
                  </div>
                </div>
                <div className={styles.debugVariableValue}>
                  Valor: {value}
                </div>
                <div className={styles.debugVariableInfo}>
                  Tipo detectado: <strong>{detectVariableType(varName, value)}</strong>
                </div>
                <div className={styles.debugVariableInfo}>
                  Tipo CSS: {value.startsWith('var(') ? 'Referencia a variable' :
                         value.startsWith('#') ? 'Color hexadecimal' :
                         value.includes('px') ? 'Medida en píxeles' :
                         value.includes('rem') ? 'Medida relativa' :
                         value.includes('oklch') ? 'Color OKLCH' :
                         value === 'transparent' ? 'Transparente' :
                         value === 'currentColor' ? 'Color actual' :
                         'Valor directo'}
                </div>
                {varSources[varName] && (
                  <div className={styles.debugVariableInfo}>
                    Archivo: {varSources[varName].file}
                  </div>
                )}
                {varSources[varName] && (
                  <div className={styles.debugVariableInfo}>
                    Regla: {varSources[varName].rule}
                    {varSources[varName].type !== 'inline' && ` (línea ${varSources[varName].ruleIndex + 1})`}
                  </div>
                )}
                {varSources[varName] && varSources[varName].type && (
                  <div style={{
                    ...styles.debugVariableInfo,
                    color: '#06b6d4'
                  }}>
                    Tipo de origen: Regla CSS específica (no :root)
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}