/**
 * "The Boat" page interactivity: the deck-plan tab switcher, the
 * construction timeline slider (dynamically centered on today's date,
 * not a hard-coded step — see MILESTONES below), and the Key Figures
 * "odometer" count-up.
 */
(function () {
  "use strict";

  /* ---------- Deck plan tabs ---------- */
  var deckTabs = document.querySelectorAll(".tbp-deckplan__tab");
  var deckImgs = document.querySelectorAll(".tbp-deckplan__img");
  deckTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      deckTabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      deckImgs.forEach(function (img) { img.classList.remove("is-active"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      var target = document.getElementById(tab.getAttribute("aria-controls"));
      if (target) target.classList.add("is-active");
    });
  });

  /* ---------- Construction timeline ---------- */
  // TODO: real dated milestones from the owner — placeholders for now,
  // matching the reference frieze below and the "set to sail Oct 2028" date.
  var MILESTONES = [
    // --- placeholder steps before the first real milestone (TODO: replace with the real early-build steps) ---
    { date: "2025-01-01", label: "Jan. 2025", title: "Design & Naval Architecture", desc: "Placeholder — the hull lines and construction plans are drawn up and reviewed.", side: "above", img: "waow2-detail" },
    { date: "2025-02-01", label: "Feb. 2025", title: "Site Preparation", desc: "Placeholder — the building site is cleared and the slipway prepared.", side: "below", img: "boat-construction" },
    { date: "2025-03-01", label: "March 2025", title: "Timber Selection", desc: "Placeholder — master builders choose the ironwood and teak, plank by plank.", side: "above", img: "deckhand-rope" },
    { date: "2025-04-01", label: "April 2025", title: "Shipyard Set-Up", desc: "Placeholder — tools, workshops and the crew of shipwrights are put in place.", side: "below", img: "boat-construction" },
    { date: "2025-05-01", label: "May 2025", title: "Contract Signature", desc: "The build agreement is signed, and the countdown to keel-laying begins.", side: "below", img: "boat-construction" },
    { date: "2025-06-01", label: "June 2025", title: "Gathering Wood", desc: "Ironwood and teak are sourced and sorted, board by board, for the build ahead.", side: "above", img: "waow2-detail" },
    { date: "2025-09-01", label: "Sept. 2025", title: "Keel Ceremony", desc: "The keel is laid on the beach at Bulukumba, the traditional start of any phinisi.", side: "above", img: "boat-construction" },
    { date: "2025-10-01", label: "Oct. 2025", title: "Keel, Ribs, Planks", desc: "Ribs are raised and the first planks go on, one by one, by eye and experience.", side: "below", img: "deckhand-rope" },
    { date: "2026-03-01", label: "March 2026", title: "Stringers, Deck", desc: "Stringers and decking take shape, and the hull starts to look like a boat.", side: "above", img: "boat-construction" },
    { date: "2026-07-01", label: "July 2026", title: "Cabins, Bulkheads, Lowerdeck", desc: "The cabins, bulkheads and lower deck begin to take shape.", side: "below", img: "waow2-detail" },
    { date: "2026-10-01", label: "Oct. 2026", title: "Caulking, Installations, Painting", desc: "Caulking, technical installations and painting move the build into its next phase.", side: "above", img: "boat-construction" },
    { date: "2027-04-01", label: "April 2027", title: "Boat Launch", desc: "WAOW II will touch the water for the first time, marking the beginning of the final stages.", side: "below", img: "deckhand-rope" },
    { date: "2027-05-01", label: "May 2027", title: "Engine Installation", desc: "Engines and mechanical systems are fitted and tested before the interiors go in.", side: "below", img: "boat-construction" },
    { date: "2027-06-01", label: "June 2027", title: "Interiors", desc: "Cabins, saloon and galley are fitted out, from joinery to the last coat of varnish.", side: "above", img: "waow2-detail" },
    { date: "2028-04-01", label: "April 2028", title: "Crossing to Bali", desc: "WAOW 2 makes her first open-water crossing, from Sulawesi to Bali.", side: "above", img: "boat-construction" },
    { date: "2028-05-01", label: "May 2028", title: "Masts & Decor", desc: "Masts go up, rigging is tuned, and the final decor comes together on deck.", side: "below", img: "deckhand-rope" },
    { date: "2028-09-01", label: "Sept. 2028", title: "Sea Trials", desc: "Full sea trials, from sail handling to safety systems, before she's cleared to sail.", side: "below", img: "boat-construction" },
    { date: "2028-10-01", label: "Oct. 2028", title: "Maiden Voyage", desc: "WAOW 2 sets sail for the first time with guests aboard, on October 12th, 2028.", side: "above", img: "waow2-detail" },
    // --- placeholder steps after the maiden voyage (TODO: replace with the real post-launch steps) ---
    { date: "2028-11-01", label: "Nov. 2028", title: "First Season Begins", desc: "Placeholder — the first guests explore the Banda Sea and beyond.", side: "below", img: "boat-construction" },
    { date: "2028-12-01", label: "Dec. 2028", title: "Crew Milestone", desc: "Placeholder — a look back at the first weeks at sea.", side: "above", img: "deckhand-rope" },
    { date: "2029-01-01", label: "Jan. 2029", title: "Next Chapter", desc: "Placeholder — what comes after the first season.", side: "below", img: "waow2-detail" },
    { date: "2029-02-01", label: "Feb. 2029", title: "Ongoing Journey", desc: "Placeholder — the story of Waow 2 keeps being written.", side: "above", img: "boat-construction" },
  ];

  var track = document.getElementById("tbp-slider-track");
  var prevBtn = document.getElementById("tbp-slider-prev");
  var nextBtn = document.getElementById("tbp-slider-next");
  if (!track) return;

  function closestIndex() {
    var today = new Date();
    var best = 0, bestDiff = Infinity;
    MILESTONES.forEach(function (m, i) {
      var diff = Math.abs(new Date(m.date + "T00:00:00") - today);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    });
    return best;
  }

  // center index: the visible window is [center-1, center, center+1]
  var center = Math.min(Math.max(closestIndex(), 1), MILESTONES.length - 2);

  function stackMarkup(m) {
    return (
      '<div class="tbp-stack" tabindex="0" aria-label="' + m.title + ' — photo detail">' +
      '<img class="tbp-stack__photo" src="images/' + m.img + '.jpg" loading="lazy" alt="Construction progress: ' + m.title + '.">' +
      '<img class="tbp-stack__photo" src="images/' + m.img + '.jpg" loading="lazy" alt="">' +
      '<img class="tbp-stack__photo" src="images/' + m.img + '.jpg" loading="lazy" alt="">' +
      "</div>"
    );
  }

  function stepMarkup(m) {
    var dateBlock = '<p class="tbp-slider__date">' + m.label + '<span class="tbp-slider__title"><br>' + m.title + "</span></p>";
    var descBlock = '<p class="tbp-slider__desc">' + m.desc + "</p>";
    var tick = '<span class="tbp-slider__tick" aria-hidden="true"></span>';
    if (m.side === "above") {
      return '<div class="tbp-slider__step tbp-slider__step--above">' + dateBlock + stackMarkup(m) + descBlock + tick + "</div>";
    }
    return '<div class="tbp-slider__step tbp-slider__step--below">' + stackMarkup(m) + dateBlock + descBlock + tick + "</div>";
  }

  var countEl = document.getElementById("tbp-slider-count");
  function render() {
    var visible = [MILESTONES[center - 1], MILESTONES[center], MILESTONES[center + 1]];
    track.innerHTML = visible.map(stepMarkup).join("");
    if (prevBtn) prevBtn.disabled = center <= 1;
    if (nextBtn) nextBtn.disabled = center >= MILESTONES.length - 2;
    if (countEl) countEl.textContent = center + " / " + (MILESTONES.length - 2);
  }

  // slide out, swap the three visible steps, slide back in (dir: +1 = later, -1 = earlier)
  var busy = false;
  function go(dir) {
    var target = center + dir;
    if (busy || target < 1 || target > MILESTONES.length - 2) return;
    busy = true;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !track.animate) { center = target; render(); busy = false; return; }
    // animate the steps themselves (the track is a static wrapper their absolute positions hang off)
    Array.prototype.forEach.call(track.children, function (el) {
      return el.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: "translateX(" + (-40 * dir) + "px)" }], { duration: 180, easing: "ease-in", fill: "forwards" });
    });
    setTimeout(function () {
      center = target; render();
      Array.prototype.forEach.call(track.children, function (el) {
        el.animate([{ opacity: 0, transform: "translateX(" + (40 * dir) + "px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 240, easing: "ease-out" });
      });
      setTimeout(function () { busy = false; }, 240);
    }, 180);
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

  // keyboard (arrow keys while focus is inside the slider) + swipe/drag
  var slider = track.closest(".tbp-slider");
  slider.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { go(-1); } else if (e.key === "ArrowRight") { go(1); }
  });
  var startX = null;
  slider.addEventListener("pointerdown", function (e) { startX = e.clientX; });
  slider.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX; startX = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  });
  slider.addEventListener("pointercancel", function () { startX = null; });

  render();

  /* ---------- Key Figures "odometer" count-up ---------- */
  var figuresFrame = document.querySelector(".tbp-figures__frame");
  if (figuresFrame) {
    var figureEls = figuresFrame.querySelectorAll(".tbp-figures__grid dt");

    function animateFigure(el, delay) {
      var finalText = el.textContent.trim();
      var match = finalText.match(/^(\d+)(.*)$/);
      if (!match) return; // no leading number (shouldn't happen here) — leave as-is
      var finalNum = parseInt(match[1], 10);
      var suffix = match[2];
      var ticks = 22;
      var maxRandom = Math.max(finalNum * 4, 60);
      var i = 0;

      function tick() {
        i++;
        var progress = i / ticks;
        var val;
        if (progress < 0.55) {
          val = Math.floor(Math.random() * maxRandom);
        } else if (progress < 1) {
          var settle = (progress - 0.55) / 0.45;
          var range = Math.round((1 - settle) * maxRandom * 0.25);
          val = finalNum + Math.round((Math.random() - 0.5) * 2 * range);
          if (val < 0) val = Math.abs(val);
        } else {
          el.textContent = finalText;
          return;
        }
        el.textContent = val + suffix;
        var next = 25 + Math.pow(progress, 2) * 140;
        setTimeout(tick, next);
      }

      setTimeout(tick, delay);
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              figureEls.forEach(function (el, idx) { animateFigure(el, idx * 60); });
              obs.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(figuresFrame);
    } else {
      figureEls.forEach(function (el, idx) { animateFigure(el, idx * 60); });
    }
  }
})();
