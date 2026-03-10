/* ═══════════════════════════════════════════════
   main.js — Portfolio Bocar Mamoudou DIACK
═══════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────
     LOADER
  ────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1500);
    });
  }

  /* ──────────────────────────────
     YEAR
  ────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────────
     CUSTOM CURSOR
  ────────────────────────────── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (cursor && follower) {
    let fx = 0, fy = 0;
    let cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    });

    const animateFollower = () => {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Cursor grow on interactive elements
    const interactives = document.querySelectorAll('a, button, .filter-btn, .project-card, .service-card, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width    = '16px';
        cursor.style.height   = '16px';
        follower.style.width  = '50px';
        follower.style.height = '50px';
        follower.style.borderColor = 'var(--gold-light)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width    = '8px';
        cursor.style.height   = '8px';
        follower.style.width  = '32px';
        follower.style.height = '32px';
        follower.style.borderColor = 'var(--gold)';
      });
    });
  }

  /* ──────────────────────────────
     HEADER SCROLL
  ────────────────────────────── */
  const header = document.getElementById('header');
  if (header) {
    const handleScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ──────────────────────────────
     ACTIVE NAV LINK
  ────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => observerNav.observe(s));

  /* ──────────────────────────────
     BURGER / MOBILE NAV
  ────────────────────────────── */
  const burger  = document.getElementById('burger');
  const navbar  = document.getElementById('navbar');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const toggleNav = (open) => {
    burger?.classList.toggle('open', open);
    navbar?.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    burger?.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger?.addEventListener('click', () => toggleNav(!navbar?.classList.contains('open')));
  overlay.addEventListener('click', () => toggleNav(false));

  navbar?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleNav(false));
  });

  /* ──────────────────────────────
     SCROLL REVEAL
  ────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Also reveal section-header for underline animation
  document.querySelectorAll('.section-header').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
  });

  /* ──────────────────────────────
     COUNTER ANIMATION
  ────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1800;
      const step   = target / (duration / 16);
      let current  = 0;
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ──────────────────────────────
     SKILL BARS ANIMATION
  ────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ──────────────────────────────
     PORTFOLIO FILTER
  ────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          card.classList.remove('hidden');
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });

  /* ──────────────────────────────
     SERVICE CARD MOUSE GLOW
  ────────────────────────────── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mouse-x', x);
      card.style.setProperty('--mouse-y', y);
    });
  });

  /* ──────────────────────────────
     CONTACT FORM
  ────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = '✓ Message envoyé !';
      btn.style.background = '#2d7a4f';
      btn.disabled = true;
      form.classList.add('form-success');

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        form.classList.remove('form-success');
        form.reset();
      }, 3500);
    });
  }

  /* ──────────────────────────────
     SMOOTH SCROLL FOR ANCHOR LINKS
  ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
