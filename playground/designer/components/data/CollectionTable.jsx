import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const FIELD_ICON = {
  text: 'field-text', richtext: 'field-richtext', number: 'field-number',
  boolean: 'field-boolean', image: 'field-image', select: 'field-select',
  date: 'field-date', color: 'field-color', url: 'field-url',
};

function Cell({ field, value }) {
  if (value == null) return <span className="dsr-datatable__bool">—</span>;
  switch (field.type) {
    case 'image':
      return <img className="dsr-datatable__img" src={value} alt="" loading="lazy" onError={(e) => { e.target.style.visibility = 'hidden'; }} />;
    case 'boolean':
      return <span className={`dsr-datatable__bool${value ? ' is-true' : ''}`}>{value ? <Icon name="check" size={13} /> : '—'}</span>;
    case 'number':
      return <span className="dsr-datatable__num">{value}{field.unit ? ` ${field.unit}` : ''}</span>;
    case 'date':
      return <span className="dsr-datatable__num">{value}</span>;
    default:
      return String(value);
  }
}

/** CollectionTable — a collection's records as a compact grid. */
export function CollectionTable({ collection, maxRecords, onRecordClick, className = '', ...rest }) {
  if (!collection) return null;
  const records = maxRecords ? collection.records.slice(0, maxRecords) : collection.records;
  return (
    <table className={`dsr-datatable ${className}`.trim()} {...rest}>
      <thead>
        <tr>
          {collection.fields.map((f) => (
            <th key={f.key}>
              <span className="dsr-datatable__field">
                <Icon name={FIELD_ICON[f.type] || 'field-text'} size={12} />
                {f.label}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id} onClick={onRecordClick ? () => onRecordClick(r) : undefined}>
            {collection.fields.map((f) => (
              <td key={f.key}><Cell field={f} value={r[f.key]} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
