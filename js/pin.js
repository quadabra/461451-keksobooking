'use strict';

window.pins = (function () {
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var ANY_VALUE = 'any';

  // Объект с данными о значениях поля #housing_price
  var pricesData = {
    low: {
      NUMBER: 10000,
      VALUE: 'low'
    },
    high: {
      NUMBER: 50000,
      VALUE: 'high'
    }
  };

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');

  var filtrateFunctions = [
    // Функция для фильтрации объявлений по типу
    function (advertisement) {
      return (typeFilter.value === advertisement.offer.type) || (typeFilter.value === ANY_VALUE);
    },

    // Функция для фильтрации объявлений по цене
    function (advertisement) {
      switch (priceFilter.value) {
        case pricesData.low.VALUE:
          return advertisement.offer.price < pricesData.low.NUMBER;
        case pricesData.high.VALUE:
          return advertisement.offer.price > pricesData.high.NUMBER;
        case ANY_VALUE:
          return true;
        default:
          return advertisement.offer.price >= pricesData.low.NUMBER && advertisement.offer.price <= pricesData.high.NUMBER;
      }
    },

    // Функция для фильтрации объявлений по количеству комнат
    function (advertisement) {
      return (roomsFilter.value === advertisement.offer.rooms.toString()) || (roomsFilter.value === ANY_VALUE);
    },

    // Функция для фильтрации объявлений по числу гостей
    function (advertisement) {
      return (guestsFilter.value === advertisement.offer.guests.toString()) || (guestsFilter.value === ANY_VALUE);
    },

    // Функция для фильтрации объявлений по доступным удобствам
    function (advertisement) {
      var checkedElements = featuresFilter.querySelectorAll('input[type="checkbox"]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return advertisement.offer.features.includes(currentFeature);
      });
    }
  ];

  // Функция фильтрации исходного массива объявлений
  var getFiltratedAdvertisements = function (advertisements) {
    return advertisements.filter(function (advertisement) {
      return filtrateFunctions.every(function (currentFunction) {
        return currentFunction(advertisement);
      });
    });
  };

  // Функция активации фильтров, принимает на вход исходный массив объявлений

  return {
    filtrate: function (advertisements) {
      var redrawPins = function () {
        window.pins.update(getFiltratedAdvertisements(advertisements));
      };
      var filterChangeHandler = function () {
        window.debounce(redrawPins);
      };
      typeFilter.addEventListener('change', filterChangeHandler);
      priceFilter.addEventListener('change', filterChangeHandler);
      roomsFilter.addEventListener('change', filterChangeHandler);
      guestsFilter.addEventListener('change', filterChangeHandler);
      featuresFilter.addEventListener('change', filterChangeHandler, true);
    },
    render: function (hotel) {
      var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      mapPin.style.left = (hotel.location.x - 20) + 'px';
      mapPin.style.top = (hotel.location.y - 58) + 'px';
      mapPin.querySelector('img').src = hotel.author.avatar;
      return mapPin;
    },
    update : function (hotel) {
      var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      [].forEach.call(pins, function (item) {
        mapPins.removeChild(item);
      });
      this.render(hotel);
    },
    pinSwitch: function (evt) {
      var target = evt.target;
      var active = mapPins.querySelector('.map__pin--active') || mapPins.querySelector('.map__pin');
      while (target !== mapPins) {
        if (target.className === 'map__pin' && target !== active) {
          target.classList.add('map__pin--active');
          active.classList.remove('map__pin--active');
        } else if (target.className === 'map__pin map__pin--active') {
          target.classList.remove('map__pin--active');
        }
        if (target.className !== 'map__pin') {
          active.classList.remove('map__pin--active');
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
        if (myPin.offsetTop - shift.y < moveBox.top - pinSizeShift.y) {
          myPin.style.top = (moveBox.top - pinSizeShift.y) + 'px';
        }
        if (myPin.offsetTop - shift.y > moveBox.bottom - pinSizeShift.y) {
          myPin.style.top = (moveBox.bottom - pinSizeShift.y) + 'px';
        }

        window.form.getAddress((myPin.offsetLeft - shift.x + pinSizeShift.x), (myPin.offsetTop - shift.y + pinSizeShift.y));

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
