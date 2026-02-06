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
  let isDragging = false;
  let startX = 0;
  let startPosition = 0;

  function normalizePosition() {
    const loopWidth = track.scrollWidth / 2;

    if (!loopWidth) {
      return;
    }

    while (position <= -loopWidth) {
      position += loopWidth;
    }

    while (position > 0) {
      position -= loopWidth;
    }
  }

  function applyTransform() {
    track.style.transform = `translateX(${position}px)`;
  }

  function animateCarousel() {
    if (!isDragging) {
      position -= speed;
      normalizePosition();
      applyTransform();
    }

    requestAnimationFrame(animateCarousel);
  }

  function startDragging(clientX) {
    isDragging = true;
    startX = clientX;
    startPosition = position;
    viewport.classList.add('is-dragging');
  }

  function dragTo(clientX) {
    if (!isDragging) {
      return;
    }

    const deltaX = clientX - startX;
    position = startPosition + deltaX;
    normalizePosition();
    applyTransform();
  }

  function stopDragging() {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    viewport.classList.remove('is-dragging');
  }

  function onPointerDown(event) {
    startDragging(event.clientX);

    if (viewport.setPointerCapture) {
      viewport.setPointerCapture(event.pointerId);
    }
  }

  function onPointerMove(event) {
    dragTo(event.clientX);
  }

  function onPointerUp(event) {
    stopDragging();

    if (viewport.releasePointerCapture) {
      viewport.releasePointerCapture(event.pointerId);
    }
  }

  function onTouchStart(event) {
    const firstTouch = event.touches[0];

    if (!firstTouch) {
      return;
    }

    startDragging(firstTouch.clientX);
  }

  function onTouchMove(event) {
    const firstTouch = event.touches[0];

    if (!firstTouch) {
      return;
    }

    dragTo(firstTouch.clientX);

    if (isDragging) {
      event.preventDefault();
    }
  }

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', stopDragging);

  viewport.addEventListener('touchstart', onTouchStart, { passive: true });
  viewport.addEventListener('touchmove', onTouchMove, { passive: false });
  viewport.addEventListener('touchend', stopDragging);
  viewport.addEventListener('touchcancel', stopDragging);

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
