'use strict';

window.pins = (function () {
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  return {
    render: function (hotel) {
      var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      mapPin.style.left = (hotel.location.x - 20) + 'px';
      mapPin.style.top = (hotel.location.y - 58) + 'px';
      mapPin.querySelector('img').src = hotel.author.avatar;
      return mapPin;
    },
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
    move: function (evt) {
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
    }
  };
})();
