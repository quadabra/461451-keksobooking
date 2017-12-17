'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters-container');

  var makeFragment = function (arr, templates) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(templates(arr[i]));
    }
    return fragment;
  };

  var renderMapPins = function () {
    mapPins.appendChild(makeFragment(window.generatedHotels, window.pins.render));
  };

  var renderMapCards = function () {
    mapBlock.insertBefore(makeFragment(window.generatedHotels, window.cards.render), mapFilters);
  };

  myPin.addEventListener('mousedown', window.pins.move);

  var onMapClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('popup__close')) {
      window.cards.popupClose(evt);
    } else {
      window.pins.pinSwitch(evt);
      window.cards.popupSwitch();
    }
  };

  var onPinSet = function () {
    renderMapPins();
    renderMapCards();
    window.form.enable();
    mapBlock.classList.remove('map--faded');
    mapBlock.addEventListener('click', onMapClick);
    document.addEventListener('keydown', window.cards.popupEsc);
    myPin.removeEventListener('mouseup', onPinSet);
  };

  myPin.addEventListener('mouseup', onPinSet);

})();
