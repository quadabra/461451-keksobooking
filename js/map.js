'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var myForm = document.querySelector('.notice__form');
  var myInputs = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters-container');

  var inputDisable = true;
  var inputEnable = false;

  var renderMapPins = function () {
    mapPins.appendChild(window.make.fragment(window.generatedHotels, window.pins.render));
    window.mapPinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var renderMapCards = function () {
    mapBlock.insertBefore(window.make.fragment(window.generatedHotels, window.cards.render), mapFilters);
    window.popupCards = mapBlock.querySelectorAll('.map__card');
  };

  var myInputsSwitch = function (arr, attr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = attr;
    }
  };

  myInputsSwitch(myInputs, inputDisable);

  myPin.addEventListener('mousedown', window.pins.move);

  var onPinSet = function () {
    renderMapPins();
    renderMapCards();
    mapBlock.classList.remove('map--faded');
    myForm.classList.remove('notice__form--disabled');
    myInputsSwitch(myInputs, inputEnable);
    mapPins.addEventListener('click', window.pins.pinSwitch);
    mapBlock.addEventListener('click', window.cards.popupClose);
    document.addEventListener('keydown', window.cards.popupEsc);
    myPin.removeEventListener('mouseup', onPinSet);
  };

  myPin.addEventListener('mouseup', onPinSet);

})();
