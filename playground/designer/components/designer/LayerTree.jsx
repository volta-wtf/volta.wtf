import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { IconButton } from '../ui/IconButton.jsx';
import { Badge } from '../ui/Badge.jsx';

const TYPE_ICON = {
  frame: 'frame', group: 'group', component: 'component', text: 'text',
  image: 'image', shape: 'shape', rectangle: 'rectangle', ellipse: 'ellipse',
};

function Row({ layer, depth, selectedId, onSelect, onToggleHidden, onToggleLocked, expanded, toggleExpand }) {
  const hasKids = layer.children && layer.children.length > 0;
  const open = expanded.has(layer.id);
  const pinned = layer.hidden || layer.locked;
  return (
    <React.Fragment>
      <div
        className={`dsr-layer-row${selectedId === layer.id ? ' is-selected' : ''}${layer.hidden ? ' is-hidden' : ''}`}
        style={{ paddingLeft: 4 + depth * 16 }}
        onPointerDown={() => onSelect && onSelect(layer.id)}
      >
        <span
          className={`dsr-layer-row__chevron${open ? ' is-open' : ''}`}
          style={{ visibility: hasKids ? 'visible' : 'hidden' }}
          onPointerDown={(e) => { e.stopPropagation(); toggleExpand(layer.id); }}
        >
          <Icon name="collapse" size={12} />
        </span>
        <span className="dsr-layer-row__icon">
          <Icon name={TYPE_ICON[layer.type] || 'shape'} size={14} />
        </span>
        <span className="dsr-layer-row__name">{layer.name}</span>
        {layer.binding ? <Badge variant="selection" className="dsr-layer-row__badge">{layer.binding}</Badge> : null}
        <span className={`dsr-layer-row__meta${pinned ? ' is-pinned' : ''}`}>
          <IconButton
            size="sm" tooltip={false}
            name={layer.locked ? 'locked' : 'unlocked'}
            label={layer.locked ? 'Unlock' : 'Lock'}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onToggleLocked && onToggleLocked(layer.id)}
          />
          <IconButton
            size="sm" tooltip={false}
            name={layer.hidden ? 'hidden' : 'visible'}
            label={layer.hidden ? 'Show' : 'Hide'}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onToggleHidden && onToggleHidden(layer.id)}
          />
        </span>
      </div>
      {hasKids && open ? layer.children.map((c) => (
        <Row
          key={c.id} layer={c} depth={depth + 1}
          selectedId={selectedId} onSelect={onSelect}
          onToggleHidden={onToggleHidden} onToggleLocked={onToggleLocked}
          expanded={expanded} toggleExpand={toggleExpand}
        />
      )) : null}
    </React.Fragment>
  );
}

/** LayerTree — recursive layer list. Data in, callbacks out. */
export function LayerTree({ layers = [], selectedId, onSelect, onToggleHidden, onToggleLocked, defaultExpandedIds, className = '', ...rest }) {
  const [expanded, setExpanded] = React.useState(() => {
    if (defaultExpandedIds) return new Set(defaultExpandedIds);
    const all = new Set();
    const walk = (ls) => ls.forEach((l) => { if (l.children) { all.add(l.id); walk(l.children); } });
    walk(layers);
    return all;
  });
  const toggleExpand = (id) => setExpanded((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  return (
    <div className={`dsr-layertree ${className}`.trim()} role="tree" {...rest}>
      {layers.map((l) => (
        <Row
          key={l.id} layer={l} depth={0}
          selectedId={selectedId} onSelect={onSelect}
          onToggleHidden={onToggleHidden} onToggleLocked={onToggleLocked}
          expanded={expanded} toggleExpand={toggleExpand}
        />
      ))}
    </div>
  );
}
