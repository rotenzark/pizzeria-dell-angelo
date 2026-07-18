/* Pizzeria dell'Angelo — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate). Pizzeria storica: orario
   spezzato pranzo/cena, lunedì chiuso. GSAP SUBITO; reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'pizzeria-dell-angelo',
    hours: {
      0: [['12:00', '15:00'], ['19:00', '23:00']],
      1: [],
      2: [['12:00', '15:00'], ['19:00', '23:00']],
      3: [['12:00', '15:00'], ['19:00', '23:00']],
      4: [['12:00', '15:00'], ['19:00', '23:00']],
      5: [['12:00', '15:00'], ['19:00', '23:00']],
      6: [['12:00', '15:00'], ['19:00', '23:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.trancio': 'The slice', 'nav.locale': 'The place', 'nav.gallery': 'Photos', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '653 reviews',
      'hero.kicker': 'Pizza by the slice, since 1960',
      'hero.sub': 'The Milanese slice, <strong>crisp and soft at once</strong>, regular or large, in an honest place that stayed <strong>just as it was</strong>. In Corso Vercelli — for many, the best in Milan.',
      'hero.cta1': 'Call: 02 4800 5367', 'hero.cta2': 'The slice',
      'tk.1': 'pizza by the slice', 'tk.2': 'regular or large', 'tk.3': 'since 1960', 'tk.4': 'farinata & castagnaccio', 'tk.5': 'tripe & goulash', 'tk.6': 'like the old days',
      'tk.1b': 'pizza by the slice', 'tk.2b': 'regular or large', 'tk.3b': 'since 1960', 'tk.4b': 'farinata & castagnaccio', 'tk.5b': 'tripe & goulash', 'tk.6b': 'like the old days',
      'tr.kicker': 'The slice', 'tr.t1': 'Crisp', 'tr.t2': 'and soft',
      'tr.p1': 'The classic <strong>Milanese pizza by the slice</strong>: crisp outside and soft inside, with a really good tomato and a generous filling. Choose it <strong>regular or large</strong> and top it with ingredients from the menu hung by the door.',
      'tr.p2': 'Indulgent, satisfying slices, like the old days. «The best in Milan», say the regulars who’ve come for years.',
      'loc.kicker': 'The place', 'loc.t1': 'Stuck in', 'loc.t2': 'the ’80s',
      'loc.p1': 'A place <strong>stuck in time</strong> — and thank goodness. An honest, no-frills setting with all the genuineness of places from the old days: here it’s about <em>substance</em>, not appearance. A step back in time.',
      'loc.p2': 'And beyond pizza, the dishes that surprise: <strong>farinata, castagnaccio, tripe and goulash</strong>. Home cooking, served with a smile.',
      'gal.kicker': 'Photos', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 653 reviews',
      'rec.r1': '«An honest place open for decades, specialising in the classic Milanese pizza by the slice. The ’80s vibe is truly unique: it feels like a step back in time.»',
      'rec.r2': '«Indulgent, satisfying slices, crisp and soft at once. Really good tomato, generous filling. A traditional Milanese place with lovely service.»',
      'rec.r3': '«Great pizza, but the goulash and tripe were a surprise! Genuine owners. If you care about substance over appearance, five well-earned stars!»',
      'rec.r4': '«Always great pizza by the slice, for me the best in Milan. I’ve come for years and never been let down: professional, courteous staff.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Belfiore,', 'dove.t2': 'Corso Vercelli',
      'dove.metro': 'Via Belfiore 7, 20145 Milan · Corso Vercelli area, steps from Piazza Piemonte',
      'dove.chiama': 'Call 02 4800 5367', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What pizza do you make?', 'faq.a1': 'The classic Milanese pizza by the slice: crisp outside and soft inside, with a good tomato and a generous filling. Choose it regular or large and top it with ingredients from the menu hung by the door.',
      'faq.q2': 'What else is there besides pizza?', 'faq.a2': 'Traditional dishes that surprise: farinata, castagnaccio, tripe and goulash. Honest, hearty cooking.',
      'faq.q3': 'How long have you been open?', 'faq.a3': 'Since 1960. An honest, no-frills place with the ’80s atmosphere customers love: «a step back in time».',
      'faq.q4': 'What are your opening hours?', 'faq.a4': 'Tuesday to Sunday 12–3pm and 7–11pm. We’re closed on Mondays.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Belfiore 7 in Milan, Corso Vercelli area, steps from Piazza Piemonte. Call 02 4800 5367.',
      'foot.dove': 'Via Belfiore 7, 20145 Milan · <a href="tel:+390248005367">02 4800 5367</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero-kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, .75);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
