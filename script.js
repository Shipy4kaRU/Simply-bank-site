'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const panelNav = document.querySelector('.nav');
const panelNavLinks = document.querySelector('.nav__links');
const section1 = document.querySelector('#section--1');
const navLogo = document.querySelector('.nav__logo');
const navText = document.querySelector('.nav__text');

// SCROLL TO

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

panelNavLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link'))
    document.querySelector(`#${href}`).scrollIntoView({ behavior: 'smooth' });
});

// DARKENING NAV PANEL LINKS

const hoverNavLinks = function (e) {
  const link = e.target;
  console.log(e.target);
  console.log(e.currentTarget);
  if (link.classList.contains('nav__link')) {
    const siblings = Array.from(
      link.closest('.nav__links').querySelectorAll('.nav__link')
    );
    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    navLogo.style.opacity = this;
    navText.style.opacity = this;
  }
};

panelNav.addEventListener('mouseover', hoverNavLinks.bind('0.7'));

panelNav.addEventListener('mouseout', hoverNavLinks.bind('1'));

// MODAL WINDOW

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);
btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});
