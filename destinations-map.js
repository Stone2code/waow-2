/**
 * Interactive Indonesia map for the Destinations page: click a region
 * label to zoom the map onto that region (animated), then slide in a
 * side panel with placeholder itineraries for it. Click the panel's
 * close button or the backdrop to zoom back out.
 *
 * Region data (label position x/y as percentages, itinerary slugs) lives in
 * regions-data.js; x/y are percentages of the map image's own box (the map's
 * aspect-ratio is locked to the source PNG's, so object-fit: cover
 * never crops it — a region's % position always matches its on-screen
 * position 1:1, no cover-crop math needed).
 */
(function () {
  "use strict";

  var map = document.querySelector(".dst-map");
  if (!map) return;

  var img = map.querySelector(".dst-map__img");
  var overlay = map.querySelector(".dst-map__overlay");
  var panel = map.querySelector(".dst-map__panel");
  var panelHeading = panel.querySelector(".dst-map__panel-head h3");
  var panelList = panel.querySelector(".dst-map__panel-list");
  var closeBtn = panel.querySelector(".dst-map__close");

  var ZOOM_SCALE = 2.3;
  var ZOOM_MS = 900;

  function cardMarkup(trip) {
    return (
      '<article class="dst-map__card">' +
      "<h4>" + trip.name + "</h4>" +
      "<p>" + trip.teaser + "</p>" +
      '<a href="itinerary.html?slug=' + trip.slug + '">See more</a>' +
      "</article>"
    );
  }

  function openRegion(region) {
    var rect = map.getBoundingClientRect();
    var px = (region.x / 100) * rect.width;
    var py = (region.y / 100) * rect.height;
    var cx = rect.width / 2;
    var cy = rect.height / 2;

    img.style.transform =
      "translate(" + cx + "px," + cy + "px) scale(" + ZOOM_SCALE + ") translate(" + -px + "px," + -py + "px)";
    map.classList.add("is-zoomed");

    panelHeading.textContent = region.name;
    var trips = region.slugs.map(function (sl) { return ITINERARIES.filter(function (t) { return t.slug === sl; })[0]; }).filter(Boolean);
    panelList.innerHTML = trips.map(cardMarkup).join("") +
      '<a class="dst-map__region-link" href="' + region.page + '">Discover the ' + region.name + '</a>';

    setTimeout(function () {
      map.classList.add("is-open");
      closeBtn.focus();
    }, ZOOM_MS);
  }

  function closePanel() {
    map.classList.remove("is-open");
    img.style.transform = "translate(0,0) scale(1)";
    map.classList.remove("is-zoomed");
  }

  map.querySelectorAll(".dst-map__label").forEach(function (btn) {
    var id = btn.getAttribute("data-region");
    var region = REGIONS.filter(function (r) { return r.id === id; })[0];
    if (!region) return;
    btn.addEventListener("click", function () { openRegion(region); });
  });

  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && map.classList.contains("is-open")) closePanel();
  });
})();
