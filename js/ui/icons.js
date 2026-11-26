/* =====================================================================
   Abysse Academy · icônes (SVG en ligne, couleur = currentColor)
   AA.icon("nom") renvoie le SVG. Pour en ajouter une : une entrée ici.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA;
  const S = (body, fill) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>${body}</svg>`;
  const I = (AA.ICONS = {
    /* navigation */
    home: S('<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>'),
    map: S('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
    train: S('<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>'),
    lab: S('<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 006.2 21h11.6a2 2 0 001.7-2.5L14 9V3"/><path d="M7 15h10"/>'),
    user: S('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'),
    back: S('<path d="M15 18l-6-6 6-6"/>'),
    next: S('<path d="M9 18l6-6-6-6"/>'),
    close: S('<path d="M6 6l12 12M18 6L6 18"/>'),
    check: S('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    x: S('<path d="M7 7l10 10M17 7L7 17"/>'),
    plus: S('<path d="M12 5v14M5 12h14"/>'),
    gear: S('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>'),
    play: S('<path d="M7 4.5v15l12-7.5z"/>', true),
    /* thèmes de cours */
    gauge: S('<circle cx="12" cy="13" r="8"/><path d="M12 13l4-4M7 17h10"/>'),
    balloon: S('<ellipse cx="12" cy="10" rx="6" ry="7"/><path d="M12 17l-1 2h2l-1-2M12 19c0 2-2 2-2 3"/>'),
    scale: S('<path d="M12 3v18M12 3l-5 5M12 3l5 5M12 21l-5-5M12 21l5-5"/>'),
    mol: S('<circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><circle cx="12" cy="17" r="3"/><path d="M9 10l2 5M15 10l-2 5"/>'),
    lungs: S('<path d="M12 3v8M12 11c-2 0-3 1-3 3M12 11c2 0 3 1 3 3M9 7C5 7 3 13 3 17c0 2 2 3 4 2l2-1V9M15 7c4 0 6 6 6 10 0 2-2 3-4 2l-2-1V9"/>'),
    cross: S('<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>', true),
    profile: S('<path d="M2 4l5 10h6l3-4h2l1-2h3"/>'),
    tank: S('<rect x="8" y="6" width="8" height="16" rx="4"/><path d="M10 6V3h4v3M14 3h4"/>'),
    flag: S('<path d="M5 22V3M5 4h14l-4 5 4 5H5"/>'),
    fish: S('<path d="M2 12c4-6 11-6 15 0-4 6-11 6-15 0zM17 12l5-4v8z"/><circle cx="7" cy="11" r="1" fill="currentColor"/>'),
    users: S('<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M17 4a4 4 0 010 8M22 21c0-3-2-5-4-5.5"/>'),
    buoy: S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M18.4 5.6l-3.6 3.6M5.6 18.4l3.6-3.6M18.4 18.4l-3.6-3.6"/>'),
    exam: S('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    table: S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>'),
    phone: S('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>'),
    o2: S('<rect x="7" y="7" width="10" height="15" rx="5"/><path d="M10 7V4h4v3M12 12v5M9.5 14.5h5"/>'),
    heart: S('<path d="M12 20s-7-4.4-9-9a4.5 4.5 0 018-4 4.5 4.5 0 018 4c-2 4.6-7 9-7 9z"/>'),
    teach: S('<path d="M3 7l9-4 9 4-9 4z"/><path d="M7 9v5c3 2 7 2 10 0V9M21 7v6"/>'),
    chat: S('<path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5A8 8 0 1121 12z"/>'),
    shield: S('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    plan: S('<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4M16 2v4M4 10h16M8 14h3M8 17h6"/>'),
    /* modes */
    sun: S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>'),
    cards: S('<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 012 2v13"/>'),
    timer: S('<circle cx="12" cy="14" r="8"/><path d="M12 14V9M10 2h4"/>'),
    dive: S('<path d="M2 4h20M4 4l4 12h8l4-8"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/>'),
    calc: S('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2M14 19h2"/>'),
    watch: S('<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6V2h6v4M9 18v4h6v-4M9 12h3l1-2"/>'),
    chart: S('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    book: S('<path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5z"/><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>'),
    layers: S('<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>'),
    bulb: S('<path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z"/>'),
    note: S('<path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4M8 9h8M8 13h5"/>'),
    doubt: S('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>'),
    info: S('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>'),
    lock: S('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
    refresh: S('<path d="M21 12a9 9 0 01-15.5 6.2L3 16M3 12a9 9 0 0115.5-6.2L21 8M21 3v5h-5M3 21v-5h5"/>'),
    download: S('<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>'),
    upload: S('<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>'),
    share: S('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>'),
    sound: S('<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M19 6a8 8 0 010 12"/>'),
    mute: S('<path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/>'),
    vibrate: S('<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 8v8M21 8v8"/>'),
    palette: S('<path d="M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.5 0-1-.8-1.3-.8-2.2 0-.8.7-1.3 1.5-1.3H17a4 4 0 004-4c0-5-4-9-9-9z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="10" cy="7" r="1.2" fill="currentColor"/><circle cx="15" cy="7.5" r="1.2" fill="currentColor"/>'),
    globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'),
    calendar: S('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    target: S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>'),
    compass: S('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>'),
    trophy: S('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4"/>'),
    sparkle: S('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'),
    wave: S('<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>'),
    install: S('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 7v7M9 11l3 3 3-3M10 18h4"/>'),
    /* jeu */
    star: S('<path d="M12 2.5l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.7l-6.1 3.4 1.4-6.8-5.1-4.7 6.9-.8z"/>', true),
    flame: S('<path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z"/>', true),
    bolt: S('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', true),
    /* 1.1 */
    search: S('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    swords: S('<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 6.5L13 3h3v3l-3.5 3.5M5 14l4 4M7 17l-3 3"/>'),
    scroll: S('<path d="M8 21h11a2 2 0 002-2v-1H10v1a2 2 0 01-4 0V5a2 2 0 00-2-2h12a2 2 0 012 2v13M4 3a2 2 0 00-2 2v2h4M10 8h5M10 12h5"/>'),
    save: S('<path d="M5 3h11l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M7 3v5h8V3M7 21v-7h10v7"/>'),
    brain: S('<path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 1V5a2 2 0 00-3-1zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 1"/>'),
    hand: S('<path d="M8 13V5a1.5 1.5 0 013 0v6M11 11V3.5a1.5 1.5 0 013 0V11M14 11V5a1.5 1.5 0 013 0v8c0 4-2.5 8-7 8-3 0-4.5-1.5-6-4l-2-3.5a1.5 1.5 0 012.5-1.5L8 15"/>'),
    text: S('<path d="M4 20l5-14 5 14M6 15h6M15 20l3-8 3 8M16 18h4"/>'),
    eye: S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    stop: S('<rect x="6" y="6" width="12" height="12" rx="2"/>', true),
    pause: S('<rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/>', true),
    edit: S('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
    expand: S('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    transfer: S('<path d="M7 7h13l-4-4M17 17H4l4 4"/>'),
    shell: S('<path d="M12 21c-5 0-9-3-9-8 0-4 4-9 9-9s9 5 9 9c0 5-4 8-9 8zM12 21V8M7 18l3-9M17 18l-3-9M4 14l5-4M20 14l-5-4"/>'),
    offline: S('<path d="M2 8.5a16 16 0 0120 0M5 12a11 11 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01M3 3l18 18"/>'),
    quote: S('<path d="M7 7h4v4c0 3-1 5-4 6M14 7h4v4c0 3-1 5-4 6"/>')
  });
  AA.icon = name => I[name] || I.sparkle;
  /* Étoile de score : classes star-on / star-off (couleurs du thème). */
  AA.star = on => `<svg viewBox="0 0 24 24" aria-hidden="true"><path class="${on ? "star-on" : "star-off"}" d="M12 2.5l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.7l-6.1 3.4 1.4-6.8-5.1-4.7 6.9-.8z"/></svg>`;
  AA.stars = (n, max = 3) => `<span class="stars" aria-label="${n}/${max}">${Array.from({ length: max }, (_, i) => AA.star(i < n)).join("")}</span>`;
  /* Logo : une bulle-boussole. */
  AA.logo = () => `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--primary)"/><stop offset="1" stop-color="var(--world-e2)"/></linearGradient></defs>
    <circle cx="32" cy="32" r="29" fill="url(#lg)"/><circle cx="32" cy="32" r="22" fill="var(--bg)" opacity=".92"/>
    <path d="M32 14l6 18-6 18-6-18z" fill="var(--primary)"/><path d="M32 14l6 18h-12z" fill="var(--accent)"/>
    <circle cx="32" cy="32" r="3.2" fill="var(--bg)"/><circle cx="46" cy="20" r="3" fill="none" stroke="var(--ink)" stroke-width="1.6" opacity=".7"/><circle cx="50" cy="13" r="1.8" fill="none" stroke="var(--ink)" stroke-width="1.4" opacity=".55"/></svg>`;
})();
