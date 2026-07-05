/* Shared workspace store — plain JS, used by BOTH the root workspace
   (index.html) and the editor. Persists to localStorage (never cleared). */
(function () {
  var KEY = 'dsrEditor.v1';

  var DEMO_ELS = {
    cover: { type: 'frame', name: 'Cover', x: 0, y: 0, w: 420, h: 300 },
    title: { type: 'text', name: 'Title', parent: 'cover', x: 24, y: 24, w: 300, h: 40, text: 'Arc Lounge Chair', binding: 'title', size: 24 },
    hero: { type: 'rectangle', name: 'Hero block', parent: 'cover', x: 24, y: 84, w: 372, h: 190, fillToken: 'accent', fill: '#d97757', shadows: [{ x: 0, y: 12, blur: 32, spread: -8, color: '#000000', alpha: 28 }] },
    photo: { type: 'image', name: 'Photo', x: 480, y: 0, w: 300, h: 220 },
    price: { type: 'text', name: 'Price', x: 480, y: 240, w: 120, h: 30, text: '640 €', mono: true, size: 16 },
    card: { type: 'frame', name: 'Product card', x: 0, y: 360, w: 260, h: 150, radiusToken: true, layout: { direction: 'column', gap: 12, padding: 16, align: 'start' }, shadows: [{ x: 0, y: 4, blur: 16, spread: -6, color: '#000000', alpha: 16 }], radius: 12 },
    cardBadge: { type: 'component', name: 'Badge', parent: 'card', component: 'Badge', x: 16, y: 16, w: 76, h: 18, props: { children: 'In stock', variant: 'selection' } },
    cardBtn: { type: 'component', name: 'Buy button', parent: 'card', component: 'Button', x: 16, y: 46, w: 120, h: 28, props: { children: 'Buy · 640 €', variant: 'primary', size: 'md' } },
  };
  var DEMO_ORDER = ['cover', 'title', 'hero', 'photo', 'price', 'card', 'cardBadge', 'cardBtn'];
  var THEME_DEFAULTS = { mode: 'light', accent: '#d97757', radius: 'md', font: 'geist', spacing: 4, scale: 1 };

  function now() { return Date.now(); }
  function uid() { return 'f' + now().toString(36) + Math.floor(Math.random() * 999).toString(36); }

  function seed() {
    var a = { id: 'q3-campaign', name: 'Q3 campaign', els: DEMO_ELS, order: DEMO_ORDER, theme: THEME_DEFAULTS, updatedAt: now() };
    var b = { id: uid(), name: 'Untitled', els: {}, order: [], theme: THEME_DEFAULTS, updatedAt: now() - 1000 };
    var store = { files: {}, fileOrder: [a.id, b.id], lastOpen: a.id };
    store.files[a.id] = a;
    store.files[b.id] = b;
    return store;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.files && s.fileOrder && s.fileOrder.length) return s;
      }
    } catch (e) { /* corrupted → reseed below without clearing other keys */ }
    var fresh = seed();
    save(fresh);
    return fresh;
  }

  function save(store) {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* quota — ignore */ }
    return store;
  }

  function newFile(store, name) {
    var f = { id: uid(), name: name || 'Untitled', els: {}, order: [], theme: THEME_DEFAULTS, updatedAt: now() };
    store.files[f.id] = f;
    store.fileOrder = [f.id].concat(store.fileOrder);
    store.lastOpen = f.id;
    save(store);
    return f;
  }

  function patchFile(store, id, patch) {
    var f = store.files[id];
    if (!f) return store;
    Object.assign(f, patch, { updatedAt: now() });
    return save(store);
  }

  function removeFile(store, id) {
    delete store.files[id];
    store.fileOrder = store.fileOrder.filter(function (x) { return x !== id; });
    if (store.lastOpen === id) store.lastOpen = store.fileOrder[0] || null;
    return save(store);
  }

  window.EDITOR_STORE = {
    KEY: KEY, THEME_DEFAULTS: THEME_DEFAULTS,
    load: load, save: save, newFile: newFile, patchFile: patchFile, removeFile: removeFile,
  };
})();
