'use strict';

document.querySelector('.map').classList.remove('map--faded');

var generateObjects = 8;
var getRandomArray = function (arr) {
  var randomArr = [];
  for (var i = 0; i < arr.length; i++) {
    var index = Math.floor(Math.random() * arr.length);
    randomArr[i] = arr[index];
    arr.splice(index, 1);
  }
  return randomArr;
};

var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var generateAvatars = function (amount) {
  var list = [];
  for (var i = 0; i < amount; i++) {
    list[i] = 'img/avatars/user' + '0' + (i + 1) + '.png';
  }
  return list;
};
var avatarList = generateAvatars(generateObjects);


var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var randomTitles = getRandomArray(titleList);

var typeList = ['flat', 'house', 'bungalo'];
var typeEqual = ['Квартира', 'Дом', 'Бунгало'];

var replace = function (type) {
  var equal;
  for (var i = 0; i < typeList.length; i++) {
    if (type === typeList[i]) {
      equal = typeEqual[i]
    }
  }
  return equal;
};

var timesCheck = ['12:00', '13:00', '14:00'];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];


var generateFeatures = function (arr, amount) {
  var list = [];
  for (var i = 0; i < amount; i++) {
    var featuresCount = getRandomValue(1, arr.length);
    var featuresRandom = getRandomArray(featuresList);
    for (var j = 0; j < featuresCount; j++) {
      list[i] = list[i] + ', ' + featuresRandom[j];
    }
  }
  return list;
};

var randomFeatures = generateFeatures(featuresList, generateObjects);

var photosList = [];

var generateLocations = function (min, max, amount) {
  var coordinates = [];
  for (var i = 0; i < amount; i++) {
    coordinates[i] = getRandomValue(min, max);
  }
  return coordinates;
};
var minX = 300;
var maxX = 900;
var minY = 100;
var maxY = 500;
var locationsX = generateLocations(minX, maxX, generateObjects);
var locationsY = generateLocations(minY, maxY, generateObjects);

var generateHotels = function (objectsAmount) {
  var objects = [];
  for (var i = 0; i < objectsAmount; i++) {
    objects[i] = {
      'author': {
        'avatar': avatarList[i]
      },
      'offer': {
        'title': randomTitles[i],
        'address': locationsX[i] + ', ' + locationsY[i],
        'price': getRandomValue(1000, 1000000),
        'type': typeList[getRandomValue(0, 2)],
        'rooms': getRandomValue(1, 5),
        'guests': getRandomValue(1, 100),
        'checkin': timesCheck[getRandomValue(1, 3)],
        'checkout': timesCheck[getRandomValue(1, 3)],
        'features': randomFeatures[i],
        'description': '',
        'photos': photosList[i]
      },
      'location': {
        'x': locationsX[i],
        'y': locationsY[i]
      }
    };
  }
  return objects;
};

var hotels = generateHotels(generateObjects);

var makeFragment = function (arr, templates) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(templates(arr[i]));
  }
  return fragment;
};

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var renderMapPin = function (hotel) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = (hotel.location.x - 20) + 'px';
  mapPin.style.top = (hotel.location.y - 40) + 'px';
  mapPin.querySelector('img').src = hotel.author.avatar;
  return mapPin;
};

mapPins.appendChild(makeFragment(hotels, renderMapPin));

var mapBlock = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var renderMapCard = function (hotel) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('h3').textContent = hotel.offer.title;
  mapCard.querySelector('small').textContent = hotel.offer.address;
  mapCard.querySelector('.popup__price').textContent = hotel.offer.price + '&#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = replace(hotel.offer.type);

  return mapCard;
};

mapBlock.insertBefore(makeFragment(hotels, renderMapCard), mapFilters);
