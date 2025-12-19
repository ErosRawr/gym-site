// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
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

// ============================================
// FACILITIES REVEAL
// ============================================
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

// ============================================
// NAV SCROLL BEHAVIOR
// ============================================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ============================================
// MOBILE MENU
// ============================================
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

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    closeMobileMenu();
  }
});

// ============================================
// SERVICES SLIDER
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoAdvanceTimer;
let isUserInteracting = false;

function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoAdvance() {
  stopAutoAdvance();
  if (!isUserInteracting) {
    autoAdvanceTimer = setInterval(nextSlide, 8000);
  }
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
    isUserInteracting = true;
    stopAutoAdvance();
    // Resume auto-advance after 3 seconds
    setTimeout(() => {
      isUserInteracting = false;
      startAutoAdvance();
    }, 3000);
  });
});

// Start auto-advance on page load
startAutoAdvance();

// Pause on hover (desktop)
const sliderContainer = document.querySelector('.services-slider');
sliderContainer.addEventListener('mouseenter', () => {
  isUserInteracting = true;
  stopAutoAdvance();
});

sliderContainer.addEventListener('mouseleave', () => {
  isUserInteracting = false;
  startAutoAdvance();
});

// ============================================
// TOUCH/SWIPE SUPPORT FOR MOBILE
// ============================================
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

sliderContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  isUserInteracting = true;
  stopAutoAdvance();
}, { passive: true });

sliderContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  // Resume auto-advance after 3 seconds
  setTimeout(() => {
    isUserInteracting = false;
    startAutoAdvance();
  }, 3000);
}, { passive: true });

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - go to next slide
      nextSlide();
    } else {
      // Swiped right - go to previous slide
      prevSlide();
    }
  }
}

// ============================================
// SMOOTH SCROLL TO SECTION
// ============================================
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

// Handle smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }
  });
});

// ============================================
// CTA HANDLER
// ============================================
function handleCTA(planName) {
  alert(`Thank you for your interest in the ${planName}!\n\nContact us:\nPhone: (555) 123-4567\nEmail: info@alldayfitness.com\n\nVisit us at:\n123 Main Street\nAustin, TX 78701\n\nOpen 24/7`);
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.querySelectorAll('a, button').forEach(el => {
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '0');
  }
});

// Allow Enter key to trigger dot clicks
dots.forEach(dot => {
  dot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dot.click();
    }
  });
});

// Arrow key navigation for slider
document.addEventListener('keydown', (e) => {
  const sliderVisible = sliderContainer.getBoundingClientRect().top < window.innerHeight &&
                        sliderContainer.getBoundingClientRect().bottom > 0;
  
  if (sliderVisible) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      isUserInteracting = true;
      stopAutoAdvance();
      setTimeout(() => {
        isUserInteracting = false;
        startAutoAdvance();
      }, 3000);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      isUserInteracting = true;
      stopAutoAdvance();
      setTimeout(() => {
        isUserInteracting = false;
        startAutoAdvance();
      }, 3000);
    }
  }
});

// ============================================
// PAGE VISIBILITY API - PAUSE SLIDER WHEN TAB HIDDEN
// ============================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoAdvance();
  } else {
    if (!isUserInteracting) {
      startAutoAdvance();
    }
  }
});

// ============================================
// LAZY LOADING ENHANCEMENT
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🏋️ All-Day Fitness', 'font-size: 20px; font-weight: bold; color: #8b1e1e;');
console.log('%cModern gym website built with clean, production-quality code.', 'font-size: 14px; color: #6b6b68;');
console.log('%c✓ Mobile-first responsive design', 'font-size: 12px; color: #6b6b68;');
console.log('%c✓ Auto-advancing slider with swipe support', 'font-size: 12px; color: #6b6b68;');
console.log('%c✓ Smooth animations and transitions', 'font-size: 12px; color: #6b6b68;');
console.log('%c✓ Accessibility features included', 'font-size: 12px; color: #6b6b68;');