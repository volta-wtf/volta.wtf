/* Theme panels — shared shell used by BOTH the project-variables panel
   and the editor-chrome panel. Two tabs: Theme (curated) · Variables
   (Figma-style typed table). Built only with chrome components. */
const {
  Label: TpLabel, Tabs: TpTabs, Slider: TpSlider, Button: TpButton, IconButton: TpIconBtn,
  ColorField: TpColor, NumberField: TpNum, Icon: TpIcon, SelectField: TpSelect,
} = window.DesignerDesignSystem_6adbd8;

const PROJECT_THEME_DEFAULTS = {
  mode: 'light', accent: '#d97757', radius: 'md', font: 'geist', spacing: 4, scale: 1,
};
const THEME_ACCENTS = ['#6b6b6b', '#4864c8', '#7a5cd6', '#a855f7', '#16a34a', '#e11d48', '#ea580c', '#e8a020', '#0891b2', '#d97757'];
const THEME_RADIUS_PX = { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 999 };
const THEME_FONTS = {
  geist: "'Geist', system-ui, sans-serif",
  serif: "'Source Serif 4', Georgia, serif",
  mono: "'Geist Mono', ui-monospace, monospace",
  system: 'system-ui, sans-serif',
};
const themeDoc = (theme) => (theme.mode === 'dark'
  ? { surface: '#26241f', text: '#f2f0ec', muted: '#3a3833' }
  : { surface: '#ffffff', text: '#1a1a1a', muted: '#eceae6' });

function TpSection({ title, right, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <TpLabel eyebrow>{title}</TpLabel>
        {right ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-foreground)' }}>{right}</span> : null}
      </div>
      {children}
    </div>
  );
}

/** Curated theme controls (mode/accent/radius/font/spacing/scale). */
function ThemeControls({ theme, defaults, onChange }) {
  const t = { ...defaults, ...theme };
  const set = (p) => onChange({ ...t, ...p });
  return (
    <React.Fragment>
      <TpSection title="Mode">
        <TpTabs full value={t.mode} onChange={(mode) => set({ mode })}
          items={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
      </TpSection>
      <TpSection title="Accent">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {THEME_ACCENTS.map((c) => (
            <button key={c} type="button" title={c} onClick={() => set({ accent: c })} style={{
              width: 26, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', background: c, padding: 0,
              boxShadow: t.accent === c
                ? '0 0 0 2px var(--popover), 0 0 0 4px var(--foreground)'
                : 'inset 0 0 0 1px oklch(0 0 0 / 0.15)',
            }} />
          ))}
        </div>
      </TpSection>
      <TpSection title="Radius" right={`${THEME_RADIUS_PX[t.radius]}px`}>
        <TpTabs full value={t.radius} onChange={(radius) => set({ radius })}
          items={Object.keys(THEME_RADIUS_PX).map((r) => ({ value: r, label: r }))} />
      </TpSection>
      <TpSection title="Font">
        <TpTabs full value={t.font} onChange={(font) => set({ font })}
          items={[{ value: 'geist', label: 'Geist' }, { value: 'serif', label: 'Serif' }, { value: 'mono', label: 'Mono' }, { value: 'system', label: 'System' }]} />
      </TpSection>
      <TpSection title="Spacing" right={`${t.spacing}px base`}>
        <TpSlider min={2} max={8} step={1} value={t.spacing} onChange={(e) => set({ spacing: Number(e.target.value) })} aria-label="Spacing base" />
      </TpSection>
      <TpSection title="Scale" right={`${Number(t.scale).toFixed(2)}×`}>
        <TpSlider min={0.8} max={1.4} step={0.05} value={t.scale} onChange={(e) => set({ scale: Number(e.target.value) })} aria-label="Type scale" />
      </TpSection>
    </React.Fragment>
  );
}

/** Figma-style variables table: grouped rows, type icon, mono name, typed editor. */
function VarsTable({ groups, values, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {groups.map((g) => (
        <div key={g.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TpLabel eyebrow>{g.name}</TpLabel>
          {g.vars.map((v) => {
            const val = values[v.key] != null ? values[v.key] : v.default;
            return (
              <div key={v.key} style={{ display: 'grid', gridTemplateColumns: '16px minmax(0,1fr) 108px', gap: 6, alignItems: 'center', minHeight: 26 }}>
                <span style={{ display: 'inline-flex', color: 'var(--muted-foreground)' }}>
                  <TpIcon name={v.type === 'color' ? 'field-color' : 'field-number'} size={12} />
                </span>
                <span title={v.key} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--foreground)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.label || v.key}</span>
                {v.type === 'color' ? (
                  <TpColor value={String(val)} onChange={(c) => onChange(v.key, c)} />
                ) : (
                  <TpNum label={v.affix || ''} unit={v.unit || 'px'} value={Number(val)} min={v.min} max={v.max} step={v.step || 1} onChange={(n) => onChange(v.key, n)} title={v.label || v.key} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Panel shell: title + tabs (Theme | Variables) + reset, floating popover style. */
function ThemePanelShell({ title, theme, defaults, onChange, varGroups, varValues, onVarChange, onResetVars, footnote, onClose }) {
  const [tab, setTab] = React.useState('theme');
  return (
    <div style={{
      width: 276, maxHeight: '100%', overflowY: 'auto',
      background: 'var(--popover)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-popover)',
      padding: 14, display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--tracking-tight)' }}>{title}</span>
        <TpIconBtn size="sm" name="close" label="Close" tooltip={false} onClick={onClose} />
      </div>
      {varGroups ? (
        <TpTabs full value={tab} onChange={setTab}
          items={[{ value: 'theme', label: 'Theme' }, { value: 'vars', label: 'Variables' }]} />
      ) : null}
      {tab === 'theme' || !varGroups ? (
        <React.Fragment>
          <ThemeControls theme={theme} defaults={defaults} onChange={onChange} />
          <TpButton variant="secondary" onClick={() => onChange({ ...defaults })}>Reset to defaults</TpButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <VarsTable groups={varGroups} values={varValues || {}} onChange={onVarChange} />
          <TpButton variant="secondary" onClick={onResetVars}>Reset variables</TpButton>
        </React.Fragment>
      )}
      {footnote ? <div style={{ fontSize: 11, color: 'var(--muted-foreground)', lineHeight: 1.45 }}>{footnote}</div> : null}
    </div>
  );
}

/** ProjectThemePanel — the DOCUMENT's variables (kept API from before). */
function ProjectThemePanel({ theme, onChange, varValues, onVarChange, onResetVars, onClose }) {
  return (
    <ThemePanelShell
      title="Project variables"
      theme={theme} defaults={PROJECT_THEME_DEFAULTS} onChange={onChange}
      varGroups={PROJECT_VAR_GROUPS} varValues={varValues} onVarChange={onVarChange} onResetVars={onResetVars}
      footnote="Afecta al documento (fills vinculados, radius, tipografía, espaciado). El chrome del editor no cambia."
      onClose={onClose}
    />
  );
}

/* Project raw variables (Variables tab) — override the curated theme. */
const PROJECT_VAR_GROUPS = [
  { name: 'Color', vars: [
    { key: 'accent', label: 'accent', type: 'color', default: '#d97757' },
    { key: 'surface', label: 'surface', type: 'color', default: '#ffffff' },
    { key: 'text', label: 'text', type: 'color', default: '#1a1a1a' },
  ]},
  { name: 'Dimension', vars: [
    { key: 'radiusPx', label: 'radius', type: 'number', unit: 'px', min: 0, max: 999, default: 8 },
    { key: 'spacingPx', label: 'spacing base', type: 'number', unit: 'px', min: 2, max: 12, default: 4 },
  ]},
];

Object.assign(window, {
  ProjectThemePanel, ThemePanelShell, ThemeControls, VarsTable,
  PROJECT_THEME_DEFAULTS, PROJECT_VAR_GROUPS, THEME_RADIUS_PX, THEME_FONTS, THEME_ACCENTS, themeDoc,
});
