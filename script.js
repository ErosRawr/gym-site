// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      section.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ============================================
// NAV SCROLL BEHAVIOR
// ============================================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  // Shrink nav on scroll
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ============================================
// SECTION HIGHLIGHTING IN NAV
// ============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav li');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(li => {
    li.classList.remove('active');
    const sectionName = li.getAttribute('data-section');
    
    if (sectionName === current) {
      li.classList.add('active');
    }
  });
});

// ============================================
// SERVICE TAB SWITCHING
// ============================================
const serviceButtons = document.querySelectorAll('.services-buttons button');
const services = document.querySelectorAll('.service');
const emptyState = document.getElementById('emptyState');

serviceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and services
    serviceButtons.forEach(b => b.classList.remove('active'));
    services.forEach(s => s.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');
    
    // Show corresponding service
    const target = btn.dataset.service;
    const targetService = document.querySelector(`.service.${target}`);
    
    if (targetService) {
      targetService.classList.add('active');
      if (emptyState) emptyState.style.display = 'none';
    } else {
      // Show empty state if service doesn't exist
      if (emptyState) emptyState.style.display = 'block';
    }
  });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navUl = document.querySelector('.nav ul');

menuToggle.addEventListener('click', () => {
  if (navUl.style.display === 'flex') {
    navUl.style.display = 'none';
  } else {
    navUl.style.display = 'flex';
    navUl.style.flexDirection = 'column';
    navUl.style.position = 'absolute';
    navUl.style.top = '70px';
    navUl.style.right = '20px';
    navUl.style.background = '#0f172a';
    navUl.style.padding = '20px';
    navUl.style.borderRadius = '10px';
    navUl.style.gap = '15px';
    navUl.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
  }
});

// Close mobile menu after clicking a link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navUl.style.display = 'none';
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!nav.contains(e.target)) {
      navUl.style.display = 'none';
    }
  }
});

// ============================================
// SMOOTH SCROLL TO SECTION
// ============================================
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ============================================
// FORM SUBMISSION
// ============================================
function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Show success message
  alert('Thanks for your interest! We\'ll be in touch soon. 🚀');
  
  // Reset form
  form.reset();
  
  // Optional: Send data to backend here
  // fetch('/api/contact', { method: 'POST', body: formData })
}

// ============================================
// CTA BUTTON PULSE AFTER IDLE
// ============================================
let idleTimer;
const ctaButton = document.querySelector('.hero button');

function resetIdleTimer() {
  if (!ctaButton) return;
  
  clearTimeout(idleTimer);
  ctaButton.classList.remove('pulse-animation');
  
  idleTimer = setTimeout(() => {
    ctaButton.classList.add('pulse-animation');
  }, 5000);
}

// Reset on user activity
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('scroll', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);

// Start the timer
resetIdleTimer();

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES (if you add any)
// ============================================
// Uncomment if you add images with loading="lazy"
/*
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}
*/

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================
// Allow Enter key to trigger clicks on nav items
navItems.forEach(item => {
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      item.click();
    }
  });
});

// Allow Enter key on service buttons
serviceButtons.forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });
});

// ============================================
// ERROR HANDLING: GRACEFUL DEGRADATION
// ============================================
window.addEventListener('error', (e) => {
  console.error('Error caught:', e.message);
  // Could show a user-friendly message here
});

// ============================================
// DETECT IF JAVASCRIPT FAILED
// ============================================
// Remove no-js class if JS is working
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// ============================================
// CONSOLE MESSAGE (PORTFOLIO SIGNAL)
// ============================================
console.log('%c👋 Hey there!', 'font-size: 20px; color: #38bdf8; font-weight: bold;');
console.log('%cInterested in how this was built? Check out the clean code structure and state management.', 'font-size: 14px; color: #94a3b8;');
console.log('%c💪 Built with: Vanilla JS, CSS3, HTML5', 'font-size: 12px; color: #64748b;');