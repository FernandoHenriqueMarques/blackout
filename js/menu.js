// ===============================
// MENU SANDUÍCHE
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
const menuClose = menu ? menu.querySelector('.menu-close') : null;
const menuLinks = menu ? menu.querySelectorAll('a') : [];
const mobileQuery = window.matchMedia('(max-width: 767px)');

let menuOpen = false;
let scrollPosition = 0;

function isMobile() {
  return mobileQuery.matches;
}

function openMenu() {
  if (!menu || !isMobile()) return;

  scrollPosition = window.scrollY || window.pageYOffset || 0;
  menu.style.display = 'flex';
  document.body.classList.add('menu-open');
  document.body.style.top = `-${scrollPosition}px`;
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'true');
  }
  menuOpen = true;
}

function closeMenu() {
  if (!menu) return;

  menu.style.display = 'none';
  document.body.classList.remove('menu-open');
  document.body.style.top = '';
  window.scrollTo(0, scrollPosition);
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuOpen = false;
}

function syncMenuState() {
  if (!menu) return;

  if (isMobile()) {
    if (!menuOpen) {
      menu.style.display = 'none';
    }
    return;
  }

  menu.style.display = '';
  document.body.classList.remove('menu-open');
  document.body.style.top = '';
  if (menuOpen) {
    window.scrollTo(0, scrollPosition);
  }
  menuOpen = false;
}

// Toggle botão
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (!isMobile()) return;
    menuOpen ? closeMenu() : openMenu();
  });
}

if (menuClose) {
  menuClose.addEventListener('click', () => {
    closeMenu();
  });
}

// Fecha menu ao clicar em um item
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!isMobile()) return;
    closeMenu();
  });
});

// Fecha menu ao clicar fora (segurança UX)
if (menu) {
  menu.addEventListener('click', (event) => {
    if (!isMobile()) return;
    if (event.target === menu) {
      closeMenu();
    }
  });
}

if (mobileQuery.addEventListener) {
  mobileQuery.addEventListener('change', syncMenuState);
} else {
  mobileQuery.addListener(syncMenuState);
}

syncMenuState();
