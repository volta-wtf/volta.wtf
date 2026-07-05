import React from "react";
import { cn } from "../lib/cn.js";
import { useDraggable, DropSlot } from "./draggable.js";

/**
 * Board — a horizontal, multi-column kanban layout with drag-and-drop.
 *
 * Board owns the layout and the drag behavior (delegated to the headless
 * `useBoardDnd` hook, shared by the column and card axes); the column headers
 * and card content are supplied by the consumer.
 *
 *   - Columns reorder by dragging their header (a grip handle).
 *   - Cards reorder within a column and move across columns by dragging them.
 *
 * Composable:
 *   <Board>
 *     <BoardColumn title="To do"><BoardCard>…</BoardCard></BoardColumn>
 *   </Board>
 *
 * Or data-driven via `columns={[{ id, title, count?, actions?, items }]}`.
 *
 * `variant`: "columns" (default, flush lanes) · "floating" · "inset".
 * `reorderable` toggles column dragging; `cardsDraggable` toggles card
 * dragging (both default true).
 *
 * Drop feedback is chosen per axis and defaults to "line" for both:
 *   - `columnDropIndicator` and `cardDropIndicator`: "line" (insertion bar) ·
 *     "ghost" (shaded slot sized to the dragged element) · "outline" (highlight
 *     the target container). `dropIndicator` sets the fallback for both.
 *
 * `onReorder(colKeys)` fires after a column move; `onCardMove({ id, from, to,
 * index })` after a card move.
 */
export function Board({
  variant = "columns",
  columns = null,
  reorderable = true,
  cardsDraggable = true,
  dropIndicator = "line",
  columnDropIndicator,
  cardDropIndicator,
  onReorder,
  onCardMove,
  className = "",
  children,
  ...props
}) {
  const colInd = columnDropIndicator || dropIndicator;
  const cardInd = cardDropIndicator || dropIndicator;

  // Normalize the two authoring modes into a flat list of BoardColumn elements.
  const baseCols = Array.isArray(columns)
    ? columns.map((c, i) => (
        <BoardColumn key={c.id != null ? c.id : i} title={c.title} count={c.count} actions={c.actions}>
          {c.items}
        </BoardColumn>
      ))
    : React.Children.toArray(children);

  // Parse columns + their cards into a keyed model. Card ids are namespaced by
  // their origin column so they stay stable even after moving elsewhere.
  const parsed = React.useMemo(() => {
    const colKeys = [];
    const colMeta = {};
    const cardNodes = {};
    const initialDist = {};
    baseCols.forEach((colEl, ci) => {
      const colKey = String(colEl.key != null ? colEl.key : ci);
      colKeys.push(colKey);
      colMeta[colKey] = colEl;
      const cards = React.Children.toArray(colEl.props && colEl.props.children);
      const ids = cards.map((cardEl, k) => {
        const id = colKey + "::" + String(cardEl.key != null ? cardEl.key : k);
        cardNodes[id] = cardEl;
        return id;
      });
      initialDist[colKey] = ids;
    });
    return { colKeys, colMeta, cardNodes, initialDist };
  }, [baseCols]);

  const signature =
    parsed.colKeys.join("|") + "§" + parsed.colKeys.map((k) => parsed.initialDist[k].join(",")).join("¶");

  const [colOrder, setColOrder] = React.useState(parsed.colKeys);
  const [dist, setDist] = React.useState(parsed.initialDist);
  const sigRef = React.useRef(signature);
  React.useEffect(() => {
    if (sigRef.current !== signature) {
      sigRef.current = signature;
      setColOrder(parsed.colKeys);
      setDist(parsed.initialDist);
    }
  }, [signature, parsed]);

  const dnd = useDraggable({
    reorderable,
    cardsDraggable,
    onColumnMove: (fromKey, toIndex) => {
      setColOrder((prev) => {
        const oldIdx = prev.indexOf(fromKey);
        const next = prev.filter((k) => k !== fromKey);
        let at = toIndex;
        if (oldIdx > -1 && oldIdx < toIndex) at = toIndex - 1;
        next.splice(Math.max(0, Math.min(at, next.length)), 0, fromKey);
        if (onReorder) onReorder(next);
        return next;
      });
    },
    onCardMove: ({ id, fromCol, toCol, index }) => {
      setDist((prev) => {
        const next = { ...prev };
        next[fromCol] = (next[fromCol] || []).filter((x) => x !== id);
        let insert = index;
        if (fromCol === toCol) {
          const oldIdx = (prev[fromCol] || []).indexOf(id);
          if (oldIdx > -1 && oldIdx < index) insert = index - 1;
        }
        next[toCol] = next[toCol] ? [...next[toCol]] : [];
        next[toCol].splice(Math.max(0, Math.min(insert, next[toCol].length)), 0, id);
        if (onCardMove) onCardMove({ id, from: fromCol, to: toCol, index: insert });
        return next;
      });
    },
  });

  const colSlots = colInd === "line" || colInd === "ghost";
  const cardSlots = cardInd === "line" || cardInd === "ghost";

  const rendered = [];
  colOrder.forEach((colKey, pos) => {
    const colEl = parsed.colMeta[colKey];
    if (!colEl) return;

    // Column insertion slot (line/ghost) before this column.
    if (reorderable && colSlots && dnd.draggingCol && dnd.colOver && dnd.colOver.index === pos) {
      rendered.push(<DropSlot key={"colslot-" + pos} mode={colInd} orientation="horizontal" size={dnd.size} />);
    }

    const ids = dist[colKey] || [];
    const body = [];
    ids.forEach((id, i) => {
      if (cardsDraggable && cardSlots && dnd.cardOver && dnd.cardOver.colKey === colKey && dnd.cardOver.index === i) {
        body.push(<DropSlot key={"slot-" + i} mode={cardInd} orientation="vertical" size={dnd.size} />);
      }
      const node = parsed.cardNodes[id];
      if (!node) return;
      body.push(
        cardsDraggable ? (
          <div
            key={id}
            className="ds-board-card-drag"
            data-dragging={dnd.draggingCard === id ? "" : undefined}
            {...dnd.cardProps(colKey, i, id)}
          >
            {node}
          </div>
        ) : (
          React.cloneElement(node, { key: id })
        )
      );
    });
    if (cardsDraggable && cardSlots && dnd.cardOver && dnd.cardOver.colKey === colKey && dnd.cardOver.index === ids.length) {
      body.push(<DropSlot key="slot-end" mode={cardInd} orientation="vertical" size={dnd.size} />);
    }

    const bodyProps = cardsDraggable
      ? {
          ...dnd.columnBodyProps(colKey, ids.length),
          "data-card-over":
            cardInd === "outline" && dnd.draggingCard && dnd.cardOver && dnd.cardOver.colKey === colKey ? "" : undefined,
          "data-drop-style": cardInd,
        }
      : null;

    const colProps = {
      key: colKey,
      dragHandleProps: dnd.columnHandleProps(colKey),
      bodyProps,
      "data-dragging": dnd.draggingCol === colKey ? "" : undefined,
      "data-drop-target":
        reorderable && colInd === "outline" && !dnd.draggingCard && dnd.colOver && dnd.colOver.pos === pos && dnd.draggingCol !== colKey
          ? ""
          : undefined,
      "data-drop-style": colInd,
      children: body,
      ...(dnd.columnDropProps(colKey, pos) || {}),
    };
    rendered.push(React.cloneElement(colEl, colProps));
  });
  if (reorderable && colSlots && dnd.draggingCol && dnd.colOver && dnd.colOver.index === colOrder.length) {
    rendered.push(<DropSlot key="colslot-end" mode={colInd} orientation="horizontal" size={dnd.size} />);
  }

  return (
    <div className={cn("ds-board", className)} data-variant={variant} {...props}>
      {rendered}
    </div>
  );
}

/** BoardColumn — a single kanban lane. Its header doubles as the drag handle when inside a reorderable Board. */
export function BoardColumn({ title, count, actions = null, dragHandleProps = null, bodyProps = null, className = "", children, ...props }) {
  const hasHeader = title != null || count != null || actions || dragHandleProps;
  return (
    <section className={cn("ds-board-column", className)} {...props}>
      {hasHeader && (
        <header className="ds-board-column-header" {...(dragHandleProps || {})} data-grab={dragHandleProps ? "" : undefined}>
          {title != null && <span className="ds-board-column-title">{title}</span>}
          {count != null && <span className="ds-board-column-count">{count}</span>}
          {actions && <span className="ds-board-column-actions">{actions}</span>}
        </header>
      )}
      <div className="ds-board-column-body" {...(bodyProps || {})}>{children}</div>
    </section>
  );
}

/** BoardCard — a card inside a BoardColumn. Board wraps it in a drag handle when cardsDraggable. */
export function BoardCard({ className = "", children, ...props }) {
  return (
    <div className={cn("ds-board-card", className)} {...props}>
      {children}
    </div>
  );
}
