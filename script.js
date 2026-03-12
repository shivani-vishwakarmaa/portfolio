/* ═══════════════════════════════════════
   SHIVANI VISHWAKARMA - PORTFOLIO JS
   ═══════════════════════════════════════ */

'use strict';

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── INTERSECTION OBSERVER: FADE UP ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Sections to observe
const fadeTargets = [
  '.about-grid',
  '.section-header',
  '.skill-card',
  '.project-card',
  '.workflow-step',
  '.contact-inner',
];
fadeTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.07}s`;
    fadeObserver.observe(el);
  });
});

/* ── SKILL BAR ANIMATION ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('#skills').forEach(el => skillObserver.observe(el));

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navAnchor = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchor.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => activeObserver.observe(s));

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Network response was not ok');

      btn.style.display = 'none';
      formSuccess.textContent = '✅ Message sent! I\'ll be in touch soon.';
      formSuccess.classList.add('show');
      contactForm.reset();
    } catch (err) {
      console.error('Form submit error:', err);
      btn.textContent = 'Send Message';
      btn.disabled = false;
      formSuccess.textContent = 'Something went wrong. Please try again.';
      formSuccess.classList.add('show');
    }
  });
}

/* ── CURSOR HIGHLIGHT ON CARDS ── */
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

/* ── TYPED EFFECT ON HERO ROLE ── */
const roleTexts = ['AI Automation Engineer', 'Agentic AI Builder', 'Workflow Architect'];
let roleIdx = 0;
const roleTags = document.querySelectorAll('.role-tag');

if (roleTags.length >= 2) {
  setInterval(() => {
    roleIdx = (roleIdx + 1) % roleTexts.length;
    roleTags[0].style.opacity = '0';
    roleTags[0].style.transform = 'translateY(-8px)';
    setTimeout(() => {
      roleTags[0].textContent = roleTexts[roleIdx];
      roleTags[0].style.transition = 'all 0.4s ease';
      roleTags[0].style.opacity = '1';
      roleTags[0].style.transform = 'translateY(0)';
    }, 300);
  }, 3500);
}

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1500) {
  let start = null;
  const num = parseInt(target);
  const suffix = target.replace(num.toString(), '');

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * num) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, el.textContent);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));
