// Loads header.html / footer.html into every page and highlights the current nav link.
// Requires a local server (python3 -m http.server) — fetch() won't work on file:// URLs.
(async function () {
  const root = new URL('./', document.currentScript.src);
  const [headerHTML, footerHTML] = await Promise.all([
    fetch(new URL('header.html', root)).then(r => r.text()),
    fetch(new URL('footer.html', root)).then(r => r.text())
  ]);

  document.getElementById('site-header').innerHTML = headerHTML;
  document.getElementById('site-footer').innerHTML = footerHTML;

  const segments = location.pathname.replace(/\\/g, '/').split('/').filter(Boolean);
  const prefix = segments.length > 1 ? '../' : '';
  if (prefix) {
    document.querySelectorAll('#site-header [href], #site-footer [href]').forEach((el) => {
      const href = el.getAttribute('href');
      if (!href || /^(https?:|tel:|mailto:|#|\/)/i.test(href)) return;
      el.setAttribute('href', prefix + href);
    });
  }

  // Highlight the current page's nav link using body[data-page]
  const current = document.body.dataset.page;
  if (current) {
    const link = document.querySelector(`#site-header [data-page="${current}"]`);
    if (link) {
      link.classList.add('nav__link--active', 'nav__submenu-link--active');
      const parentToggle = link.closest('.nav__dropdown')?.querySelector('.nav__dropdown-toggle');
      if (parentToggle) parentToggle.classList.add('nav__link--active');
    }
  }

  // Let script.js know the includes are ready, in case it needs to bind
  // mobile menu / back-to-top listeners after this content exists.
  document.dispatchEvent(new CustomEvent('includes:loaded'));
})();