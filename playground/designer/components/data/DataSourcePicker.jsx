import React from 'react';
import { SelectField } from '../fields/SelectField.jsx';

/**
 * DataSourcePicker — two-step binding control: collection → field.
 * Optionally filter bindable fields by type (e.g. only "image").
 */
export function DataSourcePicker({ collections = [], value = {}, onChange, fieldType, className = '', style }) {
  const col = collections.find((c) => c.id === value.collection) || null;
  const fields = col ? col.fields.filter((f) => !fieldType || f.type === fieldType) : [];
  const set = (patch) => onChange && onChange({ ...value, ...patch });
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      <SelectField
        label="Collection"
        options={[{ value: '', label: '—' }, ...collections.map((c) => ({ value: c.id, label: c.name }))]}
        value={value.collection || ''}
        onChange={(e) => set({ collection: e.target.value || undefined, field: undefined })}
      />
      <SelectField
        label="Field"
        options={[{ value: '', label: '—' }, ...fields.map((f) => ({ value: f.key, label: f.label }))]}
        value={value.field || ''}
        disabled={!col}
        onChange={(e) => set({ field: e.target.value || undefined })}
      />
    </div>
  );
}
