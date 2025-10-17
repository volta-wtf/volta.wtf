import React, { useState, useEffect } from 'react';

export default function App() {
  const [cssVars, setCssVars] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Obtener variables CSS del documento padre
      let targetDoc = document;

      // Si estamos en iframe, intentar acceder al documento padre
      if (window.parent && window.parent !== window) {
        try {
          targetDoc = window.parent.document;
          console.log('✅ Accediendo al documento padre');
        } catch (e) {
          console.warn('⚠️  No se puede acceder al documento padre, usando documento actual');
          targetDoc = document;
        }
      }

      const computedStyle = getComputedStyle(targetDoc.documentElement);
      console.log('🔍 ComputedStyle obtenido:', computedStyle.length, 'propiedades');

      const vars = {};

      // Buscar variables CSS que empiecen con --
      for (let i = 0; i < computedStyle.length; i++) {
        const prop = computedStyle[i];
        if (prop.startsWith('--')) {
          const value = computedStyle.getPropertyValue(prop).trim();
          vars[prop] = value;
          console.log(`📌 Variable encontrada: ${prop} = ${value}`);
        }
      }

      console.log('📊 Total variables encontradas:', Object.keys(vars).length);
      setCssVars(vars);
      setError(null);
    } catch (err) {
      console.error('❌ Error al obtener variables CSS:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCSSVar = (varName, value) => {
    try {
      let targetDoc = document;

      // Si estamos en iframe, intentar acceder al documento padre
      if (window.parent && window.parent !== window) {
        try {
          targetDoc = window.parent.document;
        } catch (e) {
          console.warn('⚠️  No se puede actualizar en documento padre');
          targetDoc = document;
        }
      }

      targetDoc.documentElement.style.setProperty(varName, value);
      setCssVars(prev => ({ ...prev, [varName]: value }));
      console.log(`✅ Variable actualizada: ${varName} = ${value}`);
    } catch (err) {
      console.error('❌ Error al actualizar variable:', err);
    }
  };

  const resetVar = (varName) => {
    try {
      let targetDoc = document;

      if (window.parent && window.parent !== window) {
        try {
          targetDoc = window.parent.document;
        } catch (e) {
          targetDoc = document;
        }
      }

      targetDoc.documentElement.style.removeProperty(varName);

      // Obtener el valor original
      const computedStyle = getComputedStyle(targetDoc.documentElement);
      const originalValue = computedStyle.getPropertyValue(varName).trim();
      setCssVars(prev => ({ ...prev, [varName]: originalValue }));
      console.log(`🔄 Variable reseteada: ${varName} = ${originalValue}`);
    } catch (err) {
      console.error('❌ Error al resetear variable:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>🎨 Theme Editor</h2>
        <p>Cargando variables CSS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>🎨 Theme Editor</h2>
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#f5f5f5',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  const varEntries = Object.entries(cssVars);

  return (
    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>🎨 Theme Editor</h2>

      <div style={{ marginBottom: '20px', fontSize: '12px', color: '#666' }}>
        {varEntries.length} variables CSS encontradas
      </div>

      {varEntries.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          <p>No se encontraron variables CSS personalizadas (--variable-name)</p>
          <p style={{ fontSize: '12px' }}>Verifica que tu CSS tenga variables definidas en :root</p>
        </div>
      ) : (
        varEntries.map(([varName, value]) => (
          <div key={varName} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ fontSize: '12px', fontWeight: '500' }}>
                {varName}
              </label>
              <button
                onClick={() => resetVar(varName)}
                style={{
                  padding: '2px 6px',
                  fontSize: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '2px',
                  background: '#f9f9f9',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => updateCSSVar(varName, e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
              placeholder="Valor de la variable CSS"
            />
            <div style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>
              Valor actual: {value || 'No definido'}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
