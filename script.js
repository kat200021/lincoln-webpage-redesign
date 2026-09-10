(function () {
  'use strict';

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Mobile dropdown toggles
    nav.querySelectorAll('.nav__dropdown-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (window.innerWidth >= 992) return;
        e.preventDefault();
        const parent = btn.closest('.nav__dropdown');
        const isOpen = parent.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

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

    // Pause on hover (desktop)
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
      hero.addEventListener('mouseleave', resetAutoplay);
    }
  }

  // Header shadow + back to top
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
})();
