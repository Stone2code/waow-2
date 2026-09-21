/**
 * Booking search — search bar, filters, calendar and results list.
 * Reads cruises via getCruises() (cruises-data.js) and itinerary details
 * via ITINERARIES (itineraries-data.js). Nothing here touches MOCK_CRUISES
 * directly, so swapping the data source later is a one-file change.
 */
(function () {
  "use strict";

  const root = document.getElementById("booking-calendar");
  if (!root) return;

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const WEEKDAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  let ALL_CRUISES = [];
  let months = []; // sorted "YYYY-MM" strings present in the data
  let monthIndex = 0;
  let selectedDate = null; // "YYYY-MM-DD" or null
  const expanded = new Set();

  const els = {
    search: document.getElementById("booking-search-input"),
    itinerary: document.getElementById("filter-itinerary"),
    month: document.getElementById("filter-month"),
    cabin: document.getElementById("filter-cabin"),
    nights: document.getElementById("filter-nights"),
    calendar: root,
    count: document.getElementById("booking-results-count"),
    results: document.getElementById("booking-results"),
    form: document.getElementById("booking-search-form"),
  };

  function monthKey(iso) { return iso.slice(0, 7); }

  function nightsBucket(n) {
    if (n <= 6) return "short";
    if (n <= 9) return "mid";
    return "long";
  }

  function matchesFilters(cruise, opts) {
    opts = opts || {};
    const trip = tripFor(cruise);
    if (!trip) return false;

    const q = (els.search.value || "").trim().toLowerCase();
    if (q) {
      const hay = (trip.name + " " + trip.region + " " + trip.eyebrow).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (els.itinerary.value && cruise.itinerary !== els.itinerary.value) return false;
    if (els.month.value && monthKey(cruise.date) !== els.month.value) return false;
    if (els.cabin.value) {
      const hasType = cruise.cabins.some((c) => c.status === "available" && c.name.includes(els.cabin.value));
      if (!hasType) return false;
    }
    if (els.nights.value && nightsBucket(cruise.nights) !== els.nights.value) return false;
    if (!opts.ignoreDate && selectedDate && cruise.date !== selectedDate) return false;
    return true;
  }

  function filteredCruises(opts) {
    return ALL_CRUISES.filter((c) => matchesFilters(c, opts)).sort((a, b) => a.date.localeCompare(b.date));
  }

  /* ---------- calendar ---------- */

  function renderCalendar() {
    const cruisesForMarks = filteredCruises({ ignoreDate: true });
    const departureDates = new Set(cruisesForMarks.map((c) => c.date));

    if (!months.length) {
      els.calendar.innerHTML = '<p class="booking-calendar__hint">No departures match your filters yet.</p>';
      return;
    }
    monthIndex = Math.max(0, Math.min(monthIndex, months.length - 1));
    const [year, mon] = months[monthIndex].split("-").map(Number);
    const first = new Date(year, mon - 1, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(year, mon, 0).getDate();

    let cells = "";
    for (let i = 0; i < startWeekday; i++) cells += '<div class="booking-calendar__day booking-calendar__day--empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(mon).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const has = departureDates.has(iso);
      const isSel = selectedDate === iso;
      const cls = ["booking-calendar__day"];
      if (has) cls.push("booking-calendar__day--has-departure");
      if (isSel) cls.push("booking-calendar__day--selected");
      const attrs = has
        ? `role="button" tabindex="0" data-date="${iso}" aria-pressed="${isSel}" aria-label="${MONTH_NAMES[mon-1]} ${d} — departures available"`
        : "";
      cells += `<div class="${cls.join(" ")}" ${attrs}>${d}</div>`;
    }

    els.calendar.innerHTML = `
      <div class="booking-calendar__head">
        <div class="booking-calendar__nav">
          <button type="button" id="cal-prev" ${monthIndex === 0 ? "disabled" : ""} aria-label="Previous month with departures">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5L8 12l7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <p class="booking-calendar__month">${MONTH_NAMES[mon - 1]} ${year}</p>
        <div class="booking-calendar__nav">
          <button type="button" id="cal-next" ${monthIndex === months.length - 1 ? "disabled" : ""} aria-label="Next month with departures">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div class="booking-calendar__weekdays">${WEEKDAYS.map((w) => `<span>${w}</span>`).join("")}</div>
      <div class="booking-calendar__grid">${cells}</div>
      <p class="booking-calendar__hint">
        ${selectedDate ? `Showing departures on ${formatDate(selectedDate)} — <button type="button" class="booking-calendar__clear" id="cal-clear">clear date</button>` : "A ringed day has at least one departure — select one to narrow the list below."}
      </p>
    `;

    document.getElementById("cal-prev")?.addEventListener("click", () => { monthIndex--; renderCalendar(); });
    document.getElementById("cal-next")?.addEventListener("click", () => { monthIndex++; renderCalendar(); });
    document.getElementById("cal-clear")?.addEventListener("click", () => { selectedDate = null; renderCalendar(); renderResults(); });
    els.calendar.querySelectorAll(".booking-calendar__day--has-departure").forEach((day) => {
      const go = () => {
        const d = day.dataset.date;
        selectedDate = selectedDate === d ? null : d;
        renderCalendar();
        renderResults();
      };
      day.addEventListener("click", go);
      day.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  /* ---------- results ---------- */

  function cruiseCardMarkup(cruise) {
    const trip = tripFor(cruise);
    const avail = availableCount(cruise.cabins);
    const availClass = avail === 0 ? "cruise-card__avail--none" : avail <= 2 ? "cruise-card__avail--low" : "";
    const isOpen = expanded.has(cruise.id);

    const mini = cruise.cabins.map((c) => `<span data-status="${c.status}" title="${c.name} — ${STATUS_LABEL[c.status]}"></span>`).join("");

    const panelCabins = (deck) => cruise.cabins.filter((c) => c.deck === deck).map((c) => `
      <div class="cabin-slot${c.status === "unavailable" ? " cabin-slot--unavailable" : ""}">
        <p class="cabin-slot__status">${STATUS_LABEL[c.status]}</p>
        <p class="cabin-slot__name">${c.name}</p>
        <p class="cabin-slot__detail">${c.detail}</p>
      </div>
    `).join("");

    return `
      <article class="cruise-card">
        <button class="cruise-card__head" type="button" aria-expanded="${isOpen}" data-cruise-id="${cruise.id}">
          <span>
            <span class="cruise-card__name">${trip ? trip.name : cruise.itinerary}</span>
            <span class="cruise-card__meta">${formatDate(cruise.date)} · ${cruise.nights} nights${trip ? " · " + trip.region : ""}</span>
          </span>
          <span class="cruise-card__avail ${availClass}">${avail === 0 ? "Fully booked" : avail + " of " + cruise.cabins.length + " open"}</span>
          <span class="cruise-card__mini" aria-hidden="true">${mini}</span>
          <span class="cruise-card__toggle">
            ${isOpen ? "Hide cabins" : "View cabins"}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </button>
        <div class="cruise-card__panel" ${isOpen ? "" : "hidden"}>
          <div class="cabin-map__deck">
            <p class="cabin-map__deck-label">Upper Deck</p>
            <div class="cabin-map__row">${panelCabins("upper")}</div>
          </div>
          <div class="cabin-map__deck" style="margin-bottom:0">
            <p class="cabin-map__deck-label">Main Deck</p>
            <div class="cabin-map__row">${panelCabins("main")}</div>
          </div>
        </div>
      </article>
    `;
  }

  function renderResults() {
    const list = filteredCruises();
    els.count.textContent = list.length
      ? `${list.length} departure${list.length === 1 ? "" : "s"} match${list.length === 1 ? "es" : ""} your search.`
      : "";
    els.results.innerHTML = list.length
      ? list.map(cruiseCardMarkup).join("")
      : '<p class="booking-results__empty">Nothing matches yet — try clearing a filter or picking another month.</p>';

    els.results.querySelectorAll(".cruise-card__head").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.cruiseId;
        if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
        renderResults();
      });
    });
  }

  function jumpToFirstDepartureMonth() {
    if (!months.length) return;
    monthIndex = 0;
  }

  function onFilterChange() {
    jumpToFirstDepartureMonth();
    renderCalendar();
    renderResults();
  }

  function init(cruises) {
    ALL_CRUISES = cruises;
    months = Array.from(new Set(cruises.map((c) => monthKey(c.date)))).sort();

    // populate itinerary + month filter options
    const seenTrips = new Set();
    cruises.forEach((c) => {
      if (seenTrips.has(c.itinerary)) return;
      seenTrips.add(c.itinerary);
      const trip = tripFor(c);
      const opt = document.createElement("option");
      opt.value = c.itinerary;
      opt.textContent = trip ? trip.name : c.itinerary;
      els.itinerary.appendChild(opt);
    });
    months.forEach((m) => {
      const [y, mo] = m.split("-").map(Number);
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = `${MONTH_NAMES[mo - 1]} ${y}`;
      els.month.appendChild(opt);
    });

    [els.itinerary, els.month, els.cabin, els.nights].forEach((sel) => sel.addEventListener("change", onFilterChange));
    els.search.addEventListener("input", onFilterChange);
    els.form.addEventListener("submit", (e) => e.preventDefault());

    renderCalendar();
    renderResults();
  }

  if (typeof getCruises !== "function") return;
  getCruises()
    .then(init)
    .catch((err) => {
      console.error("Cruise availability failed to load:", err);
      els.calendar.innerHTML = '<p class="booking-calendar__hint">Availability isn\'t loading right now — please check back shortly.</p>';
    });
})();
