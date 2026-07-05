const {
  Panel: DvPanel, Pane: DvPane, LayerTree: DvTree, Canvas: DvCanvas, Frame: DvFrame,
  Label: DvLabel, Badge: DvBadge, Button: DvButton, IconButton: DvIconBtn, Tabs: DvTabs,
  ZoomControls: DvZoom, TokenRow: DvTokenRow,
} = window.DesignerDesignSystem_6adbd8;

const DV_CSS_FOR = (id, f) => `.${id} {
  position: absolute;
  left: ${f.x}px;   /* x */
  top: ${f.y}px;    /* y */
  width: ${f.w}px;
  height: ${f.h}px;
  background: var(--frame);
  border-radius: var(--radius-md);
}
.${id}__title {
  font: 600 24px/1.2 var(--font-sans);
  letter-spacing: var(--tracking-tight);
}`;

const DV_TOKENS = [
  { name: 'background', $type: 'color', $value: 'oklch(0.993 0.0016 84)', cssVar: '--background' },
  { name: 'space-6', $type: 'dimension', $value: '1.5rem', cssVar: '--space-6' },
  { name: 'radius-md', $type: 'dimension', $value: '8px', cssVar: '--radius-md' },
  { name: 'tracking-tight', $type: 'dimension', $value: '-0.015em', cssVar: '--tracking-tight' },
];

/* Measurement overlay line + chip, in world coords */
function DvMeasure({ x, y, w, h, label }) {
  const horizontal = h === 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: Math.max(w, 1), height: Math.max(h, 1), background: 'var(--destructive)', opacity: 0.9 }}>
      <span style={{
        position: 'absolute',
        left: horizontal ? '50%' : 6, top: horizontal ? 6 : '50%',
        transform: horizontal ? 'translateX(-50%)' : 'translateY(-50%)',
        background: 'var(--destructive)', color: 'oklch(0.99 0 0)',
        fontFamily: 'var(--font-mono)', fontSize: 9.5, lineHeight: 1, padding: '2px 4px', borderRadius: 3, whiteSpace: 'nowrap',
      }}>{label}</span>
    </div>
  );
}

function DevScreen({ data }) {
  const [sel, setSel] = React.useState('cover');
  const [tab, setTab] = React.useState('code');
  const [viewState, setViewState] = React.useState({ zoom: 0.9, x: 110, y: 70 });
  const frames = window.EDITOR_DATA.frames;
  const selFrame = frames[sel] ? sel : 'cover';

  return (
    <React.Fragment>
      <DvPanel side="left" width={224} header={<DvLabel eyebrow>Layers · read-only</DvLabel>}>
        <DvTree layers={window.EDITOR_DATA.layers} selectedId={sel} onSelect={setSel} />
      </DvPanel>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <DvCanvas view={viewState} onViewChange={setViewState}>
            {Object.entries(frames).map(([id, f]) => (
              <DvFrame key={id} x={f.x} y={f.y} width={f.w} height={f.h} name={f.name} zoom={viewState.zoom}
                selected={sel === id} onSelect={() => setSel(id)}>
                <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
                  <div style={{ height: 12, width: '58%', background: 'var(--muted)', borderRadius: 3 }}></div>
                  <div style={{ flex: 1, background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 8 }}></div>
                </div>
              </DvFrame>
            ))}
            {/* measurement overlays around the selected frame */}
            {sel === 'cover' ? (
              <React.Fragment>
                <DvMeasure x={frames.cover.x + frames.cover.w} y={frames.cover.y + 60} w={frames.detail.x - frames.cover.x - frames.cover.w} h={0} label="60" />
                <DvMeasure x={frames.cover.x + 18} y={frames.cover.y} w={0} h={18} label="18" />
              </React.Fragment>
            ) : null}
          </DvCanvas>
          <DvZoom view={viewState} onViewChange={setViewState} onFit={() => setViewState({ zoom: 0.9, x: 110, y: 70 })} />
        </div>
      </div>

      <DvPanel side="right" width={300} header={
        <DvTabs full value={tab} onChange={setTab} items={[
          { value: 'code', label: 'Code' }, { value: 'tokens', label: 'Tokens' }, { value: 'assets', label: 'Assets' },
        ]} />
      }>
        {tab === 'code' ? (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
              <DvBadge variant="selection">{selFrame} · frame</DvBadge>
              <DvIconBtn name="duplicate" label="Copy CSS" size="sm" onClick={() => { try { navigator.clipboard.writeText(DV_CSS_FOR(selFrame, frames[selFrame])); } catch (e) {} }} />
            </div>
            <pre style={{ margin: 0, padding: '4px 12px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.65, color: 'var(--foreground)', whiteSpace: 'pre-wrap' }}>{DV_CSS_FOR(selFrame, frames[selFrame])}</pre>
          </React.Fragment>
        ) : null}
        {tab === 'tokens' ? (
          <div style={{ paddingTop: 4 }}>
            {DV_TOKENS.map((t) => <DvTokenRow key={t.name} token={t} showType={false} />)}
            <div style={{ padding: '10px 12px', fontSize: 11, color: 'var(--muted-foreground)' }}>Tokens usados por la selección.</div>
          </div>
        ) : null}
        {tab === 'assets' ? (
          <DvPane title="Exports">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[['cover.png', '2x · 840×600'], ['cover.svg', 'vector']].map(([n, m]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, border: '1px solid var(--border)', borderRadius: 6, padding: '7px 10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{n}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted-foreground)' }}>{m}</span>
                </div>
              ))}
              <DvButton size="sm" variant="outline">Download all</DvButton>
            </div>
          </DvPane>
        ) : null}
      </DvPanel>
    </React.Fragment>
  );
}

Object.assign(window, { DevScreen });
