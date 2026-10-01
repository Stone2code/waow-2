(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var burger = document.getElementById("burger");
  var mobileNav = document.getElementById("mobile-nav");

  function setHeaderScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
    });

    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        burger.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      }
    });
  }

  // Scroll-reveal: fade/slide elements into place once, quietly.
  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Newsletter form: no backend yet for V1 — acknowledge locally.
  var newsletterForm = document.getElementById("newsletter-form");
  var newsletterNote = document.getElementById("newsletter-note");
  if (newsletterForm && newsletterNote) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO: wire up to the real newsletter provider (Mailchimp, Klaviyo, etc.)
      newsletterNote.textContent = "Thank you — we'll be in touch.";
      newsletterForm.reset();
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Destinations submenu: mark the Regions / Itineraries entry (and the matching sub-link) for the current page.
  (function () {
    var page = location.pathname.split("/").pop() || "index.html";
    var slug = new URLSearchParams(location.search).get("slug");
    var isIt = /^itinerary(-v2)?\.html$/.test(page);
    document.querySelectorAll(".nav__dd").forEach(function (dd) {
      var isRegions = dd.classList.contains("nav__dd--regions");
      var match = false;
      dd.querySelectorAll(".nav__subrow a").forEach(function (a) {
        var href = a.getAttribute("href");
        var hit = isRegions ? href === page : (isIt && slug && href.indexOf("slug=" + slug) > -1);
        if (hit) { a.classList.add("is-active"); match = true; }
      });
      if (match) dd.children[0].classList.add("is-active");
    });
  })();

  // Desktop submenus: a menu stays open ~350 ms after the pointer leaves it, so moving down (or diagonally)
  // to its links never closes it. Top-level entries switch over at once; Regions <-> Itineraries switch only
  // after the pointer rests ~160 ms on the other entry, so crossing it on the way to a link does nothing.
  document.querySelectorAll(".nav__item--dropdown, .nav__dd").forEach(function (el) {
    var closeTimer, switchTimer;
    var nested = el.classList.contains("nav__dd");
    function close(node) {
      node.classList.remove("is-open");
      node.querySelectorAll(".is-open").forEach(function (n) { n.classList.remove("is-open"); });
    }
    function open() {
      Array.prototype.forEach.call(el.parentElement.children, function (sib) { if (sib !== el) close(sib); });
      el.classList.add("is-open");
    }
    el.addEventListener("mouseenter", function () {
      clearTimeout(closeTimer);
      var otherOpen = nested && el.parentElement.querySelector(":scope > .nav__dd.is-open:not(:hover)");
      if (otherOpen && !el.classList.contains("is-open")) switchTimer = setTimeout(open, 160);
      else open();
    });
    el.addEventListener("mouseleave", function () {
      clearTimeout(switchTimer);
      closeTimer = setTimeout(function () { close(el); }, 350);
    });
    el.addEventListener("focusin", open);
  });
})();
