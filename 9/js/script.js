let navigationMain = document.querySelector('.header__navigation');
let navigationButton = document.querySelector('.header__navigation-button');
let locationGoogleMap = document.querySelector('.location__map--nojs');

navigationMain.classList.remove('header__navigation--nojs');
locationGoogleMap.classList.remove('location__map--nojs');

navigationButton.addEventListener('click', function () {
  if (navigationMain.classList.contains('header__navigation--closed')) {
    navigationMain.classList.remove('header__navigation--closed');
    navigationMain.classList.add('header__navigation--opened');
  } else {
  navigationMain.classList.add('header__navigation--closed');
  navigationMain.classList.remove('header__navigation--opened');
  }
})
