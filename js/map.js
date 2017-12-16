'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var myForm = document.querySelector('.notice__form');
  var myInputs = document.querySelectorAll('fieldset');
  var ESC_KEY = 27;
  var inputDisable = true;
  var inputEnable = false;

  var renderMapPins = function () {
    mapPins.appendChild(window.make.fragment(window.generatedHotels, window.render.pin));
    window.mapPinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  };


  var myInputsSwitch = function (arr, attr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = attr;
    }
  };

  myInputsSwitch(myInputs, inputDisable);

  window.mapEvt = (function () {
    return {
      pinSwitch : function (evt) {
        var target = evt.target;
        while (target !== mapPins) {
          if (target.className === 'map__pin') {
            target.classList.add('map__pin--active');
            for (var i = 0; i < mapPinList.length; i++) {
              if (mapPinList[i].className === 'map__pin map__pin--active') {
                popupCards[i].classList.remove('hidden')
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
      },
      popupClose : function (evt) {
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
      },
      popupEsc : function (evt) {

        if (evt.keyCode === ESC_KEY) {
          for (var i = 0; i < popupCards.length; i++) {
            if (!popupCards[i].classList.contains('hidden')) {
              popupCards[i].classList.add('hidden');
              mapPinList[i].classList.remove('map__pin--active');
            }
          }
        }
      }
    }
  })();

  var onPinSet = function () {
    renderMapPins();
    mapBlock.classList.remove('map--faded');
    myForm.classList.remove('notice__form--disabled');
    myInputsSwitch(myInputs, inputEnable);
    mapPins.addEventListener('click', function(evt) {
      window.mapEvt.pinSwitch(evt);
    });
    mapBlock.addEventListener('click', window.mapEvt.popupClose);
    document.addEventListener('keydown', window.mapEvt.popupEsc);
    myPin.removeEventListener('mouseup', onPinSet);
  };

  myPin.addEventListener('mouseup', onPinSet);

})();
