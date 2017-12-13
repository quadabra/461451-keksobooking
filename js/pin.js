'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var renderMapPin = function (hotel) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = (hotel.location.x - 20) + 'px';
    mapPin.style.top = (hotel.location.y - 40) + 'px';
    mapPin.querySelector('img').src = hotel.author.avatar;
    return mapPin;
  };
  mapPins.appendChild(window.make.fragment(window.generatedHotels, renderMapPin));
})();
