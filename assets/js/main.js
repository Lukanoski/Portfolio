/* Portfolio — Interactions */
document.addEventListener('DOMContentLoaded', () => {
  /* --- Mobile Nav Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* --- Parallax Hero --- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }, { passive: true });
  }

  /* --- Back to Top --- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.pageYOffset > 600);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Lightbox with Keyboard Nav --- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  let galleryImages = [];
  let currentIndex = 0;

  function openLightbox(index) {
    if (index < 0 || index >= galleryImages.length) return;
    currentIndex = index;
    const img = galleryImages[index];
    let src = img.src;
    if (src.includes('-thumbnail.')) {
      src = src.replace('-thumbnail.', '.');
    }
    lightboxImg.src = src;
    lightboxCaption.textContent = img.dataset.caption || '';
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function navLightbox(direction) {
    const next = currentIndex + direction;
    if (next >= 0 && next < galleryImages.length) {
      openLightbox(next);
    }
  }

  // Collect all gallery images on this page
  document.querySelectorAll('.gallery-image').forEach(img => {
    galleryImages.push(img);
    img.addEventListener('click', () => {
      const idx = galleryImages.indexOf(img);
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

  /* --- Blur-up Image Loading --- */
  document.querySelectorAll('.img-container').forEach(container => {
    const placeholder = container.querySelector('.blur-placeholder');
    const fullImg = container.querySelector('img:not(.blur-placeholder)');

    if (placeholder && fullImg) {
      const fullSrc = fullImg.src;
      if (fullSrc.includes('-thumbnail.')) {
        fullImg.src = fullSrc.replace('-thumbnail.', '.');
      }

      const loader = new Image();
      loader.onload = () => {
        fullImg.src = loader.src;
        fullImg.onload = () => {
          placeholder.classList.add('loaded');
        };
      };
      loader.src = fullImg.src;
    }
  });

  /* --- Scroll Fade-in Animations --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
