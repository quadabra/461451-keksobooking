'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var mapPinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var myForm = document.querySelector('.notice__form');
  var myInputs = document.querySelectorAll('fieldset');
  var inputDisable = true;
  var inputEnable = false;
  var myInputsSwitch = function (arr, attr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = attr;
    }
  };

  myInputsSwitch(myInputs, inputDisable);

  var popupCards = mapBlock.querySelectorAll('.map__card');
  var classAddArray = function (arr, cls) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].classList.add(cls);
    }
  };
  var classRemoveArray = function (arr, cls) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].classList.remove(cls);
    }
  };

  classAddArray(popupCards, 'hidden');
  classAddArray(mapPinList, 'hidden');

  var onPinSet = function () {
    mapBlock.classList.remove('map--faded');
    myForm.classList.remove('notice__form--disabled');
    myInputsSwitch(myInputs, inputEnable);
    classRemoveArray(mapPinList, 'hidden');
    myPin.removeEventListener('mouseup', onPinSet);
  };
  myPin.addEventListener('mouseup', onPinSet);

  mapPins.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== mapPins) {
      if (target.className === 'map__pin') {
        target.classList.add('map__pin--active');
        for (var i = 0; i < mapPinList.length; i++) {
          if (mapPinList[i].className === 'map__pin map__pin--active') {
            popupCards[i].classList.remove('hidden');
            if (mapPinList[i] !== target) {
              mapPinList[i].classList.remove('map__pin--active');
              popupCards[i].classList.add('hidden');
            }
          }
        }
        return;
      }
      if (target.className === 'map__pin map__pin--active') {
        target.classList.remove('map__pin--active');
        for (var j = 0; j < mapPinList.length; j++) {
          if (mapPinList[j].className === 'map__pin') {
            popupCards[j].classList.add('hidden');
          }
        }
      }
      target = target.parentNode;
    }
  });

  mapBlock.addEventListener('click', function (evt) {
    var target = evt.target;
    if (!target.classList.contains('popup__close')) {
      return;
    }
    target.parentNode.classList.toggle('hidden');
    for (var i = 0; i < popupCards.length; i++) {
      if (target.parentNode === popupCards[i]) {
        mapPinList[i].classList.remove('map__pin--active');
      }
    }
  });

  var ESC_KEY = 27;
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY) {
      for (var i = 0; i < popupCards.length; i++) {
        if (!popupCards[i].classList.contains('hidden')) {
          popupCards[i].classList.add('hidden');
          mapPinList[i].classList.remove('map__pin--active');
        }
      }
    }
  });
})();
