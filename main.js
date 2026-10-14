/* Mobile menu for the YBSL homepage. */
(function () {
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (!burger || !menu) { return; }

  function setOpen(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setOpen(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setOpen(false); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); }
  });
})();

/* Fade sections in as they scroll into view. Everything shows straight away
   if the browser cannot observe scrolling or the visitor prefers less motion. */
(function () {
  var items = document.querySelectorAll('.rev:not(.in), .bar-row:not(.in)');
  if (!items.length) { return; }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });
})();
