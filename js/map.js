'use strict';

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

var avatarList = (function () {
  var list = [];
  for (var i = 0; i < generateObjects; i++) {
    list[i] = 'img/avatars/user' + '0' + (i + 1) + '.png';
  }
  return list;
}());

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

var typeList = ['flat', 'house', 'bungalo'];

var timesCheck = ['12:00', '13:00', '14:00'];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photosList = [];

var map = (function (objectsAmount) {
  var objects = [];
  for (var i = 0; i < objectsAmount; i++) {
    objects[i] = {
      'author': {
        'avatar': avatarList[i]
      },
      'offer': {
        'title': getRandomArray(titleList)[i],
        'address': '{{location.x}}, {{location.y}}',
        'price': getRandomValue(1000, 1000000),
        'type': typeList[getRandomValue(1, 3)],
        'rooms': getRandomValue(1, 5),
        'guests': getRandomValue(1, 100),
        'checkin': timesCheck[getRandomValue(1, 3)],
        'checkout': timesCheck[getRandomValue(1, 3)],
        'features': getRandomArray(featuresList)[i],
        'description': '',
        'photos': photosList[i]
      },
      'location': {
        'x': getRandomValue(300, 900),
        'y': getRandomValue(100, 500)
      }
    };
  }
  return objects;
})(generateObjects);

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map-faded');


