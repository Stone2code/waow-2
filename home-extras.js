/**
 * Homepage extras: (1) boat stats count up with random digits when they scroll into view,
 * (2) "Explore itineraries" carousel built from the itinerary pages (random order on every load),
 * (3) guest postcards slider. Needs itineraries-data.js + itinerary-v2-data.js.
 */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- 1. stats: random digits that settle left to right
  var stats = document.querySelectorAll(".hp-boat__stats [data-count]");
  function scramble(el) {
    var final = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""), t0 = performance.now(), dur = 1100;
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur), locked = Math.floor(p * final.length), out = "";
      for (var i = 0; i < final.length; i++) out += (i < locked || !/\d/.test(final[i])) ? final[i] : String(Math.floor(Math.random() * 10));
      el.textContent = p >= 1 ? final : out;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if (stats.length && !reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); scramble(e.target); } }); }, { threshold: 0.8 });
    stats.forEach(function (s) { io.observe(s); });
  }

  // ---- 2. itineraries carousel
  var track = document.getElementById("coming-next-track"), next = document.getElementById("coming-next-next");
  if (track && typeof ITINERARY_V2 !== "undefined" && typeof itineraryHref === "function") {
    var slugs = Object.keys(ITINERARY_V2);
    for (var n = slugs.length - 1; n > 0; n--) { var r = Math.floor(Math.random() * (n + 1)), tmp = slugs[n]; slugs[n] = slugs[r]; slugs[r] = tmp; }
    track.innerHTML = slugs.map(function (k) {
      var p = ITINERARY_V2[k], nm = String(p.name || p.card.title).replace(/"/g, "&quot;");
      return '<a class="hp-coming-next__card" href="' + itineraryHref(k) + '" aria-label="' + nm + '"><figure><img src="images/it-cover-' + k + '.webp" alt="' + nm + '"></figure><p>sea more</p></a>';
    }).join("");
    var prev = document.getElementById("coming-next-prev");
    // Eased glide (≈700 ms, ease-in-out) instead of the browser's abrupt smooth-scroll; snapping is paused while it runs.
    var anim = null;
    function glide(to) {
      to = Math.max(0, Math.min(to, track.scrollWidth - track.clientWidth));
      if (reduce) { track.scrollLeft = to; return; }
      if (anim) cancelAnimationFrame(anim);
      var from = track.scrollLeft, d = to - from, t0 = performance.now(), dur = 700;
      track.style.scrollSnapType = "none";
      (function step(now) {
        var p = Math.min(1, (now - t0) / dur), e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        track.scrollLeft = from + d * e;
        if (p < 1) anim = requestAnimationFrame(step); else { anim = null; track.style.scrollSnapType = ""; }
      })(t0);
    }
    function cardStep() { var c = track.querySelectorAll(".hp-coming-next__card"); return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; }
    if (prev) prev.addEventListener("click", function () { glide(track.scrollLeft <= 4 ? track.scrollWidth : track.scrollLeft - cardStep()); });
    if (next) next.addEventListener("click", function () {
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      glide(atEnd ? 0 : track.scrollLeft + cardStep());
    });
    // Arrows only when there is more than fits: with 4 cards or fewer on desktop, no slider behaviour at all.
    function syncArrows() {
      var more = track.scrollWidth - track.clientWidth > 4;
      [prev, next].forEach(function (b) { if (b) b.hidden = !more; });
      track.classList.toggle("is-static", !more);
    }
    window.addEventListener("resize", syncArrows); syncArrows();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncArrows);
  }

  // ---- 3. postcards slider
  var tt = document.getElementById("hp-testi-track"), tn = document.getElementById("hp-testi-next");
  var tp = document.getElementById("hp-testi-prev");
  if (tt && tp) tp.addEventListener("click", function () {
    var f = tt.querySelectorAll(".hp-testi"), step = f.length > 1 ? f[1].offsetLeft - f[0].offsetLeft : tt.clientWidth;
    tt.scrollTo({ left: tt.scrollLeft <= 4 ? tt.scrollWidth : tt.scrollLeft - step, behavior: "smooth" });
  });
  if (tt && tn) tn.addEventListener("click", function () {
    var f = tt.querySelectorAll(".hp-testi"), step = f.length > 1 ? f[1].offsetLeft - f[0].offsetLeft : tt.clientWidth;
    var atEnd = tt.scrollLeft + tt.clientWidth >= tt.scrollWidth - 4;
    tt.scrollTo({ left: atEnd ? 0 : tt.scrollLeft + step, behavior: "smooth" });
  });
})();
