// ===============================
// CARROSSEIS CONTÍNUOS
// ===============================

function initInfiniteCarousel({ viewportSelector, trackSelector, speed }) {
  const viewport = document.querySelector(viewportSelector);
  const track = document.querySelector(trackSelector);

  if (!viewport || !track) {
    return;
  }

  track.innerHTML += track.innerHTML;

  let position = 0;

  function animateCarousel() {
    position -= speed;

    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateCarousel);
  }

  animateCarousel();
}

initInfiniteCarousel({
  viewportSelector: '.clientes-carousel',
  trackSelector: '.clientes-carousel-track',
  speed: 1.2
});

initInfiniteCarousel({
  viewportSelector: '.depoimentos-carousel',
  trackSelector: '.depoimentos-lista',
  speed: 0.45
});

// ===============================
// WHATSAPP FLUTUANTE
// ===============================

const whatsappButton = document.querySelector('.whatsapp-float');

if (whatsappButton) {
  whatsappButton.addEventListener('click', () => {
    const phone = '5585999999999'; // atualizar número
    const message = encodeURIComponent('Olá, vim pelo site da Blackout.');
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank');
  });
}
