// ===============================
// HERO VIDEO DEFERIDO
// ===============================

function initDeferredHeroVideo() {
  const heroVideo = document.querySelector('.hero-video video');

  if (!heroVideo) {
    return;
  }

  const source = heroVideo.querySelector('source[data-src]');
  if (!source || !source.dataset.src) {
    return;
  }

  const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveDataEnabled = Boolean(connection && connection.saveData);
  const isSlowConnection = Boolean(
    connection &&
    typeof connection.effectiveType === 'string' &&
    /(^2g$|^slow-2g$|^3g$)/.test(connection.effectiveType)
  );

  if (isMobileViewport || saveDataEnabled || isSlowConnection) {
    return;
  }

  const loadAndPlayVideo = () => {
    source.src = source.dataset.src;
    source.removeAttribute('data-src');
    heroVideo.load();

    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Em navegadores que bloqueiam autoplay, mantém apenas o poster.
      });
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAndPlayVideo, { timeout: 1500 });
  } else {
    window.setTimeout(loadAndPlayVideo, 800);
  }
}

initDeferredHeroVideo();

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

  function onPointerDown(event) {
    isDragging = true;
    startX = event.clientX;
    startPosition = position;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - startX;
    position = startPosition + deltaX;
    normalizePosition();
    applyTransform();
  }

  function stopDragging(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    viewport.classList.remove('is-dragging');

    if (event) {
      viewport.releasePointerCapture(event.pointerId);
    }
  }

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', stopDragging);
  viewport.addEventListener('pointercancel', stopDragging);
  viewport.addEventListener('pointerleave', stopDragging);

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
