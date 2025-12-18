const button = document.querySelector("button");

button.addEventListener("click", () => {
  alert("Coming soon 🚀");
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const serviceButtons = document.querySelectorAll("[data-service]");
const services = document.querySelectorAll(".service");

serviceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    services.forEach(s => s.classList.remove("active"));

    const target = btn.dataset.service;
    document.querySelector(`.${target}`).classList.add("active");
  });
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const buttons = document.querySelectorAll(".services-buttons button");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    services.forEach(s => s.classList.remove("active"));

    const target = btn.dataset.service;
    document.querySelector(`.${target}`).classList.add("active");
  });

  
});

