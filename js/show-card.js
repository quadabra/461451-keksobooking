'use strict';

window.showCard = function () {
  var map = document.querySelector('.map');
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main');
  var cards = map.querySelectorAll('.map__card');
  map.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('map__pin')) {
      return;
    } else {
      for (var i = 0; i < cards.length; i++) {
        if (pins[i].classList.contains('map__pin--active')) {
          cards[i].classList.remove('hidden');
        } else if (!cards[i].classList.contains('hidden')) {
          cards[i].classList.add('hidden');
        }
      }
    }
  });
};
