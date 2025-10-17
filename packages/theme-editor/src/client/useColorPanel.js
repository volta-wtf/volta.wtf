import { useState, useMemo } from 'react';

/**
 * useColorPanel - Hook que maneja toda la lógica de categorización y agrupación de variables de colores
 */
export function useColorPanel(cssVars, modifiedVars) {
  const [activeSection, setActiveSection] = useState('wheel'); // 'wheel' o 'palette'
  const [hoveredItem, setHoveredItem] = useState(null);

  // Filtrar y agrupar variables de colores
  const colorVars = useMemo(() => {
    const wheelColors = {};
    const paletteColors = {};

    console.log('🎨 Analizando variables para ColorPanel:', Object.keys(cssVars));

    // Definir los nombres de colores de la rueda
    const wheelColorNames = [
      'white', 'black', 'red', 'orange', 'amber', 'yellow', 'lime', 'green',
      'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
      'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone'
    ];

    // Definir las categorías de la paleta semántica
    const paletteCategories = [
      'contrast', 'ambiental', 'primary', 'secondary', 'tertiary',
      'destructive', 'cautionary', 'positive', 'informative'
    ];

    Object.entries(cssVars).forEach(([varName, value]) => {
      // Filtrar variables que empiecen con --color-, --tone- o --tint-
      if (!varName.startsWith('--color-') && !varName.startsWith('--tone-') && !varName.startsWith('--tint-')) return;

      console.log(`🔍 Analizando variable de color: ${varName} = ${value}`);

      const colorName = varName.replace(/^--(color|tone|tint)-/, '');

      // Verificar si es una variable de rueda de colores
      const isWheelColor = wheelColorNames.some(name => {
        return colorName === name || colorName.startsWith(`${name}-`);
      });

      // Verificar si es una variable de paleta semántica
      const isPaletteColor = paletteCategories.some(category => {
        return colorName.startsWith(`${category}-`);
      });

      console.log(`📊 ${varName}: isWheelColor=${isWheelColor}, isPaletteColor=${isPaletteColor}`);

      if (isWheelColor) {
        // Agrupar por color base (red, blue, etc.)
        const baseColor = wheelColorNames.find(name =>
          colorName === name || colorName.startsWith(`${name}-`)
        );

        if (!wheelColors[baseColor]) {
          wheelColors[baseColor] = [];
        }
        wheelColors[baseColor].push({ varName, value });
        console.log(`✅ Agregado a wheel: ${baseColor} -> ${varName}`);
      } else if (isPaletteColor) {
        // Agrupar por categoría semántica (contrast, primary, etc.)
        const category = paletteCategories.find(cat =>
          colorName.startsWith(`${cat}-`)
        );

        if (!paletteColors[category]) {
          paletteColors[category] = [];
        }
        paletteColors[category].push({ varName, value });
        console.log(`✅ Agregado a palette: ${category} -> ${varName}`);
      }
    });

    // Ordenar las variables dentro de cada grupo
    Object.keys(wheelColors).forEach(color => {
      wheelColors[color].sort((a, b) => {
        const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
    });

    Object.keys(paletteColors).forEach(category => {
      paletteColors[category].sort((a, b) => {
        const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
    });

    console.log('🎨 Resultado final ColorPanel:', {
      wheelColors: Object.keys(wheelColors),
      paletteColors: Object.keys(paletteColors),
      totalWheel: Object.keys(wheelColors).length,
      totalPalette: Object.keys(paletteColors).length
    });

    return { wheelColors, paletteColors };
  }, [cssVars]);

  // Función para transformar etiquetas de color
  const colorLabelTransform = (varName) => {
    return varName.replace(/^--(color|tone)-/, '').replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase());
  };

  // Configuración de tabs de sección
  const sectionTabs = [
    {
      key: 'wheel',
      label: 'Color Wheel',
      icon: '',
      count: Object.keys(colorVars.wheelColors).length
    },
    {
      key: 'palette',
      label: 'Color Palette',
      icon: '',
      count: Object.keys(colorVars.paletteColors).length
    }
  ];

  // Conteo de modificaciones
  const modifiedCount = Object.keys(modifiedVars).length;

  return {
    // Estados de UI
    activeSection,
    setActiveSection,
    hoveredItem,
    setHoveredItem,

    // Datos procesados
    colorVars,
    sectionTabs,
    modifiedCount,

    // Funciones utilitarias
    colorLabelTransform
  };
}