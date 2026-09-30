/**
 * Per-itinerary route images for the Destinations map hover-highlight.
 *
 * Each entry is a same-size (2200x1428), same-crop image as the region
 * images (map-<region>.webp): the faint base map plus that ONE itinerary's
 * route drawn in full. Hovering a route in the Destinations map's side
 * panel swaps the currently-shown region image for its own route image, so
 * only that single itinerary highlights (no zoom, same spot/size).
 *
 * Every itinerary in itineraries-data.js has one — these were the client's
 * own named exports, one per route.
 */
const ITINERARY_ROUTES = {
  "moluccas-forts-and-forests": "images/route-moluccas-forts-and-forests.webp",
  "moluccas-corals-and-cloves": "images/route-moluccas-corals-and-cloves.webp",
  "moluccas-spices-and-snakes": "images/route-moluccas-spices-and-snakes.webp",
  "moluccas-sultans-and-tarsiers": "images/route-moluccas-sultans-and-tarsiers.webp",
  "papua-corals-and-cloves": "images/route-papua-corals-and-cloves.webp",
  "papua-forts-and-forests": "images/route-papua-forts-and-forests.webp",
  "papua-four-kings": "images/route-papua-four-kings.webp",
  "papua-southern-king": "images/route-papua-southern-king.webp",
  "papua-tale-of-two-papuas": "images/route-papua-tale-of-two-papuas.webp",
  "sulawesi-nirvana-and-lava": "images/route-sulawesi-nirvana-and-lava.webp",
  "sulawesi-sponges-and-stilts": "images/route-sulawesi-sponges-and-stilts.webp",
  "sulawesi-sultans-and-tarsiers": "images/route-sulawesi-sultans-and-tarsiers.webp",
  "sunda-east-meets-west": "images/route-sunda-east-meets-west.webp",
  "sunda-west-meets-east": "images/route-sunda-west-meets-east.webp",
  "sunda-nirvana-and-lava": "images/route-sunda-nirvana-and-lava.webp",
  "sunda-spices-and-snakes": "images/route-sunda-spices-and-snakes.webp",
  "banda-spices-and-snakes": "images/route-banda-spices-and-snakes.webp",
  "sunda-volcanoes-and-villages": "images/route-sunda-volcanoes-and-villages.webp",
};
