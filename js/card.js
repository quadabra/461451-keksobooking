'use strict';

window.cards = (function () {
  var ESC = 27;
  var mapBlock = document.querySelector('.map');

  var typeReplaceEqual = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var makeFeature = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var item = document.createElement('li');
      item.classList.add('feature');
      item.classList.add('feature--' + features[i]);
      fragment.appendChild(item);
    }
    return fragment;
  };

  var renderCardImages = function (images) {
    var fragment = document.createDocumentFragment();
    images.forEach(function (value) {
      var listItem = document.createElement('li');
      var image = document.createElement('img');
      image.src = value;
      image.width = 50;
      image.height = 40;
      listItem.appendChild(image);
      fragment.appendChild(listItem);
    });
    return fragment;
  };
  return {
    create: function (hotel) {
      var mapCard = mapCardTemplate.cloneNode(true);
      var featureList = mapCard.querySelector('.popup__features');
      var popupPictures = mapCard.querySelector('.popup__pictures');

      popupPictures.removeChild(popupPictures.firstChild);

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
      popupPictures.appendChild(renderCardImages(hotel.offer.photos));
      mapCard.classList.add('hidden');
      return mapCard;
    },

    update: function (hotel) {
      var cardList = mapBlock.querySelectorAll('.map__card');
      [].forEach.call(cardList, function (item) {
        mapBlock.removeChild(item);
      });
      this.render(hotel);
    },
    render: function (hotels) {
      var mapFilters = document.querySelector('.map__filters-container');
      var fragment = document.createDocumentFragment();
      hotels.forEach(function (item) {
        fragment.appendChild(window.cards.create(item));
      });
      mapBlock.insertBefore(fragment, mapFilters);
    },

    popupSwitch: function () {
      var cardList = mapBlock.querySelectorAll('.map__card');
      var pinList = mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinList.length; i++) {
        if (pinList[i].classList.contains('map__pin--active')) {
          cardList[i].classList.remove('hidden');
        } else if (!cardList[i].classList.contains('hidden')) {
          cardList[i].classList.add('hidden');
        }
      }
    },

    popupClose: function (evt) {
      evt.target.parentNode.classList.add('hidden');
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    },

    popupEsc: function (evt) {
      if (evt.keyCode === ESC) {
        document.querySelector('.popup:not(.hidden)').classList.add('hidden');
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
    }
  };
})();
