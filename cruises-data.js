/**
 * Cruise + cabin availability — data layer for the Booking search page.
 *
 * This is the seam meant to change when real availability comes online.
 * Everything below `getCruises()` is a mock; every rendering function below
 * only ever talks to the resolved cruise list, never to MOCK_CRUISES
 * directly — so swapping the mock for a live Gurita API call means editing
 * one function body, not the page.
 *
 * Expected shape per cruise (keep this stable across data sources):
 *   {
 *     id:          string   — stable slug, used as a DOM id/key
 *     itinerary:   string   — slug into ITINERARIES (itineraries-data.js)
 *     date:        string   — ISO date, cruise departure
 *     nights:      number
 *     cabins: [{ id, deck, name, detail, status: 'available'|'unavailable' }]
 *   }
 *
 * TODO(Gurita integration): replace getCruises()'s body with something like —
 *   const res = await fetch(`${GURITA_API_BASE}/vessels/waow-2/departures`, {
 *     headers: { Authorization: `Bearer ${GURITA_API_KEY}` }
 *   });
 *   if (!res.ok) throw new Error('Gurita departures request failed');
 *   const payload = await res.json();
 *   return payload.departures.map(mapGuritaDepartureToViewModel);
 * `mapGuritaDepartureToViewModel` would translate Gurita's field names into
 * the shape documented above, so nothing that renders cruises ever has to
 * know which source it's looking at.
 */

const CRUISE_DATA_SOURCE = "mock"; // TODO: 'gurita' once the integration lands

const CABIN_ROSTER = [
  { id: "komodo-suite", deck: "upper", name: "Komodo Suite", detail: "Queen bed · private balcony · ensuite" },
  { id: "banda-suite", deck: "upper", name: "Banda Suite", detail: "Queen bed · private balcony · ensuite" },
  { id: "raja-cabin", deck: "main", name: "Raja Cabin", detail: "Queen bed · ensuite · sea view" },
  { id: "alor-cabin", deck: "main", name: "Alor Cabin", detail: "Twin beds · ensuite · sea view" },
  { id: "flores-cabin", deck: "main", name: "Flores Cabin", detail: "Queen bed · ensuite · sea view" },
  { id: "rinca-cabin", deck: "main", name: "Rinca Cabin", detail: "Twin beds · ensuite · porthole" },
];

function cabinsWithPattern(pattern) {
  // pattern: array of 6 'a'/'u' chars, matched to CABIN_ROSTER order
  return CABIN_ROSTER.map((c, i) => ({ ...c, status: pattern[i] === "a" ? "available" : "unavailable" }));
}

const MOCK_CRUISES = [
  { id: "moluccas-forts-and-forests-2026-10-12", itinerary: "moluccas-forts-and-forests", date: "2026-10-12", nights: 7, cabins: cabinsWithPattern("auaaaa") },
  { id: "moluccas-corals-and-cloves-2026-10-21", itinerary: "moluccas-corals-and-cloves", date: "2026-10-21", nights: 7, cabins: cabinsWithPattern("aaaaaa") },
  { id: "moluccas-spices-and-snakes-2026-10-30", itinerary: "moluccas-spices-and-snakes", date: "2026-10-30", nights: 7, cabins: cabinsWithPattern("uuaaua") },
  { id: "moluccas-sultans-and-tarsiers-2026-11-08", itinerary: "moluccas-sultans-and-tarsiers", date: "2026-11-08", nights: 7, cabins: cabinsWithPattern("aauaau") },
  { id: "papua-corals-and-cloves-2026-11-17", itinerary: "papua-corals-and-cloves", date: "2026-11-17", nights: 8, cabins: cabinsWithPattern("uuuuau") },
  { id: "papua-forts-and-forests-2026-11-27", itinerary: "papua-forts-and-forests", date: "2026-11-27", nights: 8, cabins: cabinsWithPattern("aaaaaa") },
  { id: "papua-four-kings-2026-12-06", itinerary: "papua-four-kings", date: "2026-12-06", nights: 8, cabins: cabinsWithPattern("auauau") },
  { id: "papua-southern-king-2026-12-15", itinerary: "papua-southern-king", date: "2026-12-15", nights: 9, cabins: cabinsWithPattern("uauaua") },
  { id: "papua-tale-of-two-papuas-2026-12-24", itinerary: "papua-tale-of-two-papuas", date: "2026-12-24", nights: 7, cabins: cabinsWithPattern("uuuaau") },
  { id: "sulawesi-nirvana-and-lava-2027-01-04", itinerary: "sulawesi-nirvana-and-lava", date: "2027-01-04", nights: 7, cabins: cabinsWithPattern("aaaaua") },
  { id: "sulawesi-sponges-and-stilts-2027-01-14", itinerary: "sulawesi-sponges-and-stilts", date: "2027-01-14", nights: 10, cabins: cabinsWithPattern("uaauaa") },
  { id: "sulawesi-sultans-and-tarsiers-2027-01-25", itinerary: "sulawesi-sultans-and-tarsiers", date: "2027-01-25", nights: 7, cabins: cabinsWithPattern("aauuau") },
  { id: "sunda-east-meets-west-2027-02-03", itinerary: "sunda-east-meets-west", date: "2027-02-03", nights: 11, cabins: cabinsWithPattern("uuaauu") },
  { id: "sunda-west-meets-east-2027-02-16", itinerary: "sunda-west-meets-east", date: "2027-02-16", nights: 11, cabins: cabinsWithPattern("aaaaaa") },
  { id: "sunda-nirvana-and-lava-2027-03-01", itinerary: "sunda-nirvana-and-lava", date: "2027-03-01", nights: 7, cabins: cabinsWithPattern("uauuua") },
  { id: "sunda-spices-and-snakes-2027-03-10", itinerary: "sunda-spices-and-snakes", date: "2027-03-10", nights: 8, cabins: cabinsWithPattern("aaauaa") },
];

/**
 * Resolves the current cruise list. Async on purpose, even though the mock
 * is instant — a real fetch() will be too.
 */
async function getCruises() {
  if (CRUISE_DATA_SOURCE === "mock") {
    return Promise.resolve(MOCK_CRUISES);
  }
  throw new Error(`Unknown cruise data source: ${CRUISE_DATA_SOURCE}`);
}

const STATUS_LABEL = { available: "Available", unavailable: "Unavailable" };

function availableCount(cabins) {
  return cabins.filter((c) => c.status === "available").length;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function tripFor(cruise) {
  return (typeof ITINERARIES !== "undefined") ? ITINERARIES.find((t) => t.slug === cruise.itinerary) : null;
}
