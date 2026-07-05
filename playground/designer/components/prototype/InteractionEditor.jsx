import React from 'react';
import { SelectField } from '../fields/SelectField.jsx';
import { Select } from '../ui/Select.jsx';
import { NumberField } from '../fields/NumberField.jsx';
import { Icon } from '../icons/Icon.jsx';

const opts = (list) => list.map((o) => ({ value: o.id, label: o.name }));

/**
 * InteractionEditor — one prototype interaction: trigger → action →
 * target + transition (easing/duration map to motion tokens).
 * Vocabulary comes from data/interactions.json.
 */
export function InteractionEditor({ vocab, value, onChange, targets = [], className = '', style }) {
  const v = value || {};
  const set = (patch) => onChange && onChange({ ...v, ...patch });
  const showMotion = v.transition && v.transition !== 'instant';
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 'var(--text-ui-sm)', color: 'var(--selection)',
        padding: '2px 0 4px',
      }}>
        <Icon name="connection" size={13} />
        <span style={{ fontFamily: 'var(--font-mono)' }}>
          {(vocab.triggers.find((t) => t.id === v.trigger) || vocab.triggers[0]).name}
          {' → '}
          {(vocab.actions.find((a) => a.id === v.action) || vocab.actions[0]).name}
        </span>
      </div>
      <SelectField label="Trigger" options={opts(vocab.triggers)} value={v.trigger || 'click'} onChange={(e) => set({ trigger: e.target.value })} />
      <SelectField label="Action" options={opts(vocab.actions)} value={v.action || 'navigate'} onChange={(e) => set({ action: e.target.value })} />
      {targets.length ? (
        <SelectField label="Target" options={targets} value={v.target || targets[0].value || targets[0]} onChange={(e) => set({ target: e.target.value })} />
      ) : null}
      <SelectField label="Transition" options={opts(vocab.transitions)} value={v.transition || 'smart'} onChange={(e) => set({ transition: e.target.value })} />
      {showMotion ? (
        <div className="dsr-field">
          <span className="dsr-field__label">Motion</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 88px', gap: 4 }}>
            <Select quiet size="sm" options={opts(vocab.easings)} value={v.easing || 'ease-standard'} onChange={(e) => set({ easing: e.target.value })} aria-label="Easing" />
            <NumberField icon="delay" unit="ms" value={v.duration != null ? v.duration : vocab.durations.default} min={vocab.durations.min} max={vocab.durations.max} step={vocab.durations.step} onChange={(duration) => set({ duration })} title="Duration" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
