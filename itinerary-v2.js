/**
 * Itinerary template, 1366px canvas — renders ?slug= from ITINERARY_V2
 * (itinerary-v2-data.js). Reference layout for every route page.
 * All positions below are ABSOLUTE PAGE COORDINATES read off the design
 * (header included); sec() converts them to section-relative values.
 * Sections: hero+map (122-810) · sea + logbook (810-1472) · story (1472-5311)
 * · carousel (5311-5933). Newsletter/footer are static markup.
 */
(function () {
  "use strict";
  var main = document.getElementById("main");
  if (!main || typeof ITINERARY_V2 === "undefined") return;

  var slug = new URLSearchParams(window.location.search).get("slug") || "sunda-spices-and-snakes";
  if (typeof ITINERARY_CANONICAL !== "undefined" && ITINERARY_CANONICAL[slug]) { window.location.replace("itinerary-v2.html?slug=" + encodeURIComponent(ITINERARY_CANONICAL[slug])); return; }
  var X = ITINERARY_V2[slug];
  if (!X) {
    main.innerHTML = '<section class="it2-missing"><div class="container"><h1>We couldn’t find that route.</h1><p><a class="link-arrow" href="itineraries.html">See all itineraries</a></p></div></section>';
    return;
  }
  var trip = (typeof ITINERARIES !== "undefined" ? ITINERARIES : []).filter(function (t) { return t.slug === slug; })[0];
  document.title = (X.name || X.card.title || (trip && trip.name) || "Itinerary") + " — Waow Charters";

  // ---- helpers -----------------------------------------------------------
  function st(x, y, w, h, fs, lh, ta, y0) {
    return "--x:" + x + "px;--y:" + (y - y0) + "px;" + (w != null ? "--w:" + w + "px;" : "") + (h != null ? "--h:" + h + "px;" : "") +
      (fs != null ? "--fs:" + fs + "px;" : "") + (lh != null ? "--lh:" + lh + "px;" : "") + (ta ? "--ta:" + ta + ";" : "");
  }
  function sec(cls, top, bottom, inner, extra) {
    return '<section class="' + cls + ' px-sec" style="--sh:' + (bottom - top) + "px;" + (extra || "") + '"><div class="container px-stage">' + inner + "</div></section>";
  }
  function li(list) { return list.join("&nbsp;· "); }

  var h = "";

  // ---- 1. hero + map (122 → 810) ----------------------------------------
  var T = 122;
  var ht = X.heroTitleStyle || {}, mb = X.mapBox || [778, 295, 326, 166];
  h += sec("it2-hero", T, 810,
    '<figure class="it2-hero__photo p" style="' + (function (p) { return st(p[0], p[1], p[2], p[3], null, null, null, T); })(X.poster || [197, 227, 303, 377]) + '"><img src="images/it-cover-' + slug + '.webp" alt="' + (X.name || X.card.title) + ' — itinerary poster"></figure>' +
    (X.heroTitle ? '<p class="it2-hero__title px-annot p' + (ht.color === "yellow" ? " is-yellow" : ht.color === "dark" ? " is-dark" : ht.color === "brown" ? " is-brown" : "") + '" style="' + st(ht.x || 290, ht.y || 287, ht.w || 170, null, 27, ht.lh || 33, ht.ta || "right", T) + '">' + X.heroTitle.join("<br>") + "</p>" : "") +
    '<p class="it2-hero__sub px-annot p" style="' + st(X.subX || 769, X.subY || 228, X.subW || 326, null, X.subFs || 28.3, 30, "center", T) + '">' + X.subtitle + "</p>" +
    '<img class="it2-hero__map it2-nb p" src="' + X.map + '" alt="' + X.mapAlt + '" style="' + st(mb[0], mb[1], mb[2], mb[3], null, null, null, T) + '">' +
    '<p class="it2-hero__intro p" style="' + st((X.introBox || [678, 557])[0], X.introY || 532, (X.introBox || [678, 557])[1], null, 17.5, 24, "center", T) + '">' + X.intro + "</p>");

  // ---- 2. sea + logbook card (810 → 1472) -------------------------------
  T = 810;
  var c = X.card;
  h += sec("it2-sea", T, 1472,
    '<div class="it2-log p" style="' + (function (b) { return st(b[0], b[1], b[2], b[3], null, null, null, T) + "--ls:" + (b[2] / 306).toFixed(4) + ";"; })(X.logBox || [543, 890, 306, 451]) + '"><img class="it2-log__bg it2-nb" src="images/carnet-itineraire.webp" alt="">' +
      '<div class="it2-log__text"><h2 class="px-annot">' + c.title + '</h2>' +
      '<p class="it2-log__days px-annot">' + c.days + "<br>" + c.path + "</p>" +
      '<div class="it2-log__blk it2-log__blk--when"><h3 class="px-annot">When</h3><p class="px-annot">' + c.when + "</p></div>" +
      '<div class="it2-log__blk it2-log__blk--route"><h3 class="px-annot">The route</h3><p class="px-annot">' + li(c.route) + "</p></div>" +
      '<div class="it2-log__blk"><h3 class="px-annot">The diving</h3><p class="px-annot">' + li(c.diving) + "</p></div></div></div>" +
    (function (ic) { return '<img class="it2-helm it2-nb p" src="' + ic[0] + '" alt="" aria-hidden="true" style="' + st(ic[1], ic[2], ic[3], ic[4], null, null, null, T) + '">'; })(X.logIcon ? [X.logIcon[0], X.logIcon[1], X.logIcon[2], X.logIcon[3], X.logIcon[4] || X.logIcon[3]] : ["images/it-helm.png", 812, 953, 70, 67]),
    "--sea:url('" + X.sea + "');");

  // ---- 3. story: steps alternate left/right, joined by dotted connectors ------
  // Layout entry per step: side "L" = text left / photo right, "R" = photo left / text right;
  // photo [x,y,w,h]; title/sub/text = top y; tx = [x,w]. Pages ship either a measured `layout`
  // (+ `links`) or get one from autoLayout() — same rules the measured page follows.
  // Connector art, cropped: [file, width, height, startX, startY, endX, endY] (dot centres).
  var ART = { right: ["images/connector-1.png", 848, 780, 23, 24, 824, 756], left: ["images/connector-2.png", 287, 862, 264, 23, 22, 839] };

  function autoLayout(steps, top, cfg) {
    var GAP = cfg.gap || 300, cursor = top + 102, prev = null, out = [], links = [];
    steps.forEach(function (s, i) {
      var side = s.side || (prev ? (prev.side === "L" ? "R" : "L") : "L");
      var ph = s.photo || [372, 513], px = side === "L" ? 1234 - ph[0] : 122, py = s.top != null ? s.top : cursor;
      var lines = s.title ? s.title.split("<br>").length : 0;
      var ty = py + (s.titleDy != null ? s.titleDy : (side === "L" ? 60 : 90));
      var tlh = s.titleLh || 44.5, sy = ty + tlh * lines + (s.subGap != null ? s.subGap : (lines ? 25 : 0));
      var slh = (s.subFs || 52) * 1.2, xy = s.sub ? sy + Math.max(s.tGap || 0, slh * (s.subLines || 1) + 32) : ty + tlh * lines + (s.tGap != null ? s.tGap : 40);
      var tw = s.textW || 500, tx = side === "L" ? [165, tw] : [1240 - tw, tw];
      var nl = Math.ceil(s.text.replace(/<br>/g, " ").length / (tw > 500 ? tw / 8.6 : 58)) + (s.text.split("<br>").length - 1);
      var bottom = Math.max(py + ph[1], xy + nl * 24);
      var entry = { side: side, photo: [px, py, ph[0], ph[1]], title: ty, sub: sy, text: xy, tx: tx, bottom: bottom, leave: s.leave, leaveX: s.leaveX };
      if (prev && prev.link) {
        var right = side === "R";  // next title on the right → dot lands right of centre
        var ay = prev.leave != null ? prev.leave : prev.bottom + 12;
        links.push({ to: i, dir: right ? "right" : "left", a: [prev.leaveX != null ? prev.leaveX : prev.side === "L" ? 586 : 728, ay], b: [right ? 895 : 618, s.arrive != null ? s.arrive : Math.max(ay + 150, py - (right ? 50 : 73))] });
      }
      entry.link = s.link !== false; out.push(entry); prev = entry;
      cursor = bottom + (s.gapAfter != null ? s.gapAfter : GAP);
    });
    return { layout: out, links: links, end: prev.bottom };
  }

  // Connectors are drawn at their ORIGINAL proportions (one uniform scale, set by the horizontal distance between the
  // two dots): the vertical distance is whatever the art gives, and every step below the connector moves with it.
  // Returns the total vertical shift applied.
  var SCALE = { right: 0.386, left: 0.4545 };  // the scale of the measured Canva pages, kept for every route
  function uniformLinks(LAY, LINKS) {
    var total = 0;
    LINKS.forEach(function (l, k) { if (l.to == null) l.to = k + 1; });
    LINKS.slice().sort(function (p, q) { return p.to - q.to; }).forEach(function (l) {
      var a = ART[l.dir], k = Math.abs(l.b[0] - l.a[0]) / Math.abs(a[5] - a[3]);
      if (!(k > 0.3 && k < 0.6)) { k = SCALE[l.dir]; l.b[0] = l.a[0] + (a[5] - a[3]) * k; }
      var delta = Math.round(l.a[1] + (a[6] - a[4]) * k - l.b[1]);
      if (!delta) return;
      LAY.forEach(function (e, j) { if (j >= l.to) { e.photo[1] += delta; e.title += delta; e.sub += delta; e.text += delta; if (e.bottom != null) e.bottom += delta; if (e.leave != null) e.leave += delta; } });
      LINKS.forEach(function (m) { if (m === l) m.b[1] += delta; else if (m.to > l.to) { m.a[1] += delta; m.b[1] += delta; } });
      total += delta;
    });
    return total;
  }

  // One run of steps + connectors as a section. cfg: layout/links (measured) or gap/storyEnd/storyPad (auto).
  function storySection(cls, T, steps, cfg) {
    var LAY, LINKS, end, shift;
    if (cfg.layout) { LAY = JSON.parse(JSON.stringify(cfg.layout)); LINKS = JSON.parse(JSON.stringify(cfg.links || [])); end = cfg.storyEnd; }
    else { var auto = autoLayout(steps, T, cfg); LAY = auto.layout; LINKS = auto.links; end = Math.max(cfg.storyEnd || 0, auto.end + (cfg.storyPad != null ? cfg.storyPad : 290)); }
    shift = uniformLinks(LAY, LINKS); end += shift;
    var html = "";
    steps.slice(0, LAY.length).forEach(function (s, i) {
      var L = LAY[i], ph = L.photo, ta = s.align || (L.side === "R" ? "right" : "left"), subW = s.subW || Math.max(L.tx[1], 640), titleW = s.titleW || Math.max(L.tx[1], 640);
      html += '<div class="it2-step px-flat reveal">' +
        '<figure class="it2-step__photo p" style="' + st(ph[0], ph[1], ph[2], ph[3], null, null, null, T) + '"><img src="' + s.image + '" loading="lazy" alt="' + (s.alt || "") + '"></figure>' +
        (s.title ? '<h2 class="it2-step__title p" style="' + st(ta === "right" ? L.tx[0] + L.tx[1] - titleW : L.tx[0], L.title, titleW, null, 42.6, s.titleLh || 44.5, ta, T) + '">' + s.title + "</h2>" : "") +
        (s.sub ? '<p class="it2-step__sub' + (s.subColor === "blue" ? " is-blue" : "") + ' px-annot p" style="' + st(ta === "right" ? L.tx[0] + L.tx[1] - subW : L.tx[0], L.sub, subW, null, s.subFs || 52, s.subLh || (s.subFs || 52) * 1.2, ta, T) + '">' + s.sub + "</p>" : "") +
        '<p class="it2-step__text p" style="' + st(L.tx[0], L.text, L.tx[1], null, 17.5, 24, ta, T) + '">' + s.text + "</p></div>";
    });
    LINKS.forEach(function (l) {
      var a = ART[l.dir], sx = l.a[0], sy = l.a[1], ex = l.b[0], ey = l.b[1];
      var kx = Math.abs(ex - sx) / Math.abs(a[5] - a[3]), ky = (ey - sy) / (a[6] - a[4]);
      html += '<img class="it2-link it2-nb p" src="' + a[0] + '" alt="" aria-hidden="true" style="' + st((sx - a[3] * kx).toFixed(1), sy - a[4] * ky, (a[1] * kx).toFixed(1), (a[2] * ky).toFixed(1), null, null, null, T) + '">';
    });
    return { html: sec(cls, T, Math.round(end), html), end: Math.round(end), shift: shift };
  }

  T = 1472;
  var main1 = storySection("it2-story", T, X.steps, X);
  h += main1.html;

  // ---- 3b. optional full-width text band (e.g. "The Villages") — reusable block --------
  var bandEnd = main1.end;
  if (X.band) {
    var B = X.band, BH = B.h || 620;
    // With B.photo the band is two columns (photo left, left-aligned title + justified text); otherwise centred.
    var bp = B.photo, bx = B.tx || 719, bw = B.textW || 520;
    h += sec("it2-band", 0, BH,
      (bp ? '<figure class="it2-band__photo p reveal" style="' + st(bp[0], bp[1], bp[2], bp[3], null, null, null, 0) + '"><img src="' + bp[4] + '" loading="lazy" alt="' + (bp[5] || "") + '"></figure>' : "") +
      '<h2 class="it2-band__title p reveal" style="' + (bp ? st(bx, B.titleY || 120, bw + 120, null, 42.6, B.titleLh || 44.5, "left", 0) : st(0, B.titleY || 120, 1366, null, 42.6, B.titleLh || 44.5, "center", 0)) + '">' + B.title + "</h2>" +
      (B.sub ? '<p class="it2-band__sub px-annot p reveal" style="' + st(0, 205, 1366, null, 30, 36, "center", 0) + '">' + B.sub + "</p>" : "") +
      '<p class="it2-band__text p reveal" style="' + (bp ? st(bx, B.textY || 272, bw, null, 17.5, 24, "justify", 0) : st(683 - bw / 2, B.textY || 272, bw, null, 17.5, 24, "center", 0)) + '">' + B.text + "</p>");
    bandEnd += BH;
  }

  // ---- 3c. optional second run of steps after the band (page coordinates continue from bandEnd) ----
  var tailRes = null;
  if (X.tail) {
    var S = main1.shift || 0, tc = Object.assign({}, X.tail);
    if (tc.layout) tc.layout = tc.layout.map(function (e) { var c = Object.assign({}, e); c.photo = c.photo.slice(); c.photo[1] += S; if (c.title) c.title += S; c.sub += S; c.text += S; return c; });
    if (tc.storyEnd) tc.storyEnd += S;
    tc.steps = X.tail.steps.map(function (st0) { var c = Object.assign({}, st0); if (c.top != null) c.top += S; return c; });
    tailRes = storySection("it2-story it2-tail", bandEnd, tc.steps, tc);
    h += tailRes.html;
  }

  // ---- 4. carousel (5311 → 5933) ----------------------------------------
  T = 5311;
  // One carousel for every page: all itineraries, posters only. The current page's card is greyed and inert.
  var ex = { title: "Explore other itineraries", sub: "A dozen different journeys. One very big sea." }, cards = "";
  // Random order on every page load (Fisher-Yates), so no route is always first.
  var order = Object.keys(ITINERARY_V2);
  for (var n = order.length - 1; n > 0; n--) { var r = Math.floor(Math.random() * (n + 1)), tmp = order[n]; order[n] = order[r]; order[r] = tmp; }
  order.forEach(function (k) {
    var p = ITINERARY_V2[k], nm = p.name || p.card.title;
    var here = k === slug;
    var inner = '<span class="it2-card__photo"><img src="images/it-cover-' + k + '.webp" alt="' + nm + '"></span><span class="it2-card__route">sea more</span>';
    cards += here
      ? '<li><div class="it2-card is-current" aria-current="page" aria-label="' + nm + ' — you are already here">' + inner + "</div></li>"
      : '<li><a class="it2-card" href="' + itineraryHref(k) + '" aria-label="' + nm + '">' + inner + "</a></li>";
  });
  h += sec("it2-explore", T, 5971,
    '<h2 class="it2-explore__title p" style="' + st(0, 5409, 1366, null, 26.6, 34, "center", T) + '">' + ex.title + "</h2>" +
    '<p class="it2-explore__sub p" style="' + st(0, 5462, 1366, null, 23, 28, "center", T) + '">' + ex.sub + "</p>" +
    '<div class="it2-track p" id="it2-track" tabindex="0" role="region" aria-label="Other itineraries" style="' + st(85, 5561, 1076, 350, null, null, null, T) + '"><ul>' + cards + "</ul></div>" +
    '<button class="it2-arrow p" id="it2-arrow" type="button" aria-label="Next itineraries" style="' + st(1191, 5670, 65, 87, null, null, null, T) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>');

  main.innerHTML = h;

  // "embark": centred under the last paragraph of the story
  (function () {
    var texts = main.querySelectorAll(".it2-step__text"), last = texts[texts.length - 1];
    if (!last) return;
    var stage = last.closest(".px-stage"), a = document.createElement("a");
    a.className = "link-arrow it2-embark"; a.href = "booking.html";
    a.innerHTML = 'embark <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    stage.appendChild(a);
    function place() {
      var w = last.offsetWidth, x = last.offsetLeft + w / 2, y = last.offsetTop + last.offsetHeight + 36;
      a.style.left = x + "px"; a.style.top = y + "px";
    }
    place();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    window.addEventListener("load", place); window.addEventListener("resize", place);
  })();

  // Step subtitles are 52px script: a long one is shrunk to fit its line (not below 36px); if it still wraps,
  // the paragraph under it moves down so they never overlap. Runs on the 1366 stage only.
  function fitSubs() {
    if (window.innerWidth < 1100) return;
    main.querySelectorAll(".it2-step").forEach(function (stp) {
      var sub = stp.querySelector(".it2-step__sub"), txt = stp.querySelector(".it2-step__text");
      if (!sub || !txt) return;
      var fs = parseFloat(sub.style.getPropertyValue("--fs")) || 52, lh = parseFloat(sub.style.getPropertyValue("--lh")) || fs * 1.2;
      sub.style.whiteSpace = "nowrap";
      var w = sub.scrollWidth, box = sub.clientWidth;
      sub.style.whiteSpace = "";
      if (w > box) { var nf = Math.max(36, fs * box / w - 0.5); sub.style.setProperty("--fs", nf.toFixed(1) + "px"); sub.style.setProperty("--lh", (nf * 1.2).toFixed(1) + "px"); }
      var gap = txt.offsetTop - (sub.offsetTop + sub.offsetHeight);
      if (gap < 14) txt.style.setProperty("--y", (parseFloat(txt.style.getPropertyValue("--y")) + 14 - gap).toFixed(1) + "px");
    });
  }
  fitSubs();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSubs);

  // ---- carousel behaviour: arrow scrolls one card (wraps at the end); swipe/drag is native scroll ----
  var track = document.getElementById("it2-track"), arrow = document.getElementById("it2-arrow");
  if (track && arrow) {
    var cardsEls = track.querySelectorAll("li");
    function step() { return cardsEls.length > 1 ? cardsEls[1].offsetLeft - cardsEls[0].offsetLeft : track.clientWidth; }
    function sync() {
      var more = track.scrollWidth - track.clientWidth > 4;
      arrow.style.visibility = more ? "visible" : "hidden";
    }
    arrow.addEventListener("click", function () {
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step(), behavior: "smooth" });
    });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") track.scrollBy({ left: step(), behavior: "smooth" });
      if (e.key === "ArrowLeft") track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    window.addEventListener("resize", sync); sync();
  }

  var rev = main.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }); }, { threshold: 0.15 });
    rev.forEach(function (el) { io.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add("is-visible"); }); }
})();
