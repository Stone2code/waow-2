/* Pixel-measured desktop layouts (homepage: 1366px stage, The Boat: 1190px):
   scale the fixed stage down with CSS zoom when the viewport is narrower
   than it. The stage width comes from the script tag's data-stage
   attribute. See the "pixel-measured layout" blocks in style.css. */
(function () {
  "use strict";
  var stage = parseInt((document.currentScript && document.currentScript.getAttribute("data-stage")) || "1366", 10);
  function apply() {
    var z = Math.min(1, window.innerWidth / stage);
    document.documentElement.style.setProperty("--z", String(z));
    // The header is always laid out on its own 1366px-wide reference
    // (see the "header" blocks in style.css), independently of whatever
    // stage width this page's own content uses, so every page's header
    // scales identically at any viewport width instead of capping out
    // early on pages with a narrower content stage.
    document.documentElement.style.setProperty("--hz", String(Math.min(1, window.innerWidth / 1366)));
  }
  apply();
  window.addEventListener("resize", apply);
})();
