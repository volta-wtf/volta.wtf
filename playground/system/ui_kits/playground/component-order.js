/* ============================================================
   Playground component order & grouping — the canonical arrangement the app
   reads (sidebar, Components page). Runtime edits (Settings → Order) persist
   to localStorage and override these defaults:
     "pg-order"   { group: [componentId, ...] }   within-group order
     "pg-groups"  ["Custom group", ...]           extra groups beyond the base
     "pg-assign"  { componentId: "group" }         per-component group override
   Fill `defaults` to ship a fixed order; an empty group falls back to alphabetical.
   ============================================================ */
(function () {
  const KEY = "pg-order", GKEY = "pg-groups", AKEY = "pg-assign", OKEY = "pg-grouporder", NKEY = "pg-names";
  const defaults = {}; // { "<Group>": ["componentId", ...] }
  const j = (k, f) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(f)); } catch (e) { return f; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const load = () => j(KEY, {});
  const loadGroups = () => { const a = j(GKEY, []); return a.filter((g, i) => a.indexOf(g) === i); };
  const loadAssign = () => j(AKEY, {});
  const orderFor = (group) => { const m = load(); return m[group] || defaults[group] || null; };
  const alpha = (a, b) => a.name.localeCompare(b.name);
  const sortItems = (group, items) => {
    const ord = orderFor(group);
    if (!ord) return [...items].sort(alpha);
    const ix = (id) => { const i = ord.indexOf(id); return i < 0 ? Infinity : i; };
    return [...items].sort((a, b) => { const d = ix(a.id) - ix(b.id); return d !== 0 ? d : alpha(a, b); });
  };
  // Effective group list = base order + any custom groups appended.
  const groupOrder = (base) => {
    const all = base.concat(loadGroups().filter((g) => base.indexOf(g) < 0));
    const stored = j(OKEY, null);
    const merged = !stored ? all : [...stored.filter((n) => all.indexOf(n) > -1), ...all.filter((n) => stored.indexOf(n) < 0)];
    return merged.filter((n, i) => merged.indexOf(n) === i); // never return a name twice
  };
  // Effective group of a component = override (if any) else its declared group.
  const groupOf = (demo) => { const a = loadAssign(); return a[demo.id] || demo.group; };
  const loadNames = () => j(NKEY, {});
  const nameOf = (demo) => { const m = loadNames(); return m[demo.id] || demo.name; };
  const emit = () => { try { window.dispatchEvent(new CustomEvent("pg-order:change")); } catch (e) {} };
  const hasCustom = () => Object.keys(load()).length > 0 || loadGroups().length > 0 || Object.keys(loadAssign()).length > 0 || !!j(OKEY, null);
  // Flat ordering that honors the saved arrangement (group order + within-group order);
  // falls back to alphabetical when nothing has been customized.
  const flatSort = (items, base) => {
    if (!hasCustom()) return [...items].sort(alpha);
    const order = [];
    groupOrder(base).forEach((g) => sortItems(g, items.filter((it) => groupOf(it) === g)).forEach((it) => order.push(it.id)));
    const ix = (id) => { const i = order.indexOf(id); return i < 0 ? Infinity : i; };
    return [...items].sort((a, b) => (ix(a.id) - ix(b.id)) || alpha(a, b));
  };
  window.PG_ORDER = {
    defaults, load, loadGroups, loadAssign, loadNames, orderFor, sortItems, groupOrder, groupOf, nameOf, hasCustom, flatSort,
    setGroup(group, ids) { const m = load(); m[group] = ids; set(KEY, m); emit(); },
    commit(patch) { if (patch.order) set(KEY, patch.order); if (patch.groups) set(GKEY, patch.groups); if (patch.assign) set(AKEY, patch.assign); if (patch.groupOrder) set(OKEY, patch.groupOrder); if (patch.names) set(NKEY, patch.names); emit(); },
    reset() { [KEY, GKEY, AKEY, OKEY, NKEY].forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} }); emit(); },
  };
})();
