/**
 * Real-time countdown to when WAOW II online bookings open, shown on the
 * Pre-Bookings page. Broken into calendar months + days + hours + minutes
 * + seconds (not a flat "days remaining") so it reads naturally next to
 * the Paris Dive Show 2027 date.
 */
(function () {
  "use strict";

  // Paris time, midnight. Exact opening hour isn't confirmed yet — adjust
  // this constant once it is; everything else derives from it.
  var BOOKINGS_OPEN_DATE = new Date("2027-01-18T00:00:00+01:00");

  var els = {
    months: document.getElementById("bk-months"),
    days: document.getElementById("bk-days"),
    hours: document.getElementById("bk-hours"),
    minutes: document.getElementById("bk-minutes"),
    seconds: document.getElementById("bk-seconds")
  };
  if (!els.months) return;

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function partsUntil(target) {
    var now = new Date();
    if (target <= now) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    var months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    var monthMark = new Date(now.getTime());
    monthMark.setMonth(monthMark.getMonth() + months);
    if (monthMark > target) {
      months -= 1;
      monthMark.setMonth(monthMark.getMonth() - 1);
    }

    var msLeft = target.getTime() - monthMark.getTime();
    var days = Math.floor(msLeft / 86400000); msLeft -= days * 86400000;
    var hours = Math.floor(msLeft / 3600000); msLeft -= hours * 3600000;
    var minutes = Math.floor(msLeft / 60000); msLeft -= minutes * 60000;
    var seconds = Math.floor(msLeft / 1000);

    return { months: months, days: days, hours: hours, minutes: minutes, seconds: seconds };
  }

  function render() {
    var p = partsUntil(BOOKINGS_OPEN_DATE);
    els.months.textContent = pad(p.months);
    els.days.textContent = pad(p.days);
    els.hours.textContent = pad(p.hours);
    els.minutes.textContent = pad(p.minutes);
    els.seconds.textContent = pad(p.seconds);
  }

  render();
  setInterval(render, 1000);
})();
