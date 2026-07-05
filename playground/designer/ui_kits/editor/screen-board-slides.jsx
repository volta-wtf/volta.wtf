const {
  Panel: BsPanel, Canvas: BsCanvas, FloatingToolbar, IconButton: BsIconBtn, Separator: BsSep,
  Filmstrip, Button: BsButton, ZoomControls: BsZoom, Label: BsLabel, TextField: BsTextField,
  ConnectionLayer: BsNoodles,
} = window.DesignerDesignSystem_6adbd8;

/* ══ Board (whiteboard / FigJam class) ══════════════════════════
   Functional: stickies (add/drag/edit), shapes (add/drag/label),
   pen strokes (freehand), connectors (click A → click B), delete. */
const NOTE_COLORS = ['oklch(0.92 0.06 95)', 'oklch(0.90 0.05 150)', 'oklch(0.90 0.05 250)', 'oklch(0.91 0.05 25)'];
let bsSeq = 1;
const bsId = (p) => `${p}${Date.now().toString(36).slice(-4)}${bsSeq++}`;

function BsDraggable({ item, zoom, selected, onSelect, onMove, children, style }) {
  const drag = (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelect(e);
    const sx = e.clientX; const sy = e.clientY;
    const move = (ev) => onMove({ x: Math.round(item.x + (ev.clientX - sx) / zoom), y: Math.round(item.y + (ev.clientY - sy) / zoom) });
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  return (
    <div data-canvas-item onPointerDown={drag} style={{ position: 'absolute', left: item.x, top: item.y, cursor: 'default', ...style }}>
      {children}
    </div>
  );
}

function BoardScreen() {
  const [tool, setTool] = React.useState('select');
  const [viewState, setViewState] = React.useState({ zoom: 1, x: 120, y: 60 });
  const [notes, setNotes] = React.useState(() => window.EDITOR_DATA.stickies.map((n, i) => ({ ...n, tilt: i % 2 ? -1 : 1.5 })));
  const [shapes, setShapes] = React.useState([{ id: 'sh1', x: 470, y: 150, w: 150, h: 90, label: 'Unit system' }]);
  const [strokes, setStrokes] = React.useState([]);
  const [connectors, setConnectors] = React.useState([{ id: 'c1', from: 'n2', to: 'sh1' }]);
  const [sel, setSel] = React.useState(null);
  const [pendingLink, setPendingLink] = React.useState(null);
  const [liveStroke, setLiveStroke] = React.useState(null);

  const patchNote = (id, p) => setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, ...p } : n)));
  const patchShape = (id, p) => setShapes((ss) => ss.map((s) => (s.id === id ? { ...s, ...p } : s)));

  const itemBox = (id) => {
    const n = notes.find((x) => x.id === id);
    if (n) return { x: n.x, y: n.y, w: 168, h: 128 };
    const s = shapes.find((x) => x.id === id);
    if (s) return { x: s.x, y: s.y, w: s.w, h: s.h };
    return null;
  };
  const noodleList = connectors.map((c) => {
    const a = itemBox(c.from); const b = itemBox(c.to);
    if (!a || !b) return null;
    const leftFirst = a.x + a.w / 2 <= b.x + b.w / 2;
    return {
      id: c.id,
      from: { x: leftFirst ? a.x + a.w : a.x, y: a.y + a.h / 2 },
      to: { x: leftFirst ? b.x : b.x + b.w, y: b.y + b.h / 2 },
    };
  }).filter(Boolean);

  // Click an item with the connector tool: first click = source, second = target.
  const linkClick = (id) => {
    if (tool !== 'line') return false;
    if (!pendingLink) { setPendingLink(id); return true; }
    if (pendingLink !== id) setConnectors((cs) => [...cs, { id: bsId('c'), from: pendingLink, to: id }]);
    setPendingLink(null);
    setTool('select');
    return true;
  };

  const worldPoint = (e, rect) => [
    Math.round((e.clientX - rect.left - viewState.x) / viewState.zoom),
    Math.round((e.clientY - rect.top - viewState.y) / viewState.zoom),
  ];

  const onCanvasDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (tool === 'text') {
      const [x, y] = worldPoint(e, rect);
      const id = bsId('n');
      setNotes((ns) => [...ns, { id, text: 'New note', x: x - 84, y: y - 64, color: NOTE_COLORS[ns.length % NOTE_COLORS.length], tilt: ns.length % 2 ? -1 : 1 }]);
      setSel(id); setTool('select');
      return;
    }
    if (tool === 'rectangle') {
      const [x, y] = worldPoint(e, rect);
      const id = bsId('sh');
      setShapes((ss) => [...ss, { id, x: x - 75, y: y - 45, w: 150, h: 90, label: 'Label' }]);
      setSel(id); setTool('select');
      return;
    }
    if (tool === 'pen') {
      const pts = [worldPoint(e, rect)];
      setLiveStroke({ points: pts });
      const move = (ev) => {
        pts.push(worldPoint(ev, rect));
        setLiveStroke({ points: [...pts] });
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        if (pts.length > 2) setStrokes((st) => [...st, { id: bsId('st'), points: pts }]);
        setLiveStroke(null);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      return;
    }
    setSel(null); setPendingLink(null);
  };

  React.useEffect(() => {
    const h = (e) => {
      if (e.target.closest && e.target.closest('input, textarea, [contenteditable="true"]')) return;
      if ((e.key === 'Backspace' || e.key === 'Delete') && sel) {
        e.preventDefault();
        setNotes((ns) => ns.filter((n) => n.id !== sel));
        setShapes((ss) => ss.filter((s) => s.id !== sel));
        setStrokes((st) => st.filter((s) => s.id !== sel));
        setConnectors((cs) => cs.filter((c) => c.id !== sel && c.from !== sel && c.to !== sel));
        setSel(null);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [sel]);

  const strokePath = (pts) => 'M ' + pts.map((p) => `${p[0]} ${p[1]}`).join(' L ');
  const linkable = tool === 'line';

  return (
    <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
      <BsCanvas view={viewState} onViewChange={setViewState} gridSize={24}
        panOnDrag={tool === 'select' || tool === 'hand'} onBackgroundPointerDown={onCanvasDown}
        style={{ cursor: tool === 'pen' ? 'crosshair' : (tool === 'text' || tool === 'rectangle') ? 'copy' : undefined }}>

        {/* freehand strokes */}
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }} width="1" height="1" aria-hidden="true">
          {strokes.map((s) => (
            <path key={s.id} d={strokePath(s.points)} fill="none"
              stroke={sel === s.id ? 'var(--selection)' : 'var(--foreground)'} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'stroke', cursor: 'default' }}
              onPointerDown={(e) => { e.stopPropagation(); setSel(s.id); }} />
          ))}
          {liveStroke ? <path d={strokePath(liveStroke.points)} fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> : null}
        </svg>

        {/* connectors */}
        <BsNoodles connections={noodleList} activeId={sel} />

        {/* shapes */}
        {shapes.map((s) => (
          <BsDraggable key={s.id} item={s} zoom={viewState.zoom} selected={sel === s.id}
            onSelect={() => { if (!linkClick(s.id)) setSel(s.id); }}
            onMove={({ x, y }) => patchShape(s.id, { x, y })}
            style={{
              width: s.w, height: s.h, borderRadius: 10, background: 'var(--frame)',
              border: `1.5px solid ${sel === s.id || pendingLink === s.id ? 'var(--selection)' : 'var(--foreground)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
              boxShadow: pendingLink === s.id ? '0 0 0 3px var(--selection-muted)' : undefined,
              outline: linkable ? '2px dashed var(--selection-muted)' : 'none', outlineOffset: 3,
            }}>
            <span contentEditable suppressContentEditableWarning
              onPointerDown={(e) => e.stopPropagation()}
              onBlur={(e) => patchShape(s.id, { label: e.currentTarget.textContent })}
              style={{ outline: 'none', cursor: 'text', textAlign: 'center', padding: '0 8px' }}>{s.label}</span>
          </BsDraggable>
        ))}

        {/* stickies */}
        {notes.map((n) => (
          <BsDraggable key={n.id} item={n} zoom={viewState.zoom} selected={sel === n.id}
            onSelect={() => { if (!linkClick(n.id)) setSel(n.id); }}
            onMove={({ x, y }) => patchNote(n.id, { x, y })}
            style={{
              width: 168, minHeight: 128, background: n.color, borderRadius: 4, padding: 14,
              fontSize: 13, lineHeight: 1.4, color: 'oklch(0.25 0.02 80)',
              boxShadow: sel === n.id || pendingLink === n.id ? '0 0 0 1.5px var(--selection), var(--shadow-md)' : 'var(--shadow-md)',
              transform: `rotate(${n.tilt || 0}deg)`,
              outline: linkable ? '2px dashed var(--selection-muted)' : 'none', outlineOffset: 3,
            }}>
            <div contentEditable suppressContentEditableWarning
              onPointerDown={(e) => e.stopPropagation()}
              onBlur={(e) => patchNote(n.id, { text: e.currentTarget.textContent })}
              style={{ outline: 'none', minHeight: 96, cursor: 'text', whiteSpace: 'pre-wrap' }}>{n.text}</div>
          </BsDraggable>
        ))}
      </BsCanvas>

      <BsZoom view={viewState} onViewChange={setViewState} onFit={() => setViewState({ zoom: 1, x: 120, y: 60 })} />
      <FloatingToolbar>
        {[['select', 'Select — V'], ['pen', 'Draw — drag on canvas'], ['text', 'Sticky — click canvas'], ['rectangle', 'Shape — click canvas'], ['line', 'Connector — click A, then B']].map(([n, l]) => (
          <BsIconBtn key={n} name={n} label={l} size="lg" active={tool === n} onClick={() => { setTool(n); setPendingLink(null); }} />
        ))}
        <BsSep orientation="vertical" />
        <BsIconBtn name="delete" label="Delete — ⌫" size="lg" disabled={!sel} onClick={() => {
          setNotes((ns) => ns.filter((n) => n.id !== sel));
          setShapes((ss) => ss.filter((s) => s.id !== sel));
          setStrokes((st) => st.filter((s) => s.id !== sel));
          setConnectors((cs) => cs.filter((c) => c.id !== sel && c.from !== sel && c.to !== sel));
          setSel(null);
        }} />
      </FloatingToolbar>
    </div>
  );
}

/* ══ Slides — inline editing ON the slide + inspector ═══════════ */
function SlideBody({ slide, scale, onPatch }) {
  const s = (n) => n * scale;
  const editable = !!onPatch;
  const edit = (patch) => (e) => onPatch && onPatch(typeof patch === 'function' ? patch(e.currentTarget.textContent) : { [patch]: e.currentTarget.textContent });
  const eProps = (commit) => editable ? {
    contentEditable: true, suppressContentEditableWarning: true,
    onBlur: commit, onPointerDown: (e) => e.stopPropagation(),
  } : {};
  const eStyle = editable ? { outline: 'none', cursor: 'text' } : null;
  if (slide.kind === 'title') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(10), padding: s(40), textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: s(44), letterSpacing: '-0.02em', ...eStyle }} {...eProps(edit('title'))}>{slide.title}</div>
        <div style={{ fontSize: s(15), color: 'var(--muted-foreground)', ...eStyle }} {...eProps(edit('sub'))}>{slide.sub}</div>
      </div>
    );
  }
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: s(12), padding: s(36) }}>
      <div style={{ fontSize: s(26), fontWeight: 600, letterSpacing: '-0.015em', ...eStyle }} {...eProps(edit('title'))}>{slide.title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: s(8), marginTop: s(6) }}>
        {(slide.bullets || []).map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: s(8), alignItems: 'center', fontSize: s(14), color: 'var(--muted-foreground)' }}>
            <span style={{ width: s(4), height: s(4), borderRadius: 999, background: 'var(--brand)', flex: 'none' }}></span>
            <span style={eStyle || undefined} {...eProps((e) => {
              const bullets = [...(slide.bullets || [])];
              bullets[i] = e.currentTarget.textContent;
              onPatch({ bullets });
            })}>{b}</span>
          </div>
        ))}
        {editable ? (
          <button type="button" onClick={() => onPatch({ bullets: [...(slide.bullets || []), 'New point'] })} style={{
            alignSelf: 'flex-start', border: 'none', background: 'none', cursor: 'pointer',
            color: 'var(--muted-foreground)', font: `500 ${s(12)}px var(--font-sans)`, padding: 0, opacity: 0.7,
          }}>+ Add point</button>
        ) : null}
      </div>
    </div>
  );
}

let slSeq = 1;
function SlidesScreen() {
  const [slides, setSlides] = React.useState(window.EDITOR_DATA.slides);
  const [cur, setCur] = React.useState('s1');
  const slide = slides.find((s) => s.id === cur) || slides[0];
  const patch = (p) => setSlides((ss) => ss.map((s) => (s.id === slide.id ? { ...s, ...p } : s)));
  const addSlide = () => {
    const id = `s${Date.now().toString(36)}${slSeq++}`;
    setSlides((ss) => [...ss, { id, name: `Slide ${ss.length + 1}`, kind: 'body', title: 'New slide', bullets: ['First point'] }]);
    setCur(id);
  };
  const removeSlide = () => {
    if (slides.length <= 1) return;
    const idx = slides.findIndex((s) => s.id === slide.id);
    setSlides((ss) => ss.filter((s) => s.id !== slide.id));
    setCur((slides[idx - 1] || slides[idx + 1]).id);
  };
  return (
    <React.Fragment>
      <BsPanel side="left" width={168} footer={
        <BsButton size="sm" variant="outline" style={{ width: '100%' }} onClick={addSlide}>Add slide</BsButton>
      }>
        <Filmstrip slides={slides} selectedId={cur} onSelect={setCur}
          renderThumb={(s) => <SlideBody slide={s} scale={0.16} />} />
      </BsPanel>
      <div style={{ flex: 1, minWidth: 0, background: 'var(--canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: 'min(880px, 100%)', aspectRatio: '16 / 9', background: 'var(--frame)', border: '1px solid var(--frame-border)', borderRadius: 4, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <SlideBody slide={slide} scale={1} onPatch={patch} key={slide.id} />
        </div>
      </div>
      <BsPanel side="right" width={248} header={<BsLabel eyebrow>Slide</BsLabel>}>
        <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }} key={slide.id}>
          <BsTextField label="Name" mono value={slide.name} onChange={(e) => patch({ name: e.target.value })} />
          <BsTextField label="Title" value={slide.title} onChange={(e) => patch({ title: e.target.value })} />
          {slide.kind === 'title' ? (
            <BsTextField label="Subtitle" value={slide.sub || ''} onChange={(e) => patch({ sub: e.target.value })} />
          ) : (
            <div className="dsr-field" style={{ alignItems: 'start' }}>
              <span className="dsr-field__label" style={{ paddingTop: 6 }}>Bullets</span>
              <textarea
                value={(slide.bullets || []).join('\n')}
                onChange={(e) => patch({ bullets: e.target.value.split('\n') })}
                rows={4}
                style={{
                  width: '100%', resize: 'vertical', border: '1px solid transparent',
                  background: 'var(--muted)', borderRadius: 'var(--radius-xs)',
                  font: '12px/1.5 var(--font-sans)', color: 'var(--foreground)', padding: '6px 8px', outline: 'none',
                }}
              ></textarea>
            </div>
          )}
          <div style={{ fontSize: 11, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
            También puedes editar directamente sobre el slide: click en el título o en un bullet.
          </div>
          <div style={{ display: 'flex', gap: 6, paddingTop: 8 }}>
            <BsButton style={{ flex: 1 }}>Present</BsButton>
            <BsButton variant="outline" size="md" onClick={removeSlide} disabled={slides.length <= 1}>Delete</BsButton>
          </div>
        </div>
      </BsPanel>
    </React.Fragment>
  );
}

Object.assign(window, { BoardScreen, SlidesScreen });
