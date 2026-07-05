const { Menubar, Tabs, Button, IconButton, AvatarStack, CommandPalette, Toast, Menu } = window.DesignerDesignSystem_6adbd8;

/** EditorShell — menubar + mode tabs + file switcher + ⌘K, wraps the active screen. */
function EditorShell({ mode, onMode, kb, docName, files, fileId, onOpenFile, onNewFile, onWorkspace, center, right, toast, children }) {
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [fileMenu, setFileMenu] = React.useState(false);

  React.useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen((o) => !o); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const modes = [
    { value: 'design', label: 'Design' },
    { value: 'components', label: 'Components' },
    { value: 'board', label: 'Board' },
    { value: 'slides', label: 'Slides' },
    { value: 'sites', label: 'Sites' },
    { value: 'buzz', label: 'Buzz' },
    { value: 'make', label: 'Make' },
    { value: 'dev', label: 'Dev' },
  ];

  const fileItems = (files || []).map((f) => ({
    id: f.id, title: f.name, icon: f.id === fileId ? 'check' : 'file-text',
  })).concat(['-', { id: '__new', title: 'New file', icon: 'add' }, { id: '__ws', title: 'Workspace', icon: 'folder' }]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Menubar
        wordmark={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            {onWorkspace ? <IconButton name="folder" label="Workspace" onClick={onWorkspace} /> : null}
            Designer
          </span>
        }
        doc={docName} docMeta="saved"
        left={
          <span style={{ position: 'relative' }}>
            <IconButton name="chevrons-updown" label="Switch file" size="sm" onClick={() => setFileMenu((o) => !o)} />
            {fileMenu ? (
              <span style={{ position: 'absolute', left: 0, top: 'calc(100% + 6px)', zIndex: 80 }} onPointerLeave={() => setFileMenu(false)}>
                <Menu
                  items={fileItems}
                  onSelect={(it) => {
                    setFileMenu(false);
                    if (it.id === '__ws' && onWorkspace) onWorkspace();
                    else if (it.id === '__new' && onNewFile) onNewFile();
                    else if (onOpenFile) onOpenFile(it.id);
                  }}
                />
              </span>
            ) : null}
          </span>
        }
        center={center || <Tabs items={modes} value={mode} onChange={onMode} />}
        right={
          <React.Fragment>
            <AvatarStack users={window.EDITOR_DATA.users} max={3} size="sm" />
            <IconButton name="search" label="Command palette — ⌘K" onClick={() => setCmdOpen(true)} />
            {right}
          </React.Fragment>
        }
      />
      <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>{children}</div>
      <CommandPalette
        groups={kb.groups}
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onRun={(cmd) => {
          if (cmd.id && cmd.id.indexOf('tool.') === 0 && window.EDITOR_ON_TOOL) window.EDITOR_ON_TOOL(cmd.id.slice(5));
        }}
      />
      {toast ? <div className="dsr-toaststack"><Toast action={toast.action} onAction={toast.onAction}>{toast.text}</Toast></div> : null}
    </div>
  );
}

Object.assign(window, { EditorShell });
