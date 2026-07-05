const {
  Panel, Pane, Toolbar, Canvas, Frame, LayerTree, PageList, ZoomControls, StatusBar,
  Tabs, IconButton, Separator, Label, Input, Icon, Switch,
  PositionField, NumberField, TextField, ActionOpacity, ActionRotate,
  DataSourcePicker, BoundField, InteractionEditor, ConnectionLayer,
  CursorChip, CommentPin,
} = window.DesignerDesignSystem_6adbd8;

// Defensive: tolerate a stale bundle that predates ActionAlign.
const ActionAlign = window.DesignerDesignSystem_6adbd8.ActionAlign || (() => null);

/* ── element model ─────────────────────────────────────────────── */
let dsSeq = 1;
const newId = (p) => `${p}${Date.now().toString(36).slice(-4)}${dsSeq++}`;

const CREATE = {
  frame: { w: 320, h: 240, name: 'Frame' },
  rectangle: { w: 180, h: 120, name: 'Rectangle', fill: '#d97757' },
  ellipse: { w: 120, h: 120, name: 'Ellipse', fill: '#4864c8' },
  text: { w: 200, h: 36, name: 'Text', text: 'Edit me' },
  image: { w: 220, h: 160, name: 'Image' },
};

const INITIAL_ELEMENTS = {
  cover: { type: 'frame', name: 'Cover', x: 0, y: 0, w: 420, h: 300 },
  title: { type: 'text', name: 'Title', parent: 'cover', x: 24, y: 24, w: 300, h: 40, text: 'Arc Lounge Chair', binding: 'title', size: 24 },
  hero: { type: 'rectangle', name: 'Hero block', parent: 'cover', x: 24, y: 84, w: 372, h: 190, fill: '#d97757', shadows: [{ x: 0, y: 12, blur: 32, spread: -8, color: '#000000', alpha: 28 }] },
  photo: { type: 'image', name: 'Photo', x: 480, y: 0, w: 300, h: 220 },
  price: { type: 'text', name: 'Price', x: 480, y: 240, w: 120, h: 30, text: '640 €', mono: true, size: 16 },
  card: { type: 'frame', name: 'Product card', x: 0, y: 360, w: 260, h: 150, layout: { direction: 'column', gap: 12, padding: 16, align: 'start' }, shadows: [{ x: 0, y: 4, blur: 16, spread: -6, color: '#000000', alpha: 16 }], radius: 12 },
  cardBadge: { type: 'component', name: 'Badge', parent: 'card', component: 'Badge', x: 16, y: 16, w: 76, h: 18, props: { children: 'In stock', variant: 'selection' } },
  cardBtn: { type: 'component', name: 'Buy button', parent: 'card', component: 'Button', x: 16, y: 46, w: 120, h: 28, props: { children: 'Buy · 640 €', variant: 'primary', size: 'md' } },
};
const ORDER_INIT = ['cover', 'title', 'hero', 'photo', 'price', 'card', 'cardBadge', 'cardBtn'];

const TYPE_ICON_FALLBACK = { component: 'component' };
const DESIGN_TOOLS = [
  ['select', 'Select — V'], ['frame', 'Frame — F'], ['rectangle', 'Rectangle — R'],
  ['ellipse', 'Ellipse — O'], ['text', 'Text — T'], ['image', 'Image — I'], ['hand', 'Hand — H'],
];

/* ── leaf content ──────────────────────────────────────────────── */
function ElementBody({ el, editing, onCommitText }) {
  if (el.type === 'text') {
    return (
      <div
        contentEditable={editing}
        suppressContentEditableWarning
        onBlur={(e) => onCommitText(e.currentTarget.textContent)}
        style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center',
          fontFamily: el.mono ? 'var(--font-mono)' : (el._font || 'var(--font-sans)'),
          fontSize: el._size || el.size || 16, fontWeight: el.mono ? 400 : 600,
          letterSpacing: el.mono ? 0 : '-0.015em', color: el._color || 'var(--foreground)',
          outline: 'none', cursor: editing ? 'text' : 'inherit', padding: '0 2px',
          whiteSpace: 'pre-wrap',
        }}
      >{el.text}</div>
    );
  }
  if (el.type === 'image') {
    return (
      <div style={{ width: '100%', height: '100%', background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted-foreground)' }}>
        <Icon name="image" size={22} />
      </div>
    );
  }
  if (el.type === 'component') return <RenderComponent el={el} />;
  return null;
}

/* ── child element (inside a frame) ────────────────────────────── */
function ChildEl({ el, id, flexLayout, dir, zoom, selected, editing, onSelect, onMove, onReorder, onEditText, onCommitText }) {
  const drag = (e) => {
    if (e.button !== 0 || el.locked) return;
    e.stopPropagation();
    onSelect();
    if (editing) return;
    if (flexLayout) {
      // Reorder inside the auto-layout container: live index from sibling midpoints.
      const node = e.currentTarget;
      const container = node.parentElement;
      const horizontal = dir === 'row';
      const sx0 = e.clientX; const sy0 = e.clientY;
      let dragging = false;
      const move = (ev) => {
        if (!dragging && Math.hypot(ev.clientX - sx0, ev.clientY - sy0) < 4) return;
        if (!dragging) { dragging = true; node.style.opacity = '0.55'; }
        const sibs = Array.prototype.filter.call(container.children, (c) => c.hasAttribute('data-kid') && c !== node);
        let idx = 0;
        sibs.forEach((c) => {
          const r = c.getBoundingClientRect();
          const mid = horizontal ? r.left + r.width / 2 : r.top + r.height / 2;
          if ((horizontal ? ev.clientX : ev.clientY) > mid) idx += 1;
        });
        if (onReorder) onReorder(idx);
      };
      const up = () => {
        node.style.opacity = '';
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      return;
    }
    const sx = e.clientX; const sy = e.clientY;
    const move = (ev) => onMove({ x: Math.round(el.x + (ev.clientX - sx) / zoom), y: Math.round(el.y + (ev.clientY - sy) / zoom) });
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  return (
    <div
      data-canvas-item
      data-kid={id}
      onPointerDown={drag}
      onDoubleClick={(e) => { if (el.type === 'text') { e.stopPropagation(); onEditText(); } }}
      title={flexLayout ? 'Drag to reorder' : undefined}
      style={(() => {
        const vs = elVisualStyle(el);
        const ring = '0 0 0 1.5px var(--selection)';
        return {
          position: flexLayout ? 'relative' : 'absolute',
          left: flexLayout ? undefined : el.x,
          top: flexLayout ? undefined : el.y,
          width: el.w, height: el.h, flex: 'none',
          opacity: (el.opacity != null ? el.opacity : 100) / 100,
          transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
          ...vs,
          boxShadow: selected ? (vs.boxShadow ? `${ring}, ${vs.boxShadow}` : ring) : vs.boxShadow,
          cursor: flexLayout ? 'grab' : 'default',
        };
      })()}
    >
      {selected ? (
        <span style={{
          position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none',
          background: 'var(--selection)', color: 'var(--selection-foreground)',
          fontFamily: 'var(--font-mono)', fontSize: 9, lineHeight: 1, padding: '2px 5px',
          borderRadius: '0 0 4px 0', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{el.name}</span>
      ) : null}
      <ElementBody el={el} editing={editing} onCommitText={onCommitText} />
    </div>
  );
}

/* ── screen ────────────────────────────────────────────────────── */
function DesignScreen({ data, file, onPersist }) {
  const init = file || {};
  const [tool, setTool] = React.useState('select');
  const [els, setEls] = React.useState(init.els || INITIAL_ELEMENTS);
  const [order, setOrder] = React.useState(init.order || ORDER_INIT);
  const [theme, setTheme] = React.useState({ ...PROJECT_THEME_DEFAULTS, ...(init.theme || {}) });
  const [themeOpen, setThemeOpen] = React.useState(false);
  const [sel, setSel] = React.useState(init.sel !== undefined ? init.sel : (init.els ? null : 'card'));
  const [editingId, setEditingId] = React.useState(null);
  const [pageId, setPageId] = React.useState('p1');
  const [tab, setTab] = React.useState('design');
  const [viewState, setViewState] = React.useState(init.view || { zoom: 0.8, x: 90, y: 40 });
  const [bind, setBind] = React.useState({ collection: 'products', field: 'title' });
  const [ix, setIx] = React.useState({ trigger: 'click', action: 'navigate', target: 'Photo', transition: 'smart', easing: 'ease-out', duration: 240 });
  const [pinOpen, setPinOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  // Persist this file's context (elements, theme, view, selection) — debounced + flush on unmount.
  const persistRef = React.useRef(null);
  persistRef.current = { els, order, theme, view: viewState, sel };
  React.useEffect(() => {
    if (!onPersist) return undefined;
    const t = setTimeout(() => onPersist(persistRef.current), 350);
    return () => clearTimeout(t);
  }, [els, order, theme, viewState, sel]);
  React.useEffect(() => () => { if (onPersist && persistRef.current) onPersist(persistRef.current); }, []);

  const el = sel ? els[sel] : null;
  const patch = (id, p) => setEls((e) => ({ ...e, [id]: { ...e[id], ...p } }));
  const kidsOf = (id) => order.filter((k) => els[k] && els[k].parent === id);

  // Reorder a child within its auto-layout parent (same order slots, new sequence).
  const reorderChild = (parentId, kidId, newIdx) => {
    setOrder((o) => {
      const sibs = o.filter((x) => els[x] && els[x].parent === parentId);
      const cur = sibs.indexOf(kidId);
      if (cur < 0) return o;
      const next = [...sibs];
      next.splice(cur, 1);
      const clamped = Math.max(0, Math.min(newIdx, next.length));
      if (sibs[clamped] === kidId && cur === clamped) return o;
      next.splice(clamped, 0, kidId);
      if (next.every((x, i) => x === sibs[i])) return o;
      const slots = [];
      o.forEach((x, i) => { if (els[x] && els[x].parent === parentId) slots.push(i); });
      const n = [...o];
      slots.forEach((slot, i) => { n[slot] = next[i]; });
      return n;
    });
  };

  // Project theme resolution — tokens → concrete values for the canvas.
  const thVars = theme.vars || {};
  const th = { ...PROJECT_THEME_DEFAULTS, ...theme };
  const docCol = themeDoc(th);
  const accentVal = thVars.accent || th.accent;
  const radiusVal = thVars.radiusPx != null ? thVars.radiusPx : THEME_RADIUS_PX[th.radius];
  const surfaceVal = thVars.surface || docCol.surface;
  const textVal = thVars.text || docCol.text;
  const spacingK = (thVars.spacingPx || th.spacing) / 4;
  const resolveEl = (e) => {
    const r = { ...e };
    if (e.fillToken === 'accent') r.fill = accentVal;
    if (e.radiusToken) r.radius = radiusVal;
    if (e.type === 'frame' && !e.fillType && !e.fill) r.fill = surfaceVal;
    if (e.type === 'text') {
      if (!e.mono) r._font = THEME_FONTS[th.font];
      r._size = (e.size || 16) * th.scale;
      r._color = textVal;
    }
    return r;
  };

  const frameAt = (wx, wy) => {
    for (let i = order.length - 1; i >= 0; i -= 1) {
      const id = order[i];
      const f = els[id];
      if (f && f.type === 'frame' && !f.hidden && !f.locked &&
        wx >= f.x && wx <= f.x + f.w && wy >= f.y && wy <= f.y + f.h) return id;
    }
    return null;
  };

  const addElement = (type, at, opts = {}) => {
    const spec = opts.spec || CREATE[type];
    if (!spec) return null;
    const id = newId(type[0]);
    const parent = type === 'frame' ? null : (opts.parent !== undefined ? opts.parent : frameAt(at.x, at.y));
    const base = {
      type, name: opts.name || spec.name, w: spec.w, h: spec.h,
      x: Math.round((parent ? at.x - els[parent].x : at.x) - spec.w / 2),
      y: Math.round((parent ? at.y - els[parent].y : at.y) - spec.h / 2),
    };
    if (parent) base.parent = parent;
    if (spec.fill) base.fill = spec.fill;
    if (spec.text) base.text = spec.text;
    if (opts.extra) Object.assign(base, opts.extra);
    setEls((e) => ({ ...e, [id]: base }));
    setOrder((o) => [...o, id]);
    setSel(id);
    setTool('select');
    if (type === 'text') setEditingId(id);
    return id;
  };

  // Deploy a DS component to the canvas (into the selected frame, or view center).
  const componentOptsFor = (name) => {
    const def = COMPONENT_DEFS[name];
    if (!def) return null;
    return { spec: { w: def.w, h: def.h }, name: def.defaults.children || name, extra: { component: name, props: { ...def.defaults } } };
  };
  const insertComponent = (name) => {
    const o = componentOptsFor(name);
    if (!o) return;
    if (el && el.type === 'frame') {
      addElement('component', { x: el.x + el.w / 2, y: el.y + el.h / 2 }, { ...o, parent: sel });
    } else {
      const r = wrapRef.current ? wrapRef.current.getBoundingClientRect() : { width: 900, height: 500 };
      addElement('component', { x: (r.width / 2 - viewState.x) / viewState.zoom, y: (r.height / 2 - viewState.y) / viewState.zoom }, o);
    }
  };
  // Drag & drop from the Insert panel onto the canvas.
  const onDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; };
  const onDrop = (e) => {
    e.preventDefault();
    const name = e.dataTransfer.getData('text/plain');
    const o = componentOptsFor(name);
    if (!o || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    addElement('component', {
      x: (e.clientX - rect.left - viewState.x) / viewState.zoom,
      y: (e.clientY - rect.top - viewState.y) / viewState.zoom,
    }, o); // parent auto-detected via frameAt hit-test
  };

  const removeElement = (id) => {
    if (!id) return;
    const doomed = new Set([id, ...kidsOf(id)]);
    setEls((e) => {
      const n = { ...e };
      doomed.forEach((d) => delete n[d]);
      return n;
    });
    setOrder((o) => o.filter((x) => !doomed.has(x)));
    setSel(null);
  };

  const duplicateElement = (id) => {
    const src = els[id];
    if (!src) return;
    const nid = newId(src.type[0]);
    const adds = { [nid]: { ...src, name: `${src.name} copy`, x: src.x + 24, y: src.y + 24 } };
    const addOrder = [nid];
    kidsOf(id).forEach((k) => {
      const kid = newId(els[k].type[0]);
      adds[kid] = { ...els[k], parent: nid };
      addOrder.push(kid);
    });
    setEls((e) => ({ ...e, ...adds }));
    setOrder((o) => [...o, ...addOrder]);
    setSel(nid);
  };

  const onCanvasDown = (e) => {
    setEditingId(null);
    if (!CREATE[tool]) { setSel(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    addElement(tool, {
      x: (e.clientX - rect.left - viewState.x) / viewState.zoom,
      y: (e.clientY - rect.top - viewState.y) / viewState.zoom,
    });
  };

  React.useEffect(() => {
    const typing = (t) => t.closest && t.closest('input, textarea, select, [contenteditable="true"]');
    const h = (e) => {
      if (typing(e.target)) return;
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'd') { e.preventDefault(); if (sel) duplicateElement(sel); return; }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (k === 'backspace' || k === 'delete') { if (sel) { e.preventDefault(); removeElement(sel); } return; }
      const map = { v: 'select', f: 'frame', r: 'rectangle', o: 'ellipse', t: 'text', i: 'image', h: 'hand' };
      if (map[k]) setTool(map[k]);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [sel, els, order]);

  React.useEffect(() => { window.EDITOR_ON_TOOL = setTool; return () => { window.EDITOR_ON_TOOL = null; }; }, []);

  /* layer tree (nested) */
  const toNode = (id) => ({
    id, name: els[id].name,
    type: els[id].type === 'component' ? 'component' : els[id].type,
    hidden: els[id].hidden, locked: els[id].locked, binding: els[id].binding,
    children: kidsOf(id).map(toNode),
  });
  const layers = [...order].filter((id) => !els[id].parent).reverse().map(toNode);

  const targets = order.filter((id) => els[id].type === 'frame' && id !== sel).map((id) => els[id].name);
  const ports = els.cover && els.photo ? [{
    id: 'c1',
    from: { x: els.cover.x + els.cover.w, y: els.cover.y + 80 },
    to: { x: els.photo.x, y: els.photo.y + 60 },
  }] : [];

  const parentLayoutActive = el && el.parent && els[el.parent] && els[el.parent].layout && els[el.parent].layout.direction !== 'none';

  return (
    <React.Fragment>
      <Panel side="left" width={232}
        header={
          <React.Fragment>
            <Input size="sm" quiet placeholder="Search layers…" aria-label="Search layers" />
            <IconButton name="add" label="Add frame — F" size="sm" onClick={() => addElement('frame', { x: 640, y: 480 })} />
          </React.Fragment>
        }>
        <Label eyebrow style={{ padding: '8px 12px 2px', display: 'block' }}>Pages</Label>
        <PageList pages={window.EDITOR_DATA.pages} selectedId={pageId} onSelect={setPageId} />
        <Separator />
        <Label eyebrow style={{ padding: '8px 12px 2px', display: 'block' }}>Layers</Label>
        <LayerTree
          layers={layers} selectedId={sel} onSelect={setSel}
          onToggleHidden={(id) => patch(id, { hidden: !els[id].hidden })}
          onToggleLocked={(id) => patch(id, { locked: !els[id].locked })}
        />
        <Separator style={{ marginTop: 8 }} />
        <InsertSection onInsert={insertComponent} />
      </Panel>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Toolbar>
          {DESIGN_TOOLS.map(([n, l]) => (
            <IconButton key={n} name={n} label={l} active={tool === n} onClick={() => setTool(n)} />
          ))}
          <Separator orientation="vertical" />
          <IconButton name="duplicate" label="Duplicate — ⌘D" size="sm" disabled={!sel} onClick={() => duplicateElement(sel)} />
          <IconButton name="delete" label="Delete — ⌫" size="sm" disabled={!sel} onClick={() => removeElement(sel)} />
          <span style={{ flex: 1 }}></span>
          <IconButton name="panel-tokens" label="Project variables" active={themeOpen} onClick={() => setThemeOpen(!themeOpen)} />
        </Toolbar>

        <div ref={wrapRef} style={{ flex: 1, position: 'relative', minHeight: 0 }} onDragOver={onDragOver} onDrop={onDrop}>
          <Canvas
            view={viewState} onViewChange={setViewState}
            panOnDrag={tool === 'select' || tool === 'hand'}
            onBackgroundPointerDown={onCanvasDown}
            style={{ cursor: CREATE[tool] ? 'crosshair' : undefined }}
          >
            {order.filter((id) => !els[id].parent && !els[id].hidden).map((id, idx) => {
              const f = els[id];
              const locked = f.locked;
              const lay = f.type === 'frame' && f.layout && f.layout.direction !== 'none' ? f.layout : null;
              const rf = resolveEl(f);
              const kids = f.type === 'frame' ? kidsOf(id).filter((k) => !els[k].hidden) : [];
              return (
                <Frame
                  key={id} x={f.x} y={f.y} width={f.w} height={f.h}
                  name={f.type === 'frame' || sel === id ? f.name : undefined}
                  zoom={viewState.zoom} selected={sel === id}
                  fill={f.type === 'frame' ? undefined : 'transparent'}
                  style={{
                    zIndex: idx + 1, /* stack by document order */
                    outline: f.type !== 'frame' && sel !== id ? 'none' : undefined,
                    opacity: (f.opacity != null ? f.opacity : 100) / 100,
                    transform: f.rotation ? `rotate(${f.rotation}deg)` : undefined,
                    ...elVisualStyle(rf),
                  }}
                  onSelect={() => { if (!locked) { setSel(id); if (editingId !== id) setEditingId(null); } }}
                  onMove={locked || editingId === id ? undefined : ({ x, y }) => patch(id, { x, y })}
                  onResize={locked ? undefined : (b) => patch(id, { x: b.x, y: b.y, w: b.width, h: b.height })}
                  onDoubleClick={() => { if (f.type === 'text') setEditingId(id); }}
                >
                  {f.type === 'frame' ? (
                    <div style={lay ? {
                      width: '100%', height: '100%', display: 'flex',
                      flexDirection: lay.direction, gap: lay.gap * spacingK, padding: lay.padding * spacingK,
                      alignItems: lay.align === 'space-between' ? 'start' : lay.align,
                      justifyContent: lay.align === 'space-between' ? 'space-between' : 'flex-start',
                      boxSizing: 'border-box',
                    } : { width: '100%', height: '100%', position: 'relative' }}>
                      {kids.map((kid) => (
                        <ChildEl
                          key={kid} id={kid} el={resolveEl(els[kid])} flexLayout={!!lay} dir={lay ? lay.direction : 'column'} zoom={viewState.zoom}
                          selected={sel === kid} editing={editingId === kid}
                          onReorder={(idx) => reorderChild(id, kid, idx)}
                          onSelect={() => setSel(kid)}
                          onMove={({ x, y }) => patch(kid, { x, y })}
                          onEditText={() => setEditingId(kid)}
                          onCommitText={(t) => { patch(kid, { text: t }); setEditingId(null); }}
                        />
                      ))}
                    </div>
                  ) : (
                    <ElementBody el={rf} editing={editingId === id} onCommitText={(t) => { patch(id, { text: t }); setEditingId(null); }} />
                  )}
                </Frame>
              );
            })}
            {tab === 'prototype' ? <ConnectionLayer connections={ports} /> : null}
            <CursorChip name="Diego Ferrer" x={560} y={420} />
            <CommentPin name="Ana Kovač" time="2h" x={430} y={80} open={pinOpen} onClick={() => setPinOpen(!pinOpen)}
              text="Can we bind this fill to category color?" />
          </Canvas>
          <ZoomControls view={viewState} onViewChange={setViewState} onFit={() => setViewState({ zoom: 0.8, x: 90, y: 40 })} />
          {themeOpen ? (
            <div style={{ position: 'absolute', right: 12, top: 12, bottom: 12, zIndex: 45, display: 'flex' }}>
              <ProjectThemePanel
                theme={theme} onChange={setTheme}
                varValues={theme.vars || {}}
                onVarChange={(k, v) => setTheme((t) => ({ ...t, vars: { ...(t.vars || {}), [k]: v } }))}
                onResetVars={() => setTheme((t) => ({ ...t, vars: {} }))}
                onClose={() => setThemeOpen(false)}
              />
            </div>
          ) : null}
        </div>

        <StatusBar
          savedText="Saved · 2m ago"
          selection={el ? `${el.name} · ${el.type === 'component' ? el.component : el.type}` : `${order.length} layers`}
          right={el ? `x ${el.x}  y ${el.y}  ·  ${Math.round(viewState.zoom * 100)}%` : `${Math.round(viewState.zoom * 100)}%`}
        />
      </div>

      <Panel side="right" width={264} header={
        <Tabs full value={tab} onChange={setTab} items={[
          { value: 'design', label: 'Design' }, { value: 'prototype', label: 'Prototype' }, { value: 'data', label: 'Data' },
        ]} />
      }>
        {tab === 'design' && el ? (
          <React.Fragment>
            <div style={{ padding: '8px 12px 4px' }}>
              <ActionAlign onAlign={() => {}} />
            </div>
            <Pane title="Layer">
              <TextField label="Name" mono value={el.name} onChange={(e) => patch(sel, { name: e.target.value })} />
              {parentLayoutActive ? (
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>En auto-layout — la posición la controla el frame padre.</div>
              ) : null}
            </Pane>
            {el.type === 'component' ? <ComponentPropsPane el={el} onPatch={(p) => patch(sel, p)} /> : null}
            <Pane title="Layout">
              {!parentLayoutActive ? <PositionField values={[el.x, el.y]} onChange={([x, y]) => patch(sel, { x, y })} /> : null}
              <PositionField labels={['W', 'H']} values={[el.w, el.h]} onChange={([w, h]) => patch(sel, { w, h })} />
              {el.type === 'rectangle' || el.type === 'frame' ? (
                <React.Fragment>
                  <div className="dsr-field">
                    <span className="dsr-field__label">Radius</span>
                    <NumberField icon="radius" unit="px" value={el.radiusToken ? radiusVal : (el.radius != null ? el.radius : (el.type === 'frame' ? 0 : 10))} min={0} onChange={(radius) => patch(sel, { radius, radiusToken: undefined })} title="Corner radius" />
                  </div>
                  <div className="dsr-field">
                    <span className="dsr-field__label">Radius token</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {el.radiusToken ? <BoundField field="radius" onUnbind={() => patch(sel, { radiusToken: undefined })} /> : <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>—</span>}
                      <Switch checked={!!el.radiusToken} onChange={(e) => patch(sel, { radiusToken: e.target.checked || undefined })} />
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
              {el.type === 'text' ? (
                <div className="dsr-field">
                  <span className="dsr-field__label">Size</span>
                  <NumberField label="A" unit="px" value={el.size || 16} min={8} max={96} onChange={(size) => patch(sel, { size })} title="Font size" />
                </div>
              ) : null}
            </Pane>
            {el.type === 'frame' ? <AutoLayoutPane el={el} onPatch={(p) => patch(sel, p)} /> : null}
            <Pane title="Appearance">
              <ActionOpacity value={el.opacity != null ? el.opacity : 100} onChange={(opacity) => patch(sel, { opacity })} />
              <ActionRotate value={el.rotation || 0} onChange={(rotation) => patch(sel, { rotation })}
                onFlipH={() => patch(sel, { rotation: -(el.rotation || 0) })}
                onFlipV={() => patch(sel, { rotation: 180 - (el.rotation || 0) })} />
            </Pane>
            {el.type === 'rectangle' || el.type === 'ellipse' || el.type === 'frame' ? (
              <FillPane el={el} onPatch={(p) => patch(sel, p)} gradients={data.gradients || []}
                tokenBound={el.fillToken === 'accent'} tokenValue={accentVal}
                onTokenBound={(on) => patch(sel, { fillToken: on ? 'accent' : undefined })} />
            ) : null}
            {el.type === 'rectangle' || el.type === 'ellipse' || el.type === 'frame' ? (
              <StrokePane el={el} onPatch={(p) => patch(sel, p)} />
            ) : null}
            <EffectsPane el={el} onPatch={(p) => patch(sel, p)} />
          </React.Fragment>
        ) : null}
        {tab === 'design' && !el ? (
          <div style={{ padding: 16, fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
            No selection.<br />Herramientas F, R, O, T, I + click en el canvas para crear; Insert (panel izquierdo) despliega componentes reales.
          </div>
        ) : null}
        {tab === 'prototype' ? (
          <Pane title="Interaction">
            <InteractionEditor vocab={data.interactions} value={ix} onChange={setIx} targets={targets.length ? targets : ['—']} />
          </Pane>
        ) : null}
        {tab === 'data' ? (
          <React.Fragment>
            <Pane title="Binding">
              <DataSourcePicker collections={[data.products]} value={bind} onChange={setBind} />
              {bind.collection && bind.field ? (
                <div style={{ paddingTop: 4 }}>
                  <BoundField collection={bind.collection} field={bind.field} onUnbind={() => setBind({})} />
                </div>
              ) : null}
            </Pane>
            <Pane title="Repeat">
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.4 }}>
                Repeat this frame over {data.products.records.length} records — see the Buzz mode for the result.
              </div>
            </Pane>
          </React.Fragment>
        ) : null}
      </Panel>
    </React.Fragment>
  );
}

Object.assign(window, { DesignScreen });
