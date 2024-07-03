let navigationMain = document.querySelector('.header__navigation');
let navigationButton = document.querySelector('.header__navigation-button');

navigationMain.classList.remove('header__navigation--nojs');

navigationButton.addEventListener('click', function () {
  if (navigationMain.classList.contains('header__navigation--closed')) {
    navigationMain.classList.remove('header__navigation--closed');
    navigationMain.classList.add('header__navigation--opened');
  } else {
  navigationMain.classList.add('header__navigation--closed');
  navigationMain.classList.remove('header__navigation--opened');
  }
})
