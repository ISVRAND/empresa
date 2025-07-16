
// Inicializa carrusel de Proyectos
// carousel.js
document.addEventListener('DOMContentLoaded', () => {
  // Comprueba que Swiper ya esté cargado
  if (typeof Swiper === 'undefined') {
    console.error('Swiper no está definido. Debes cargar primero swiper-bundle.min.js');
    return;
  }

  // Inicializa el carrusel sobre .swiper-container dentro de tu sección de Proyectos
  new Swiper('.proyectos-carousel .swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.proyectos-carousel .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.proyectos-carousel .swiper-button-next',
      prevEl: '.proyectos-carousel .swiper-button-prev',
    },
    breakpoints: {
      640:  { slidesPerView: 1 },
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});