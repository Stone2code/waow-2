/**
 * Itinerary template — renders one route's page from ?slug= using the shared
 * roster (itineraries-data.js) plus page-only copy (itinerary-pages-data.js).
 * One template for every route; the story `steps` are a repeatable block that
 * alternates left/right and is joined by a dotted path. Positions are in the
 * design's 1285px canvas (see the "PIXEL-MEASURED PAGES" block in style.css).
 */
(function () {
  "use strict";
  var main = document.getElementById("main");
  if (!main || typeof ITINERARIES === "undefined") return;

  var slug = new URLSearchParams(window.location.search).get("slug") || "east-meets-west";
  var trip = ITINERARIES.filter(function (t) { return t.slug === slug; })[0];
  if (!trip) {
    main.innerHTML = '<section class="it-missing"><div class="container"><h1>We couldn’t find that route.</h1><p>It may have been renamed or retired. <a class="link-arrow" href="itineraries.html">See all itineraries</a></p></div></section>';
    return;
  }
  var region = regionOfSlug(slug);
  var X = (typeof ITINERARY_PAGES !== "undefined" && ITINERARY_PAGES[slug]) || {};
  document.title = trip.name + " — Waow Charters";
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", trip.description);

  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function st(x, y, w, h, fs, lh, ta) {
    return "--x:" + x + "px;--y:" + y + "px;" + (w != null ? "--w:" + w + "px;" : "") + (h != null ? "--h:" + h + "px;" : "") +
      (fs != null ? "--fs:" + fs + "px;" : "") + (lh != null ? "--lh:" + lh + "px;" : "") + (ta ? "--ta:" + ta + ";" : "");
  }
  function sec(cls, sh, inner, extra) {
    return '<section class="' + cls + ' px-sec" style="--sh:' + sh + 'px;' + (extra || "") + '"><div class="container px-stage">' + inner + "</div></section>";
  }
  function pic(name, alt) { return '<picture><source srcset="images/' + name + '.webp" type="image/webp"><img src="images/' + name + '.jpg" loading="lazy" alt="' + (alt || "") + '"></picture>'; }
  function fig(cls, name, alt, x, y, w, h, fl) { return '<figure class="' + cls + " p" + (fl ? " " + fl : "") + '" style="' + st(x, y, w, h) + '">' + pic(name, alt) + "</figure>"; }

  var title = X.title || trip.name;
  var subtitle = X.subtitle || (trip.nights + " nights · " + trip.region);
  var hook = X.hook || [trip.description, trip.detailExtra];
  var crossed = X.crossed || (region ? [region.id] : []);
  var card = X.card || { days: trip.nights + " days", path: trip.region, when: trip.season, route: [trip.region], diving: [trip.level] };
  var tagline = X.tagline || ["The tide sets the schedule.", "We work around it."];
  var steps = X.steps || [
    { title: "Day by day", sub: "TODO: step title", image: trip.image, text: "TODO: the story of this route, step by step.<br>" + trip.description },
    { title: "The diving", sub: "TODO: step title", image: "manta-ray", text: "TODO: what the diving is like on this route.<br>" + trip.detailExtra },
    { title: "The way home", sub: "TODO: step title", image: trip.image, text: "TODO: the last days of the route." }
  ];
  var reflection = X.reflection || { title: "TODO: reflection<br>title", text: "TODO: a short reflection on what this route asks of you." };
  var context = X.context || { title: "TODO: context title", image: trip.image, text: "TODO: cultural or geographic context for this route." };

  var h = "";
  // ---- hero + mini map (115 -> 1029)
  var inner = '<h1 class="p" style="' + st(0, 60, 1285, null, 55, 76, "center") + '">' + title + "</h1>" +
    '<p class="it-hero__sub p px-annot" style="' + st(0, 154, 1285, null, 20, 30, "center") + '">' + subtitle + "</p>" +
    '<div class="it-map p" style="' + st(108, 237, 997, 561) + '"><img src="images/indonesia-map.png" alt="Map of Indonesia with the regions crossed by this route highlighted.">';
  (typeof REGIONS !== "undefined" ? REGIONS : []).forEach(function (r) {
    var pos = { "sulawesi": [512, 553], "papua": [835, 541], "moluccas": [686, 617], "banda-sea": [761, 730], "sunda-islands": [400, 767] }[r.id];
    inner += '<span class="it-map__label' + (crossed.indexOf(r.id) > -1 ? " is-crossed" : "") + '" style="left:' + (pos[0] - 108) + "px;top:" + (pos[1] - 352) + 'px">' + r.name + "</span>";
  });
  inner += "</div>";
  h += sec("it-hero", 914, inner, "");
  // ---- hook (navy)
  h += sec("it-hook", 357, '<p class="p reveal" style="' + st(140, 90, 1005, null, 17.5, 22.6, "center") + '">' + hook.join("<br>") + "</p>");
  // ---- summary card
  var c = card;
  var cardHtml = '<div class="it-card p reveal" style="' + st(697, 29, 498, 664) + '"><div class="it-card__sheet">' +
    '<h2>' + title.replace(/<br>/g, " ") + '</h2><span class="it-card__rule"></span><p class="it-card__days">' + c.days + "</p><p class=\"it-card__path\">" + c.path + "</p>" +
    '<h3>When</h3><p>' + c.when + '</p><h3>The route</h3><p>' + c.route.join("<br>") + '</p><h3>The diving</h3><p>' + c.diving.join("<br>") + "</p>" +
    '<img class="it-card__logo" src="images/logo-waow2.png" alt="Waow 2"></div></div>';
  var helm = '<svg class="dot-icon p" aria-hidden="true" style="' + st(662, 100, 131, 106) + '" viewBox="2 28 245 230"><use href="#icon-helm"></use></svg>';
  h += sec("it-summary", 793, '<p class="it-tagline p px-annot reveal" style="' + st(186, 300, 286, null, 25, 46, "center") + '">' + tagline.join("<br>") + "</p>" + cardHtml + helm);
  // ---- story steps (repeatable)
  var SH = 810, sInner = "";
  steps.forEach(function (s, i) {
    var top = i * SH, odd = i % 2 === 0;
    var photo = fig("it-step__photo", s.image, "", odd ? 813 : 118, top + 93, 348, 483);
    var tx = odd
      ? '<h2 class="p" style="' + st(160, top + 100, 560, null, 42.6, 60) + '">' + s.title + '</h2><p class="it-step__sub p px-annot" style="' + st(160, top + (s.title.indexOf("<br>") > -1 ? 240 : 226), 560, null, 30, 36) + '">' + s.sub + '</p><p class="p" style="' + st(160, top + 322, 470, null, 17.5, 22.6) + '">' + s.text + "</p>"
      : '<h2 class="p" style="' + st(618, top + 70, 550, null, 42.6, 60, "right") + '">' + s.title + '</h2><p class="it-step__sub p px-annot" style="' + st(618, top + 152, 550, null, 30, 36, "right") + '">' + s.sub + '</p><p class="p" style="' + st(680, top + 235, 490, null, 17.5, 22.6, "right") + '">' + s.text + "</p>";
    sInner += '<div class="it-step px-flat reveal">' + photo + tx + "</div>";
    if (i < steps.length - 1) {
      var d = "M700," + (top + 520) + " C770," + (top + 580) + " 620," + (top + 640) + " 470," + (top + 690) + " C340," + (top + 735) + " 300," + (top + 800) + " 250," + (top + 862);
      var sx = odd ? 540 : 700, sy = odd ? top + 588 : top + 520, ex = odd ? 828 : 250, ey = odd ? top + 848 : top + 862;
      if (odd) d = "M540," + (top + 588) + " C650," + (top + 590) + " 668," + (top + 660) + " 632," + (top + 720) + " C610," + (top + 760) + " 740," + (top + 750) + " 770," + (top + 780) + " C795," + (top + 805) + " 800," + (top + 835) + " 828," + (top + 848);
      sInner += '<svg class="it-path p" aria-hidden="true" style="--x:0px;--y:0px;--w:1285px;--h:' + (steps.length * SH) + 'px" viewBox="0 0 1285 ' + (steps.length * SH) + '"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="9 8" stroke-linecap="round"/><circle cx="' + sx + '" cy="' + sy + '" r="8" fill="currentColor"/><circle cx="' + ex + '" cy="' + ey + '" r="8" fill="currentColor"/></svg>';
    }
  });
  h += sec("it-story", (steps.length - 1) * SH + 660, sInner);
  // ---- reflection
  h += sec("it-reflect", 614, '<h2 class="p reveal" style="' + st(0, 74, 1285, null, 42.7, 58, "center") + '">' + reflection.title + '</h2><p class="p reveal" style="' + st(392, 250, 500, null, 17.5, 22.6, "center") + '">' + reflection.text + "</p>");
  // ---- context
  h += sec("it-context", 726, '<h2 class="p reveal" style="' + st(113, 188, 600, null, 32, 44) + '">' + context.title + '</h2><p class="p reveal" style="' + st(60, 270, 548, null, 17.5, 22.4, "right") + '">' + context.text + "</p>" + fig("it-context__photo reveal", context.image, "", 702, 89, 495, 560));
  // ---- other routes carousel
  var rName = region ? (/^(banda-sea|sunda-islands|moluccas)$/.test(region.id) ? "the " : "") + region.name : "Indonesia";
  var cards = "";
  for (var i = 0; i < 4; i++) {
    cards += '<a class="rc-card p" data-i="' + i + '" href="itineraries.html" style="' + st([84, 343, 603, 861][i], 233, 231, 284) + '"><span class="rc-card__photo"><img alt="" src="images/komodo-island.jpg"></span><span class="rc-card__title px-annot"></span><span class="rc-card__route"></span></a>';
  }
  h += sec("it-explore rg-explore", 629, '<h2 class="p" style="' + st(84, 98, 700, null, 24, 30) + '">Explore ' + rName + '</h2><p class="rg-explore__sub p" style="' + st(84, 152, 700, null, 19.5, 28) + '">More routes in this region.</p>' + cards +
    '<button class="rg-arrow p" type="button" aria-label="More routes" style="' + st(1135, 238, 68, 92) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>');

  main.innerHTML = h;
  if (region && window.fillRegionCarousel) window.fillRegionCarousel(main.querySelector(".it-explore"), region.id, slug);
  // scroll reveal for the injected blocks
  var rev = main.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }); }, { threshold: 0.15 });
    rev.forEach(function (el) { io.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add("is-visible"); }); }
})();
