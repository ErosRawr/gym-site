// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// FACILITIES REVEAL
const facilityItems = document.querySelectorAll('.facility-item');

function revealFacilities() {
  facilityItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (top < windowHeight - 100) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealFacilities);
revealFacilities();

// NAV SCROLL BEHAVIOR
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// MOBILE MENU
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const body = document.body;

function openMobileMenu() {
  mobileMenu.classList.add('active');
  body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  body.style.overflow = '';
}

menuToggle.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// SERVICES SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoAdvanceTimer;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startAutoAdvance() {
  stopAutoAdvance();
  autoAdvanceTimer = setInterval(nextSlide, 8000);
}

function stopAutoAdvance() {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer);
  }
}

// Dot click handlers
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
    stopAutoAdvance();
    startAutoAdvance();
  });
});

// Start auto-advance
startAutoAdvance();

// Pause on user interaction
const sliderContainer = document.querySelector('.services-slider');
sliderContainer.addEventListener('mouseenter', stopAutoAdvance);
sliderContainer.addEventListener('mouseleave', startAutoAdvance);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  stopAutoAdvance();
}, { passive: true });

sliderContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  startAutoAdvance();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left
      nextSlide();
    } else {
      // Swiped right
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  }
}

// SMOOTH SCROLL
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const navHeight = nav.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// CTA HANDLER
function handleCTA() {
  alert('Contact information:\nPhone: (555) 123-4567\nEmail: info@paolofit.com\n\nVisit us at 123 Main Street, Austin, TX 78701');
}

// KEYBOARD NAVIGATION
document.querySelectorAll('a, button').forEach(el => {
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '0');
  }
});

// CONSOLE MESSAGE
console.log('%c🏋️ PaoloFit', 'font-size: 20px; font-weight: bold; color: #8b1e1e;');
console.log('%cModern gym site built with clean, maintainable code.', 'font-size: 14px; color: #6b6b68;');