/* Inspector panes + component registry for the visual component editor.
   Loaded before screen-design.jsx; exports via window. */
const {
  Pane: IpPane, Label: IpLabel, IconButton: IpIconBtn, Badge: IpBadge, BoundField: IpBound,
  TextField: IpText, SelectField: IpSelect, BooleanField: IpBool, NumberField: IpNum,
  ColorField: IpColor, ActionFill: IpFill, GradientEditor: IpGrad, AssetGrid: IpGrid, LibraryItem: IpItem,
  Tabs: IpTabs,
} = window.DesignerDesignSystem_6adbd8;
const IpNS = window.DesignerDesignSystem_6adbd8;
const IpGradientCss = IpNS.GradientCss || ((g) => `linear-gradient(${g.angle || 135}deg, ${g.stops.map((s) => `${s.color} ${s.position}%`).join(', ')})`);

/* ── deployable component registry ─────────────────────────────── */
const COMPONENT_DEFS = {
  Button: {
    icon: 'component', w: 120, h: 28,
    defaults: { children: 'Publish', variant: 'primary', size: 'md' },
    props: {
      children: { label: 'Label', type: 'text' },
      variant: { type: 'enum', options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'] },
      size: { type: 'enum', options: ['sm', 'md', 'lg'] },
      disabled: { type: 'boolean' },
    },
  },
  Badge: {
    icon: 'component', w: 76, h: 18,
    defaults: { children: 'Updated', variant: 'secondary' },
    props: {
      children: { label: 'Label', type: 'text' },
      variant: { type: 'enum', options: ['default', 'secondary', 'outline', 'destructive', 'brand', 'selection'] },
    },
  },
  Input: {
    icon: 'field-text', w: 180, h: 28,
    defaults: { placeholder: 'Search layers…', size: 'md' },
    props: {
      placeholder: { type: 'text' },
      size: { type: 'enum', options: ['sm', 'md'] },
      quiet: { type: 'boolean' },
      mono: { type: 'boolean' },
      disabled: { type: 'boolean' },
    },
  },
  Switch: {
    icon: 'field-boolean', w: 150, h: 20,
    defaults: { label: 'Autosave', defaultChecked: true },
    props: {
      label: { type: 'text' },
      defaultChecked: { label: 'On', type: 'boolean', remount: true },
    },
  },
  Checkbox: {
    icon: 'check', w: 150, h: 20,
    defaults: { label: 'Clip content', defaultChecked: true },
    props: {
      label: { type: 'text' },
      defaultChecked: { label: 'Checked', type: 'boolean', remount: true },
    },
  },
  Avatar: {
    icon: 'users', w: 32, h: 32,
    defaults: { name: 'Maya Lindqvist', presence: true, size: 'lg' },
    props: {
      name: { type: 'text' },
      presence: { type: 'boolean' },
      size: { type: 'enum', options: ['sm', 'md', 'lg'] },
    },
  },
  Kbd: {
    icon: 'keyboard', w: 60, h: 18,
    defaults: { keysText: 'mod,K' },
    props: { keysText: { label: 'Keys', type: 'text', hint: 'coma-separado' } },
    map: (p) => ({ keys: String(p.keysText || '').split(',').map((s) => s.trim()).filter(Boolean) }),
  },
  IconButton: {
    icon: 'select', w: 28, h: 28,
    defaults: { name: 'select', label: 'Tool', active: true },
    props: {
      name: { label: 'Icon role', type: 'text' },
      label: { type: 'text' },
      active: { type: 'boolean' },
    },
  },
};

function RenderComponent({ el }) {
  const def = COMPONENT_DEFS[el.component];
  const C = IpNS[el.component];
  if (!def || !C) return null;
  const raw = { ...def.defaults, ...el.props };
  const props = def.map ? { ...raw, ...def.map(raw) } : raw;
  if (def.map) delete props.keysText;
  const key = JSON.stringify(props); // remount on prop change (defaultChecked etc.)
  return (
    <div key={key} style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <C {...props} />
    </div>
  );
}

/* ── computed visual style (fills, shadows, stroke) ────────────── */
const hexA = (hex, alpha) => {
  const a = Math.round(Math.max(0, Math.min(100, alpha == null ? 100 : alpha)) * 2.55);
  return `${hex}${a.toString(16).padStart(2, '0')}`;
};

function elVisualStyle(el) {
  const s = {};
  // fill
  const ft = el.fillType || (el.gradient ? 'gradient' : 'solid');
  if (el.type === 'rectangle' || el.type === 'ellipse' || el.type === 'frame') {
    if (ft === 'none') s.background = 'transparent';
    else if (ft === 'gradient' && el.gradient) s.background = IpGradientCss(el.gradient);
    else if (el.type !== 'frame' || el.fill) s.background = el.fill || undefined;
  }
  // stroke
  if (el.strokeWidth) s.boxShadow = `inset 0 0 0 ${el.strokeWidth}px ${el.stroke || '#1a1a1a'}`;
  // shadows
  if (el.shadows && el.shadows.length) {
    const sh = el.shadows.map((x) => `${x.x}px ${x.y}px ${x.blur}px ${x.spread || 0}px ${hexA(x.color || '#000000', x.alpha != null ? x.alpha : 24)}`).join(', ');
    s.boxShadow = s.boxShadow ? `${s.boxShadow}, ${sh}` : sh;
  }
  if (el.type === 'rectangle' || el.type === 'frame') s.borderRadius = el.radius != null ? el.radius : (el.type === 'frame' ? 0 : 10);
  if (el.type === 'ellipse') s.borderRadius = '50%';
  return s;
}

const DEFAULT_GRADIENT = {
  type: 'linear', angle: 135,
  stops: [{ color: '#d97757', position: 0 }, { color: '#4864c8', position: 100 }],
};

/* ── panes ─────────────────────────────────────────────────────── */
function FillPane({ el, onPatch, gradients, tokenBound, tokenValue, onTokenBound }) {
  const ft = el.fillType || 'solid';
  return (
    <IpPane title="Fill">
      {onTokenBound ? (
        <div className="dsr-field">
          <span className="dsr-field__label">Token</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
            {tokenBound ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: tokenValue, boxShadow: 'inset 0 0 0 1px oklch(0 0 0 / 0.15)' }}></span>
                <IpBound field="accent" onUnbind={() => onTokenBound(false)} />
              </span>
            ) : <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>—</span>}
            <window.DesignerDesignSystem_6adbd8.Switch checked={!!tokenBound} onChange={(e) => onTokenBound(e.target.checked)} />
          </div>
        </div>
      ) : null}
      {!tokenBound ? (
        <IpSelect label="Type" options={[{ value: 'none', label: 'None' }, { value: 'solid', label: 'Solid' }, { value: 'gradient', label: 'Gradient' }]}
          value={ft} onChange={(e) => onPatch({ fillType: e.target.value, gradient: e.target.value === 'gradient' ? (el.gradient || DEFAULT_GRADIENT) : el.gradient })} />
      ) : null}
      {!tokenBound && ft === 'solid' ? <IpFill value={el.fill || '#d97757'} onChange={(fill) => onPatch({ fill })} /> : null}
      {!tokenBound && ft === 'gradient' ? (
        <IpGrad value={el.gradient || DEFAULT_GRADIENT} onChange={(gradient) => onPatch({ gradient })} presets={gradients || []} />
      ) : null}
    </IpPane>
  );
}

function StrokePane({ el, onPatch }) {
  return (
    <IpPane title="Stroke" defaultOpen={!!el.strokeWidth}>
      <div className="dsr-field">
        <span className="dsr-field__label">Width</span>
        <IpNum label="W" unit="px" value={el.strokeWidth || 0} min={0} max={20} onChange={(strokeWidth) => onPatch({ strokeWidth })} title="Stroke width" />
      </div>
      <div className="dsr-field">
        <span className="dsr-field__label">Color</span>
        <IpColor value={el.stroke || '#1a1a1a'} onChange={(stroke) => onPatch({ stroke })} />
      </div>
    </IpPane>
  );
}

function EffectsPane({ el, onPatch }) {
  const shadows = el.shadows || [];
  const patchShadow = (i, p) => onPatch({ shadows: shadows.map((s, j) => (j === i ? { ...s, ...p } : s)) });
  return (
    <IpPane title="Effects" defaultOpen={!!shadows.length}
      actions={<IpIconBtn size="sm" name="add" label="Add shadow" tooltip={false}
        onClick={() => onPatch({ shadows: [...shadows, { x: 0, y: 8, blur: 24, spread: -4, color: '#000000', alpha: 24 }] })} />}>
      {shadows.length === 0 ? (
        <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Sin sombras. Añade una con +.</div>
      ) : null}
      {shadows.map((sh, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 6, borderBottom: i < shadows.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IpBadge variant="outline">shadow {i + 1}</IpBadge>
            <IpIconBtn size="sm" name="remove" label="Remove" tooltip={false}
              onClick={() => onPatch({ shadows: shadows.filter((_, j) => j !== i) })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <IpNum label="X" unit="px" value={sh.x} min={-64} max={64} onChange={(x) => patchShadow(i, { x })} title="Offset X" />
            <IpNum label="Y" unit="px" value={sh.y} min={-64} max={64} onChange={(y) => patchShadow(i, { y })} title="Offset Y" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <IpNum label="B" unit="px" value={sh.blur} min={0} max={128} onChange={(blur) => patchShadow(i, { blur })} title="Blur" />
            <IpNum label="S" unit="px" value={sh.spread || 0} min={-32} max={32} onChange={(spread) => patchShadow(i, { spread })} title="Spread" />
          </div>
          <div className="dsr-field">
            <span className="dsr-field__label">Color</span>
            <IpColor value={sh.color || '#000000'} onChange={(color) => patchShadow(i, { color })}
              alpha={sh.alpha != null ? sh.alpha : 24} onAlphaChange={(alpha) => patchShadow(i, { alpha })} />
          </div>
        </div>
      ))}
    </IpPane>
  );
}

function AutoLayoutPane({ el, onPatch }) {
  const lay = el.layout || { direction: 'none', gap: 12, padding: 16, align: 'start' };
  const set = (p) => onPatch({ layout: { ...lay, ...p } });
  return (
    <IpPane title="Auto layout" defaultOpen={lay.direction !== 'none'}>
      <div className="dsr-field">
        <span className="dsr-field__label">Direction</span>
        <IpTabs full value={lay.direction} onChange={(direction) => set({ direction })}
          items={[{ value: 'none', label: '—' }, { value: 'row', label: '→' }, { value: 'column', label: '↓' }]} />
      </div>
      {lay.direction !== 'none' ? (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <IpNum label="G" unit="px" value={lay.gap} min={0} max={96} step={4} onChange={(gap) => set({ gap })} title="Gap" />
            <IpNum label="P" unit="px" value={lay.padding} min={0} max={96} step={4} onChange={(padding) => set({ padding })} title="Padding" />
          </div>
          <IpSelect label="Align" value={lay.align}
            options={[{ value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }, { value: 'end', label: 'End' }, { value: 'space-between', label: 'Space between' }]}
            onChange={(e) => set({ align: e.target.value })} />
          <div style={{ fontSize: 11, color: 'var(--muted-foreground)', lineHeight: 1.4 }}>
            Los hijos del frame se ordenan por flex; crea elementos con click dentro del frame.
          </div>
        </React.Fragment>
      ) : null}
    </IpPane>
  );
}

function ComponentPropsPane({ el, onPatch }) {
  const def = COMPONENT_DEFS[el.component];
  if (!def) return null;
  const raw = { ...def.defaults, ...el.props };
  const set = (k, v) => onPatch({ props: { ...raw, [k]: v } });
  return (
    <IpPane title={`Props · ${el.component}`}>
      {Object.entries(def.props).map(([k, spec]) => {
        const label = spec.label || k;
        const val = raw[k];
        if (spec.type === 'enum') {
          return <IpSelect key={k} label={label} options={spec.options} value={String(val != null ? val : spec.options[0])} onChange={(e) => set(k, e.target.value)} />;
        }
        if (spec.type === 'boolean') {
          return <IpBool key={k} label={label} checked={!!val} onChange={(e) => set(k, e.target.checked)} />;
        }
        return <IpText key={k} label={label} value={String(val != null ? val : '')} onChange={(e) => set(k, e.target.value)} />;
      })}
    </IpPane>
  );
}

function InsertSection({ onInsert }) {
  return (
    <IpGrid title="Components" count={Object.keys(COMPONENT_DEFS).length}>
      {Object.keys(COMPONENT_DEFS).map((name) => (
        <IpItem key={name} name={name} icon={COMPONENT_DEFS[name].icon || 'component'} onInsert={() => onInsert(name)} />
      ))}
    </IpGrid>
  );
}

Object.assign(window, {
  COMPONENT_DEFS, RenderComponent, elVisualStyle,
  FillPane, StrokePane, EffectsPane, AutoLayoutPane, ComponentPropsPane, InsertSection,
});
