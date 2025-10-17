import React from 'react';
import { styles } from './panel-styles.js';
import { cn, cls, tabClass, saveButtonClass } from './class-names.js';

// ========================
// COMPONENTES UI PUROS
// ========================

// Componente Tab individual
export const Tab = ({ isActive, onClick, icon, children, disabled = false }) => (
  <button
    className={tabClass(isActive)}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    {icon || children}
  </button>
);

// Componente TabBar que contiene todos los tabs
export const AppTabs = ({ activeTab, onTabChange, disabled = false }) => (
  <div className={styles.tabBar}>
    <Tab
      isActive={activeTab === 'variables'}
      onClick={() => onTabChange('variables')}
      disabled={disabled}
    >
      Theme
    </Tab>
    <Tab
      isActive={activeTab === 'colors'}
      onClick={() => onTabChange('colors')}
      disabled={disabled}
    >
      Palette
    </Tab>
    <Tab
      isActive={activeTab === 'debug'}
      onClick={() => onTabChange('debug')}
      disabled={disabled}
    >
      Debug
    </Tab>
  </div>
);

// Componente de contenedor del panel
export const AppFrame = ({ children }) => (
  <div id="theme-editor-panel" className={cls('panel')}>
    {children}
  </div>
);

// Componente Header del panel
export const AppHeader = ({ children, onClose }) => (
  <div className={cls('header')}>
    <div className={cls('headerTop')}>
      {children}
      <button className={cls('closeButton')} onClick={onClose}>✕</button>
    </div>
  </div>
);

// Componente de contenido del panel
export const AppContent = ({ children }) => (
  <div className={cls('content')}>
    <div className={cls('tabContent')}>
      {children}
    </div>
  </div>
);

// Componente de pantalla de carga
export const LoadingScreen = ({ onClose }) => (
  <AppFrame>
    <AppHeader onClose={onClose}>
      <AppTabs
        activeTab="variables"
        onTabChange={() => {}}
        disabled={true}
      />
    </AppHeader>
    <div className={cls('loading')}>
      Cargando variables CSS...
    </div>
  </AppFrame>
);