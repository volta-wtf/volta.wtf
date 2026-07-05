/* Project base components — styled ONLY from the project's variables
   (accent, radius, font, spacing, scale, mode). Deployables of the
   DOCUMENT, not the chrome. + ComponentsScreen: editable catalog page. */
const {
  Panel: PcPanel, Label: PcLabel, Input: PcInput, SelectField: PcSelect, TextField: PcText,
} = window.DesignerDesignSystem_6adbd8;

/* helpers: resolve project theme → concrete values */
function pcTokens(theme) {
  const t = { ...PROJECT_THEME_DEFAULTS, ...theme };
  const doc = themeDoc(t);
  return {
    accent: t.accent,
    radius: THEME_RADIUS_PX[t.radius],
    font: THEME_FONTS[t.font],
    sp: t.spacing,
    scale: t.scale,
    surface: doc.surface,
    text: doc.text,
    muted: doc.muted,
  };
}

/* ── the base set ──────────────────────────────────────────────── */
function PButton({ theme, label = 'Action', kind = 'primary' }) {
  const k = pcTokens(theme);
  const solid = kind === 'primary';
  return (
    <button type="button" style={{
      fontFamily: k.font, fontSize: 14 * k.scale, fontWeight: 500,
      padding: `${k.sp * 2}px ${k.sp * 4}px`,
      borderRadius: Math.min(k.radius, 24),
      border: solid ? '1px solid transparent' : `1px solid ${k.text}33`,
      background: solid ? k.accent : 'transparent',
      color: solid ? '#fff' : k.text,
      cursor: 'pointer',
    }}>{label}</button>
  );
}

function PTag({ theme, label = 'Tag' }) {
  const k = pcTokens(theme);
  return (
    <span style={{
      fontFamily: k.font, fontSize: 11 * k.scale, fontWeight: 500,
      padding: `${k.sp / 2}px ${k.sp * 1.5}px`,
      borderRadius: Math.min(k.radius, 999),
      background: `${k.accent}22`, color: k.accent,
      display: 'inline-block',
    }}>{label}</span>
  );
}

function PInputBase({ theme, placeholder = 'Email address' }) {
  const k = pcTokens(theme);
  return (
    <input placeholder={placeholder} style={{
      fontFamily: k.font, fontSize: 14 * k.scale,
      padding: `${k.sp * 2}px ${k.sp * 3}px`,
      borderRadius: Math.min(k.radius, 16),
      border: `1px solid ${k.text}2e`,
      background: k.surface, color: k.text,
      outline: 'none', width: '100%', boxSizing: 'border-box',
    }} />
  );
}

function PCard({ theme, title = 'Card title', body = 'Supporting copy for the card.', cta = 'Learn more' }) {
  const k = pcTokens(theme);
  return (
    <div style={{
      background: k.surface, color: k.text,
      border: `1px solid ${k.text}1f`, borderRadius: k.radius,
      padding: k.sp * 4, display: 'flex', flexDirection: 'column', gap: k.sp * 2,
      width: '100%', boxSizing: 'border-box',
      boxShadow: '0 4px 16px -8px rgb(0 0 0 / 0.15)',
    }}>
      <PTag theme={theme} label="New" />
      <div style={{ fontFamily: k.font, fontSize: 17 * k.scale, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ fontFamily: k.font, fontSize: 13 * k.scale, opacity: 0.65, lineHeight: 1.5 }}>{body}</div>
      <div><PButton theme={theme} label={cta} /></div>
    </div>
  );
}

function PHeading({ theme, text = 'Design at 60fps' }) {
  const k = pcTokens(theme);
  return <div style={{ fontFamily: k.font, fontSize: 30 * k.scale, fontWeight: 600, letterSpacing: '-0.02em', color: k.text }}>{text}</div>;
}

function PSwitchBase({ theme, on = true }) {
  const k = pcTokens(theme);
  return (
    <span style={{ display: 'inline-flex', width: 36, height: 20, borderRadius: 999, background: on ? k.accent : `${k.text}30`, position: 'relative', transition: 'background 120ms' }}>
      <span style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: 999, background: '#fff', boxShadow: '0 1px 2px rgb(0 0 0 / 0.2)', transition: 'left 120ms' }}></span>
    </span>
  );
}

/* Catalog registry: name → {render, samples editable via fields} */
const PROJECT_COMPONENTS = {
  Heading: { fields: { text: 'text' }, defaults: { text: 'Design at 60fps' }, render: (th, p) => <PHeading theme={th} {...p} /> },
  Button: { fields: { label: 'text', kind: ['primary', 'outline'] }, defaults: { label: 'Get started', kind: 'primary' }, render: (th, p) => <PButton theme={th} {...p} /> },
  Tag: { fields: { label: 'text' }, defaults: { label: 'New' }, render: (th, p) => <PTag theme={th} {...p} /> },
  Input: { fields: { placeholder: 'text' }, defaults: { placeholder: 'Email address' }, render: (th, p) => <PInputBase theme={th} {...p} /> },
  Switch: { fields: { on: ['on', 'off'] }, defaults: { on: 'on' }, render: (th, p) => <PSwitchBase theme={th} on={p.on !== 'off'} /> },
  Card: { fields: { title: 'text', body: 'text', cta: 'text' }, defaults: { title: 'Arc Lounge Chair', body: 'Bent oak, wool upholstery. Ships in 2 weeks.', cta: 'Buy · 640 €' }, render: (th, p) => <PCard theme={th} {...p} /> },
};

/* ── Components page (mode): editable catalog bound to project vars ── */
function ComponentsScreen({ file, onPersist }) {
  const [theme, setTheme] = React.useState({ ...PROJECT_THEME_DEFAULTS, ...(file.theme || {}) });
  const [samples, setSamples] = React.useState(file.samples || {});
  const [selName, setSelName] = React.useState('Card');

  React.useEffect(() => {
    if (!onPersist) return undefined;
    const t = setTimeout(() => onPersist({ theme, samples }), 350);
    return () => clearTimeout(t);
  }, [theme, samples]);

  const k = pcTokens(theme);
  const def = PROJECT_COMPONENTS[selName];
  const sample = { ...def.defaults, ...(samples[selName] || {}) };
  const setSample = (kk, v) => setSamples((s) => ({ ...s, [selName]: { ...sample, [kk]: v } }));

  return (
    <React.Fragment>
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', background: 'var(--canvas)', padding: 24 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PcLabel eyebrow>Base components · vinculados a las variables del proyecto</PcLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
            {Object.entries(PROJECT_COMPONENTS).map(([name, d]) => {
              const p = { ...d.defaults, ...(samples[name] || {}) };
              const selected = selName === name;
              return (
                <div key={name} onClick={() => setSelName(name)} style={{
                  background: k.surface, borderRadius: 10, cursor: 'pointer',
                  border: '1px solid var(--border)',
                  outline: selected ? '1.5px solid var(--selection)' : 'none', outlineOffset: -1,
                  display: 'flex', flexDirection: 'column', minHeight: 150,
                }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
                    {d.render(theme, p)}
                  </div>
                  <div style={{ padding: '6px 10px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-ui-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>{name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--muted-foreground)' }}>project</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PcPanel side="right" width={300}>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <PcLabel eyebrow style={{ display: 'block', marginBottom: 6 }}>Sample · {selName}</PcLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {Object.entries(def.fields).map(([kk, kind]) => (
                Array.isArray(kind) ? (
                  <PcSelect key={kk} label={kk} options={kind} value={String(sample[kk])} onChange={(e) => setSample(kk, e.target.value)} />
                ) : (
                  <PcText key={kk} label={kk} value={String(sample[kk])} onChange={(e) => setSample(kk, e.target.value)} />
                )
              ))}
            </div>
          </div>
          <window.ProjectThemePanel
            theme={theme}
            onChange={setTheme}
            varValues={theme.vars || {}}
            onVarChange={(kk, v) => setTheme((t) => ({ ...t, vars: { ...(t.vars || {}), [kk]: v } }))}
            onResetVars={() => setTheme((t) => ({ ...t, vars: {} }))}
            onClose={() => {}}
          />
        </div>
      </PcPanel>
    </React.Fragment>
  );
}

Object.assign(window, { ComponentsScreen, PROJECT_COMPONENTS, pcTokens });
