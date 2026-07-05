/* ============================================================
   THEME ENGINE — shadcn edition
   Vanilla JS. Drives four theming axes on a target element
   (default <html>) using ONLY the standard shadcn variables, and
   persists the choice:

     • mode   → toggles the theme class            (light | dark | dim-* | hc-*)
     • accent → sets [data-accent]  (re-points --primary/--ring)
     • radius → sets [data-radius]  (rescales --radius)
     • font   → sets [data-font]    (re-skins --font-sans)
     • spacing→ sets --spacing      (base spacing unit, reflows density)
     • scale  → sets --scale        (root font-size multiplier / zoom)

  Every control maps to a real shadcn token.

     ThemeEngine.apply({mode, accent, radius, font})
     ThemeEngine.get()          -> current settings
     ThemeEngine.set(partial)   -> merge + apply + persist
     ThemeEngine.mountDock()    -> floating control panel
   ============================================================ */
(function (global) {
  var KEY = "shadcn-theme";

  // All non-default mode classes (light = no class).
  var MODE_CLASSES = ["dark", "dim-light", "dim-dark", "hc-light", "hc-dark"];
  function applyMode(el, mode) {
    MODE_CLASSES.forEach(function (c) { el.classList.remove(c); });
    if (mode !== "light") el.classList.add(mode);
  }

  var AXES = {
    mode:   { values: ["light", "dark", "dim-light", "dim-dark", "hc-light", "hc-dark"], def: "light" },
    accent: { attr: "data-accent", values: ["neutral","blue","indigo","violet","emerald","rose","orange","amber","cyan"], def: "neutral" },
    radius: { attr: "data-radius", values: ["none","sm","md","lg","xl","full"], def: "md" },
    font:   { attr: "data-font",   values: ["geist","inter","plex","system"], def: "geist" }
  };

  // Numeric controls. Slider value is in whole PIXELS (round steps);
  // toStore() converts to the CSS value actually applied.
  var SLIDERS = {
    spacing: { css: "--spacing", unit: "rem", label: "Spacing", def: 4, min: 2, max: 8, step: 1,
               toStore: function (px) { return px / 16; },
               fmt: function (px) { return px + "px base"; } },
    scale:   { css: "--scale",   unit: "",    label: "Scale",   def: 16, min: 12, max: 24, step: 1,
               toStore: function (px) { return px / 16; },
               fmt: function (px) { return px + "px \u00b7 " + (px / 16).toFixed(2) + "\u00d7"; } }
  };

  function defaults() {
    var d = {}; for (var k in AXES) d[k] = AXES[k].def;
    for (var s in SLIDERS) d[s] = SLIDERS[s].def;
    return d;
  }

  function read() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      var merged = Object.assign(defaults(), saved);
      // Migrate older rem/multiplier values to the px domain.
      if (merged.spacing < 1) merged.spacing = Math.round(merged.spacing * 16);
      if (merged.scale < 3) merged.scale = Math.round(merged.scale * 16);
      return merged;
    } catch (e) { return defaults(); }
  }
  function write(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  var current = read();

  function apply(s, target) {
    if (s) current = Object.assign({}, current, s);
    var el = target || document.documentElement;

    // mode → theme class (light = none; dark keeps shadcn's .dark)
    applyMode(el, current.mode);

    // attribute axes; neutral accent = no attribute (falls back to monochrome)
    ["accent", "radius", "font"].forEach(function (k) {
      var attr = AXES[k].attr, v = current[k];
      if (k === "accent" && v === "neutral") el.removeAttribute(attr);
      else el.setAttribute(attr, v);
    });

    // numeric controls → inline custom properties (px slider → css value)
    for (var s in SLIDERS) {
      el.style.setProperty(SLIDERS[s].css, SLIDERS[s].toStore(current[s]) + SLIDERS[s].unit);
    }

    write(current);
    global.dispatchEvent(new CustomEvent("theme:change", { detail: current }));
    return current;
  }

  // ---- Floating dock UI -------------------------------------------------
  var SWATCH = {
    neutral: "#71717a", blue: "#3b82f6", indigo: "#6366f1", violet: "#8b5cf6",
    emerald: "#10b981", rose: "#f43f5e", orange: "#f97316", amber: "#f59e0b", cyan: "#06b6d4"
  };
  var LABEL = {
    light: "Light", dark: "Dark",
    "dim-light": "Dim Light", "dim-dark": "Dim Dark",
    "hc-light": "HC Light", "hc-dark": "HC Dark"
  };
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
  var MOON = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  function svgIcon(inner, size) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("width", size || 13); s.setAttribute("height", size || 13);
    s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "2");
    s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
    s.style.flexShrink = "0"; s.innerHTML = inner;
    return s;
  }

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) for (var a in attrs) {
      if (a === "style") e.style.cssText = attrs[a];
      else if (a === "class") e.className = attrs[a];
      else e.setAttribute(a, attrs[a]);
    }
    (kids || []).forEach(function (k) { e.appendChild(typeof k === "string" ? document.createTextNode(k) : k); });
    return e;
  }

  function sectionLabel(t) {
    return h("div", { style: "font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:8px" }, [t]);
  }

  var docks = [];
  function refreshActiveAll() { docks.forEach(function (d) { refreshActive(d); refreshAccent(d); }); }

  function refreshActive(dock) {
    dock.querySelectorAll("[data-axis]").forEach(function (btn) {
      if (btn.getAttribute("data-axis") === "accent") return; // accent swatches keep their color (handled by refreshAccent)
      var on = current[btn.getAttribute("data-axis")] === btn.getAttribute("data-val");
      btn.style.borderColor = on ? "var(--primary)" : "var(--border)";
      btn.style.boxShadow = on ? "inset 0 0 0 1px var(--primary)" : "none";
      btn.style.color = on ? "var(--foreground)" : "var(--muted-foreground)";
      btn.style.background = on ? "var(--accent)" : "transparent";
    });
  }

  function pill(axis, val, label) {
    var b = h("button", {
      "data-axis": axis, "data-val": val, type: "button",
      style: "font:inherit;font-size:12px;padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius-full);background:transparent;color:var(--muted-foreground);cursor:pointer;transition:all var(--duration-fast,150ms) var(--ease-standard,ease)"
    }, [label]);
    b.onclick = function () { var o = {}; o[axis] = val; apply(o); refreshActiveAll(); };
    return b;
  }

  function segRow(label, axis, render) {
    var wrap = h("div", { style: "margin-bottom:16px" });
    wrap.appendChild(sectionLabel(label));
    var row = h("div", { style: "display:flex;flex-wrap:wrap;gap:6px" });
    AXES[axis].values.forEach(function (v) { row.appendChild(render(v)); });
    wrap.appendChild(row);
    return wrap;
  }

  function sliderRow(key) {
    var cfg = SLIDERS[key];
    var wrap = h("div", { style: "margin-bottom:16px" });
    var head = h("div", { style: "display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:6px" });
    head.appendChild(h("div", { style: "font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted-foreground)" }, [cfg.label]));
    var valEl = h("div", { "data-sliderval": key, style: "font-size:11px;font-family:var(--font-mono);color:var(--muted-foreground)" }, [cfg.fmt(current[key])]);
    head.appendChild(valEl);
    wrap.appendChild(head);
    var slider = h("input", {
      type: "range", min: String(cfg.min), max: String(cfg.max), step: String(cfg.step), value: String(current[key]),
      "data-slider": key, style: "width:100%;accent-color:var(--primary);cursor:pointer;height:16px"
    });
    slider.oninput = function () { var v = Number(slider.value); var o = {}; o[key] = v; apply(o); valEl.textContent = cfg.fmt(v); };
    wrap.appendChild(slider);
    return wrap;
  }

  function refreshAccent(panel) {
    panel.querySelectorAll('[data-axis="accent"]').forEach(function (d) {
      var on = current.accent === d.getAttribute("data-val");
      d.style.borderColor = on ? "var(--foreground)" : "var(--border)";
      d.style.transform = on ? "scale(1.12)" : "scale(1)";
    });
  }

  function syncDockTheme(panel) { applyMode(panel, current.mode); }

  function refreshSliders(panel) {
    panel.querySelectorAll("[data-slider]").forEach(function (sl) {
      var k = sl.getAttribute("data-slider");
      sl.value = String(current[k]);
      var v = panel.querySelector('[data-sliderval="' + k + '"]');
      if (v) v.textContent = SLIDERS[k].fmt(current[k]);
    });
  }

  function modeGrid() {
    var wrap = h("div", { style: "margin-bottom:16px" });
    wrap.appendChild(sectionLabel("Mode"));
    var grid = h("div", { style: "display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:6px;align-items:center" });
    var rows = [
      { icon: SUN, items: [["light", "Light"], ["dim-light", "Dim"], ["hc-light", "HC"]] },
      { icon: MOON, items: [["dark", "Dark"], ["dim-dark", "Dim"], ["hc-dark", "HC"]] }
    ];
    rows.forEach(function (r) {
      var ic = h("div", { style: "display:flex;align-items:center;justify-content:center;color:var(--muted-foreground);margin-right:6px" });
      ic.appendChild(svgIcon(r.icon, 15));
      grid.appendChild(ic);
      r.items.forEach(function (it) {
        var b = h("button", {
          "data-axis": "mode", "data-val": it[0], type: "button", title: LABEL[it[0]],
          style: "font:inherit;font-size:12px;text-align:center;padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius-full);background:transparent;color:var(--muted-foreground);cursor:pointer;transition:all var(--duration-fast,150ms) var(--ease-standard,ease)"
        }, [it[1]]);
        b.onclick = function () { apply({ mode: it[0] }); refreshActiveAll(); };
        grid.appendChild(b);
      });
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function mountDock(opts) {
    opts = opts || {};
    var panel = h("div", {
      "data-accent-scope": "", // dock inherits page accent
      style: "position:fixed;z-index:2147483000;bottom:18px;right:18px;width:296px;max-height:86vh;overflow:auto;background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg,0 10px 30px rgba(0,0,0,.18));padding:16px;display:none;font-family:var(--font-sans)"
    });
    syncDockTheme(panel);

    panel.appendChild(h("div", { style: "display:flex;align-items:center;justify-content:space-between;margin-bottom:16px" }, [
      h("div", { style: "font-size:13px;font-weight:600;letter-spacing:-.01em" }, ["Theme"]),
      (function () {
        var x = h("button", { type: "button", "aria-label": "Close", style: "font:inherit;border:0;background:transparent;color:var(--muted-foreground);cursor:pointer;font-size:18px;line-height:1;padding:2px 6px;border-radius:var(--radius-sm)" }, ["\u00d7"]);
        x.onclick = toggle; return x;
      })()
    ]));

    panel.appendChild(modeGrid());

    // Accent swatches
    (function () {
      var wrap = h("div", { style: "margin-bottom:16px" });
      wrap.appendChild(sectionLabel("Accent"));
      var row = h("div", { style: "display:flex;flex-wrap:wrap;gap:8px" });
      AXES.accent.values.forEach(function (v) {
        var dot = h("button", {
          "data-axis": "accent", "data-val": v, type: "button", title: v,
          style: "width:22px;height:22px;border-radius:var(--radius-full);border:2px solid var(--border);background:" + SWATCH[v] + ";cursor:pointer;padding:0;transition:transform var(--duration-fast,150ms)"
        }, []);
        dot.onclick = function () { apply({ accent: v }); refreshActiveAll(); };
        row.appendChild(dot);
      });
      wrap.appendChild(row); panel.appendChild(wrap);
    })();

    panel.appendChild(segRow("Radius", "radius", function (v) { return pill("radius", v, v); }));
    panel.appendChild(segRow("Font", "font", function (v) { return pill("font", v, v[0].toUpperCase() + v.slice(1)); }));

    // Divider + numeric controls
    panel.appendChild(h("div", { style: "height:1px;background:var(--border);margin:2px 0 16px" }, []));
    panel.appendChild(sliderRow("spacing"));
    panel.appendChild(sliderRow("scale"));

    var reset = h("button", { type: "button", style: "font:inherit;font-size:12px;width:100%;margin-top:4px;padding:8px;border:1px solid var(--border);border-radius:var(--radius-md);background:var(--secondary);color:var(--secondary-foreground);cursor:pointer" }, ["Reset to defaults"]);
    reset.onclick = function () { apply(defaults()); syncDockTheme(panel); refreshActiveAll(); refreshSliders(panel); };
    panel.appendChild(reset);

    var fab = h("button", {
      type: "button", "aria-label": "Open theme switcher",
      style: "position:fixed;z-index:2147483000;bottom:18px;right:18px;width:48px;height:48px;border-radius:var(--radius-full);border:1px solid var(--border);background:var(--primary);color:var(--primary-foreground);box-shadow:var(--shadow-lg,0 10px 30px rgba(0,0,0,.18));cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px"
    }, ["\u25D0"]);

    function toggle() {
      var open = panel.style.display === "none";
      panel.style.display = open ? "block" : "none";
      fab.style.display = open ? "none" : "flex";
      if (open) { syncDockTheme(panel); refreshActiveAll(); refreshSliders(panel); }
    }
    fab.onclick = toggle;

    document.body.appendChild(panel);
    document.body.appendChild(fab);
    docks.push(panel);

    // keep dock chrome in sync if theme changes elsewhere
    global.addEventListener("theme:change", function () { syncDockTheme(panel); });

    return { toggle: toggle, panel: panel, fab: fab };
  }

  apply(current);

  global.ThemeEngine = {
    apply: apply,
    get: function () { return JSON.parse(JSON.stringify(current)); },
    set: function (p) { return apply(p); },
    defaults: defaults,
    mountDock: mountDock,
    AXES: AXES
  };
})(window);
