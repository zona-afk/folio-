/* ── script.js ── */

// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── NAVBAR SHADOW ON SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.3)'
    : 'none';
});

// ── TYPING ANIMATION ──
const roles = ['Web Developer', 'UI/UX Designer', 'Figma Creator', 'CS Student'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedText = document.getElementById('typedText');

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedText.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
setTimeout(type, 600);

// ── FILTERABLE PROJECTS ──
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const countDisplay = document.getElementById('projectCountDisplay');

// Count per category
const categories = { all: 0, design: 0, web: 0, code: 0 };
projectCards.forEach(card => {
  const cat = card.dataset.category;
  categories[cat]++;
  categories.all++;
});
Object.keys(categories).forEach(cat => {
  const el = document.getElementById(`count-${cat}`);
  if (el) el.textContent = categories[cat];
});

function filterProjects(filter) {
  let visible = 0;
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    if (show) {
      card.classList.remove('hidden');
      card.style.position = '';
      card.style.opacity = '';
      card.style.transform = '';
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });
  countDisplay.textContent = `Showing ${visible} project${visible !== 1 ? 's' : ''}`;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProjects(btn.dataset.filter);
  });
});

filterProjects('all'); // init

// ── SKILL BAR ANIMATION (IntersectionObserver) ──
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.project-card, .skill-card, .blog-card, .contact-item'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();

  if (!name || !email || !msg) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.style.color = '#ff6ab0';
    return;
  }

  // Simulate send
  formNote.textContent = `✓ Message sent! I'll get back to you soon, ${name}.`;
  formNote.style.color = '#4cff9a';
  contactForm.reset();

  setTimeout(() => { formNote.textContent = ''; }, 5000);
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent-light)'
          : '';
        link.style.background = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent-glow)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));
