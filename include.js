// Loads header.html / footer.html into every page and highlights the current nav link.
// Requires a local server (python3 -m http.server) — fetch() won't work on file:// URLs.
(async function () {
  const root = new URL('./', document.currentScript.src);
  const [headerHTML, footerHTML] = await Promise.all([
    fetch(new URL('header.html', root)).then((r) => r.text()),
    fetch(new URL('footer.html', root)).then((r) => r.text())
  ]);

  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if (headerMount) headerMount.innerHTML = headerHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;

  // Resolve relative href/src against the site root (where this script lives),
  // so logos and links work from /, /services/, /team/, /patients/, etc.
  function rebase(el, attr) {
    const val = el.getAttribute(attr);
    if (!val || /^(https?:|tel:|mailto:|#|data:|\/\/|\/)/i.test(val)) return;
    el.setAttribute(attr, new URL(val, root).href);
  }

  document.querySelectorAll('#site-header [href], #site-footer [href]').forEach((el) => rebase(el, 'href'));
  document.querySelectorAll('#site-header [src], #site-footer [src]').forEach((el) => rebase(el, 'src'));

  const current = document.body.dataset.page;
  if (current) {
    const link = document.querySelector(`#site-header [data-page="${current}"]`);
    if (link) {
      link.classList.add('nav__link--active', 'nav__submenu-link--active');
      const parentToggle = link.closest('.nav__dropdown')?.querySelector('.nav__dropdown-toggle');
      if (parentToggle) parentToggle.classList.add('nav__link--active');
    }
  }

  document.dispatchEvent(new CustomEvent('includes:loaded'));
})();
