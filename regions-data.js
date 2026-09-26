/**
 * The five destination regions, and which itineraries (slugs from
 * itineraries-data.js) belong to each. Used by the Destinations map panel
 * (destinations-map.js) and by every region page's "Explore the [region]"
 * carousel and itinerary page's "other routes" carousel (region-carousel.js).
 * x/y = label position on the map, as a fraction of the map image box.
 * TODO: the roster is a first grouping of the existing 20 routes by
 * geography — confirm against the final 32-itinerary list.
 */
const REGIONS = [
  { id: "sulawesi", name: "Sulawesi", page: "sulawesi.html", x: 40.5, y: 35.9, coords: "1°S 121°E", tagline: "A world of contrasts.", slugs: ["wakatobi-wander", "derawan-sangalaki"] },
  { id: "moluccas", name: "Moluccas", page: "moluccas.html", x: 58.8, y: 47.7, coords: "3°S 129°E", tagline: "Far from the usual routes.", slugs: ["halmahera-hidden-reefs", "ambon-lease"] },
  { id: "papua", name: "Papua", page: "papua.html", x: 74.3, y: 33.9, coords: "4°S 140°E", tagline: "Where the reef comes alive.", slugs: ["raja-ampat-crossing", "dampier-misool", "wayag-circuit", "triton-bay", "cenderawasih-whale-sharks", "grand-traverse"] },
  { id: "banda-sea", name: "Banda Sea", page: "banda-sea.html", x: 66.5, y: 68.6, coords: "4°S 130°E", tagline: "Deep blue. Remote islands. Wild waters.", slugs: ["forgotten-islands", "spice-route"] },
  { id: "sunda-islands", name: "Sunda Islands", page: "sunda-islands.html", x: 28.9, y: 75.5, coords: "8°S 106°E", tagline: "Volcanic landscapes. Powerful currents.", slugs: ["east-meets-west", "dragon-ground", "komodo-express", "south-komodo", "alor-coast", "lembata-whalers-coast", "flores-volcano-traverse", "sumba-solitude", "timor-strait-crossing"] }
];
function regionOfSlug(slug) { return REGIONS.filter(function (r) { return r.slugs.indexOf(slug) > -1; })[0] || null; }
