(function () {
  'use strict';

  function bindSharedChrome() {
    // Mobile menu (header is injected by include.js)
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav--open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      nav.querySelectorAll('.nav__dropdown-toggle').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          if (window.innerWidth >= 992) return;
          e.preventDefault();
          const parent = btn.closest('.nav__dropdown');
          const isOpen = parent.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', isOpen);
        });
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 992 && nav.classList.contains('nav--open')) {
          nav.classList.remove('nav--open');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    function updateScrollUI() {
      const y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 10
          ? '0 4px 20px rgba(29, 75, 65, 0.12)'
          : 'none';
      }
      if (backToTop) {
        backToTop.classList.toggle('is-visible', y > 400);
      }
    }

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  document.addEventListener('includes:loaded', bindSharedChrome);

  // Hero carousel
  const slides = document.querySelectorAll('.hero__slide');
  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  const heroIndex = document.getElementById('heroIndex');
  let currentSlide = 0;
  let autoplayTimer;
  let restartHero = function () {};

  if (slides.length && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero__dot' + (i === 0 ? ' hero__dot--active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.hero__dot');

    function goToSlide(index) {
      slides[currentSlide].classList.remove('hero__slide--active');
      dots[currentSlide].classList.remove('hero__dot--active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('hero__slide--active');
      dots[currentSlide].classList.add('hero__dot--active');
      if (heroIndex) {
        const n = String(currentSlide + 1).padStart(2, '0');
        heroIndex.innerHTML = n + ' <em>/ 05</em>';
      }
      resetAutoplay();
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(nextSlide, 6000);
    }
    restartHero = resetAutoplay;

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    resetAutoplay();

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
      hero.addEventListener('mouseleave', resetAutoplay);
    }
  }

  // Office video lightbox
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const videoSrc = 'https://player.vimeo.com/video/301474700?autoplay=1&title=0&byline=0&portrait=0';

  function openVideo() {
    if (!videoModal || !videoFrame) return;
    videoFrame.src = videoSrc;
    videoModal.hidden = false;
    document.body.style.overflow = 'hidden';
    clearInterval(autoplayTimer);
  }

  function closeVideo() {
    if (!videoModal || !videoFrame) return;
    videoModal.hidden = true;
    videoFrame.src = '';
    document.body.style.overflow = '';
    restartHero();
  }

  document.querySelectorAll('.js-open-video').forEach((el) => {
    el.addEventListener('click', openVideo);
  });
  document.querySelectorAll('[data-close-video]').forEach((el) => {
    el.addEventListener('click', closeVideo);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && !videoModal.hidden) closeVideo();
  });

  // Smooth in-page anchor scrolling (respects sticky header offset)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const headerOffset =
        (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--utility-bar-height'), 10) || 0) +
        (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 0) +
        16;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  // Subtle scroll-reveal for interior content sections
  const revealRoots = document.querySelectorAll('.content-block__body, .content-block__sidebar');
  if (revealRoots.length && 'IntersectionObserver' in window) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = [];

    revealRoots.forEach((root) => {
      if (root.classList.contains('content-block__body')) {
        root.querySelectorAll(':scope > h2, :scope > p, :scope > ul').forEach((el) => targets.push(el));
      } else {
        root.querySelectorAll('.info-card').forEach((el) => targets.push(el));
      }
    });

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add('reveal', 'is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 0.04, 0.28) + 's';
        observer.observe(el);
      });
    }
  }
})();
