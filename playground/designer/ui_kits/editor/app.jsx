const { BreakpointSwitcher: AppBp, Button: AppButton, IconButton: AppIconBtn, Tabs: AppTabs } = window.DesignerDesignSystem_6adbd8;

const hashFileId = () => {
  const m = window.location.hash.match(/file=([\w-]+)/);
  return m ? m[1] : null;
};

function App() {
  const [data, setData] = React.useState(null);
  const [store, setStore] = React.useState(() => window.EDITOR_STORE.load());
  const [fid, setFid] = React.useState(() => hashFileId() || window.EDITOR_STORE.load().lastOpen);
  const [mode, setMode] = React.useState('design');
  const [bp, setBp] = React.useState('laptop');
  const [chrome] = React.useState(() => window.chromeThemeLoad());

  React.useEffect(() => { window.EDITOR_LOAD(setData); }, []);
  React.useEffect(() => { window.chromeApplyScale(chrome); }, [chrome]);
  React.useEffect(() => {
    const h = () => { const id = hashFileId(); if (id) setFid(id); };
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  if (!data) return null;

  const file = store.files[fid] || store.files[store.fileOrder[0]];
  const onPersist = (patch) => {
    window.EDITOR_STORE.patchFile(store, file.id, patch);
    setStore({ ...store });
  };
  const openFile = (id) => {
    if (!store.files[id]) return;
    window.EDITOR_STORE.save({ ...store, lastOpen: id });
    window.location.hash = `file=${id}`;
    setFid(id);
  };
  const newFile = () => {
    const f = window.EDITOR_STORE.newFile(store, 'Untitled');
    setStore({ ...store });
    window.location.hash = `file=${f.id}`;
    setFid(f.id);
  };
  const goWorkspace = () => { window.location.href = '../../index.html'; };

  const center = mode === 'sites' ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <window.ShellTabs mode={mode} onMode={setMode} />
      <AppBp value={bp} onChange={setBp} />
    </div>
  ) : null;
  const right = mode === 'slides' || mode === 'design'
    ? <React.Fragment><AppIconBtn name="play" label="Present" /><AppButton size="sm">Share</AppButton></React.Fragment>
    : <AppButton size="sm">{mode === 'buzz' ? 'Export all' : mode === 'make' ? 'Publish' : 'Share'}</AppButton>;

  return (
    <div className={chrome.theme.mode === 'dark' ? 'dark' : ''} style={{ height: '100%', background: 'var(--background)', color: 'var(--foreground)', ...window.chromeCssVars(chrome) }}>
      <EditorShell
        mode={mode} onMode={setMode} kb={data.keybindings}
        docName={file.name}
        files={store.fileOrder.map((id) => store.files[id]).filter(Boolean)}
        fileId={file.id}
        onOpenFile={openFile}
        onNewFile={newFile}
        onWorkspace={goWorkspace}
        center={center} right={right}
      >
        {mode === 'design' ? <DesignScreen key={file.id} data={data} file={file} onPersist={onPersist} /> : null}
        {mode === 'components' ? <ComponentsScreen key={`c-${file.id}`} file={file} onPersist={onPersist} /> : null}
        {mode === 'board' ? <BoardScreen /> : null}
        {mode === 'slides' ? <SlidesScreen /> : null}
        {mode === 'sites' ? <SitesScreen data={data} bp={bp} /> : null}
        {mode === 'buzz' ? <BuzzScreen data={data} /> : null}
        {mode === 'make' ? <MakeScreen /> : null}
        {mode === 'dev' ? <DevScreen data={data} /> : null}
      </EditorShell>
    </div>
  );
}

// Mode tabs helper (kept for the sites-mode center slot).
const { Tabs: ShellTabsInner } = window.DesignerDesignSystem_6adbd8;
function ShellTabs({ mode, onMode }) {
  return (
    <ShellTabsInner
      value={mode} onChange={onMode}
      items={[
        { value: 'design', label: 'Design' }, { value: 'components', label: 'Components' },
        { value: 'board', label: 'Board' }, { value: 'slides', label: 'Slides' },
        { value: 'sites', label: 'Sites' }, { value: 'buzz', label: 'Buzz' },
        { value: 'make', label: 'Make' }, { value: 'dev', label: 'Dev' },
      ]}
    />
  );
}
Object.assign(window, { ShellTabs });

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
