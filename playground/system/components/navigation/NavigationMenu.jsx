import React from "react";
import { cn } from "../lib/cn.js";
import { Icon } from "../icons/Icon.jsx";

const NavCtx = React.createContext(null);

/** NavigationMenu — top-level site nav with dropdown panels. */
export function NavigationMenu({ className = "", children, ...props }) {
  const [openId, setOpenId] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (openId == null) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenId(null); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [openId]);
  return (
    <NavCtx.Provider value={{ openId, setOpenId }}>
      <nav ref={ref} className={cn("ds-navmenu", className)} {...props}>{children}</nav>
    </NavCtx.Provider>
  );
}
export function NavigationMenuList({ className = "", ...props }) { return <ul className={cn("ds-navmenu-list", className)} {...props} />; }
export function NavigationMenuItem({ children }) {
  const id = React.useId();
  return <li style={{ position: "relative" }}>{React.Children.map(children, (c) => React.isValidElement(c) ? React.cloneElement(c, { __navId: id }) : c)}</li>;
}
export function NavigationMenuTrigger({ __navId, className = "", children, ...props }) {
  const ctx = React.useContext(NavCtx);
  const open = ctx.openId === __navId;
  return (
    <button type="button" data-state={open ? "open" : "closed"} onClick={() => ctx.setOpenId(open ? null : __navId)}
      className={cn("ds-navmenu-trigger", className)} {...props}>{children}<Icon name="chevron-down" size={12} /></button>
  );
}
export function NavigationMenuContent({ __navId, className = "", children, ...props }) {
  const ctx = React.useContext(NavCtx);
  if (ctx.openId !== __navId) return null;
  return <div className={cn("ds-navmenu-content", className)} {...props}>{children}</div>;
}
export function NavigationMenuLink({ className = "", title, children, ...props }) {
  return (
    <a className={cn("ds-navmenu-link", className)} {...props}>
      {title && <div className="ds-navmenu-link-title">{title}</div>}
      {children && <div className="ds-navmenu-link-desc">{children}</div>}
    </a>
  );
}
