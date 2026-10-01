/**
 * "Explore <region>" carousel on the five region pages: posters of that region's
 * itineraries, in the order set below (designed per region, not shuffled). Shared routes link to
 * their single page (itineraryHref) and use that page's poster (images/it-cover-<page>.webp).
 * Needs itineraries-data.js + regions-data.js. Stage is the region pages' 1174px canvas.
 */
(function () {
  "use strict";
  var m = /px-rg-([a-z-]+)/.exec(document.body.className);
  var root = document.querySelector(".rg-explore .px-stage");
  if (!m || !root || typeof ITINERARIES === "undefined") return;

  var CFG = {
    "banda-sea": { title: "Explore the Banda Sea", sub: "...if you dare", slugs: ["banda-spices-and-snakes"] },
    "sulawesi": { title: "Explore Sulawesi", sub: "Three itineraries, far from the usual routes.", slugs: ["sulawesi-sponges-and-stilts", "sulawesi-sultans-and-tarsiers", "sulawesi-nirvana-and-lava"] },
    "sunda-islands": { title: "Explore the Sunda Islands", sub: "Five routes along a chain of volcanic islands.", slugs: ["sunda-west-meets-east", "sunda-nirvana-and-lava", "sunda-spices-and-snakes", "sunda-volcanoes-and-villages", "sunda-east-meets-west"] },
    "papua": { title: "Explore Papua", sub: "Fewer boats, more reef.", slugs: ["papua-southern-king", "papua-four-kings", "papua-tale-of-two-papuas", "papua-corals-and-cloves", "papua-forts-and-forests"] },
    "moluccas": { title: "Explore the Moluccas", sub: "Big fish on the corners, strange ones in the bays.", slugs: ["moluccas-corals-and-cloves", "moluccas-spices-and-snakes", "moluccas-forts-and-forests", "moluccas-sultans-and-tarsiers"] }
  };
  var c = CFG[m[1]];
  if (!c) return;

  function st(x, y, w, h, fs, lh, ta) {
    return "--x:" + x + "px;--y:" + y + "px;" + (w != null ? "--w:" + w + "px;" : "") + (h != null ? "--h:" + h + "px;" : "") +
      (fs != null ? "--fs:" + fs + "px;" : "") + (lh != null ? "--lh:" + lh + "px;" : "") + (ta ? "--ta:" + ta + ";" : "");
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); }
  var cards = c.slugs.map(function (s) {
    var page = (typeof ITINERARY_CANONICAL !== "undefined" && ITINERARY_CANONICAL[s]) || s;
    var trip = ITINERARIES.filter(function (t) { return t.slug === s; })[0];
    return '<li><a class="rgx-card" href="' + itineraryHref(s) + '" aria-label="' + esc(trip ? trip.name : s) + '"><span class="rgx-card__photo"><img src="images/it-cover-' + page + '.webp" alt="' + esc(trip ? trip.name : "") + '"></span><span class="rgx-card__more">sea more</span></a></li>';
  }).join("");

  root.innerHTML =
    '<h2 class="rgx-title p" style="' + st(0, 90, 1174, null, 23.4, 30, "center") + '">' + esc(c.title) + "</h2>" +
    '<p class="rgx-sub p" style="' + st(0, 150, 1174, null, 19.8, 28, "center") + '">' + esc(c.sub) + "</p>" +
    '<div class="rgx-track p" id="rgx-track" tabindex="0" role="region" aria-label="' + esc(c.title) + '" style="' + (c.slugs.length < 4 ? st(0, 271, 1174, 360) : st(36, 271, 993, 360)) + '"><ul>' + cards + "</ul></div>" +
    '<button class="rgx-arrow p" id="rgx-arrow" type="button" aria-label="More itineraries" style="' + st(1050, 365, 63, 98) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';

  var track = document.getElementById("rgx-track"), arrow = document.getElementById("rgx-arrow"), lis = track.querySelectorAll("li");
  function step() { return lis.length > 1 ? lis[1].offsetLeft - lis[0].offsetLeft : track.clientWidth; }
  function sync() { arrow.style.visibility = track.scrollWidth - track.clientWidth > 4 ? "visible" : "hidden"; }
  arrow.addEventListener("click", function () {
    var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step(), behavior: "smooth" });
  });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") track.scrollBy({ left: step(), behavior: "smooth" });
    if (e.key === "ArrowLeft") track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  window.addEventListener("resize", sync); sync();

  // "Explore other regions": the four other stamps in a track (three visible), the arrow scrolls one stamp and wraps.
  var ot = document.getElementById("rgo-track"), oa = document.getElementById("rgo-arrow");
  if (ot && oa) {
    var ol = ot.querySelectorAll("li");
    function ostep() { return ol.length > 1 ? ol[1].offsetLeft - ol[0].offsetLeft : ot.clientWidth; }
    function osync() { oa.style.visibility = ot.scrollWidth - ot.clientWidth > 4 ? "visible" : "hidden"; }
    oa.addEventListener("click", function () {
      var atEnd = ot.scrollLeft + ot.clientWidth >= ot.scrollWidth - 4;
      ot.scrollTo({ left: atEnd ? 0 : ot.scrollLeft + ostep(), behavior: "smooth" });
    });
    window.addEventListener("resize", osync); osync();
  }
})();
