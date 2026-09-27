/**
 * Interactive Indonesia map for the Destinations page.
 *
 * The map is a stack of same-size images: a faint base map plus one image per
 * region with that region's coastline and routes drawn in full. Clicking a
 * region label cross-fades the base to that region's image (a "highlight",
 * no zoom, no layout shift) and slides a small itinerary list in over the
 * map from the right. Hovering a label previews the highlight. Close with the
 * button, Escape, the same label again, or a click on the empty map.
 *
 * Region data (itinerary slugs, page) lives in regions-data.js; trips in
 * itineraries-data.js. Per-itinerary route images (for hovering a single
 * route in the side panel) live in itinerary-routes-data.js — not every
 * itinerary has one yet, so rows without a mapped image just don't react
 * to hover (the whole-region highlight stays as-is).
 */
(function () {
  "use strict";

  var map = document.querySelector(".dst-map");
  if (!map) return;

  // Regions whose overview page has real content and is safe to link to.
  var READY_REGIONS = ["banda-sea", "sulawesi"];

  var layers = map.querySelectorAll(".dst-map__img--region");
  var itineraryLayer = map.querySelector(".dst-map__img--itinerary");
  var labels = map.querySelectorAll(".dst-map__label");
  var panel = map.querySelector(".dst-map__panel");
  var title = panel.querySelector(".dst-map__panel-title");
  var list = panel.querySelector(".dst-map__panel-list");
  var regionLink = panel.querySelector(".dst-map__region-link");
  var closeBtn = panel.querySelector(".dst-map__close");
  var current = null;
  var routes = typeof ITINERARY_ROUTES !== "undefined" ? ITINERARY_ROUTES : {};

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function rowMarkup(trip) {
    var hasRoute = Object.prototype.hasOwnProperty.call(routes, trip.slug);
    return '<li><a href="itinerary.html?slug=' + encodeURIComponent(trip.slug) + '"' + (hasRoute ? ' data-slug="' + esc(trip.slug) + '"' : "") + '>' +
      '<span class="dst-map__row-name">' + esc(trip.name) + "</span>" +
      '<span class="dst-map__row-meta">' + esc(trip.nights) + " nights &middot; " + esc(String(trip.region).split(",")[0]) + "</span>" +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "</a></li>";
  }

  function showRoute(slug) {
    var src = routes[slug];
    if (!itineraryLayer || !src) return;
    if (itineraryLayer.getAttribute("src") !== src) itineraryLayer.setAttribute("src", src);
    itineraryLayer.classList.add("is-on");
  }

  function hideRoute() {
    if (itineraryLayer) itineraryLayer.classList.remove("is-on");
  }

  function paint(id, cls) {
    layers.forEach(function (img) { img.classList.toggle(cls, img.getAttribute("data-region") === id); });
  }

  function open(id) {
    var region = REGIONS.filter(function (r) { return r.id === id; })[0];
    if (!region) return;
    current = id;
    paint(null, "is-peek");
    paint(id, "is-on");
    labels.forEach(function (l) {
      var on = l.getAttribute("data-region") === id;
      l.classList.toggle("is-active", on);
      l.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var trips = region.slugs.map(function (sl) { return ITINERARIES.filter(function (t) { return t.slug === sl; })[0]; }).filter(Boolean);
    title.textContent = region.name;
    list.innerHTML = trips.map(rowMarkup).join("");
    // Other region overview pages are unlinked for now (real copy not
    // written yet) — hide the CTA instead of pointing it at an unfinished
    // page. Banda Sea has real content, so it keeps its link.
    if (READY_REGIONS.indexOf(id) > -1) {
      regionLink.style.display = "";
      regionLink.setAttribute("href", region.page);
      regionLink.textContent = "Discover " + (/^(banda-sea|sunda-islands|moluccas)$/.test(id) ? "the " : "") + region.name;
    } else {
      regionLink.style.display = "none";
    }
    panel.setAttribute("aria-hidden", "false");
    map.classList.add("is-open");
  }

  function close() {
    current = null;
    paint(null, "is-on");
    hideRoute();
    labels.forEach(function (l) { l.classList.remove("is-active"); l.setAttribute("aria-pressed", "false"); });
    panel.setAttribute("aria-hidden", "true");
    map.classList.remove("is-open");
  }

  // Hovering (or focusing) a route in the side panel swaps the region
  // highlight for that single itinerary's own route image — delegated on
  // the list so it keeps working after every re-render.
  list.addEventListener("mouseover", function (e) {
    var a = e.target.closest("a[data-slug]");
    if (a) showRoute(a.getAttribute("data-slug"));
  });
  list.addEventListener("mouseout", function (e) {
    var a = e.target.closest("a[data-slug]");
    if (a && !(e.relatedTarget && a.contains(e.relatedTarget))) hideRoute();
  });
  list.addEventListener("focusin", function (e) {
    var a = e.target.closest("a[data-slug]");
    if (a) showRoute(a.getAttribute("data-slug"));
  });
  list.addEventListener("focusout", function (e) {
    var a = e.target.closest("a[data-slug]");
    if (a) hideRoute();
  });

  labels.forEach(function (btn) {
    var id = btn.getAttribute("data-region");
    btn.addEventListener("click", function (e) { e.stopPropagation(); if (current === id) close(); else open(id); });
    btn.addEventListener("mouseenter", function () { if (current !== id) paint(id, "is-peek"); });
    btn.addEventListener("mouseleave", function () { paint(null, "is-peek"); });
    btn.addEventListener("focus", function () { if (current !== id) paint(id, "is-peek"); });
    btn.addEventListener("blur", function () { paint(null, "is-peek"); });
  });

  closeBtn.addEventListener("click", close);
  panel.addEventListener("click", function (e) { e.stopPropagation(); });
  map.addEventListener("click", function () { if (current) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && current) close(); });
})();
