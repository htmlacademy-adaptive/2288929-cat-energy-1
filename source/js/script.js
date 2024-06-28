navigationMain.classList.remove('header-index__navigation--nojs');
let navigationMain = document.querySelector('.header-index__navigation');
let navigationButton = document.querySelector('.header-index__navigation-button');

navigationButton.addEventListener('click', function () {
  if (navigationMain.classList.contains('header-index__navigation--closed')) {
    navigationMain.classList.remove('header-index__navigation--closed');
    navigationMain.classList.add('header-index__navigation--opened');
  } else {
  navigationMain.classList.add('header-index__navigation--closed');
  navigationMain.classList.remove('header-index__navigation--opened');
  }
})
