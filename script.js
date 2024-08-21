'use strict';

const header = document.querySelector('.header');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const panelNav = document.querySelector('.nav');
const panelNavHeight = panelNav.getBoundingClientRect().height;
const panelNavLinks = document.querySelector('.nav__links');
const section1 = document.querySelector('#section--1');
const navLogo = document.querySelector('.nav__logo');
const navText = document.querySelector('.nav__text');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const btnTabs = document.querySelectorAll('.operations__tab');
const allSection = document.querySelectorAll('.section');

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

// COOKIE

if (localStorage.getItem('buttonClicked') !== 'true') {
  const cookie = document.createElement('div');
  cookie.classList.add('cookie-message');
  cookie.innerHTML = `<p>Мы используем на этом сайте cookie для улучшения функциональности.</p> <button class='btn btn--cookie'>Ок!</button>`;
  header.append(cookie);

  document.querySelector('.btn--cookie').addEventListener('click', function () {
    localStorage.setItem('buttonClicked', 'true');
    cookie.remove();
  });
}

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

// TABS

tabContainer.addEventListener('click', function (e) {
  const tab = e.target.closest('.operations__tab');
  if (!tab) return;
  Array.from(tabContainer.children).forEach(el =>
    el.classList.remove('operations__tab--active')
  );
  tab.classList.add('operations__tab--active');
  Array.from(tabContent).forEach(el =>
    el.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// STICKY NAVIGATION

const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) panelNav.classList.add('sticky');
  else panelNav.classList.remove('sticky');
};

const stickyNavObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${panelNavHeight - 5}px`,
});

stickyNavObserver.observe(header);

// SURFACING SECTIONS

const getSurfacing = function (entries, observe) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const surfacingObserver = new IntersectionObserver(getSurfacing, {
  root: null,
  threshold: 0.13,
});

allSection.forEach(function (section) {
  surfacingObserver.observe(section);
  section.classList.add('section--hidden');
});
