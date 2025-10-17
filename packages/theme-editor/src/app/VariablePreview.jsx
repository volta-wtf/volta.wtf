import React from 'react';
import { analyzeVariable } from '../client/variable-type-detector.js';
import { getComputedValueForPreview } from '../client/computed-style-utils.js';

/**
 * VariablePreview - Componente que muestra un preview visual de una variable CSS
 * Usa el valor computado para el preview visual, independiente del valor del input
 */
export function VariablePreview({ varName, value, size = 'normal' }) {
  if (!varName) {
    return null;
  }

  // Si el valor está vacío, mostrar el ícono de desconocido
  if (!value || value.trim() === '') {
    const emptyPreview = {
      element: 'div',
      style: {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        flexShrink: 0
      },
      content: {
        type: 'empty-icon',
        svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="black" stroke-opacity="0.1" stroke-width="1.5"/>
          <rect x="13.2051" y="5.4278" width="1.92308" height="10.9956" rx="0.961538" transform="rotate(45 13.2051 5.4278)" fill="black" fill-opacity="0.1"/>
        </svg>`
      },
      tooltip: 'Campo vacío'
    };

    return (
      <div
        title={emptyPreview.tooltip}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'help'
        }}
      >
        <div style={emptyPreview.style}>
          <div dangerouslySetInnerHTML={{ __html: emptyPreview.content.svg }} />
        </div>
      </div>
    );
  }

  // CLAVE: Computar el valor visual para el preview (valor computado del DOM)
  const visualValue = getComputedValueForPreview(varName, value);

  // Usar el valor visual (computado) para el análisis y preview
  const analysis = analyzeVariable(varName, visualValue);
  const { preview } = analysis;

  if (!preview) {
    return null;
  }

  // Ajustar tamaños según el prop size
  const sizeMultiplier = size === 'small' ? 0.8 : size === 'large' ? 1.2 : 1;

  const adjustedStyle = {
    ...preview.style,
    width: preview.style.width ? `${parseInt(preview.style.width) * sizeMultiplier}px` : undefined,
    height: preview.style.height ? `${parseInt(preview.style.height) * sizeMultiplier}px` : undefined,
    fontSize: preview.style.fontSize ? `${parseInt(preview.style.fontSize) * sizeMultiplier}px` : undefined
  };

  const PreviewElement = preview.element || 'div';

  // Renderizar contenido según el tipo
  const renderContent = () => {
    if (!preview.content) return null;

    if (typeof preview.content === 'object' && preview.content.type) {
      switch (preview.content.type) {
        case 'spacing-bar':
          // Extraer solo las propiedades de estilo válidas (sin 'type')
          const { type, ...spacingStyle } = preview.content;
          return (
            <div style={spacingStyle} />
          );
        case 'typography-text':
          return (
            <span style={preview.content.style}>
              {preview.content.text}
            </span>
          );
        case 'unknown-icon':
          return (
            <div dangerouslySetInnerHTML={{ __html: preview.content.svg }} />
          );
        case 'empty-icon':
          return (
            <div dangerouslySetInnerHTML={{ __html: preview.content.svg }} />
          );
        case 'text':
          return preview.content.text;
        default:
          // Si es un objeto con propiedades pero no reconocemos el tipo, intentar renderizar como texto
          if (preview.content.text) {
            return preview.content.text;
          }
          return null;
      }
    }

    // Si no es un objeto con type, renderizar directamente
    if (typeof preview.content === 'string') {
      return preview.content;
    }

    return null;
  };

  // Crear tooltip que muestre tanto el valor original como el computado
  const tooltipText = value !== visualValue
    ? `${preview.tooltip}\nOriginal: ${value}\nComputado: ${visualValue}`
    : preview.tooltip;

  return (
    <div
      title={tooltipText}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'help'
      }}
    >
      <PreviewElement style={adjustedStyle}>
        {renderContent()}
      </PreviewElement>
    </div>
  );
}

/**
 * VariableTypeIndicator - Muestra un indicador del tipo de variable detectado
 */
export function VariableTypeIndicator({ varName, value, showLabel = false }) {
  if (!varName || !value) {
    return null;
  }

  // Usar valor computado para detectar el tipo correctamente
  const visualValue = getComputedValueForPreview(varName, value);
  const analysis = analyzeVariable(varName, visualValue);
  const { type, metadata } = analysis;

  // Mapeo de tipos a colores e iconos
  const typeConfig = {
    color: {
      color: '#ef4444',
      icon: '●',
      label: 'Color'
    },
    spacing: {
      color: '#3b82f6',
      icon: '↔',
      label: 'Espaciado'
    },
    typography: {
      color: '#8b5cf6',
      icon: 'Aa',
      label: 'Tipografía'
    },
    border: {
      color: '#06b6d4',
      icon: '▢',
      label: 'Borde'
    },
    shadow: {
      color: '#6b7280',
      icon: '◐',
      label: 'Sombra'
    },
    default: {
      color: '#6b7280',
      icon: '?',
      label: 'Otro'
    }
  };

  const config = typeConfig[type] || typeConfig.default;

  return (
    <span
      title={`Tipo: ${config.label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '12px',
        color: config.color,
        fontWeight: '500'
      }}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/**
 * VariableAnalysisPanel - Panel informativo que muestra el análisis completo de una variable
 */
export function VariableAnalysisPanel({ varName, value, isVisible = false }) {
  if (!isVisible || !varName || !value) {
    return null;
  }

  const analysis = analyzeVariable(varName, value);

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '12px',
        marginTop: '4px',
        zIndex: 1000
      }}
    >
      <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px' }}>
        <strong>Análisis de Variable</strong>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <VariablePreview varName={varName} value={value} size="normal" />
        <div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Tipo detectado: <strong style={{ color: '#374151' }}>{analysis.type}</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Valor original: <code style={{ background: '#f3f4f6', padding: '2px 4px', borderRadius: '2px' }}>{value}</code>
          </div>
          {value !== visualValue && (
            <div style={{ fontSize: '11px', color: '#6b7280' }}>
              Valor computado: <code style={{ background: '#e0f2fe', padding: '2px 4px', borderRadius: '2px' }}>{visualValue}</code>
            </div>
          )}
        </div>
      </div>

      {/* Información adicional basada en el tipo */}
      {analysis.metadata.isColor && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como color. Se muestra con un preview de color sólido.
        </div>
      )}

      {analysis.metadata.isSpacing && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como espaciado. Se muestra con una barra proporcional.
        </div>
      )}

      {analysis.metadata.isTypography && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como tipografía. Se muestra con texto de ejemplo.
        </div>
      )}

      {analysis.metadata.isBorder && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como borde. Se muestra con un elemento con borde.
        </div>
      )}

      {analysis.metadata.isShadow && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como sombra. Se muestra con un elemento con la sombra aplicada.
        </div>
      )}

      {analysis.metadata.isDefault && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable no se pudo categorizar. Se muestra con un preview genérico.
        </div>
      )}
    </div>
  );
}