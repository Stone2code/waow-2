/**
 * Renders the itinerary flip-card grid on itineraries.html from ITINERARIES
 * (itineraries-data.js). Front face: click to flip and reveal a short
 * description. Back face: click anywhere to open the full route page;
 * the small "back" button in the corner returns the card to its front
 * without navigating.
 */
(function () {
  "use strict";

  const grid = document.getElementById("itinerary-grid");
  if (!grid || typeof ITINERARIES === "undefined") return;

  function cardMarkup(trip) {
    return `
      <article class="itin-card" id="itin-${trip.slug}" data-slug="${trip.slug}">
        <div class="itin-card__inner">
          <button class="itin-card__face itin-card__face--front" type="button" aria-pressed="false" aria-label="${trip.name} — tap for a short description">
            <span class="itin-card__photo">
              <picture>
                <source srcset="images/${trip.image}.webp" type="image/webp">
                <img src="images/${trip.image}.jpg" alt="${trip.imageAlt}" loading="lazy">
              </picture>
            </span>
            <span class="itin-card__front-body">
              <span class="itin-card__eyebrow">${trip.eyebrow}</span>
              <span class="itin-card__name">${trip.name}</span>
              <span class="itin-card__meta">${trip.nights} nights · ${trip.region}</span>
            </span>
            <span class="itin-card__flip-hint">Tap for a peek</span>
          </button>

          <div class="itin-card__face itin-card__face--back" tabindex="-1">
            <button class="itin-card__unflip" type="button" aria-label="Show the ${trip.name} preview again">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5L8 12l7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Back
            </button>
            <a class="itin-card__back-link" href="itinerary.html?slug=${trip.slug}" aria-label="Open the full route for ${trip.name}">
              <span class="itin-card__eyebrow">${trip.eyebrow}</span>
              <span class="itin-card__name">${trip.name}</span>
              <span class="itin-card__teaser">${trip.teaser}</span>
              <span class="itin-card__meta">${trip.nights} nights · ${trip.level}</span>
              <span class="itin-card__link">Full route
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  grid.innerHTML = ITINERARIES.map(cardMarkup).join("");
  grid.classList.remove("itin-grid--loading");

  function setFlipped(card, flipped) {
    const inner = card.querySelector(".itin-card__inner");
    const front = card.querySelector(".itin-card__face--front");
    const back = card.querySelector(".itin-card__face--back");
    inner.classList.toggle("is-flipped", flipped);
    front.tabIndex = flipped ? -1 : 0;
    front.setAttribute("aria-pressed", String(flipped));
    back.tabIndex = flipped ? 0 : -1;
  }

  grid.querySelectorAll(".itin-card").forEach((card) => {
    const front = card.querySelector(".itin-card__face--front");
    const unflip = card.querySelector(".itin-card__unflip");

    front.addEventListener("click", () => setFlipped(card, true));

    unflip.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setFlipped(card, false);
      front.focus();
    });
  });
})();
