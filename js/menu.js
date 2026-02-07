// ===============================
// MENU SANDUÍCHE
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
const menuLinks = menu ? menu.querySelectorAll('a') : [];
const mobileQuery = window.matchMedia('(max-width: 767px)');

let menuOpen = false;

function isMobile() {
  return mobileQuery.matches;
}

function openMenu() {
  if (!menu || !isMobile()) return;
  menu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  menuOpen = true;
}

function closeMenu() {
  if (!menu) return;
  menu.style.display = 'none';
  document.body.style.overflow = '';
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
  document.body.style.overflow = '';
  menuOpen = false;
}

// Toggle botão
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (!isMobile()) return;
    menuOpen ? closeMenu() : openMenu();
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
