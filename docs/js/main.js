const btn = document.getElementById("modo-btn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btn.innerHTML = isDark
    ? '<i class="fas fa-moon"></i> <span>Oscuro</span>'
    : '<i class="fas fa-sun"></i> <span>Claro</span>';
});

const track = document.querySelector(".carrusel-track");
const prev = document.querySelector(".carrusel-prev");
const next = document.querySelector(".carrusel-next");
let index = 0;

next.addEventListener("click", () => {
  index = (index + 1) % track.children.length;
  track.style.transform = `translateX(-${index * 100}%)`;
});

prev.addEventListener("click", () => {
  index = (index - 1 + track.children.length) % track.children.length;
  track.style.transform = `translateX(-${index * 100}%)`;
});

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

