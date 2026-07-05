import React from "react";

/**
 * DropSlot — the visual insertion affordance rendered at the drop position.
 * Axis-aware so one implementation serves both axes:
 *   - orientation "vertical"   (cards stacked in a column) → horizontal bar / full-width ghost
 *   - orientation "horizontal" (columns in a row)          → vertical bar / full-height ghost
 * `mode` is "line" (thin insertion bar) or "ghost" (a shaded slot sized to the
 * dragged element, previewing the space it will occupy). "outline" draws no slot
 * (the target container is highlighted instead — handled by Board via CSS).
 */
export function DropSlot({ mode, orientation, size }) {
  if (mode === "ghost") {
    const style =
      orientation === "vertical"
        ? { height: (size && size.height) || 56 }
        : { width: (size && size.width) || 240 };
    return React.createElement("div", {
      className: "ds-board-drop-ghost",
      "data-orientation": orientation,
      "aria-hidden": "true",
      style,
    });
  }
  return React.createElement("div", {
    className: "ds-board-drop-line",
    "data-orientation": orientation,
    "aria-hidden": "true",
  });
}

/**
 * useDraggable — headless drag-and-drop for a Board. Owns the interaction
 * bookkeeping and the live visual-state (what is being dragged, where it is
 * over, and the dragged element's size for the ghost) shared by BOTH the
 * horizontal column axis and the vertical card axis. It does NOT own the data:
 * it reports moves through `onColumnMove(fromKey, toIndex)` and
 * `onCardMove({ id, fromCol, toCol, index })`, and the Board mutates its model.
 *
 * Returns the current state plus prop-getters to spread onto the relevant
 * elements: `columnHandleProps(colKey)` (column header handle),
 * `columnDropProps(colKey, pos)` (column section drop zone),
 * `cardProps(colKey, index, id)` (card drag wrapper) and
 * `columnBodyProps(colKey, count)` (column body append zone).
 */
export function useDraggable({ reorderable = true, cardsDraggable = true, onColumnMove, onCardMove }) {
  const kind = React.useRef(null); // 'col' | 'card'
  const colFrom = React.useRef(null); // colKey being dragged
  const cardFrom = React.useRef(null); // { id, fromCol }
  const [draggingCol, setDraggingCol] = React.useState(null);
  const [draggingCard, setDraggingCard] = React.useState(null);
  const [colOver, setColOver] = React.useState(null); // { pos, index }
  const [cardOver, setCardOver] = React.useState(null); // { colKey, index }
  const [size, setSize] = React.useState(null); // { width, height } of dragged element
  // Live mirrors of the over-state so hit-testing can apply hysteresis without stale closures.
  const colOverRef = React.useRef(null);
  const cardOverRef = React.useRef(null);

  function reset() {
    kind.current = null;
    colFrom.current = null;
    cardFrom.current = null;
    setDraggingCol(null);
    setDraggingCard(null);
    setColOver(null);
    setCardOver(null);
    colOverRef.current = null;
    cardOverRef.current = null;
    setSize(null);
  }

  function columnHandleProps(colKey) {
    if (!reorderable) return null;
    return {
      draggable: true,
      onDragStart: (e) => {
        kind.current = "col";
        colFrom.current = colKey;
        const col = e.currentTarget.closest(".ds-board-column");
        if (col) {
          const r = col.getBoundingClientRect();
          setSize({ width: r.width, height: r.height });
        }
        setDraggingCol(colKey);
        e.dataTransfer.effectAllowed = "move";
        e.stopPropagation();
      },
      onDragEnd: reset,
    };
  }

  function columnDropProps(colKey, pos) {
    if (!reorderable) return null;
    // Hysteresis: a dead zone around the midpoint keeps the insertion index from
    // oscillating when a ghost slot shifts the layout under the pointer.
    const indexAt = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - r.left;
      const mid = r.width / 2;
      const dz = Math.min(16, r.width * 0.15);
      const prev = colOverRef.current;
      if (x < mid - dz) return pos;
      if (x > mid + dz) return pos + 1;
      if (prev && prev.pos === pos) return prev.index;
      return pos + (x > mid ? 1 : 0);
    };
    return {
      onDragOver: (e) => {
        if (kind.current !== "col") return;
        e.preventDefault();
        const index = indexAt(e);
        const prev = colOverRef.current;
        if (!prev || prev.pos !== pos || prev.index !== index) {
          const next = { pos, index };
          colOverRef.current = next;
          setColOver(next);
        }
      },
      onDrop: (e) => {
        if (kind.current !== "col") return;
        e.preventDefault();
        const over = colOverRef.current;
        const index = over ? over.index : indexAt(e);
        if (onColumnMove && colFrom.current != null) onColumnMove(colFrom.current, index);
        reset();
      },
    };
  }

  function cardProps(colKey, index, id) {
    if (!cardsDraggable) return null;
    // Hysteresis: a dead zone around the midpoint stops the ghost slot from
    // flickering between two positions as it reflows the column under the pointer.
    const indexAt = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - r.top;
      const mid = r.height / 2;
      const dz = Math.min(12, r.height * 0.2);
      const prev = cardOverRef.current;
      if (y < mid - dz) return index;
      if (y > mid + dz) return index + 1;
      if (prev && prev.colKey === colKey) return prev.index;
      return index + (y > mid ? 1 : 0);
    };
    return {
      draggable: true,
      onDragStart: (e) => {
        kind.current = "card";
        cardFrom.current = { id, fromCol: colKey };
        const r = e.currentTarget.getBoundingClientRect();
        setSize({ width: r.width, height: r.height });
        setDraggingCard(id);
        e.dataTransfer.effectAllowed = "move";
        e.stopPropagation();
      },
      onDragEnd: reset,
      onDragOver: (e) => {
        if (kind.current !== "card") return;
        e.preventDefault();
        e.stopPropagation();
        const idx = indexAt(e);
        const prev = cardOverRef.current;
        if (!prev || prev.colKey !== colKey || prev.index !== idx) {
          const next = { colKey, index: idx };
          cardOverRef.current = next;
          setCardOver(next);
        }
      },
      onDrop: (e) => {
        if (kind.current !== "card") return;
        e.preventDefault();
        e.stopPropagation();
        const over = cardOverRef.current;
        const idx = over && over.colKey === colKey ? over.index : indexAt(e);
        if (onCardMove && cardFrom.current) onCardMove({ ...cardFrom.current, toCol: colKey, index: idx });
        reset();
      },
    };
  }

  function columnBodyProps(colKey, count) {
    if (!cardsDraggable) return null;
    return {
      onDragOver: (e) => {
        if (kind.current !== "card") return;
        e.preventDefault();
        // Only append at the end when the pointer is past the last card — not while
        // crossing the gaps between cards (which bubble here too). Ignore the hidden
        // source card (ghost mode) by skipping zero-height nodes.
        const kids = [...e.currentTarget.querySelectorAll(".ds-board-card-drag")].filter((k) => k.getBoundingClientRect().height > 0);
        const last = kids[kids.length - 1];
        if (last && e.clientY <= last.getBoundingClientRect().bottom) return;
        const prev = cardOverRef.current;
        if (!prev || prev.colKey !== colKey || prev.index !== count) {
          const next = { colKey, index: count };
          cardOverRef.current = next;
          setCardOver(next);
        }
      },
      onDrop: (e) => {
        if (kind.current !== "card") return;
        e.preventDefault();
        if (onCardMove && cardFrom.current) onCardMove({ ...cardFrom.current, toCol: colKey, index: count });
        reset();
      },
    };
  }

  return {
    draggingCol,
    draggingCard,
    colOver,
    cardOver,
    size,
    reset,
    columnHandleProps,
    columnDropProps,
    cardProps,
    columnBodyProps,
  };
}
