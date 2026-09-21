/**
 * Renders one itinerary's full detail into itinerary.html, based on the
 * ?slug= query param and the shared ITINERARIES data (itineraries-data.js).
 * One template, twenty routes — add a route in the data file, not here.
 */
(function () {
  "use strict";

  var root = document.getElementById("itinerary-detail");
  if (!root || typeof ITINERARIES === "undefined") return;

  var slug = new URLSearchParams(window.location.search).get("slug");
  var trip = ITINERARIES.find(function (t) { return t.slug === slug; });

  if (!trip) {
    root.innerHTML =
      '<p class="breadcrumb"><a href="itineraries.html">← All itineraries</a></p>' +
      '<p class="eyebrow"><span class="eyebrow__rule" aria-hidden="true"></span>Itineraries</p>' +
      "<h1>We couldn’t find that route.</h1>" +
      "<p class=\"page-hero__lead\">It may have been renamed or retired since you bookmarked it. Have a look at the full list instead.</p>" +
      '<a class="btn btn--solid" href="itineraries.html">See all itineraries</a>';
    return;
  }

  document.title = trip.name + " — Waow Charters";
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", trip.description);

  root.innerHTML =
    '<p class="breadcrumb"><a href="itineraries.html">← All itineraries</a></p>' +
    '<article class="itinerary-entry">' +
      '<figure class="itinerary-entry__photo polaroid polaroid--tilt-left">' +
        '<span class="polaroid__photo torn-edge">' +
          "<picture>" +
            '<source srcset="images/' + trip.image + '.webp" type="image/webp">' +
            '<img src="images/' + trip.image + '.jpg" alt="' + trip.imageAlt + '">' +
          "</picture>" +
        "</span>" +
        "<figcaption>" + trip.photoCaption + "</figcaption>" +
      "</figure>" +
      '<div class="itinerary-entry__body">' +
        '<p class="eyebrow"><span class="eyebrow__rule" aria-hidden="true"></span>' + trip.eyebrow + "</p>" +
        '<h1 class="script-title">' + trip.name + "</h1>" +
        '<p class="itinerary-entry__meta">' +
          "<span>" + trip.nights + " nights</span> · <span>" + trip.region + "</span> · <span>" + trip.level + "</span> · <span>" + trip.season + "</span>" +
        "</p>" +
        "<p>" + trip.description + "</p>" +
        "<p>" + trip.detailExtra + "</p>" +
        '<div class="itinerary-entry__actions">' +
          '<a class="btn btn--solid" href="booking.html">Reserve a place</a>' +
          '<a class="link-arrow" href="the-boat.html">See the boat' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</a>" +
        "</div>" +
      "</div>" +
    "</article>";
})();
