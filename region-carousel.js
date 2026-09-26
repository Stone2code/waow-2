/**
 * Fills the "Explore the [region]" carousel (region pages) and the "other
 * routes in this region" carousel (itinerary pages) from the real roster:
 * REGIONS (regions-data.js) -> slugs -> ITINERARIES (itineraries-data.js).
 * Shows up to 4 routes at a time; the arrow pages through the rest. When a
 * region has fewer than 4 routes the remaining cards are placeholders.
 * window.fillRegionCarousel(root, regionId, excludeSlug) is also called by
 * itinerary.js after it renders.
 */
(function () {
  "use strict";
  var START = 0;
  function trips(regionId, excludeSlug) {
    var r = REGIONS.filter(function (x) { return x.id === regionId; })[0];
    if (!r) return [];
    return r.slugs.filter(function (s) { return s !== excludeSlug; })
      .map(function (s) { return ITINERARIES.filter(function (t) { return t.slug === s; })[0]; }).filter(Boolean);
  }
  function fill(root, regionId, excludeSlug) {
    var list = trips(regionId, excludeSlug);
    var cards = root.querySelectorAll(".rc-card");
    var arrow = root.querySelector(".rg-arrow");
    function render() {
      cards.forEach(function (card, i) {
        var t = list.length ? list[(START + i) % list.length] : null;
        if (list.length < 4 && i >= list.length) t = null;
        var img = card.querySelector("img"), title = card.querySelector(".rc-card__title"), route = card.querySelector(".rc-card__route");
        if (t) {
          card.setAttribute("href", "itinerary.html?slug=" + t.slug);
          img.src = "images/" + t.image + ".jpg"; img.alt = t.imageAlt || "";
          title.textContent = t.name; route.textContent = t.nights + " nights · " + t.region;
          card.classList.remove("is-placeholder");
        } else {
          card.setAttribute("href", "itineraries.html");
          img.src = "images/banda-sea.jpg"; img.alt = "";
          title.textContent = "Route to come"; route.textContent = "—";
          card.classList.add("is-placeholder");
        }
      });
      if (arrow) arrow.style.visibility = list.length > 4 ? "visible" : "hidden";
    }
    if (arrow && !arrow.__bound) { arrow.__bound = true; arrow.addEventListener("click", function () { START = (START + 1) % list.length; render(); }); }
    render();
  }
  window.fillRegionCarousel = fill;
  var m = /px-rg-([a-z-]+)/.exec(document.body.className);
  if (m && typeof REGIONS !== "undefined") { var root = document.querySelector(".rg-explore"); if (root) fill(root, m[1], null); }
})();
