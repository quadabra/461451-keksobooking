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
      pinSwitch: function (evt) {
        var target = evt.target;
        while (target !== mapPins) {
          if (target.className === 'map__pin') {
            target.classList.add('map__pin--active');
            for (var i = 0; i < window.mapPinList.length; i++) {
              if (window.mapPinList[i].className === 'map__pin map__pin--active') {
                window.popupCards[i].classList.remove('hidden');
                if (window.mapPinList[i] !== target) {
                  window.mapPinList[i].classList.remove('map__pin--active');
                  window.popupCards[i].classList.add('hidden');
                }
              }
            }
            return;
          }
          if (target.className === 'map__pin map__pin--active') {
            target.classList.remove('map__pin--active');
            for (var j = 0; j < window.mapPinList.length; j++) {
              if (window.mapPinList[j].className === 'map__pin') {
                window.popupCards[j].classList.add('hidden');
              }
            }
          }
          target = target.parentNode;
        }
      },

      popupClose: function (evt) {
        var target = evt.target;
        if (!target.classList.contains('popup__close')) {
          return;
        }
        target.parentNode.classList.toggle('hidden');
        for (var i = 0; i < window.popupCards.length; i++) {
          if (target.parentNode === window.popupCards[i]) {
            window.mapPinList[i].classList.remove('map__pin--active');
          }
        }
      },

      popupEsc: function (evt) {
        if (evt.keyCode === ESC_KEY) {
          for (var i = 0; i < window.popupCards.length; i++) {
            if (!window.popupCards[i].classList.contains('hidden')) {
              window.popupCards[i].classList.add('hidden');
              window.mapPinList[i].classList.remove('map__pin--active');
            }
          }
        }
      }
    };
  })();

  var onPinMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinSizeShift = {
      x: 20,
      y: 66
    };

    var moveBox = {
      top: 100,
      bottom: 500
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      myPin.style.top = (myPin.offsetTop - shift.y) + 'px';
      myPin.style.left = (myPin.offsetLeft - shift.x) + 'px';
      if (myPin.offsetTop - shift.y < moveBox.top + pinSizeShift.y) {
        myPin.style.top = (moveBox.top + pinSizeShift.y) + 'px';
      }
      if (myPin.offsetTop - shift.y > moveBox.bottom + pinSizeShift.y) {
        myPin.style.top = (moveBox.bottom + pinSizeShift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  myPin.addEventListener('mousedown', onPinMove);

  var onPinSet = function () {
    renderMapPins();
    mapBlock.classList.remove('map--faded');
    myForm.classList.remove('notice__form--disabled');
    myInputsSwitch(myInputs, inputEnable);
    mapPins.addEventListener('click', window.mapEvt.pinSwitch);
    mapBlock.addEventListener('click', window.mapEvt.popupClose);
    document.addEventListener('keydown', window.mapEvt.popupEsc);
    myPin.removeEventListener('mouseup', onPinSet);
  };

  myPin.addEventListener('mouseup', onPinSet);

})();
