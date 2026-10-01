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

  // Body copy (Fraunces) is 13px everywhere: tag every element whose text is set in Fraunces; CSS does the rest ([data-f13]).
  (function () {
    if (window.WAOW_KEEP_BODY_SIZE) return;
    var timer = null;
    function tag() {
      var els = document.body.getElementsByTagName("*");
      for (var i = 0; i < els.length; i++) {
        var el = els[i], n = el.nodeName;
        if (n === "SCRIPT" || n === "STYLE" || n === "svg" || n === "path" || el.hasAttribute("data-f13")) continue;
        var own = false;
        for (var c = el.firstChild; c; c = c.nextSibling) { if (c.nodeType === 3 && c.nodeValue.trim()) { own = true; break; } }
        if (own && /fraunces/i.test(getComputedStyle(el).fontFamily)) el.setAttribute("data-f13", "");
      }
    }
    // Desktop hard line breaks inside paragraphs: each <br> gets a sibling space that only shows on phones (CSS), so text re-wraps there.
    function spaces() {
      var brs = document.body.querySelectorAll("p br:not(.had), li br:not(.had)");
      for (var i = 0; i < brs.length; i++) {
        var br = brs[i];
        if (br.closest(".cb-closing__copy, .rg-key__sheet, .px-annot, .keep-br")) continue;
        br.className = "had";
        var sp = document.createElement("span"); sp.className = "br-sp"; sp.textContent = " ";
        br.parentNode.insertBefore(sp, br.nextSibling);
      }
    }
    function later() { clearTimeout(timer); timer = setTimeout(function () { tag(); spaces(); }, 60); }
    tag(); spaces();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { tag(); spaces(); });
    window.addEventListener("load", tag);
    if ("MutationObserver" in window) new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
  })();

  // Museum postcards: on phones they become a one-at-a-time slider (swipe, arrows, dots). Desktop keeps its fixed layout.
  (function () {
    var t = document.getElementById("mu-testi-track");
    if (!t) return;
    var cards = t.querySelectorAll(".mu-testi"), dots = document.getElementById("mu-testi-dots");
    var prev = document.getElementById("mu-testi-prev"), next = document.getElementById("mu-testi-next");
    function idx() { var w = cards[0].offsetWidth || 1; return Math.round(t.scrollLeft / (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : w)); }
    function go(i) { i = (i + cards.length) % cards.length; t.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: "smooth" }); }
    cards.forEach(function (c, i) {
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Postcard " + (i + 1));
      b.addEventListener("click", function () { go(i); }); dots.appendChild(b);
    });
    function sync() { var i = idx(); dots.querySelectorAll("button").forEach(function (b, k) { b.classList.toggle("is-on", k === i); }); }
    prev.addEventListener("click", function () { go(idx() - 1); });
    next.addEventListener("click", function () { go(idx() + 1); });
    t.addEventListener("scroll", function () { window.requestAnimationFrame(sync); }, { passive: true });
    sync();
  })();
})();
