const {
  Panel: BzPanel, Pane: BzPane, Label: BzLabel, CollectionTable: BzTable, Button: BzButton,
  Badge: BzBadge, Input: BzInput, IconButton: BzIconBtn, DeviceFrame: BzDevice, Tabs: BzTabs,
  Switch: BzSwitch, Kbd: BzKbd,
} = window.DesignerDesignSystem_6adbd8;

/* ── Buzz (batch assets from a collection) ─────────────────────── */
function BuzzScreen({ data }) {
  const col = data.products;
  const [accent, setAccent] = React.useState('#d97757');
  const [records, setRecords] = React.useState(col.records);
  const patchRec = (id, p) => setRecords((rs) => rs.map((r) => (r.id === id ? { ...r, ...p } : r)));
  const addRecord = () => {
    const id = `p${Date.now().toString(36)}`;
    setRecords((rs) => [...rs, { id, title: 'New product', price: 0, category: 'Tables', inStock: true }]);
  };
  const liveCol = { ...col, records };
  return (
    <React.Fragment>
      <BzPanel side="left" width={224}>
        <BzPane title="Template">
          <div style={{ fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.45 }}>
            Product card · 4:5<br />Un asset por registro de <b style={{ color: 'var(--foreground)' }}>{col.name}</b>.
          </div>
        </BzPane>
        <BzPane title="Brand kit">
          <div style={{ display: 'flex', gap: 4 }}>
            {['#1a1a1a', '#d97757', '#4864c8', '#f4f2ee'].map((c) => (
              <button key={c} type="button" title={c} onClick={() => setAccent(c)} style={{
                width: 22, height: 22, borderRadius: 5, border: 'none', cursor: 'pointer', background: c,
                boxShadow: accent === c ? '0 0 0 1.5px var(--background), 0 0 0 3px var(--selection)' : 'inset 0 0 0 1px oklch(0 0 0 / 0.12)',
              }} />
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-foreground)', paddingTop: 4 }}>
            Geist · Geist Mono
          </div>
        </BzPane>
      </BzPanel>

      <div style={{ flex: 1, minWidth: 0, overflow: 'auto', background: 'var(--canvas)', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
          {records.map((r) => (            <div key={r.id} style={{ background: 'var(--frame)', border: '1px solid var(--frame-border)', borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--shadow-2xs)' }}>
              <div style={{ aspectRatio: '4 / 3', background: 'var(--muted)', position: 'relative' }}>
                {r.image ? <img src={r.image} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} /> : null}
                <span style={{ position: 'absolute', left: 8, top: 8, width: 22, height: 4, borderRadius: 2, background: accent }}></span>
              </div>
              <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => patchRec(r.id, { title: e.currentTarget.textContent })}
                  title="Click para editar"
                  style={{ fontSize: 12, fontWeight: 500, outline: 'none', cursor: 'text', borderRadius: 3 }}
                >{r.title}</span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    contentEditable suppressContentEditableWarning
                    onBlur={(e) => {
                      const n = parseFloat(e.currentTarget.textContent.replace(/[^\d.]/g, ''));
                      patchRec(r.id, { price: Number.isNaN(n) ? r.price : n });
                    }}
                    title="Click para editar"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-foreground)', whiteSpace: 'nowrap', outline: 'none', cursor: 'text' }}
                  >{r.price} €</span>
                  {r.inStock === false ? <BzBadge variant="destructive">out</BzBadge> : <BzBadge variant="outline">{r.category}</BzBadge>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BzPanel side="right" width={300} header={<BzLabel eyebrow>Collection · {records.length} records</BzLabel>}
        footer={
          <div style={{ display: 'flex', gap: 6 }}>
            <BzButton variant="outline" style={{ flex: 1 }} onClick={addRecord}>Add record</BzButton>
            <BzButton style={{ flex: 1 }}>Export all · 2x</BzButton>
          </div>
        }>
        <div style={{ overflow: 'auto' }}>
          <BzTable collection={liveCol} onRecordClick={() => {}} />
        </div>
      </BzPanel>
    </React.Fragment>
  );
}

/* ── Make (prompt → preview) ───────────────────────────────────── */
function MakeScreen() {
  const [tab, setTab] = React.useState('preview');
  const [prompt, setPrompt] = React.useState('');
  const [thread, setThread] = React.useState([
    { who: 'you', text: 'Make a checkout screen for a furniture store. Keep it minimal.' },
    { who: 'ai', text: 'Built the layout: summary card, payment fields, sticky CTA. Geist at 13px, warm neutrals.' },
    { who: 'you', text: 'Add an order summary with 2 items and the total in mono.' },
    { who: 'ai', text: 'Done — items bound to the Products collection, totals tabular.' },
  ]);
  const send = () => {
    const t = prompt.trim();
    if (!t) return;
    setThread((th) => [...th, { who: 'you', text: t }, { who: 'ai', text: 'Applied — preview updated. Anything else?' }]);
    setPrompt('');
  };
  return (
    <React.Fragment>
      <BzPanel side="left" width={320} footer={
        <div style={{ display: 'flex', gap: 6 }}>
          <BzInput placeholder="Describe a change…" aria-label="Prompt" value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
          <BzIconBtn name="play" label="Send" onClick={send} />
        </div>
      }>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {thread.map((m, i) => (
            <div key={i} style={{
              maxWidth: '88%', alignSelf: m.who === 'you' ? 'flex-end' : 'flex-start',
              background: m.who === 'you' ? 'var(--primary)' : 'var(--muted)',
              color: m.who === 'you' ? 'var(--primary-foreground)' : 'var(--foreground)',
              borderRadius: 10, padding: '8px 11px', fontSize: 12.5, lineHeight: 1.45,
            }}>{m.text}</div>
          ))}
          <div style={{ fontSize: 11, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dsr-statusbar__dot"></span> Generated in 4.2s · <BzKbd keys={['mod', '⏎']} /> para regenerar
          </div>
        </div>
      </BzPanel>
      <div style={{ flex: 1, minWidth: 0, background: 'var(--canvas)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, overflow: 'auto', padding: '20px 24px' }}>
        <BzTabs items={[{ value: 'preview', label: 'Preview' }, { value: 'code', label: 'Code' }]} value={tab} onChange={setTab} style={{ marginBottom: 16 }} />
        {tab === 'preview' ? (
          <BzDevice device="phone" scale={0.62} label="Preview · 390×844">
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)' }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em' }}>Checkout</div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Arc Lounge Chair', '640 €'], ['Fold Desk Lamp', '120 €']].map(([n, p]) => (
                  <div key={n} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14 }}>
                    <span>{n}</span><span style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{p}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14, fontWeight: 600 }}>
                  <span>Total</span><span style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>760 €</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ height: 36, border: '1px solid var(--input)', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', color: 'var(--muted-foreground)', fontSize: 13 }}>Card number</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ height: 36, border: '1px solid var(--input)', borderRadius: 8 }}></div>
                  <div style={{ height: 36, border: '1px solid var(--input)', borderRadius: 8 }}></div>
                </div>
              </div>
              <div style={{ marginTop: 'auto', height: 44, borderRadius: 10, background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 500 }}>
                Pay 760 €
              </div>
            </div>
          </BzDevice>
        ) : (
          <div style={{ width: 'min(560px, 100%)', background: 'var(--frame)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.7, color: 'var(--muted-foreground)', whiteSpace: 'pre' }}>
{`<Checkout>
  <OrderSummary items={products.slice(0, 2)} />   // bound · products
  <PaymentFields />
  <Button size="lg">Pay {total} €</Button>        // tabular, mono
</Checkout>`}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { BuzzScreen, MakeScreen });
