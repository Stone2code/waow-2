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
  { id: "dragon-ground-2026-10-12", itinerary: "dragon-ground", date: "2026-10-12", nights: 7, cabins: cabinsWithPattern("auaaaa") },
  { id: "komodo-express-2026-10-19", itinerary: "komodo-express", date: "2026-10-19", nights: 4, cabins: cabinsWithPattern("aaaaaa") },
  { id: "south-komodo-2026-10-24", itinerary: "south-komodo", date: "2026-10-24", nights: 8, cabins: cabinsWithPattern("uuaaua") },
  { id: "raja-ampat-crossing-2026-11-02", itinerary: "raja-ampat-crossing", date: "2026-11-02", nights: 8, cabins: cabinsWithPattern("aauaau") },
  { id: "dampier-misool-2026-11-11", itinerary: "dampier-misool", date: "2026-11-11", nights: 9, cabins: cabinsWithPattern("uuuuau") },
  { id: "wayag-circuit-2026-11-21", itinerary: "wayag-circuit", date: "2026-11-21", nights: 8, cabins: cabinsWithPattern("aaaaaa") },
  { id: "cenderawasih-whale-sharks-2026-11-28", itinerary: "cenderawasih-whale-sharks", date: "2026-11-28", nights: 7, cabins: cabinsWithPattern("auauau") },
  { id: "triton-bay-2026-12-05", itinerary: "triton-bay", date: "2026-12-05", nights: 9, cabins: cabinsWithPattern("uauaua") },
  { id: "dragon-ground-2026-12-14", itinerary: "dragon-ground", date: "2026-12-14", nights: 7, cabins: cabinsWithPattern("uuuaau") },
  { id: "forgotten-islands-2026-12-20", itinerary: "forgotten-islands", date: "2026-12-20", nights: 10, cabins: cabinsWithPattern("aaaaua") },
  { id: "spice-route-2027-01-04", itinerary: "spice-route", date: "2027-01-04", nights: 9, cabins: cabinsWithPattern("uaauaa") },
  { id: "ambon-lease-2027-01-14", itinerary: "ambon-lease", date: "2027-01-14", nights: 6, cabins: cabinsWithPattern("aauuau") },
  { id: "halmahera-hidden-reefs-2027-01-22", itinerary: "halmahera-hidden-reefs", date: "2027-01-22", nights: 8, cabins: cabinsWithPattern("uuaauu") },
  { id: "alor-coast-2027-02-01", itinerary: "alor-coast", date: "2027-02-01", nights: 6, cabins: cabinsWithPattern("aaaaaa") },
  { id: "timor-strait-crossing-2027-02-08", itinerary: "timor-strait-crossing", date: "2027-02-08", nights: 8, cabins: cabinsWithPattern("uauuua") },
  { id: "lembata-whalers-coast-2027-02-16", itinerary: "lembata-whalers-coast", date: "2027-02-16", nights: 6, cabins: cabinsWithPattern("aaauaa") },
  { id: "flores-volcano-traverse-2027-02-22", itinerary: "flores-volcano-traverse", date: "2027-02-22", nights: 5, cabins: cabinsWithPattern("aaaaaa") },
  { id: "sumba-solitude-2027-03-02", itinerary: "sumba-solitude", date: "2027-03-02", nights: 7, cabins: cabinsWithPattern("auaaua") },
  { id: "wakatobi-wander-2027-03-10", itinerary: "wakatobi-wander", date: "2027-03-10", nights: 10, cabins: cabinsWithPattern("uuauaa") },
  { id: "raja-ampat-crossing-2027-03-19", itinerary: "raja-ampat-crossing", date: "2027-03-19", nights: 8, cabins: cabinsWithPattern("aaaaaa") },
  { id: "derawan-sangalaki-2027-03-27", itinerary: "derawan-sangalaki", date: "2027-03-27", nights: 7, cabins: cabinsWithPattern("uaauau") },
  { id: "grand-traverse-2027-11-05", itinerary: "grand-traverse", date: "2027-11-05", nights: 21, cabins: cabinsWithPattern("uuaaua") },
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
