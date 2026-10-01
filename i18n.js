/* WAOW — site language (EN default, FR for now).
   Choice: ?lang=fr / ?lang=en in the URL, else the last choice (localStorage), else English.
   French: i18n-fr.js (a dictionary keyed by the English text) is loaded only when French is on; once every page
   script has rendered (DOMContentLoaded), the page is walked top-down and each element / text node whose English
   text is in the dictionary gets its French version. Content added later (carousels…) is caught by a MutationObserver.
   The page stays hidden while it is being translated so English never flashes. */
(function () {
  "use strict";
  var KEY = "waow-lang", lang = "en";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "fr" || q === "en") { localStorage.setItem(KEY, q); lang = q; }
    else lang = localStorage.getItem(KEY) === "fr" ? "fr" : "en";
  } catch (e) { var q2 = /[?&]lang=(fr|en)/.exec(location.search); lang = q2 ? q2[1] : "en"; }
  window.WAOW_LANG = lang;
  var root = document.documentElement;
  root.setAttribute("lang", lang);

  function setLang(l) { try { localStorage.setItem(KEY, l); } catch (e) {} var u = new URL(location.href); u.searchParams.delete("lang"); location.href = u.toString(); }

  // header language switch "EN | FR | DE" (DE not available yet: shown, inactive), plus a copy at the top of the mobile menu
  function switchHTML() {
    return '<nav class="lang-switch" aria-label="Language">' +
      '<a href="#" data-lang="en"' + (lang === "en" ? ' aria-current="true"' : "") + ">EN</a><span aria-hidden=\"true\"></span>" +
      '<a href="#" data-lang="fr"' + (lang === "fr" ? ' aria-current="true"' : "") + ">FR</a><span aria-hidden=\"true\"></span>" +
      '<a class="is-off" aria-disabled="true" title="Deutsch – coming soon">DE</a></nav>';
  }
  document.addEventListener("DOMContentLoaded", function () {
    var row = document.querySelector(".site-header__row"), act = row && row.querySelector(".site-header__actions");
    if (row && !row.querySelector(".lang-switch")) {
      var w = document.createElement("div"); w.innerHTML = switchHTML();
      row.insertBefore(w.firstChild, act || null);
      // same colour as the top-menu links of this page (blue, brown, or light on the News page)
      var link = row.querySelector(".nav__list > li > a"), sw = row.querySelector(".lang-switch");
      if (link) row.style.setProperty("--ls-c", getComputedStyle(link).color);
    }
    var mob = document.querySelector(".mobile-nav");
    if (mob && !mob.querySelector(".lang-switch")) { var m = document.createElement("div"); m.innerHTML = switchHTML(); mob.insertBefore(m.firstChild, mob.firstChild); }
    document.querySelectorAll(".lang-switch a[data-lang]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); if (a.getAttribute("data-lang") !== lang) setLang(a.getAttribute("data-lang")); });
    });
  });

  // footer language selector
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hp-footer__lang-select").forEach(function (s) {
      s.disabled = false;
      s.innerHTML = '<option value="en">English</option><option value="fr">Français</option>';
      s.value = lang;
      s.addEventListener("change", function () { setLang(s.value); });
    });
  });
  if (lang !== "fr") return;

  root.classList.add("i18n-pending");
  var st = document.createElement("style");
  st.textContent = ".i18n-pending body{visibility:hidden}";
  document.head.appendChild(st);
  var reveal = function () { root.classList.remove("i18n-pending"); };
  setTimeout(reveal, 3000); // never leave the page hidden

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, SELECT: 1, OPTION: 1, TEXTAREA: 1, IFRAME: 1 };
  function norm(s) {
    return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-")
      .replace(/ /g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  }
  function txt(el) {
    var out = "";
    (function rec(n) {
      for (var c = n.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) out += c.data;
        else if (c.nodeName === "BR") out += " ";
        else if (c.nodeType === 1 && !SKIP[c.nodeName] && c.nodeName.toLowerCase() !== "svg") rec(c);
      }
    })(el);
    return out;
  }
  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }
  function hasRich(el) { return el.querySelector("svg, img, input, button, select, picture, figure, ul, ol, div, p, h1, h2, h3, h4, li, [id]"); }

  var D = null;
  function apply(el, fr) {
    // line breaks follow the English layout: a single-line English text stays on one line in French
    if (!el.querySelector("br")) fr = fr.replace(/<br\s*\/?>/gi, " ");
    if (!hasRich(el)) { el.innerHTML = fr; return; }
    // keep icons/children: put the French text in the first text node, drop the other text nodes and <br>s
    var first = null;
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3 && n.data.trim()) { if (!first) { first = n; n.data = plain(fr) + " "; } else n.remove(); }
      else if (n.nodeName === "BR") n.remove();
    });
    if (!first) el.insertBefore(document.createTextNode(plain(fr) + " "), el.firstChild);
  }
  function walk(el) {
    if (el.nodeType !== 1 || SKIP[el.nodeName] || el.closest("svg")) return;
    var t = txt(el);
    // a wrapper whose only text sits in one child: translate the child, not the wrapper
    var own = false, withText = [];
    for (var c = el.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 3 && c.data.trim()) own = true;
      else if (c.nodeType === 1 && c.nodeName.toLowerCase() !== "svg" && !SKIP[c.nodeName] && txt(c).trim()) withText.push(c);
    }
    if (!own && withText.length === 1 && el.nodeName !== "A" && el.nodeName !== "BUTTON") { walk(withText[0]); return; }
    if (t && t.length < 4000) {
      var fr = D[norm(t)];
      var ownText = Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.data.trim(); });
      if (fr !== undefined && norm(t) && (ownText || !hasRich(el))) { if (norm(plain(fr)) !== norm(t)) apply(el, fr); return; }
    }
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 1) walk(n);
      else if (n.nodeType === 3 && n.data.trim()) { var f = D[norm(n.data)]; if (f !== undefined) n.data = n.data.replace(n.data.trim(), plain(f)); }
    });
  }
  function attrs(scope) {
    scope.querySelectorAll("[placeholder],[data-title],[aria-label]").forEach(function (e) {
      ["placeholder", "data-title", "aria-label"].forEach(function (a) {
        var v = e.getAttribute(a), f = v && D[norm(v)];
        if (f !== undefined && f) e.setAttribute(a, plain(f));
      });
    });
  }
  function run() {
    D = window.WAOW_I18N_FR || {};
    walk(document.body); attrs(document.body);
    var busy = false;
    new MutationObserver(function (ms) {
      if (busy) return; busy = true;
      ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { walk(n); attrs(n); } }); });
      busy = false;
    }).observe(document.body, { childList: true, subtree: true });
    reveal();
    window.dispatchEvent(new Event("waow:translated"));
  }
  var me = document.currentScript && document.currentScript.src;
  var s = document.createElement("script");
  s.src = (me ? me.replace(/i18n\.js(\?.*)?$/, "") : "") + "i18n-fr.js";
  var loaded = new Promise(function (res) { s.onload = res; s.onerror = res; });
  document.head.appendChild(s);
  var ready = new Promise(function (res) { if (document.readyState !== "loading") res(); else document.addEventListener("DOMContentLoaded", res); });
  Promise.all([loaded, ready]).then(run);
})();
