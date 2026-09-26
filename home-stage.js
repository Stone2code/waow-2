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
  }
  apply();
  window.addEventListener("resize", apply);
})();
