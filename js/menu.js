// ===============================
// MENU SANDUÍCHE
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
const menuLinks = menu.querySelectorAll('a');

let menuOpen = false;

function openMenu() {
  menu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  menuOpen = true;
  menuToggle.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  menu.style.display = 'none';
  document.body.style.overflow = '';
  menuOpen = false;
  menuToggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}

// Toggle botão
menuToggle.addEventListener('click', () => {
  menuOpen ? closeMenu() : openMenu();
});

// Fecha menu ao clicar em um item
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Fecha menu ao clicar fora (segurança UX)
menu.addEventListener('click', (event) => {
  if (event.target === menu) {
    closeMenu();
  }
});
