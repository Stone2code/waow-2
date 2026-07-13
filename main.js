/* ============================================================
   WAOW — Global JS
   Nav behavior, GSAP scroll animations, custom cursor, bubbles,
   horizontal construction timeline, tilt cards, countdown, news filter
   ============================================================ */

(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initSplitWords();
    initHeroIntro();
    initParallax();
    initZoomMedia();
    initReveals();
    initCounters();
    initCustomCursor();
    initBubbles();
    initConstructionScroll();
    initTeamTilt();
    initCountdown();
    initScarcityBar();
    initNewsFilter();
    initVesselHotspots();
    initVesselTilt();
  });

  /* ---------- Nav scroll + mobile toggle ---------- */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = document.getElementById('navToggle');
    var links = nav.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.classList.toggle('is-active', open);
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('is-open');
          toggle.classList.remove('is-active');
        });
      });
    }
  }

  /* ---------- Split headings into word spans ---------- */
  function initSplitWords() {
    document.querySelectorAll('.split-words').forEach(function (el) {
      wrapWords(el);
    });
  }

  function wrapWords(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        if (!child.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (part === '') return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            var span = document.createElement('span');
            span.className = 'word';
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapWords(child);
      }
    });
  }

  /* ---------- Hero intro (immediate, not scroll-triggered) ---------- */
  function initHeroIntro() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    if (!hasGSAP) return;

    var tl = gsap.timeline({ delay: 0.2 });
    tl.from(hero.querySelectorAll('.hero-eyebrow'), {
      opacity: 0, y: 16, duration: 0.6, ease: 'power2.out'
    })
    .from(hero.querySelectorAll('.hero-title .word'), {
      yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.04, ease: 'power3.out'
    }, '-=0.3')
    .from(hero.querySelectorAll('.btn-row .btn'), {
      opacity: 0, y: 16, duration: 0.6, stagger: 0.1, ease: 'power2.out'
    }, '-=0.4')
    .from(hero.querySelectorAll('.hero-scroll'), {
      opacity: 0, duration: 0.6, ease: 'power2.out'
    }, '-=0.4');
  }

  /* ---------- Parallax on hero / cta background media ---------- */
  function initParallax() {
    if (!hasGSAP || !window.ScrollTrigger) return;

    document.querySelectorAll('.hero, .cta').forEach(function (section) {
      var media = section.querySelector('.hero-media img, .hero-media video');
      if (!media) return;

      gsap.to(media, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  /* ---------- Zoom-reveal on images (scale 1.18 -> 1 as they enter view) ---------- */
  function initZoomMedia() {
    if (!hasGSAP || !window.ScrollTrigger) return;

    document.querySelectorAll('.zoom-media img').forEach(function (img) {
      gsap.to(img, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.zoom-media'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  /* ---------- Scroll reveals (fade-in on scroll) ---------- */
  function initReveals() {
    var revealEls = document.querySelectorAll('.reveal');
    var splitHeadings = document.querySelectorAll('h2.split-words, h3.split-words');

    if (hasGSAP && window.ScrollTrigger) {
      revealEls.forEach(function (el) {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });

      splitHeadings.forEach(function (el) {
        gsap.from(el.querySelectorAll('.word'), {
          yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
      return;
    }

    /* Fallback without GSAP: IntersectionObserver + CSS class */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated stat / number counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var proxy = { val: 0 };

      var run = function () {
        if (hasGSAP) {
          gsap.to(proxy, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(proxy.val) + suffix;
            }
          });
        } else {
          el.textContent = target + suffix;
        }
      };

      if (hasGSAP && window.ScrollTrigger) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: run
        });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { run(); io.unobserve(entry.target); }
          });
        }, { threshold: 0.4 });
        io.observe(el);
      }
    });
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  function initCustomCursor() {
    if (!canHover) return;

    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var ringPos = { x: mouse.x, y: mouse.y };

    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = 'translate(' + mouse.x + 'px,' + mouse.y + 'px) translate(-50%,-50%)';
    });

    var tick = function () {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      ring.style.transform = 'translate(' + ringPos.x + 'px,' + ringPos.y + 'px) translate(-50%,-50%)';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    var hoverables = document.querySelectorAll('a, button:not(.vessel-hotspot), .team-card, .step-card, .news-card, .itin-card');
    hoverables.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.classList.add('is-hover');
        ring.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', function () {
        dot.classList.remove('is-hover');
        ring.classList.remove('is-hover');
      });
    });

    var vesselMedia = document.getElementById('vesselMedia');
    var cursorLabel = document.getElementById('cursorLabel');
    if (vesselMedia && cursorLabel) {
      vesselMedia.addEventListener('mouseenter', function () {
        cursorLabel.textContent = 'Explore';
        ring.classList.add('is-label');
      });
      vesselMedia.addEventListener('mouseleave', function () {
        cursorLabel.textContent = '';
        ring.classList.remove('is-label');
      });

      vesselMedia.querySelectorAll('.vessel-hotspot').forEach(function (hotspot) {
        hotspot.addEventListener('mouseenter', function () {
          ring.classList.remove('is-label');
          dot.classList.add('is-hover');
          ring.classList.add('is-hover');
        });
        hotspot.addEventListener('mouseleave', function () {
          dot.classList.remove('is-hover');
          ring.classList.remove('is-hover');
          ring.classList.add('is-label');
        });
      });
    }
  }

  /* ---------- Rising bubble particles (hero background, diving theme) ---------- */
  function initBubbles() {
    var canvas = document.getElementById('bubbleCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var bubbles = [];
    var count = window.innerWidth < 720 ? 18 : 34;

    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    function makeBubble() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        r: 2 + Math.random() * 6,
        speed: 0.3 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 0.6,
        alpha: 0.08 + Math.random() * 0.22
      };
    }

    function init() {
      resize();
      bubbles = [];
      for (var i = 0; i < count; i++) {
        var b = makeBubble();
        b.y = Math.random() * canvas.height;
        bubbles.push(b);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(function (b) {
        b.y -= b.speed;
        b.x += Math.sin(b.y * 0.01) * b.drift;
        if (b.y < -20) {
          Object.assign(b, makeBubble());
          b.y = canvas.height + 20;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 212, 255,' + b.alpha + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ---------- Section 02: Construction — horizontal pinned scroll ---------- */
  function initConstructionScroll() {
    var section = document.getElementById('construction');
    var pin = document.getElementById('constructionPin');
    var track = document.getElementById('constructionTrack');
    var fill = document.getElementById('constructionFill');
    if (!section || !pin || !track) return;

    if (!hasGSAP || !window.ScrollTrigger) {
      if (fill) fill.style.width = fill.getAttribute('data-progress') + '%';
      return;
    }

    var getScrollAmount = function () {
      return Math.max(0, track.scrollWidth - pin.clientWidth);
    };

    gsap.to(track, {
      x: function () { return -getScrollAmount(); },
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: function () { return '+=' + getScrollAmount(); },
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    if (fill) {
      var targetProgress = parseFloat(fill.getAttribute('data-progress'), 10) || 0;
      gsap.to(fill, {
        width: targetProgress + '%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 1
        }
      });
    }
  }

  /* ---------- Section 03: Team — mouse-tilt interactive cards ---------- */
  function initTeamTilt() {
    if (!canHover) return;

    document.querySelectorAll('.team-card').forEach(function (card) {
      var inner = card.querySelector('.team-card-inner');
      if (!inner) return;

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var rotateY = px * 14;
        var rotateX = -py * 14;
        inner.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(6px)';
      });

      card.addEventListener('mouseleave', function () {
        inner.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  /* ---------- Section 04: Pre-Sale — countdown timer ---------- */
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;

    var target = new Date('2026-12-31T23:59:59Z').getTime();

    var daysEl = el.querySelector('[data-cd="days"]');
    var hoursEl = el.querySelector('[data-cd="hours"]');
    var minsEl = el.querySelector('[data-cd="mins"]');
    var secsEl = el.querySelector('[data-cd="secs"]');

    var pad = function (n) { return String(n).padStart(2, '0'); };

    var tick = function () {
      var diff = Math.max(0, target - Date.now());
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);

      daysEl.textContent = days;
      hoursEl.textContent = pad(hours);
      minsEl.textContent = pad(mins);
      secsEl.textContent = pad(secs);
    };

    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Section 04: Pre-Sale — scarcity bar ---------- */
  function initScarcityBar() {
    var fill = document.getElementById('scarcityFill');
    if (!fill) return;

    var progress = parseFloat(fill.getAttribute('data-progress'), 10) || 0;

    var run = function () {
      if (hasGSAP) {
        gsap.to(fill, { width: progress + '%', duration: 1.2, ease: 'power2.out' });
      } else {
        fill.style.width = progress + '%';
      }
    };

    if (hasGSAP && window.ScrollTrigger) {
      ScrollTrigger.create({ trigger: fill, start: 'top 90%', once: true, onEnter: run });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { run(); io.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      io.observe(fill);
    }
  }

  /* ---------- Section 05: News & Events — category filter ---------- */
  function initNewsFilter() {
    var buttons = document.querySelectorAll('.news-filter-btn');
    var cards = document.querySelectorAll('.news-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ---------- The Vessel — clickable hotspots on the photo ---------- */
  function initVesselHotspots() {
    var media = document.getElementById('vesselMedia');
    var tooltip = document.getElementById('vesselTooltip');
    if (!media || !tooltip) return;

    var titleEl = document.getElementById('vesselTooltipTitle');
    var descEl = document.getElementById('vesselTooltipDesc');
    var hotspots = media.querySelectorAll('.vessel-hotspot');
    var active = null;

    var positionTooltip = function (hotspot) {
      var mediaRect = media.getBoundingClientRect();
      var hotRect = hotspot.getBoundingClientRect();
      var top = hotRect.bottom - mediaRect.top + 10;
      var left = hotRect.left - mediaRect.left;

      var maxLeft = mediaRect.width - 210 - 12;
      left = Math.max(12, Math.min(left, maxLeft));

      if (top + 130 > mediaRect.height) {
        top = hotRect.top - mediaRect.top - 140;
      }

      tooltip.style.top = top + 'px';
      tooltip.style.left = left + 'px';
    };

    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener('click', function (e) {
        e.stopPropagation();

        if (active === hotspot) {
          hotspot.classList.remove('is-active');
          tooltip.hidden = true;
          active = null;
          return;
        }

        hotspots.forEach(function (h) { h.classList.remove('is-active'); });
        hotspot.classList.add('is-active');
        active = hotspot;

        titleEl.textContent = hotspot.getAttribute('data-title');
        descEl.textContent = hotspot.getAttribute('data-desc');
        positionTooltip(hotspot);
        tooltip.hidden = false;
      });
    });

    document.addEventListener('click', function (e) {
      if (active && !media.contains(e.target)) {
        active.classList.remove('is-active');
        tooltip.hidden = true;
        active = null;
      }
    });
  }

  /* ---------- The Vessel — subtle 3D tilt on mouse move ---------- */
  function initVesselTilt() {
    if (!canHover || !hasGSAP) return;

    var media = document.getElementById('vesselMedia');
    var img = media && media.querySelector('img');
    if (!media || !img) return;

    media.addEventListener('mousemove', function (e) {
      var rect = media.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        rotateY: px * 8,
        rotateX: -py * 8,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    media.addEventListener('mouseleave', function () {
      gsap.to(img, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    });
  }
})();
