import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

/**
 * Choicebox — a selectable card option (Geist). A bordered box with a title,
 * description and a radio/checkbox indicator; the whole box is the control.
 * Use inside <ChoiceboxGroup> for managed single/multiple selection.
 */
export function Choicebox({ value, title, description, icon, checked, defaultChecked, disabled, type = "radio", name, onChange, className = "", children, ...props }) {
  const isControlled = checked !== undefined;
  const [on, setOn] = React.useState(!!defaultChecked);
  const active = isControlled ? checked : on;
  const toggle = () => {
    if (disabled) return;
    const next = type === "radio" ? true : !active;
    if (!isControlled) setOn(next);
    onChange && onChange(next, value);
  };
  // A switch is semantically a checkbox for the native input; the visual differs.
  const inputType = type === "radio" ? "radio" : "checkbox";
  return (
    <label className={cn("ds-choicebox", active && "ds-choicebox--active", disabled && "ds-choicebox--disabled", className)} data-state={active ? "checked" : "unchecked"} {...props}>
      <input type={inputType} name={name} value={value} checked={active} disabled={disabled} onChange={toggle} className="ds-choicebox-input" />
      {icon && <span className="ds-choicebox-icon"><Icon name={icon} size={18} /></span>}
      <span className="ds-choicebox-body">
        {title && <span className="ds-choicebox-title">{title}</span>}
        {description && <span className="ds-choicebox-desc">{description}</span>}
        {children}
      </span>
      {type === "switch" ? (
        <span className="ds-choicebox-mark--switch ds-switch" data-state={active ? "checked" : "unchecked"} aria-hidden="true" />
      ) : (
        <span className={cn("ds-choicebox-mark", type === "checkbox" && "ds-choicebox-mark--check")} aria-hidden="true">
          {active && (type === "checkbox" ? <Icon name="check" size={13} /> : <span className="ds-choicebox-dot" />)}
        </span>
      )}
    </label>
  );
}

/** ChoiceboxGroup — manages selection across Choicebox children. `type` radio|checkbox. */
export function ChoiceboxGroup({ value, defaultValue, onValueChange, type = "radio", name, columns = 1, className = "", children, ...props }) {
  const isControlled = value !== undefined;
  const multiple = type === "checkbox" || type === "switch";
  const [internal, setInternal] = React.useState(defaultValue ?? (multiple ? [] : ""));
  const current = isControlled ? value : internal;
  const groupName = React.useMemo(() => name || "choicebox-" + Math.random().toString(36).slice(2, 8), [name]);

  const isSel = (v) => (multiple ? Array.isArray(current) && current.includes(v) : current === v);
  const handle = (v) => {
    let next;
    if (multiple) {
      const arr = Array.isArray(current) ? current : [];
      next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    } else next = v;
    if (!isControlled) setInternal(next);
    onValueChange && onValueChange(next);
  };

  return (
    <div role={type === "radio" ? "radiogroup" : "group"} className={cn("ds-choicebox-group", className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { type, name: groupName, checked: isSel(child.props.value), onChange: () => handle(child.props.value) })
          : child
      )}
    </div>
  );
}
