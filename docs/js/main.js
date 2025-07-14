document.addEventListener("DOMContentLoaded", function () {
  // Botón de modo oscuro
  const modoBtn = document.getElementById("modo-btn");
  if (modoBtn) {
    modoBtn.addEventListener("click", function () {
      document.body.classList.toggle("modo-oscuro");
      const icon = modoBtn.querySelector("i");
      const span = modoBtn.querySelector("span");
      if (document.body.classList.contains("modo-oscuro")) {
        icon.classList.replace("fa-sun", "fa-moon");
        span.textContent = "Oscuro";
      } else {
        icon.classList.replace("fa-moon", "fa-sun");
        span.textContent = "Claro";
      }
    });
  }

  // Menú hamburguesa
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("activo");
    });
  }

  // Carrusel
  const prev = document.querySelector(".carrusel-prev");
  const next = document.querySelector(".carrusel-next");
  const track = document.querySelector(".carrusel-track");

  if (track && prev && next) {
    let index = 0;
    const total = track.children.length;

    next.addEventListener("click", () => {
      if (index < total - 1) index++;
      track.style.transform = `translateX(-${index * 100}%)`;
    });

    prev.addEventListener("click", () => {
      if (index > 0) index--;
      track.style.transform = `translateX(-${index * 100}%)`;
    });
  }

  // Pestañas (servicios-categorias)
  window.showTab = function (index) {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content .content");
    tabs.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
      contents[i]?.classList.toggle("active", i === index);
    });
  };
});
