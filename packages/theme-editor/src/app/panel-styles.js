// Estilos aislados para el panel del Theme Editor (con estados CSS)
export const styles = {
  panel: {
    all: 'unset',
    position: 'fixed',
    top: '20px',
    right: '20px',
    bottom: '65px',
    width: '450px',
    height: 'auto',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    zIndex: '10000',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    pointerEvents: 'auto',
    color: '#111827',
    lineHeight: '1.5',
  },
  header: {
    padding: '8px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    padding: '8px',
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
    color: '#6b7280',
    borderRadius: '4px',
    lineHeight: 1,
    verticalAlign: 'middle',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',

    ':hover': {
      background: 'rgba(0, 0, 0, 0.05)',
      color: '#374151',
    },

    ':active': {
      background: 'rgba(0, 0, 0, 0.1)',
    },
  },
  content: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  tabBar: {
    display: 'flex',
    flexShrink: 0,
    gap: '4px',
  },
  tab: {
    flex: 1,
    padding: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    lineHeight: 1,

    ':hover:not(:disabled)': {
      background: 'rgba(0, 0, 0, 0.02)',
      color: '#374151',
    },

    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    },

    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  tabActive: {
    flex: 1,
    padding: '8px',
    border: 'none',
    background: 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    color: '#3b82f6',
    borderRadius: '4px',
    transition: 'all 0.2s ease',

    ':hover:not(:disabled)': {
      background: 'rgba(59, 130, 246, 0.1)',
    },
  },
  tabContent: {
    flex: 1,
    overflow: 'auto',
  },
  propertyList: {
    paddingBlock: '16px',
  },
  variable: {
    padding: '2px 8px',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid transparent',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: '#f9fafb',
    },
  },
  variableModified: {
    padding: '2px 8px',
    backgroundColor: 'rgba(60, 130, 240, 0.05)',
    borderRight: '1px solid rgba(60, 130, 240, 0.6)',

    ':hover': {
      backgroundColor: 'rgba(60, 130, 240, 0.1)',
    },
  },
  property: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '4px',
  },
  label: {
    flexShrink: 0,
    padding: '8px',
    display: 'block',
    fontSize: '11px',
    fontWeight: '500',
    color: '#374151',
    width: '12rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  indicator: {
    color: '#3b82f6',
    marginLeft: '4px',
    fontSize: '8px',
    verticalAlign: 'text-top'
  },
  input: {
    width: '100%',
    padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    border: '1px solid transparent',
    borderRadius: '4px',
    fontSize: '11px',
    lineHeight: '14px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
    userSelect: 'text',
    WebkitUserSelect: 'text',
    MozUserSelect: 'text',
    msUserSelect: 'text',
    outline: 'none',
    color: '#111827',
    transition: 'all 0.2s ease',

    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 1px #3b82f6',
      backgroundColor: '#ffffff',
    },

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  value: {
    display: 'none',
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '4px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
  },
  resetButton: {
    padding: '4px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    fontSize: '11px',
    cursor: 'pointer',
    color: '#374151',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: '#111827',
    },

    ':active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  debugButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '8px',
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    borderInline: '0',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#374151',
    transition: 'background-color 0.2s ease',

    ':hover': {
      backgroundColor: '#e5e7eb',
    },

    ':active': {
      backgroundColor: '#d1d5db',
    },
  },
  debugContent: {
    backgroundColor: '#1f2937',
    color: '#e5e7eb',
    padding: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
    fontSize: '11px',
    maxHeight: '200px',
    overflow: 'auto',
  },
  debugVariable: {
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: '#f1f3f4',
      borderColor: '#dee2e6',
    },
  },
  debugVariableName: {
    fontWeight: '600',
    color: '#495057',
    marginBottom: '8px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
  },
  debugVariableValue: {
    color: '#6f42c1',
    marginBottom: '4px',
    fontSize: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
  },
  debugVariableInfo: {
    fontSize: '11px',
    color: '#6c757d',
    marginTop: '4px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  footer: {
    padding: '12px 16px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    ':hover:not(:disabled)': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    },

    ':active:not(:disabled)': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.4)',
    },

    ':disabled': {
      backgroundColor: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  saveButtonDisabled: {
    backgroundColor: '#d1d5db',
    color: '#9ca3af',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'not-allowed',
  },
  modifiedCount: {
    fontSize: '12px',
    color: '#6b7280',
  },
  sectionHeader: {
    padding: '12px 16px',
    backgroundColor: 'transparent',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    fontWeight: '600',
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.8)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  },
  sectionHeaderHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  collapseIcon: {
    fontSize: '12px',
    transition: 'transform 0.2s ease',
  },
  debugSection: {
    marginBottom: '24px',
  },
  debugSectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    paddingBottom: '8px',
    borderBottom: '2px solid #e5e7eb',
  }
};