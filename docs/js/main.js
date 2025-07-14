const btn = document.getElementById("modo-btn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btn.innerHTML = isDark
    ? '<i class="fas fa-moon"></i> <span>Oscuro</span>'
    : '<i class="fas fa-sun"></i> <span>Claro</span>';
});


const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

