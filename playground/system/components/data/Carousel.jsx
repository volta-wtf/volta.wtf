import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const CarouselCtx = React.createContext(null);

/** Carousel — horizontal slide viewport with prev/next controls. */
export function Carousel({ className = "", children, ...props }) {
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const api = {
    index, count, setCount,
    prev: () => setIndex((i) => Math.max(0, i - 1)),
    next: () => setIndex((i) => Math.min(count - 1, i + 1)),
    canPrev: index > 0, canNext: index < count - 1,
  };
  return (
    <CarouselCtx.Provider value={api}>
      <div className={cn("ds-carousel", className)} role="region" aria-roledescription="carousel" {...props}>{children}</div>
    </CarouselCtx.Provider>
  );
}
export function CarouselContent({ className = "", children, ...props }) {
  const ctx = React.useContext(CarouselCtx);
  const items = React.Children.count(children);
  React.useEffect(() => { ctx.setCount(items); }, [items]);
  return (
    <div className="ds-carousel-viewport">
      <div className={cn("ds-carousel-track", className)} style={{ transform: `translateX(-${ctx.index * 100}%)` }} {...props}>{children}</div>
    </div>
  );
}
export function CarouselItem({ className = "", ...props }) {
  return <div role="group" aria-roledescription="slide" className={cn("ds-carousel-item", className)} {...props} />;
}
export function CarouselPrevious({ className = "", ...props }) {
  const ctx = React.useContext(CarouselCtx);
  return <button type="button" aria-label="Previous slide" disabled={!ctx.canPrev} onClick={ctx.prev} className={cn("ds-carousel-btn ds-carousel-btn--prev", className)} {...props}><Icon name="chevron-left" size={16} /></button>;
}
export function CarouselNext({ className = "", ...props }) {
  const ctx = React.useContext(CarouselCtx);
  return <button type="button" aria-label="Next slide" disabled={!ctx.canNext} onClick={ctx.next} className={cn("ds-carousel-btn ds-carousel-btn--next", className)} {...props}><Icon name="chevron-right" size={16} /></button>;
}
