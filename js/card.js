'use strict';

(function () {

  var typeReplaceEqual = {
    'flat' : 'Квартира',
    'house' : 'Дом',
    'bungalo' : 'Бунгало'
  };

  var mapBlock = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var renderMapCard = function (hotel) {
    var mapCard = mapCardTemplate.cloneNode(true);
    var featureList = mapCard.querySelector('.popup__features');
    while (featureList.firstChild) {
      featureList.removeChild(featureList.firstChild);
    }
    mapCard.querySelector('img').src = hotel.author.avatar;
    mapCard.querySelector('h3').textContent = hotel.offer.title;
    mapCard.querySelector('small').textContent = hotel.offer.address;
    mapCard.querySelector('.popup__price').textContent = hotel.offer.price + '\u20BD/ночь';
    mapCard.querySelector('h4').textContent = typeReplaceEqual[hotel.offer.type];
    mapCard.querySelector('p:nth-of-type(3)').textContent = hotel.offer.rooms + ' комнаты для '
      + hotel.offer.guests + ' гостей';
    mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + hotel.offer.checkin +
      ', выезд до ' + hotel.offer.checkout;
    featureList.appendChild(window.make.feature(hotel.offer.features));
    mapCard.querySelector('p:last-of-type').textContent = hotel.offer.description;
    mapCard.hidden = true;
    return mapCard;
  };

  mapBlock.insertBefore(window.make.fragment(window.generatedHotels, renderMapCard), mapFilters);
})();
