const {
  Panel: StPanel, Pane: StPane, Label: StLabel, AssetGrid: StGrid, LibraryItem: StItem,
  Icon: StIcon, DataSourcePicker: StPicker, BoundField: StBound, SelectField: StSelect,
  NumberField: StNum, PageList: StPages, Separator: StSep, DEVICE_SIZES: ST_DEVICES,
  IconButton: StIconBtnX,
} = window.DesignerDesignSystem_6adbd8;

const BP_WIDTH = { desktop: 1180, laptop: 960, tablet: 620, phone: 340 };

function BlockSkeleton({ block, bp, heroHeading, onHeroEdit }) {
  const cols = bp === 'phone' ? 1 : 3;
  const pad = bp === 'phone' ? 16 : 32;
  const inner = { navbar: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: `0 ${pad}px` }}>
      <div style={{ width: 74, height: 12, borderRadius: 3, background: 'var(--muted)' }}></div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 40, height: 8, borderRadius: 3, background: 'var(--muted)' }}></div>)}
        <div style={{ width: 56, height: 20, borderRadius: 5, background: 'var(--primary)' }}></div>
      </div>
    </div>
  ), hero: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, height: '100%', padding: pad }}>
      <div style={{ width: '18%', height: 8, borderRadius: 3, background: 'var(--brand-muted)' }}></div>
      <div
        contentEditable={!!onHeroEdit} suppressContentEditableWarning
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => onHeroEdit && onHeroEdit(e.currentTarget.textContent)}
        style={{
          fontSize: bp === 'phone' ? 22 : 32, fontWeight: 600, letterSpacing: '-0.02em',
          textAlign: 'center', maxWidth: '80%', outline: 'none',
          cursor: onHeroEdit ? 'text' : 'default', lineHeight: 1.15,
        }}
      >{heroHeading || 'Design tools, assembled'}</div>
      <div style={{ width: '38%', height: 10, borderRadius: 3, background: 'var(--muted)' }}></div>
      <div style={{ width: 110, height: 26, borderRadius: 6, background: 'var(--primary)', marginTop: 6 }}></div>
    </div>
  ), features: (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14, padding: pad, height: '100%', boxSizing: 'border-box' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--muted)' }}></div>
          <div style={{ width: '70%', height: 10, borderRadius: 3, background: 'var(--muted)' }}></div>
          <div style={{ width: '90%', height: 7, borderRadius: 3, background: 'var(--muted)' }}></div>
        </div>
      ))}
    </div>
  ), gallery: (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10, padding: pad, height: '100%', boxSizing: 'border-box' }}>
      {Array.from({ length: cols * 2 }).map((_, i) => (
        <div key={i} style={{ borderRadius: 6, background: 'var(--canvas)', border: '1px solid var(--border)' }}></div>
      ))}
    </div>
  ), quote: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, height: '100%', padding: pad }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--muted-foreground)' }}>“</div>
      <div style={{ width: '56%', height: 10, borderRadius: 3, background: 'var(--muted)' }}></div>
      <div style={{ width: '40%', height: 10, borderRadius: 3, background: 'var(--muted)' }}></div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
        <div style={{ width: 20, height: 20, borderRadius: 999, background: 'var(--muted)' }}></div>
        <div style={{ width: 64, height: 7, borderRadius: 3, background: 'var(--muted)' }}></div>
      </div>
    </div>
  ), cta: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, height: '100%', background: 'var(--primary)', borderRadius: 0 }}>
      <div style={{ width: '30%', height: 14, borderRadius: 4, background: 'oklch(1 0 0 / 0.25)' }}></div>
      <div style={{ width: 92, height: 26, borderRadius: 6, background: 'var(--background)' }}></div>
    </div>
  ), footer: (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols + 1}, 1fr)`, gap: 14, padding: pad, height: '100%', boxSizing: 'border-box' }}>
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: '55%', height: 8, borderRadius: 3, background: 'var(--muted)' }}></div>
          {[0, 1, 2].map((j) => <div key={j} style={{ width: '40%', height: 6, borderRadius: 3, background: 'var(--muted)' }}></div>)}
        </div>
      ))}
    </div>
  ) };
  return inner[block.id] || (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted-foreground)', fontSize: 12 }}>
      {block.name}
    </div>
  );
}

function SitesScreen({ data, bp }) {
  const [page, setPage] = React.useState([ 'navbar', 'hero', 'features', 'quote', 'cta', 'footer' ]);
  const [sel, setSel] = React.useState('hero');
  const [bind, setBind] = React.useState({ collection: 'products', field: 'title' });
  const [heights, setHeights] = React.useState({});
  const [heroText, setHeroText] = React.useState(null);
  const width = BP_WIDTH[bp] || 960;
  const blockOf = (id) => data.blocks.find((b) => b.id === id) || { id, name: id, height: 200 };
  const addBlock = (b) => setPage((p) => [...p.slice(0, -1), b.id, p[p.length - 1]]);
  const insertAt = (i, id) => setPage((p) => [...p.slice(0, i), id, ...p.slice(i)]);
  // Hero heading fills from the bound collection field; inline edits override.
  const boundValue = bind.collection && bind.field && data.products.records[0] ? String(data.products.records[0][bind.field] != null ? data.products.records[0][bind.field] : '') : '';
  const heroHeading = heroText != null ? heroText : (boundValue || 'Design tools, assembled');
  const selIdx = page.indexOf(sel);
  const removeBlock = () => {
    if (selIdx < 0) return;
    setPage((p) => p.filter((_, i) => i !== selIdx));
    setSel(null);
  };
  const moveBlock = (dir) => {
    const j = selIdx + dir;
    if (selIdx < 0 || j < 0 || j >= page.length) return;
    setPage((p) => {
      const n = [...p];
      const t = n[selIdx]; n[selIdx] = n[j]; n[j] = t;
      return n;
    });
  };
  const hOf = (id) => heights[id] != null ? heights[id] : Math.max(56, (blockOf(id).height || 200) * (bp === 'phone' ? 0.7 : 0.8));

  return (
    <React.Fragment>
      <StPanel side="left" width={232}>
        <StLabel eyebrow style={{ padding: '8px 12px 2px', display: 'block' }}>Pages</StLabel>
        <StPages pages={[{ id: 'home', name: 'Home' }, { id: 'about', name: 'About' }, { id: 'blog', name: 'Blog' }]} selectedId="home" onSelect={() => {}} />
        <StSep />
        <StGrid title="Blocks" count={data.blocks.length}>
          {data.blocks.map((b) => (
            <StItem key={b.id} name={b.name} icon={b.icon || 'rectangle'} onInsert={() => addBlock(b)} />
          ))}
        </StGrid>
      </StPanel>

      <div style={{ flex: 1, minWidth: 0, overflow: 'auto', background: 'var(--canvas)', display: 'flex', justifyContent: 'center', padding: '28px 24px' }}>
        <div style={{ width, maxWidth: '100%', flex: 'none', display: 'flex', flexDirection: 'column', background: 'var(--frame)', border: '1px solid var(--frame-border)', borderRadius: 6, overflow: 'hidden', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
          {page.map((id, i) => {
            const b = blockOf(id);
            const selected = sel === id;
            return (
              <React.Fragment key={`${id}-${i}`}>
              <div onClick={() => setSel(id)} style={{
                position: 'relative', height: hOf(id),
                borderBottom: '1px solid var(--border)', cursor: 'default',
                outline: selected ? '1.5px solid var(--selection)' : 'none', outlineOffset: -1.5,
              }}>
                <BlockSkeleton block={b} bp={bp}
                  heroHeading={id === 'hero' ? heroHeading : undefined}
                  onHeroEdit={id === 'hero' ? (t) => setHeroText(t) : undefined} />
                {selected ? (
                  <span style={{ position: 'absolute', left: 0, top: 0, background: 'var(--selection)', color: 'var(--selection-foreground)', fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '0 0 4px 0', zIndex: 1 }}>{b.name}</span>
                ) : null}
                {/* boundary insert affordance */}
                <button type="button" title="Insert features block here"
                  onClick={(e) => { e.stopPropagation(); insertAt(i + 1, 'features'); }}
                  style={{
                    position: 'absolute', left: '50%', bottom: -9, transform: 'translateX(-50%)', zIndex: 2,
                    width: 18, height: 18, borderRadius: 999, border: '1px solid var(--border)',
                    background: 'var(--background)', color: 'var(--muted-foreground)',
                    fontSize: 12, lineHeight: 1, cursor: 'pointer', opacity: 0, transition: 'opacity var(--duration-fast) var(--ease-standard)',
                  }}
                  onPointerEnter={(e) => { e.currentTarget.style.opacity = 1; }}
                  onPointerLeave={(e) => { e.currentTarget.style.opacity = 0; }}
                >+</button>
              </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <StPanel side="right" width={252}>
        <StPane title="Block" actions={
          <React.Fragment>
            <StIconBtnX name="chevron-up" label="Move up" size="sm" tooltip={false} disabled={selIdx <= 0} onClick={() => moveBlock(-1)} />
            <StIconBtnX name="chevron-down" label="Move down" size="sm" tooltip={false} disabled={selIdx < 0 || selIdx >= page.length - 1} onClick={() => moveBlock(1)} />
            <StIconBtnX name="delete" label="Remove block" size="sm" tooltip={false} disabled={selIdx < 0} onClick={removeBlock} />
          </React.Fragment>
        }>
          <StSelect label="Section" options={page.map((id) => blockOf(id).name)} value={sel ? blockOf(sel).name : ''} onChange={(e) => {
            const found = page.find((id) => blockOf(id).name === e.target.value);
            if (found) setSel(found);
          }} />
          <div className="dsr-field">
            <span className="dsr-field__label">Height</span>
            <StNum label="H" unit="px" value={sel ? Math.round(hOf(sel)) : 0} min={56} step={8} title="Block height"
              onChange={(h) => sel && setHeights((hs) => ({ ...hs, [sel]: h }))} />
          </div>
        </StPane>
        <StPane title="CMS binding">
          <StPicker collections={[data.products]} value={bind} onChange={setBind} />
          {bind.collection && bind.field ? (
            <div style={{ paddingTop: 4 }}><StBound collection={bind.collection} field={bind.field} onUnbind={() => setBind({})} /></div>
          ) : null}
          <div style={{ fontSize: 11, color: 'var(--muted-foreground)', lineHeight: 1.4, paddingTop: 2 }}>
            El heading del hero se llena con el campo vinculado (edítalo inline sobre la página).
          </div>
        </StPane>
      </StPanel>
    </React.Fragment>
  );
}

Object.assign(window, { SitesScreen });
