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
    var dateBlock = '<p class="tbp-slider__date">' + m.label + "<br>" + m.title + "</p>";
    var descBlock = '<p class="tbp-slider__desc">' + m.desc + "</p>";
    if (m.side === "above") {
      return (
        '<div class="tbp-slider__step tbp-slider__step--above">' +
        dateBlock + stackMarkup(m) +
        "</div>"
      );
    }
    return (
      '<div class="tbp-slider__step tbp-slider__step--below">' +
      stackMarkup(m) + dateBlock + descBlock +
      "</div>"
    );
  }

  function render() {
    var visible = [MILESTONES[center - 1], MILESTONES[center], MILESTONES[center + 1]];
    track.innerHTML = visible.map(stepMarkup).join("");
    if (prevBtn) prevBtn.disabled = center <= 1;
    if (nextBtn) nextBtn.disabled = center >= MILESTONES.length - 2;
  }

  if (prevBtn) prevBtn.addEventListener("click", function () {
    if (center > 1) { center--; render(); }
  });
  if (nextBtn) nextBtn.addEventListener("click", function () {
    if (center < MILESTONES.length - 2) { center++; render(); }
  });

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
