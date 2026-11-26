/* =====================================================================
   Abysse Academy · gestes tactiles
   AA.gest.swipe(el, { left, right, up, follow }) : balayage horizontal ;
     follow: true fait suivre le doigt à l'élément (style carte).
   AA.gest.hold(el, fn, ms) : appui long (vibration au déclenchement).
   Désactivables dans les réglages (profile.gestures).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA;
  const g = (AA.gest = {});
  const on = () => AA.S.profile.gestures !== false;
  const TH = 70; /* distance minimale d'un balayage, en px */

  g.swipe = (el, h) => {
    if (!el) return;
    let x0 = 0, y0 = 0, dx = 0, id = null, horiz = null, t0 = 0;
    const reset = () => { if (h.follow) { el.style.transition = "transform .25s var(--ease), opacity .25s"; el.style.transform = ""; el.style.opacity = ""; } el.classList.remove("swiping", "sw-left", "sw-right"); };
    el.addEventListener("pointerdown", e => {
      if (!on() || e.pointerType === "mouse" || id != null) return;
      id = e.pointerId; x0 = e.clientX; y0 = e.clientY; dx = 0; horiz = null; t0 = Date.now();
      if (h.follow) el.style.transition = "none";
    });
    el.addEventListener("pointermove", e => {
      if (e.pointerId !== id) return;
      dx = e.clientX - x0; const dy = e.clientY - y0;
      if (horiz == null && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) horiz = Math.abs(dx) > Math.abs(dy) * 1.3;
      if (!horiz) return;
      el.classList.add("swiping"); el.classList.toggle("sw-right", dx > TH / 2 && !!h.right); el.classList.toggle("sw-left", dx < -TH / 2 && !!h.left);
      if (h.follow) { el.style.transform = `translateX(${dx}px) rotate(${dx / 30}deg)`; el.style.opacity = String(1 - Math.min(.5, Math.abs(dx) / 500)); }
    });
    const end = e => {
      if (e.pointerId !== id) return; id = null;
      const fast = Date.now() - t0 < 300 && Math.abs(dx) > 40;
      if (horiz && (Math.abs(dx) > TH || fast)) {
        const fn = dx > 0 ? h.right : h.left;
        if (fn) {
          el.dataset.swiped = "1"; setTimeout(() => delete el.dataset.swiped, 400);
          AA.fx.buzz(12);
          if (h.follow) { el.style.transition = "transform .22s ease-in, opacity .22s"; el.style.transform = `translateX(${dx > 0 ? 120 : -120}%) rotate(${dx > 0 ? 12 : -12}deg)`; el.style.opacity = "0"; setTimeout(fn, 200); }
          else { reset(); fn(); }
          return;
        }
      }
      reset();
    };
    el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
    /* Un balayage ne doit pas déclencher le clic qui suit. */
    el.addEventListener("click", e => { if (el.dataset.swiped) { e.stopPropagation(); e.preventDefault(); } }, true);
  };

  g.hold = (el, fn, ms = 550) => {
    if (!el) return;
    let tm = null, x0 = 0, y0 = 0, fired = false;
    const cancel = () => { clearTimeout(tm); tm = null; el.classList.remove("holding"); };
    el.addEventListener("pointerdown", e => {
      if (!on() || e.button > 0) return;
      fired = false; x0 = e.clientX; y0 = e.clientY; el.classList.add("holding");
      tm = setTimeout(() => { tm = null; fired = true; el.classList.remove("holding"); AA.fx.buzz([15, 30, 15]); fn(e); }, ms);
    });
    el.addEventListener("pointermove", e => { if (tm && Math.hypot(e.clientX - x0, e.clientY - y0) > 12) cancel(); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(ev => el.addEventListener(ev, cancel));
    el.addEventListener("contextmenu", e => { if (on()) e.preventDefault(); });
    /* Après un appui long, on n'enregistre pas le clic (pas de réponse involontaire). */
    el.addEventListener("click", e => { if (fired) { fired = false; e.stopPropagation(); e.preventDefault(); } }, true);
  };
})();
