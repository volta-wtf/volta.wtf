import React, { useState, useCallback, useEffect } from 'react';
import { styles } from './panel-styles.js';
import { VariablePreview, VariableTypeIndicator } from './VariablePreview.jsx';
import { variableClass } from './class-names.js';
import { getComputedValueForPreview } from '../client/computed-style-utils.js';

/**
 * Hook personalizado para obtener el valor computado desde el estado
 * Ya no necesita calcular - usa valores pre-computados y sincronizados
 */
function useComputedValueForPreview(varName, computedVars) {
  // Usar valor pre-computado del estado dual sincronizado
  const computedValue = computedVars[varName] || '';

  // Debug logging para variables específicas
  if (varName === '--background' || varName === '--foreground') {
    console.log(`🎨 Preview ${varName}:`, computedValue);
  }

  return computedValue;
}

/**
 * PropertyItem - Componente reutilizable para renderizar una variable CSS
 */
export function PropertyItem({
  varName,
  value,
  isModified,
  onUpdate,
  onReset,
  placeholder = "Valor CSS",
  showDropdown = false,
  dropdownProps = {},
  labelTransform = (name) => name.replace(/^--/, '').replace(/(^\w|-\w)/g, (m) => m.replace('-', ' ').toUpperCase()),
  hoveredItem,
  onHover,
  showPreview = true,
  showTypeIndicator = true,
  computedVars = {} // Valores computados pre-sincronizados
}) {
  const currentStyle = isModified ? styles.variableModified : styles.variable;
  const isHovered = hoveredItem === varName;
  const [isFocused, setIsFocused] = React.useState(false);

  // Obtener valor computado desde el estado dual sincronizado
  const computedValueForPreview = useComputedValueForPreview(varName, computedVars);

  // Debug logging para variables específicas
  if (varName === '--background' || varName === '--foreground') {
    console.log(`🔧 PropertyItem ${varName}:`, {
      value: value,
      computedValueForPreview: computedValueForPreview,
      isModified: isModified
    });
  }

  return (
    <div
      data-slot="property-item"
      //style={{ ...currentStyle, position: 'relative' }}
      className={variableClass(isModified)}
      style={{ position: 'relative' }}
      onMouseEnter={() => onHover?.(varName)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className={styles.property}>
        <label className={styles.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{labelTransform(varName)}</span>
            {isModified && <span className={styles.indicator}>●</span>}
          </div>
        </label>
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Preview visual de la variable dentro del input */}
          {showPreview && (
            <div style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              lineHeight: '0',
              transform: 'translateY(-50%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}>
              <VariablePreview
                varName={varName}
                value={computedValueForPreview}
              />
            </div>
          )}

          <input
            type="text"
            className={styles.input}
            style={{
              borderColor: (isFocused ? 'rgba(0,0,0,0.4)' : (isHovered ? 'rgba(0,0,0,0.1)' : 'transparent')),
              paddingLeft: showPreview ? '36px' : '12px', // Espacio para el preview
              paddingRight: '28px',
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={(e) => onUpdate(varName, e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
          />

          {showDropdown && isHovered ? (
            <DropdownButton
              varName={varName}
              {...dropdownProps}
            />
          ) : (
            // Solo mostrar reset button si está modificado Y tiene hover
            isModified && isHovered && (
              <ResetButton
                varName={varName}
                onReset={onReset}
              />
            )
          )}

          {showDropdown && dropdownProps.isOpen && (
            <VariableDropdown
              varName={varName}
              onUpdate={onUpdate}
              {...dropdownProps}
            />
          )}
        </div>
      </div>
      <div className={styles.value}>
        Valor actual: {computedValueForPreview}
        {isModified && dropdownProps.originalValue && (
          <span style={{ color: '#ef4444', marginLeft: '12px', fontSize: '12px' }}>
            Valor anterior: {dropdownProps.originalValue}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * ResetButton - Botón para resetear una variable
 */
export function ResetButton({ varName, onReset }) {
  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        fontSize: '12px',
        padding: '2px',
      }}
      onClick={() => onReset(varName)}
      title="Resetear valor"
    >
      ↺
    </button>
  );
}

/**
 * DropdownButton - Botón para abrir dropdown de variables
 */
export function DropdownButton({ varName, isOpen, onToggle }) {
  const arrowSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.2s ease;">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7828 9.00259C18.1278 9.4951 18.0579 10.2138 17.6266 10.6078L12.6266 15.1758C12.2614 15.5095 11.7425 15.5095 11.3773 15.1758L6.37729 10.6078C5.94603 10.2138 5.87611 9.4951 6.22112 9.00259C6.56613 8.51008 7.19542 8.43023 7.62667 8.82424L12.002 12.8216L16.3772 8.82424C16.8085 8.43023 17.4378 8.51008 17.7828 9.00259Z" fill="currentColor"/>
  </svg>`;

  return (
    <button
      type="button"
      data-dropdown="true"
      style={{
        position: 'absolute',
        right: '0px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
      }}
      onClick={() => onToggle(varName)}
    >
      {/* Línea separadora */}
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '25%',
          bottom: '25%',
          width: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: arrowSvg }} />
    </button>
  );
}

/**
 * VariableDropdown - Dropdown para seleccionar variables CSS
 */
export function VariableDropdown({
  varName,
  cssVars,
  filter,
  onFilterChange,
  onUpdate,
  onClose,
  hoveredItem,
  onHover
}) {
  // Manejar click fuera del dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el click es fuera del dropdown, cerrarlo inmediatamente
      if (!event.target.closest('[data-dropdown="true"]')) {
        onClose();
      }
    };

    // Agregar listener con un pequeño delay para evitar que se cierre inmediatamente al abrir
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      data-dropdown="true"
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 10001,
        maxHeight: '180px',
        overflowY: 'auto',
        marginTop: '2px',
      }}
    >
      <input
        type="text"
        style={{
          ...styles.input,
          border: 'none',
          borderBottom: '1px solid #e5e7eb',
          borderRadius: 0,
          margin: 0,
          width: '100%',
          fontSize: '12px',
          background: '#f3f4f6',
        }}
        placeholder="Filtrar variables..."
        value={filter}
        onChange={onFilterChange}
        autoFocus
      />
      {Object.keys(cssVars)
        .filter(v =>
          v !== varName &&
          (!filter || v.toLowerCase().includes(filter.toLowerCase()))
        )
        .map(v => (
          <div
            key={v}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#374151',
              background: hoveredItem === `${varName}-${v}` ? '#e0e7ff' : 'transparent',
              borderBottom: '1px solid #f3f4f6',
              transition: 'background-color 0.1s ease',
            }}
            onMouseEnter={() => onHover(`${varName}-${v}`)}
            onMouseLeave={() => onHover(null)}
            onMouseDown={e => {
              e.preventDefault();
              onUpdate(varName, `var(${v})`);
              onClose();
            }}
          >
            <div style={{ fontWeight: '500' }}>{v}</div>
            <div style={{ fontSize: '10px', color: '#9ca3af' }}>
              {cssVars[v]}
            </div>
          </div>
        ))}
    </div>
  );
}

/**
 * SaveButton - Botón para guardar cambios (versión inline/sticky)
 */
export function SaveButton({
  onSave,
  saving,
  modifiedCount,
  buttonText = "Guardar Cambios",
  savingText = "Guardando..."
}) {
  if (modifiedCount === 0) return null;

  return (
    <div style={{
      position: 'sticky',
      top: '0',
      zIndex: 1000,
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '12px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontSize: '13px', color: '#64748b' }}>
        {modifiedCount} variable{modifiedCount > 1 ? 's' : ''} modificada{modifiedCount > 1 ? 's' : ''}
      </span>
      <button
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          cursor: saving ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          opacity: saving ? 0.6 : 1
        }}
        onClick={onSave}
        disabled={saving}
      >
        {saving ? savingText : buttonText}
      </button>
    </div>
  );
}

/**
 * SaveFooter - Footer elegante para guardar cambios (se muestra en la parte inferior)
 */
export function SaveFooter({
  onSave,
  saving,
  modifiedCount,
  onResetAll,
  buttonText = "Guardar Cambios",
  savingText = "Guardando...",
  resetAllText = "Descartar Todo"
}) {
  if (modifiedCount === 0) return null;

  return (
    <div style={{
      position: 'sticky',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid #e2e8f0',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      zIndex: 1001
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#f59e0b',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{ fontSize: '11px', color: '#374151', fontWeight: '500' }}>
          {modifiedCount} cambio{modifiedCount > 1 ? 's' : ''} pendiente{modifiedCount > 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {onResetAll && (
          <button
            style={{
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onClick={onResetAll}
            disabled={saving}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
              e.target.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#d1d5db';
            }}
          >
            {resetAllText}
          </button>
        )}

        <button
          style={{
            background: saving ? '#93c5fd' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s',
            boxShadow: saving ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          onClick={onSave}
          disabled={saving}
          onMouseEnter={(e) => {
            if (!saving) {
              e.target.style.background = '#2563eb';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!saving) {
              e.target.style.background = '#3b82f6';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
          }}
        >
          {saving ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              {savingText}
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * SectionHeader - Header colapsable para secciones
 */
export function SectionHeader({
  title,
  count,
  isCollapsed,
  onToggle
}) {
  return (
    <div
      className={styles.sectionHeader}
      onClick={onToggle}
      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.03)'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
    >
      <span>
        {title} ({count})
      </span>
      <span
        style={{
          ...styles.collapseIcon,
          transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'
        }}
      >
        ▼
      </span>
    </div>
  );
}

/**
 * ColorSectionTabs - Tabs para secciones de colores
 */
export function ColorSectionTabs({
  activeSection,
  onSectionChange,
  sections
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      padding: '8px',
      zIndex: 1,
      position: 'relative'
    }}>
      {sections.map(({ key, label, count }) => (
        <button
          key={key}
          style={{
            padding: '6px 12px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderColor: activeSection === key ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: '500',
            background: activeSection === key ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
            color: activeSection === key ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.7)',
          }}
          onClick={() => onSectionChange(key)}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
}

/**
 * EmptyState - Estado vacío cuando no hay variables
 */
export function EmptyState({ message }) {
  return (
    <div style={{
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '14px',
      padding: '32px 16px',
      maxWidth: '50%'
    }}>
      {message}
    </div>
  );
}

/**
 * ThemeSelector - Selector de temas para el panel
 */
export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Detectar tema actual del documento
    const doc = getTargetDocument();
    if (doc.documentElement.classList.contains('dark')) return 'dark';
    if (doc.documentElement.classList.contains('light')) return 'light';
    return 'system';
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeVariables, setThemeVariables] = useState([]);

  // Función para obtener el documento objetivo (puede ser iframe)
  function getTargetDocument() {
    try {
      if (window.parent && window.parent !== window && window.parent.document) {
        return window.parent.document;
      }
    } catch (e) {
      // Fallback si no se puede acceder al documento padre
    }
    return document;
  }

  // Función para obtener el valor actual de una variable CSS
  const getCSSVariable = useCallback((varName) => {
    const doc = getTargetDocument();
    const computed = getComputedStyle(doc.documentElement);
    return computed.getPropertyValue(varName).trim();
  }, []);

  // Función para actualizar las variables del tema
  const updateThemeVariables = useCallback(() => {
    const variables = [
      { name: '--background', label: 'Background' },
      { name: '--foreground', label: 'Foreground' },
      { name: '--ambient', label: 'Ambient' },
      { name: '--primary', label: 'Primary' },
      { name: '--secondary', label: 'Secondary' }
    ];

    const updated = variables.map(({ name, label }) => ({
      name,
      label,
      value: getCSSVariable(name)
    }));

    setThemeVariables(updated);
  }, [getCSSVariable]);

  // Función para cambiar el tema - OPTIMIZADA
  const changeTheme = useCallback((theme) => {
    console.log(`🎨 Cambiando tema a: ${theme} (OPTIMIZADO)`);

    const doc = getTargetDocument();
    const html = doc.documentElement;

    // Remover clases existentes
    html.classList.remove('light', 'dark');

    // Aplicar nueva clase según el tema
    if (theme === 'light') {
      html.classList.add('light');
    } else if (theme === 'dark') {
      html.classList.add('dark');
    }
    // Para 'system', no agregamos ninguna clase (usa preferencia del sistema)

    // Actualizar estado inmediatamente
    setCurrentTheme(theme);
    setDropdownOpen(false);

    // NO usar setTimeout - el observer de useVariableDetection se encargará
    // de la actualización optimista inmediata
  }, []);

  // Observer simplificado - sin setTimeout conflictivo
  useEffect(() => {
    const doc = getTargetDocument();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            mutation.target === doc.documentElement) {

          // Solo actualizar variables locales del theme selector
          // (no interferir con el sistema optimista principal)
          updateThemeVariables();
        }
      });
    });

    observer.observe(doc.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Inicializar las variables
    updateThemeVariables();

    return () => observer.disconnect();
  }, [updateThemeVariables]);

  const themeOptions = [
    { value: 'system', label: 'Sistema', description: 'Sigue la preferencia del sistema' },
    { value: 'light', label: 'Claro', description: 'Siempre tema claro' },
    { value: 'dark', label: 'Oscuro', description: 'Siempre tema oscuro' }
  ];

  const currentOption = themeOptions.find(opt => opt.value === currentTheme);

  return (
    <div>

      <div style={{ padding: '8px' }}>
        {/* Dropdown Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              padding: '6px 12px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.backgroundColor = '#f9fafb';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{currentOption?.label}</span>
            </div>
            <span style={{
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}>
              ▼
            </span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginTop: '4px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
              }}
            >
              {themeOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => changeTheme(option.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: currentTheme === option.value ? '#f3f4f6' : 'transparent',
                    border: 'none',
                    borderBottom: index < themeOptions.length - 1 ? '1px solid #f3f4f6' : 'none',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (currentTheme !== option.value) {
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentTheme !== option.value) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{option.label}</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '2px'
                    }}>
                      {option.description}
                    </div>
                  </div>
                  {currentTheme === option.value && (
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Color Scheme Preview */}
      <div style={{
        display: 'none',
        padding: '12px',
        background: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280',
          marginBottom: '8px'
        }}>
          Color Scheme
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            flex: 1,
            padding: '8px 12px',
            background: currentTheme === 'light' || (currentTheme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#ffffff' : '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: '#374151',
            textAlign: 'center'
          }}>
            Light
          </div>
          <div style={{
            flex: 1,
            padding: '8px 12px',
            background: currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#1f2937' : '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#ffffff' : '#6b7280',
            textAlign: 'center'
          }}>
            Dark
          </div>
        </div>
      </div>

      {/* Theme Variables Preview */}
      <div style={{
        display: 'none',
        background: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #f3f4f6'
      }}>

        <div style={{
          padding: '8px 12px',
          fontSize: '11px',
          fontWeight: '400',
          color: 'rgba(0, 0, 0, 0.4)',
        }}>
          Variables Principales
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px' }}>
          {themeVariables.map(({ name, label, value }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {/* Color preview circle */}
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: value || '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    flexShrink: 0
                  }}
                />
                <span style={{ fontWeight: '500', color: '#374151' }}>
                  {label}
                </span>
              </div>
              <span style={{
                color: '#6b7280',
                fontSize: '11px',
                fontFamily: 'monospace',
                maxWidth: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {value || 'sin valor'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay para cerrar dropdown */}
      {dropdownOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}