'use strict';

window.cards = (function () {

  var typeReplaceEqual = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var makeFeature = function (str) {
    var arr = str.split(', ');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var item = document.createElement('li');
      item.classList.add('feature');
      item.classList.add('feature--' + arr[i]);
      fragment.appendChild(item);
    }
    return fragment;
  };
  return {
    render: function (hotel) {
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
      featureList.appendChild(makeFeature(hotel.offer.features));
      mapCard.querySelector('p:last-of-type').textContent = hotel.offer.description;
      mapCard.classList.add('hidden');
      return mapCard;
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
      var ESC_KEY = 27;
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
