/* Editor CHROME theme — independent from any project. Persists to its
   own localStorage key; applied as CSS vars + .dark on the editor root. */
const CHROME_THEME_KEY = 'dsrEditor.chrome.v1';
const CHROME_THEME_DEFAULTS = { mode: 'light', accent: '#4864c8', radius: 'lg', font: 'geist', spacing: 4, scale: 1 };
const CHROME_VAR_DEFAULTS = {};

const CHROME_VAR_GROUPS = [
  { name: 'Surfaces', vars: [
    { key: '--background', label: 'background', type: 'color', default: '#fdfcfa' },
    { key: '--muted', label: 'muted', type: 'color', default: '#f5f4f1' },
    { key: '--border', label: 'border', type: 'color', default: '#e7e5e0' },
    { key: '--canvas', label: 'canvas', type: 'color', default: '#f5f3f0' },
  ]},
  { name: 'Accent', vars: [
    { key: '--selection', label: 'selection', type: 'color', default: '#4864c8' },
    { key: '--brand', label: 'brand', type: 'color', default: '#d97757' },
  ]},
  { name: 'Density', vars: [
    { key: '--control-height', label: 'control height', type: 'number', unit: 'px', min: 22, max: 36, default: 28 },
    { key: '--row-height', label: 'row height', type: 'number', unit: 'px', min: 24, max: 44, default: 32 },
    { key: '--panel-width', label: 'panel width', type: 'number', unit: 'px', min: 200, max: 360, step: 4, default: 264 },
  ]},
];

const CHROME_RADIUS_SEED = { none: '0px', sm: '6px', md: '8px', lg: '10px', xl: '14px', full: '18px' };
const CHROME_FONT_STACK = {
  geist: "'Geist', ui-sans-serif, system-ui, sans-serif",
  serif: "'Source Serif 4', Georgia, serif",
  mono: "'Geist Mono', ui-monospace, monospace",
  system: 'system-ui, sans-serif',
};

function chromeThemeLoad() {
  try {
    const raw = localStorage.getItem(CHROME_THEME_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return { theme: { ...CHROME_THEME_DEFAULTS, ...(s.theme || {}) }, vars: s.vars || {} };
    }
  } catch (e) { /* ignore */ }
  return { theme: { ...CHROME_THEME_DEFAULTS }, vars: {} };
}
function chromeThemeSave(state) {
  try { localStorage.setItem(CHROME_THEME_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

/** CSS custom properties for the editor root from theme + raw overrides. */
function chromeCssVars(state) {
  const t = { ...CHROME_THEME_DEFAULTS, ...state.theme };
  const out = {
    '--selection': t.accent,
    '--selection-muted': `color-mix(in oklab, ${t.accent} 16%, transparent)`,
    '--ring-color': `color-mix(in oklab, ${t.accent} 35%, transparent)`,
    '--radius': CHROME_RADIUS_SEED[t.radius] || '10px',
    '--font-sans': CHROME_FONT_STACK[t.font] || CHROME_FONT_STACK.geist,
    '--control-height': `${Math.round(28 * (t.spacing / 4) * 0 + 24 + t.spacing)}px`,
  };
  // spacing → density: base 4 → 28px controls; each step ±1px on controls, ±2 on rows.
  out['--control-height'] = `${24 + t.spacing}px`;
  out['--control-height-sm'] = `${20 + t.spacing}px`;
  out['--row-height'] = `${24 + t.spacing * 2}px`;
  out['--pane-header-height'] = `${30 + Math.round(t.spacing * 1.5)}px`;
  Object.entries(state.vars || {}).forEach(([k, v]) => {
    out[k] = typeof v === 'number' ? `${v}px` : v;
  });
  return out;
}

/** Font-size scale applies to the <html> root so rem tokens follow. */
function chromeApplyScale(state) {
  const t = { ...CHROME_THEME_DEFAULTS, ...state.theme };
  try { document.documentElement.style.fontSize = `${Math.round(16 * t.scale * 100) / 100}px`; } catch (e) { /* ignore */ }
}

/** ChromeThemePanel — Theme + Variables tabs, persisted; chrome components only. */
function ChromeThemePanel({ state, onState, onClose }) {
  const set = (next) => { chromeThemeSave(next); onState(next); };
  return (
    <ThemePanelShell
      title="Editor theme"
      theme={state.theme} defaults={CHROME_THEME_DEFAULTS}
      onChange={(theme) => set({ ...state, theme })}
      varGroups={CHROME_VAR_GROUPS}
      varValues={state.vars}
      onVarChange={(k, v) => set({ ...state, vars: { ...state.vars, [k]: v } })}
      onResetVars={() => set({ ...state, vars: {} })}
      footnote="Solo el chrome del editor — independiente del proyecto. Persistente en este navegador."
      onClose={onClose}
    />
  );
}

Object.assign(window, {
  ChromeThemePanel, chromeThemeLoad, chromeThemeSave, chromeCssVars, chromeApplyScale,
  CHROME_THEME_DEFAULTS, CHROME_VAR_GROUPS,
});
