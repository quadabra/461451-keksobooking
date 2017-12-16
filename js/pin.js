'use strict';

window.render = (function () {
  return {
    pin: function (hotel) {
      var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      mapPin.style.left = (hotel.location.x - 20) + 'px';
      mapPin.style.top = (hotel.location.y - 58) + 'px';
      mapPin.querySelector('img').src = hotel.author.avatar;
      return mapPin;
    }
  };
})();
