/**
 * The five destination regions, and which itineraries (slugs from
 * itineraries-data.js) belong to each. Used by the Destinations map panel
 * (destinations-map.js) and by every region page's "Explore the [region]"
 * carousel and itinerary page's "other routes" carousel (region-carousel.js).
 * x/y/coords are unused leftovers from an earlier zoom-based map — kept in
 * case they're wanted again, safe to ignore.
 *
 * Roster rebuilt from the client's 16 named route maps (see
 * itineraries-data.js): a theme name that exists in two regions (e.g.
 * "Sultans and Tarsiers" in both Moluccas and Sulawesi) is two separate
 * itineraries, one slug per region, not one shared one. Banda Sea has no
 * routes yet — none of the 16 were named for it.
 */
const REGIONS = [
  { id: "sulawesi", name: "Sulawesi", page: "sulawesi.html", x: 40.5, y: 35.9, coords: "1°S 121°E", tagline: "A world of contrasts.", slugs: ["sulawesi-nirvana-and-lava", "sulawesi-sponges-and-stilts", "sulawesi-sultans-and-tarsiers"] },
  { id: "moluccas", name: "Moluccas", page: "moluccas.html", x: 58.8, y: 47.7, coords: "3°S 129°E", tagline: "Far from the usual routes.", slugs: ["moluccas-forts-and-forests", "moluccas-corals-and-cloves", "moluccas-spices-and-snakes", "moluccas-sultans-and-tarsiers"] },
  { id: "papua", name: "Papua", page: "papua.html", x: 74.3, y: 33.9, coords: "4°S 140°E", tagline: "Where the reef comes alive.", slugs: ["papua-corals-and-cloves", "papua-forts-and-forests", "papua-four-kings", "papua-southern-king", "papua-tale-of-two-papuas"] },
  { id: "banda-sea", name: "Banda Sea", page: "banda-sea.html", x: 66.5, y: 68.6, coords: "4°S 130°E", tagline: "Deep blue. Remote islands. Wild waters.", slugs: [] },
  { id: "sunda-islands", name: "Sunda Islands", page: "sunda-islands.html", x: 28.9, y: 75.5, coords: "8°S 106°E", tagline: "Volcanic landscapes. Powerful currents.", slugs: ["sunda-east-meets-west", "sunda-west-meets-east", "sunda-nirvana-and-lava", "sunda-spices-and-snakes"] }
];
function regionOfSlug(slug) { return REGIONS.filter(function (r) { return r.slugs.indexOf(slug) > -1; })[0] || null; }
